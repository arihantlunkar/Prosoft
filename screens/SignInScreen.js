import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, Card, Snackbar } from 'react-native-paper';

const LOGIN_URL = 'https://www.chemtronicsindia.in/includes/SessionController.php?session=login';

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
            isSignInBtnClicked: false,
            invalidMsg: 'Email & password field cannot be empty.',
            isServerPasswordValid: true,
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
            this.setState({ invalidMsg: 'Email or password field cannot be empty.' });
            return;
        }

        if (!this.state.isEmailValid) {
            this.setState({ invalidMsg: 'Email entered is not valid.' });
            return;
        }

        this.setState({ showLoader: true });

        var data = {
            username: this.state.email,
            password: this.state.password,
        };

        fetch(LOGIN_URL, {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((response) => {
            return response.text().then((text) => {
                this.setState({ showLoader: false });
                if (text.trim().length != 0) {
                    this.setState({ isServerPasswordValid: false });
                    this.setState({ invalidMsg: text });
                } else {
                    this.props.setUserNameCallback(this.state.email);
                    this.props.navigationCallback('Home');
                }
            });
        });
    }

    render() {
        const { theme } = this.props;
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
                <StatusBar backgroundColor={theme.colors.primary} barStyle='light-content' />
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Welcome To Prosoft !</Text>
                </View>
                <Animatable.View animation='fadeInUpBig' style={[{ backgroundColor: theme.colors.background }, styles.cardParent]}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={styles.formGroup}>
                                <Text style={[styles.labelStyle, { color: this.props.theme.colors.text }]}>Email</Text>
                                <TextInput
                                    mode='outlined'
                                    value={this.state.email}
                                    label='Your Email'
                                    left={<TextInput.Icon name={() => <FontAwesome name='user-o' color={theme.colors.text} size={16} />} />}
                                    right={
                                        this.state.isEmailValid ? (
                                            <TextInput.Icon
                                                name={() => (
                                                    <Animatable.View animation='bounceIn'>
                                                        <Feather name='check-circle' color='green' size={16} />
                                                    </Animatable.View>
                                                )}
                                            />
                                        ) : null
                                    }
                                    onChangeText={(val) => this.handleEmailChange(val)}
                                    onEndEditing={(e) => this.handleOnEndEditingEmail(e.nativeEvent.text)}
                                />
                                {this.state.hasUserFinishedTypingEmail && !this.state.isEmailValid ? (
                                    <Animatable.View animation='fadeInLeft' duration={500}>
                                        <Text style={styles.errorMsg}>{this.state.invalidEmailMsg}</Text>
                                    </Animatable.View>
                                ) : null}
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={[styles.labelStyle, { color: this.props.theme.colors.text }]}>Password</Text>
                                <TextInput
                                    mode='outlined'
                                    value={this.state.password}
                                    label='Your Password'
                                    secureTextEntry={this.state.secureTextEntry ? true : false}
                                    left={<TextInput.Icon name={() => <Feather name='lock' color={theme.colors.text} size={16} />} />}
                                    right={
                                        this.state.secureTextEntry ? (
                                            <TextInput.Icon
                                                name={() => <Feather name='eye-off' color='grey' size={16} />}
                                                onPress={() => {
                                                    this.updateSecureTextEntry();
                                                }}
                                            />
                                        ) : (
                                            <TextInput.Icon
                                                name={() => <Feather name='eye' color='grey' size={16} />}
                                                onPress={() => {
                                                    this.updateSecureTextEntry();
                                                }}
                                            />
                                        )
                                    }
                                    autoCapitalize='none'
                                    onChangeText={(val) => this.handlePasswordChange(val)}
                                />
                                {this.state.hasUserStartedTypingPassword && !this.state.isPasswordValid ? (
                                    <Animatable.View animation='fadeInLeft' duration={500}>
                                        <Text style={styles.errorMsg}>Password must not be empty.</Text>
                                    </Animatable.View>
                                ) : null}
                            </View>
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
                                    <ActivityIndicator size='large' color={theme.colors.primary} />
                                </View>
                            ) : (
                                <View style={styles.button}>
                                    <TouchableOpacity
                                        style={styles.signIn}
                                        onPress={() => {
                                            this.setState({ isServerPasswordValid: true });
                                            this.setState({ isSignInBtnClicked: true });
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
                                                borderColor: theme.colors.primary,
                                                borderWidth: 1,
                                                marginTop: 15,
                                            },
                                        ]}>
                                        <Text style={[styles.textSign, { color: theme.colors.primary }]}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Card.Content>
                    </Card>
                </Animatable.View>
                <Snackbar
                    visible={this.state.isSignInBtnClicked && (!this.state.isEmailValid || !this.state.isPasswordValid || !this.state.isServerPasswordValid)}
                    onDismiss={() => {
                        this.setState({ isSignInBtnClicked: false });
                    }}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            this.setState({ isSignInBtnClicked: false });
                        },
                    }}>
                    {this.state.invalidMsg}
                </Snackbar>
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
    },
    cardParent: {
        flex: 3,
        borderTopLeftRadius: hp('5%'),
        borderTopRightRadius: hp('5%'),
        paddingHorizontal: wp('3%'),
        paddingVertical: 30,
        backgroundColor: '#fff',
    },
    card: {
        elevation: 0,
        borderRadius: 0,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: hp('3%'),
        paddingBottom: hp('5%'),
    },
    formGroup: {
        marginBottom: hp('3%'),
    },
    textHeader: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: wp('7%'),
    },
    labelStyle: {
        fontSize: wp('3.5%'),
        fontWeight: '700',
        marginBottom: hp('0.1%'),
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
    },
    signIn: {
        width: '100%',
        height: hp('7%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    textSign: {
        fontSize: 18,
    },
});
