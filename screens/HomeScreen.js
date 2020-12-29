import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, ImageBackground, View, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput, Button, Card, Snackbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        var purposeIndoorAirItems = [
                { label: 'Enhance Work Place IAQ', value: 'Enhance Work Place IAQ' },
                { label: 'Infection Control', value: 'Infection Control' },
                { label: 'Air & Surface Disinfection', value: 'Air & Surface Disinfection' },
                { label: 'Wash Room / Garbage Room', value: 'Wash Room / Garbage Room' },
            ],
            purposeExhaustAirItems = [
                { label: 'STP Exhaust Odor Control', value: 'STP Exhaust Odor Control' },
                { label: 'OWC Exhaust Odor Control', value: 'OWC Exhaust Odor Control' },
                { label: 'Waste Processing Plant Odor Control', value: 'Waste Processing Plant Odor Control' },
                { label: 'Kitchen Exhaust Oil & Odor Control', value: 'Kitchen Exhaust Oil & Odor Control' },
            ];
        this.state = {
            purposeIndoorAirItems: purposeIndoorAirItems,
            purposeExhaustAirItems: purposeExhaustAirItems,
            airItems: purposeExhaustAirItems,
            solution: 'Air',
            type: 'Exhaust Air Treatment',
            purpose: purposeExhaustAirItems[0].value,
            cfm: null,
            isCFMValid: false,
            invalidMsg: 'cfm cannot be empty.',
            isSearchButtonClicked: false,
            isProductFound: false,
        };
    }
    checkProductExistence() {
        var params = this.state;
        this.state.isProductFound = false;
        if (params.purpose === 'STP Exhaust Odor Control' && params.cfm >= 1000 && params.cfm <= 50000) {
            this.state.isProductFound = true;
        } else if (params.purpose === 'OWC Exhaust Odor Control' && params.cfm >= 0 && params.cfm <= 12000) {
            this.state.isProductFound = true;
        }
    }
    render() {
        const { theme } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#02b389' barStyle={'light-content'} />
                <ScrollView>
                    <ImageBackground source={{ uri: 'https://www.chemtronicsindia.in/assets/img/welcomeMsgBg.jpg' }} style={styles.bgImg}>
                        <View style={styles.overlay}>
                            <Text style={styles.imgHeader}>Model Selection Guide</Text>
                            <Text style={styles.textStyle}> The PROSOFT App will give you most appropriates model on the bases of your submitted data.</Text>
                        </View>
                    </ImageBackground>
                    <Animatable.View animation='fadeInUpBig' style={[{ backgroundColor: theme.colors.background }, styles.cardParent]}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <Text style={[styles.textStyle, { color: this.props.theme.colors.text, marginBottom: hp('2%') }]}>Let's start with the basic details.</Text>
                                <Text style={[styles.labelStyle, { color: this.props.theme.colors.text }]}>Solution</Text>
                                <DropDownPicker
                                    items={[{ label: 'Air', value: 'Air' }]}
                                    defaultValue={'Air'}
                                    defaultIndex={0}
                                    containerStyle={{ height: hp('6%'), marginBottom: hp('2%') }}
                                    itemStyle={{
                                        justifyContent: 'flex-start',
                                    }}
                                    onChangeItem={(item) => {
                                        this.setState({ solution: item.value });
                                    }}
                                />
                                <Text style={[styles.labelStyle, { color: this.props.theme.colors.text }]}>Type</Text>
                                <DropDownPicker
                                    items={[{ label: 'Indoor Air Treatment', value: 'Indoor Air Treatment' }, { label: 'Exhaust Air Treatment', value: 'Exhaust Air Treatment' }]}
                                    defaultValue={'Exhaust Air Treatment'}
                                    containerStyle={{ height: hp('6%'), marginBottom: hp('2%') }}
                                    itemStyle={{
                                        justifyContent: 'flex-start',
                                    }}
                                    onChangeItem={(item) => {
                                        this.setState({ type: item.value });
                                        this.setState({ airItems: item.value === 'Indoor Air Treatment' ? this.state.purposeIndoorAirItems : this.state.purposeExhaustAirItems });
                                        this.setState({ purpose: item.value === 'Indoor Air Treatment' ? this.state.purposeIndoorAirItems[0].value : this.state.purposeExhaustAirItems[0].value });
                                    }}
                                />
                                <Text style={[styles.labelStyle, { color: this.props.theme.colors.text }]}>Purpose</Text>
                                <DropDownPicker
                                    items={this.state.airItems}
                                    defaultValue={this.state.airItems[0].value}
                                    itemStyle={{
                                        justifyContent: 'flex-start',
                                    }}
                                    containerStyle={{ height: hp('6%'), marginBottom: hp('2%') }}
                                    onChangeItem={(item) => {
                                        this.setState({ purpose: item.value });
                                    }}
                                    dropDownMaxHeight={hp('15%')}
                                />
                                <TextInput
                                    mode='outlined'
                                    label='Enter CFM'
                                    keyboardType='numeric'
                                    style={styles.textInput}
                                    onChangeText={(text) => {
                                        let numreg = /^[0-9]+$/;
                                        if (numreg.test(text)) {
                                            this.setState({ cfm: text });
                                            this.setState({ isCFMValid: true });
                                        } else {
                                            this.setState({ invalidMsg: 'Only positive integers allowed in cfm.' });
                                            this.setState({ isCFMValid: false });
                                        }
                                    }}
                                />
                            </Card.Content>
                        </Card>
                    </Animatable.View>
                </ScrollView>
                <Button
                    icon='database-search'
                    mode='contained'
                    style={styles.searchBtn}
                    onPress={() => {
                        this.setState({ isSearchButtonClicked: true });
                        if (this.state.isCFMValid) {
                            this.checkProductExistence();
                            if (this.state.isProductFound) {
                                this.props.navigation.navigate('Result', {
                                    solution: this.state.solution,
                                    type: this.state.type,
                                    purpose: this.state.purpose,
                                    cfm: this.state.cfm,
                                });
                            } else {
                                this.setState({ invalidMsg: 'Did not find any product matching your requirement.' });
                            }
                        }
                    }}>
                    Search
                </Button>
                <Snackbar
                    visible={this.state.isSearchButtonClicked && (!this.state.isCFMValid || !this.state.isProductFound)}
                    onDismiss={() => {
                        this.setState({ isSearchButtonClicked: false });
                    }}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            this.setState({ isSearchButtonClicked: false });
                        },
                    }}>
                    {this.state.invalidMsg}
                </Snackbar>
            </SafeAreaView>
        );
    }
}

