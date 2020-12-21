import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, StatusBar, Alert, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';

class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            secureTextEntry: true,
            isEmailValid: false,
            hasUserFinishedTypingEmail: false,
            invalidEmailMsg: '',
            isPasswordValid: false,
            hasUserStartedTypingPassword: false,
            showLoader: false,
        };
    }

    handlePasswordChange(val) {
        var isPasswordEmpty = val.trim().length <= 0;
        this.setState({ password: val });
        this.setState({ isPasswordValid: !isPasswordEmpty });
        this.setState({ hasUserStartedTypingPassword: true });
    }

    updateSecureTextEntry() {
        this.setState({ secureTextEntry: !this.state.secureTextEntry });
    }

    validateEmail(val) {
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexEmail.test(String(val).toLowerCase());
    }

    handleEmailChange(val) {
        this.setState({ email: val });
        this.setState({ isEmailValid: this.validateEmail(val) });
        this.setState({ hasUserFinishedTypingEmail: false });
    }

    handleOnEndEditingEmail(val) {
        this.setState({ hasUserFinishedTypingEmail: true });

        if (this.state.isEmailValid) return;

        if (val.trim().length == 0) this.setState({ invalidEmailMsg: 'Email must not be empty.' });
        else this.setState({ invalidEmailMsg: 'Invalid email.' });
    }

    loginHandle(email, password) {
        if (this.state.email.length == 0 || this.state.password.length == 0) {
            Alert.alert('Wrong Input!', 'Email or password field cannot be empty.', [{ text: 'Okay' }]);
            return;
        }

        if (!this.state.isEmailValid) {
            Alert.alert('Wrong Input!', 'Email entered is not valid.', [{ text: 'Okay' }]);
            return;
        }

        this.setState({ showLoader: true });

        var data = {
            username: this.state.email,
            password: this.state.password,
        };

        fetch('https://www.chemtronicsindia.in/includes/SessionController.php?session=login', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((response) => {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    return response.json().then((data) => {
                        // process your JSON data further
                    });
                } else {
                    return response.text().then((text) => {
                        this.setState({ showLoader: false });
                        if (text.trim().length != 0) {
                            Alert.alert('Wrong Input!', text, [{ text: 'Okay' }]);
                        } else {
                            this.props.navigationCallback('Home');
                        }
                    });
                }
            })
            .then((responseJson) => {})
            .catch((error) => {});
    }

    render() {
        const { theme } = this.props;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#02b389' barStyle='light-content' />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Welcome!</Text>
                </View>
                <Animatable.View animation='fadeInUpBig' style={[styles.footer, { backgroundColor: theme.colors.background }]}>
                    <Text style={[styles.text_footer, { color: theme.colors.text }]}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome name='user-o' color={theme.colors.text} size={20} />
                        <TextInput
                            value={this.state.email}
                            placeholder='Your Email'
                            placeholderTextColor='#666666'
                            style={[styles.textInput, { color: theme.colors.text }]}
                            autoCapitalize='none'
                            onChangeText={(val) => this.handleEmailChange(val)}
                            onEndEditing={(e) => this.handleOnEndEditingEmail(e.nativeEvent.text)}
                        />
                        {this.state.isEmailValid ? (
                            <Animatable.View animation='bounceIn'>
                                <Feather name='check-circle' color='green' size={20} />
                            </Animatable.View>
                        ) : null}
                    </View>
                    {this.state.hasUserFinishedTypingEmail && !this.state.isEmailValid ? (
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>{this.state.invalidEmailMsg}</Text>
                        </Animatable.View>
                    ) : null}

                    <Text style={[styles.text_footer, { color: theme.colors.text, marginTop: 35 }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather name='lock' color={theme.colors.text} size={20} />
                        <TextInput
                            value={this.state.password}
                            placeholder='Your Password'
                            placeholderTextColor='#666666'
                            secureTextEntry={this.state.secureTextEntry ? true : false}
                            style={[styles.textInput, { color: theme.colors.text }]}
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
                    {this.state.hasUserStartedTypingPassword && !this.state.isPasswordValid ? (
                        <Animatable.View animation='fadeInLeft' duration={500}>
                            <Text style={styles.errorMsg}>Password must not be empty.</Text>
                        </Animatable.View>
                    ) : null}

                    <TouchableOpacity>
                        <Text style={{ color: '#02b389', marginTop: 15 }}>Forgot password?</Text>
                    </TouchableOpacity>
                    {this.state.showLoader ? (
                        <View
                            style={{
                                container: {
                                    flex: 1,
                                    justifyContent: 'center',
                                },
                                horizontal: {
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    padding: 10,
                                },
                            }}>
                            <ActivityIndicator size='large' color='#02b389' />
                        </View>
                    ) : (
                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={() => {
                                    this.loginHandle(this.state.email, this.state.password);
                                }}>
                                <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                                    <Text style={[styles.textSign, { color: '#ffffff' }]}>Sign In</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.props.navigationCallback('SignUp')}
                                style={[
                                    styles.signIn,
                                    {
                                        borderColor: '#02b389',
                                        borderWidth: 1,
                                        marginTop: 15,
                                    },
                                ]}>
                                <Text style={[styles.textSign, { color: '#02b389' }]}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Animatable.View>
            </View>
        );
    }
}

export default function(props) {
    const theme = useTheme();
    return <SignInScreen {...props} theme={theme} />;
}

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
        flex: 3,
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
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
});
