import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Chip, Button } from 'react-native-paper';
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

class ResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDownloadButtonClicked: false,
            isShareButtonClicked: false,
            documentsList: [],
            productName: null,
            tableHead: null,
            tableData: null,
            isSharingInProgress: false,
        };

        this.init();
        this.getTableData();
    }

    init() {
        const params = this.props.route.params;
        const foundProduct = params.requiredResultData[0].products.filter((element) => params.cfm >= element.min && params.cfm <= element.max)[0];
        let documentsList = [];
        for (var key in foundProduct.documents) {
            if (foundProduct.documents.hasOwnProperty(key)) {
                documentsList.push(key);
            }
        }
        this.state.documentsList = documentsList;
        this.state.productName = foundProduct.name;
    }

    getTableData() {
        const params = this.props.route.params;
        this.state.tableHead = params.requiredResultData[0].tableHead;
        this.state.tableData = params.requiredResultData[0].tableData;
    }

    openShareDialogAsync = async (val) => {
        try {
            const params = this.props.route.params;
            const foundProduct = params.requiredResultData[0].products.filter((element) => params.cfm >= element.min && params.cfm <= element.max)[0];
            var url = null;
            for (var key in foundProduct.documents) {
                if (foundProduct.documents.hasOwnProperty(key) && key === val.label) {
                    url = foundProduct.documents[key];
                }
            }
            const relativeFileName = val.label + ' (' + foundProduct.name + ').' + url.split('.').pop();
            const downloadResumable = FileSystem.createDownloadResumable(url, FileSystem.documentDirectory + relativeFileName, {}, null);
            const { uri } = await downloadResumable.downloadAsync();
            if (!(await Sharing.isAvailableAsync())) {
                alert(`Uh oh, sharing isn't available on your platform`);
                return;
            }
            this.setState({ isSharingInProgress: false });
            await Sharing.shareAsync(uri);
        } catch (e) {
            console.error(e);
        }
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
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
                    {this.state.isSharingInProgress ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>Downloading. Please wait ... </Text>
                        </View>
                    ) : null}
                    <SinglePickerMaterialDialog
                        title={'Choose an option'}
                        items={this.state.documentsList.map((row, index) => ({ value: index, label: row }))}
                        visible={this.state.isDownloadButtonClicked}
                        selectedItem={{ label: this.state.documentsList[0], value: 0 }}
                        onCancel={() => this.setState({ isDownloadButtonClicked: false })}
                        onOk={(result) => {
                            this.setState({ isDownloadButtonClicked: false });
                            const params = this.props.route.params;
                            const foundProduct = params.requiredResultData[0].products.filter((element) => params.cfm >= element.min && params.cfm <= element.max)[0];
                            var url = null;
                            for (var key in foundProduct.documents) {
                                if (foundProduct.documents.hasOwnProperty(key) && key === result.selectedItem.label) {
                                    url = foundProduct.documents[key];
                                }
                            }
                            Linking.openURL(url);
                        }}
                    />
                    <SinglePickerMaterialDialog
                        title={'Choose an option'}
                        items={this.state.documentsList.map((row, index) => ({ value: index, label: row }))}
                        visible={this.state.isShareButtonClicked}
                        selectedItem={{ label: this.state.documentsList[0], value: 0 }}
                        onCancel={() => this.setState({ isShareButtonClicked: false })}
                        onOk={(result) => {
                            this.setState({ isSharingInProgress: true });
                            this.setState({ isShareButtonClicked: false });
                            this.openShareDialogAsync(result.selectedItem);
                        }}
                    />
                </View>
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
