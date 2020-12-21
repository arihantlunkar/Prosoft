import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, ScrollView, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm_password: '',
            check_textInputChange: false,
            secureTextEntry: true,
            confirm_secureTextEntry: true,
        };
    }

    textInputChange(val) {
        var check_textInputChange = val.length !== 0;
        this.setState({ username: val });
        this.setState({ check_textInputChange: check_textInputChange });
    }

    handlePasswordChange(val) {
        this.setState({ password: val });
    }

    handleConfirmPasswordChange(val) {
        this.setState({ confirm_password: val });
    }

    updateSecureTextEntry() {
        this.setState({ secureTextEntry: !this.state.secureTextEntry });
    }

    updateConfirmSecureTextEntry() {
        this.setState({ confirm_secureTextEntry: !this.state.confirm_secureTextEntry });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#02b389' barStyle='light-content' />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Register Now!</Text>
                </View>
                <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                    <ScrollView>
                        <Text style={styles.text_footer}>Email</Text>
                        <View style={styles.action}>
                            <FontAwesome name='user-o' color='#05375a' size={20} />
                            <TextInput placeholder='Your Email' style={styles.textInput} autoCapitalize='none' onChangeText={(val) => this.textInputChange(val)} />
                            {this.state.check_textInputChange ? (
                                <Animatable.View animation='bounceIn'>
                                    <Feather name='check-circle' color='green' size={20} />
                                </Animatable.View>
                            ) : null}
                        </View>

                        <Text
                            style={[
                                styles.text_footer,
                                {
                                    marginTop: 35,
                                },
                            ]}>
                            Password
                        </Text>
                        <View style={styles.action}>
                            <Feather name='lock' color='#05375a' size={20} />
                            <TextInput
                                placeholder='Your Password'
                                secureTextEntry={this.state.secureTextEntry ? true : false}
                                style={styles.textInput}
                                autoCapitalize='none'
                                onChangeText={(val) => this.handlePasswordChange(val)}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    this.updateSecureTextEntry();
                                }}>
                                {this.state.secureTextEntry ? <Feather name='eye-off' color='grey' size={20} /> : <Feather name='eye' color='grey' size={20} />}
                            </TouchableOpacity>
                        </View>

                        <Text
                            style={[
                                styles.text_footer,
                                {
                                    marginTop: 35,
                                },
                            ]}>
                            Confirm Password
                        </Text>
                        <View style={styles.action}>
                            <Feather name='lock' color='#05375a' size={20} />
                            <TextInput
                                placeholder='Confirm Your Password'
                                secureTextEntry={this.state.confirm_secureTextEntry ? true : false}
                                style={styles.textInput}
                                autoCapitalize='none'
                                onChangeText={(val) => this.handleConfirmPasswordChange(val)}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    this.updateConfirmSecureTextEntry();
                                }}>
                                {this.state.confirm_secureTextEntry ? <Feather name='eye-off' color='grey' size={20} /> : <Feather name='eye' color='grey' size={20} />}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity style={styles.signIn} onPress={() => {}}>
                                <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                                    <Text
                                        style={[
                                            styles.textSign,
                                            {
                                                color: '#fff',
                                            },
                                        ]}>
                                        Sign Up
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.props.navigationCallback('SignIn')}
                                style={[
                                    styles.signIn,
                                    {
                                        borderColor: '#02b389',
                                        borderWidth: 1,
                                        marginTop: 15,
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.textSign,
                                        {
                                            color: '#02b389',
                                        },
                                    ]}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Animatable.View>
            </View>
        );
    }
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#02b389',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    color_textPrivate: {
        color: 'grey',
    },
});
