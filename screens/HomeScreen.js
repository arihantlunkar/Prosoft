import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput, Button, Card, Snackbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

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
            airItems: purposeIndoorAirItems,
            solution: 'Air',
            type: 'Indoor Air Treatment',
            purpose: purposeIndoorAirItems[0].value,
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
                <Animatable.View animation='fadeInUpBig' style={[styles.footer, { backgroundColor: theme.colors.background }]}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={{ color: this.props.theme.colors.text }}>Solution{'\n'}</Text>
                            <DropDownPicker
                                items={[{ label: 'Air', value: 'Air' }]}
                                defaultValue={'Air'}
                                defaultIndex={0}
                                containerStyle={{ height: 40 }}
                                onChangeItem={(item) => {
                                    this.setState({ solution: item.value });
                                }}
                            />
                            <Text style={{ color: this.props.theme.colors.text }}>
                                {'\n'}Type{'\n'}
                            </Text>
                            <DropDownPicker
                                items={[{ label: 'Indoor Air Treatment', value: 'Indoor Air Treatment' }, { label: 'Exhaust Air Treatment', value: 'Exhaust Air Treatment' }]}
                                defaultValue={'Indoor Air Treatment'}
                                containerStyle={{ height: 40 }}
                                onChangeItem={(item) => {
                                    this.setState({ type: item.value });
                                    this.setState({ airItems: item.value === 'Indoor Air Treatment' ? this.state.purposeIndoorAirItems : this.state.purposeExhaustAirItems });
                                    this.setState({ purpose: item.value === 'Indoor Air Treatment' ? this.state.purposeIndoorAirItems[0].value : this.state.purposeExhaustAirItems[0].value });
                                }}
                            />
                            <Text style={{ color: this.props.theme.colors.text }}>
                                {'\n'}Purpose{'\n'}
                            </Text>
                            <DropDownPicker
                                style={{ zIndex: 1 }}
                                items={this.state.airItems}
                                defaultValue={this.state.airItems[0].value}
                                containerStyle={{ height: 40 }}
                                onChangeItem={(item) => {
                                    this.setState({ purpose: item.value });
                                }}
                            />
                            <Text style={{ color: this.props.theme.colors.text }} />
                            <TextInput
                                mode='outlined'
                                label='Enter cfm'
                                keyboardType='numeric'
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
                            <Text style={{ color: this.props.theme.colors.text }} />
                            <Text style={{ color: this.props.theme.colors.text }} />
                            <Text style={{ color: this.props.theme.colors.text }} />
                            <Text style={{ color: this.props.theme.colors.text }} />
                            <Button
                                icon='database-search'
                                mode='contained'
                                color='#02b389'
                                style={{ height: 50, justifyContent: 'center', zIndex: 0 }}
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
                        </Card.Content>
                    </Card>
                </Animatable.View>
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
        margin: 20,
    },
    card: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
