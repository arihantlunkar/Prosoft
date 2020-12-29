import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Chip, Card, List, Button, Paragraph, Dialog, Portal, RadioButton } from 'react-native-paper';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialDialog, MultiPickerMaterialDialog, SinglePickerMaterialDialog } from 'react-native-material-dialog';
import * as FileSystem from 'expo-file-system';

class ResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            tableHead: null,
            tableData: null,
            isDownloadButtonClicked: false,
            isShareButtonClicked: false,
            defaultSelectedItemDownloadPicker: {
                label: 'Tender Specification',
                value: 0,
            },
            defaultSelectedItemSharePicker: {
                label: 'Tender Specification',
                value: 0,
            },
        };
        this.getProductName();
        this.getTableData();
    }
    getTableData() {
        let params = this.props.route.params;
        if (params.purpose === 'STP Exhaust Odor Control') {
            this.state.tableHead = ['Parameter', 'Value'];
            this.state.tableData = [
                ['ACPH', '30 nos'],
                ['Mech. Fresh Air', '80% of Exhaust Air'],
                ['Exhaust Velocity', '7.5 m/s (+/- 10%)'],
                ['Duct Length', '40 meters (+/- 10%)'],
                ['Exhaust Discharge', '4.0 meters from ground level & 5 meters from compound wall'],
                ['Incase dust length of 40 meters is not possible, an equivalent volume of contact (reaction) chamber'],
            ];
        } else if (params.purpose === 'OWC Exhaust Odor Control') {
            this.state.tableHead = ['Parameter', 'Value'];
            this.state.tableData = [
                ['ACPH', '50 nos'],
                ['Mech. Fresh Air', '80% of Exhaust Air'],
                ['Exhaust Velocity', '3.5 m/s (+/- 10%)'],
                ['Duct Length', '40 meters (+/- 10%)'],
                ['Exhaust Discharge', '4.0 meters from ground level & 5 meters from compound wall'],
                ['Incase dust length of 40 meters is not possible, an equivalent volume of contact (reaction) chamber'],
            ];
        }
    }
    getProductName() {
        let params = this.props.route.params;
        if (params.purpose === 'STP Exhaust Odor Control') {
            if (params.cfm >= 1000 && params.cfm <= 2000) {
                this.state.productName = 'EXO - 50';
            } else if (params.cfm >= 2001 && params.cfm <= 4000) {
                this.state.productName = 'EXO - 100';
            } else if (params.cfm >= 4001 && params.cfm <= 6000) {
                this.state.productName = 'EXO - 150';
            } else if (params.cfm >= 6001 && params.cfm <= 7500) {
                this.state.productName = 'EXO - 200';
            } else if (params.cfm >= 7501 && params.cfm <= 8000) {
                this.state.productName = 'EXO OXY - 200';
            } else if (params.cfm >= 8001 && params.cfm <= 16000) {
                this.state.productName = 'EXO OXY - 300';
            } else if (params.cfm >= 16001 && params.cfm <= 23000) {
                this.state.productName = 'EXO OXY - 500';
            } else if (params.cfm >= 23001 && params.cfm <= 28000) {
                this.state.productName = 'EXO OXY - 700';
            } else if (params.cfm >= 28001 && params.cfm <= 40000) {
                this.state.productName = 'EXO OXY - 1000';
            } else if (params.cfm >= 40001 && params.cfm <= 50000) {
                this.state.productName = 'EXO OXY - 1500';
            }
        } else if (params.purpose === 'OWC Exhaust Odor Control') {
            if (params.cfm >= 0 && params.cfm <= 550) {
                this.state.productName = 'EXO OXY - 200';
            } else if (params.cfm >= 551 && params.cfm <= 1100) {
                this.state.productName = 'EXO OXY - 300';
            } else if (params.cfm >= 1101 && params.cfm <= 1550) {
                this.state.productName = 'EXO OXY - 500';
            } else if (params.cfm >= 1551 && params.cfm <= 1900) {
                this.state.productName = 'EXO OXY - 700';
            } else if (params.cfm >= 1901 && params.cfm <= 2700) {
                this.state.productName = 'EXO OXY - 1000';
            } else if (params.cfm >= 2701 && params.cfm <= 4000) {
                this.state.productName = 'EXO OXY - 1500';
            } else if (params.cfm >= 4001 && params.cfm <= 7000) {
                this.state.productName = 'EXO OXY - 3000';
            } else if (params.cfm >= 7001 && params.cfm <= 9000) {
                this.state.productName = 'EXO OXY - 4000';
            } else if (params.cfm >= 9001 && params.cfm <= 12000) {
                this.state.productName = 'EXO OXY - 5000';
            }
        }
    }
    callback = (downloadProgress) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        console.log(progress);
    };
    async downloadFile() {
        const downloadResumable = FileSystem.createDownloadResumable('http://techslides.com/demos/sample-videos/small.mp4', FileSystem.documentDirectory + 'small.mp4', {}, this.callback);

        try {
            const { uri } = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);
        } catch (e) {
            console.error(e);
        }
    }

    saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            await MediaLibrary.createAlbumAsync('Download', asset, false);
        }
    };
    render() {
        const { theme } = this.props;
        const downloadList = ['Tender Specification', 'B O Q', 'Technical Specification', 'General Arrangement Drawings (GAD)', 'Catalogue | Data Sheet', 'Unit Pictures'];
        const shareList = downloadList;
        return (
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor='#02b389' barStyle={'light-content'} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Chip mode='outlined' icon='cart' onPress={() => {}} style={{ marginBottom: 20, alignItems: 'center' }}>
                            Product Found : <Text style={{ fontWeight: 'bold' }}>{this.state.productName}</Text>
                        </Chip>
                    </View>
                    {this.state.tableData !== null ? (
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#02b389' }}>
                            <Row data={this.state.tableHead} style={styles.head} textStyle={{ color: '#fff', margin: 6 }} />
                            <Rows data={this.state.tableData} textStyle={styles.text} />
                        </Table>
                    ) : null}

                    <Text />
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <Button
                            icon='download'
                            mode='contained'
                            onPress={() => {
                                this.setState({ isDownloadButtonClicked: true });
                            }}
                            color='#02b389'
                            style={{ height: 50, justifyContent: 'center', width: '49%' }}>
                            Download
                        </Button>
                        <Text />
                        <Button
                            icon='share'
                            mode='contained'
                            onPress={() => {
                                this.setState({ isShareButtonClicked: true });
                            }}
                            color='#02b389'
                            style={{ height: 50, justifyContent: 'center', width: '49%' }}>
                            Share
                        </Button>
                    </View>
                    <SinglePickerMaterialDialog
                        title={'Choose an option'}
                        items={downloadList.map((row, index) => ({ value: index, label: row }))}
                        visible={this.state.isDownloadButtonClicked}
                        selectedItem={this.state.defaultSelectedItemDownloadPicker}
                        onCancel={() => this.setState({ isDownloadButtonClicked: false })}
                        onOk={(result) => {
                            this.setState({ isDownloadButtonClicked: false });
                            this.setState({ defaultSelectedItemDownloadPicker: result.selectedItem });
                            console.log(result.selectedItem);
                            this.downloadFile();
                        }}
                    />
                    <SinglePickerMaterialDialog
                        title={'Choose an option'}
                        items={shareList.map((row, index) => ({ value: index, label: row }))}
                        visible={this.state.isShareButtonClicked}
                        selectedItem={this.state.defaultSelectedItemSharePicker}
                        onCancel={() => this.setState({ isShareButtonClicked: false })}
                        onOk={(result) => {
                            this.setState({ isShareButtonClicked: false });
                            this.setState({ defaultSelectedItemSharePicker: result.selectedItem });
                            console.log(result.selectedItem);
                        }}
                    />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export default function(props) {
    const theme = useTheme();
    return <ResultScreen {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: { margin: 20 },
    card: {
        margin: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    head: { height: 40, backgroundColor: '#02b389' },
    text: { margin: 6 },
});
