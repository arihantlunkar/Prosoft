import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Linking, Platform, Share } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Chip, Button, Card } from 'react-native-paper';
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
        const foundProduct = params.requiredResultData[0].products.filter((element) => params.cfm >= element.min && params.cfm <= element.max && ((params.esp !== null && params.esp == element.ESP) || (params.esp === null)))[0];
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

    onShare = async (val) => {
        this.setState({ isSharingInProgress: true });
        const params = this.props.route.params;
        const foundProduct = params.requiredResultData[0].products.filter((element) => params.cfm >= element.min && params.cfm <= element.max && ((params.esp !== null && params.esp == element.ESP) || (params.esp === null)))[0];
        var url = null;
        for (var key in foundProduct.documents) {
            if (foundProduct.documents.hasOwnProperty(key) && key === val.label) {
                url = foundProduct.documents[key];
            }
        }
        let relativeFileName = val.label + ' ' + foundProduct.name + '.' + url.split('.').pop();
        relativeFileName = relativeFileName.replace(/\s+/g, '');
        const { uri: localUri } = await FileSystem.downloadAsync(
            url,
            FileSystem.documentDirectory + relativeFileName
        ).catch((error) => {
            console.error(error)
        })
        await Sharing.shareAsync(localUri)
            .catch((err) => console.log('Sharing::error', err))
        this.setState({ isSharingInProgress: false });
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f4f4f4' }}>
                <View style={styles.container}>
                    <StatusBar backgroundColor='#02b389' barStyle={'light-content'} />
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Chip selectedColor='#fff' mode='outlined' icon='cart' onPress={() => { }} textStyle={{ color: '#fff' }} style={{ marginBottom: 20, alignItems: 'center', backgroundColor: '#02b389' }}>
                                    Product found : <Text style={{ fontWeight: 'bold' }}>{this.state.productName}</Text>
                                </Chip>
                            </View>
                            <View>
                                <Text><Text style={{ fontWeight: 'bold' }}>Type :</Text> {this.props.route.params.type}</Text>
                                <Text><Text style={{ fontWeight: 'bold' }}>Purpose :</Text> {this.props.route.params.purpose}</Text>
                                <Text><Text style={{ fontWeight: 'bold' }}>Value :</Text> {this.props.route.params.cfm} {this.props.route.params.unit}</Text>
                            </View>
                        </Card.Content>
                    </Card>
                    {this.state.tableData !== null ? (
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#02b389' }} style={{ backgroundColor: '#fff', marginTop: 20 }}>
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
                            <Text style={{ marginTop: 20, marginBottom: 20 }}>Sharing. Please wait ... </Text>
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
                            const foundProduct = params.requiredResultData[0].products.filter((element) => params.cfm >= element.min && params.cfm <= element.max && ((params.esp !== null && params.esp == element.ESP) || (params.esp === null)))[0];
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
                            this.setState({ isShareButtonClicked: false });
                            this.onShare(result.selectedItem);
                        }}
                    />
                </View>
            </ScrollView>
        );
    }
}

export default function (props) {
    const theme = useTheme();
    return <ResultScreen {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: { margin: 20 },
    head: { height: 40, backgroundColor: '#02b389' },
    text: { margin: 6 },
    card: {
        elevation: 1,
        borderRadius: 10,
    }
});