export default function(props) {
    const theme = useTheme();
    return <HomeScreen {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    cardParent: {
        marginRight: hp('2%'),
        marginLeft: hp('2%'),
        position: 'relative',
        top: hp('-3%'),
        height: '100%',
        borderRadius: 0,
        paddingBottom: hp('3%'),
        backgroundColor: 'transparent',
    },
    card: {
        elevation: 1,
        borderRadius: 10,
    },
    bgImg: {
        width: wp('100%'),
        height: hp('20%'),
    },
    overlay: {
        backgroundColor: 'rgba(2,177,136,.6)',
        height: hp('20%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgHeader: {
        fontSize: wp('5%'),
        color: '#FFFFFF',
        alignSelf: 'center',
        textAlign: 'center',
    },
    textStyle: {
        marginTop: hp('0.75%'),
        fontSize: wp('3.5%'),
        color: '#FFFFFF',
        fontWeight: '700',
        alignSelf: 'center',
        textAlign: 'center',
        marginRight: hp('2%'),
        marginLeft: hp('2%'),
    },
    labelStyle: {
        fontSize: wp('3.5%'),
        fontWeight: '700',
        marginBottom: hp('0.5%'),
    },
    textInput: {
        height: hp('6%'),
        borderColor: 'green',
    },
    searchBtn: {
        height: hp('7%'),
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderRadius: 0,
        fontSize: wp('5%'),
    },
});
