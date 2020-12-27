import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput, Button, Card } from 'react-native-paper';
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
        };
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
                                onChangeItem={(item) => console.log(item.label, item.value)}
                            />
                            <Text style={{ color: this.props.theme.colors.text }}>
                                {'\n'}Type{'\n'}
                            </Text>
                            <DropDownPicker
                                items={[{ label: 'Indoor Air Treatment', value: 'Indoor Air Treatment' }, { label: 'Exhaust Air Treatment', value: 'Exhaust Air Treatment' }]}
                                defaultValue={'Indoor Air Treatment'}
                                containerStyle={{ height: 40 }}
                                onChangeItem={(item) => {
                                    this.setState({ airItems: item.value === 'Indoor Air Treatment' ? this.state.purposeIndoorAirItems : this.state.purposeExhaustAirItems });
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
                                onChangeItem={(item) => console.log(item.label, item.value)}
                            />
                            <Text style={{ color: this.props.theme.colors.text }} />
                            <TextInput
                                mode='outlined'
                                label='Enter cfm'
                                keyboardType='numeric'
                                onChangeText={(text) => {
                                    console.log(text);
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
                                    console.log('Pressed');
                                    this.props.navigation.navigate('Client');
                                }}>
                                Search
                            </Button>
                        </Card.Content>
                    </Card>
                </Animatable.View>
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
