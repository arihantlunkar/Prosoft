import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, Card, Snackbar} from 'react-native-paper';

class SignUpScreen extends Component {
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
            confirmPassword: '',
            isPasswordMatched:false,
            confirmSecureTextEntry: true,
            isSignUpBtnClicked:false,
            invalidMsg: 'Email & password field cannot be empty.',
        };
    }

    handleEmailChange(val) {
        this.setState({ email: val });
        this.setState({ isEmailValid: this.validateEmail(val) });
        this.setState({ hasUserFinishedTypingEmail: false });
    }

    validateEmail(val) {
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexEmail.test(String(val).toLowerCase());
    }

    handleOnEndEditingEmail(val) {
        this.setState({ hasUserFinishedTypingEmail: true });

        if (this.state.isEmailValid) return;

        if (val.trim().length == 0) this.setState({ invalidEmailMsg: 'Email must not be empty.' });
        else this.setState({ invalidEmailMsg: 'Invalid email.' });
    }

    handlePasswordChange(val) {
        var isPasswordEmpty = val.trim().length <= 0;
        this.setState({ password: val });
        this.setState({ isPasswordValid: !isPasswordEmpty });
        this.setState({ hasUserStartedTypingPassword: true });
    }

    handleConfirmPasswordChange(val) {
        this.setState({ confirmPassword: val });
        this.setState({ hasUserStartedTypingPassword: true });
        var isPasswordSame = val == this.state.password
        this.setState({ isPasswordMatched: isPasswordSame });
    }

    updateSecureTextEntry() {
        this.setState({ secureTextEntry: !this.state.secureTextEntry });
    }

    updateConfirmSecureTextEntry() {
        this.setState({ confirmSecureTextEntry: !this.state.confirmSecureTextEntry });
    }

    registerHandle(email, password) {
        if (this.state.email.length == 0 || this.state.password.length == 0 || this.state.confirmPassword.length == 0) {
            this.setState({ invalidMsg: 'Email or password field cannot be empty.' });
            return;
        }

        if (!this.state.isEmailValid) {
            this.setState({ invalidMsg: 'Email entered is not valid.' });
            return;
        }

        if (!this.state.isPasswordMatched) {
            this.setState({ invalidMsg: 'Password Mismatch' });
            return;
        }

        this.setState({ showLoader: true });

        var data = {
            firstname:this.state.email.split('@')[0],
            lastname:'@'+this.state.email.split('@')[1],
            email: this.state.email,
            password: this.state.password,
            userProfile:'MobileApp',
            cc:'',
            mobile:''
        };

        fetch('https://www.chemtronicsindia.in/includes/SessionController.php?session=register', {
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
                        this.setState({ invalidMsg: text });
                    } else {
                        this.props.setUserNameCallback(this.state.email);
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
            <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
                <StatusBar backgroundColor={theme.colors.primary} barStyle='light-content' />
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Register Now!</Text>
                </View>
                <Animatable.View animation='fadeInUpBig' style={[{ backgroundColor: theme.colors.background }, styles.cardParent]}>
                    <ScrollView>
                        <Card style={styles.card}>
                            <Card.Content>
                                <View style={styles.formGroup}>
                                    <Text style={[styles.labelStyle, { color: this.props.theme.colors.text }]}>Email</Text>
                                    <TextInput 
                                        mode='outlined'
                                        value={this.state.email}
                                        label='Your Email'
                                        autoCapitalize='none'
                                        left={<TextInput.Icon name={() => <FontAwesome name='user-o' color={theme.colors.text} size={16} />} />}
                                        right={this.state.isEmailValid ? (
                                            <TextInput.Icon name={() =>
                                                <Animatable.View animation='bounceIn'>
                                                    <Feather name='check-circle' color='green' size={16} />
                                                </Animatable.View>
                                            }/>
                                        ) : null}
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
                                        right={this.state.secureTextEntry ? (
                                            <TextInput.Icon name={() =>
                                                <Feather name='eye-off' color='grey' size={16} />
                                            } onPress={() => {
                                                this.updateSecureTextEntry();
                                            }}/>
                                        ) : <TextInput.Icon name={() =>
                                                <Feather name='eye' color='grey' size={16} />
                                            } onPress={() => {
                                                this.updateSecureTextEntry();
                                            }}/>
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
                                <View style={styles.formGroup}>
                                    <Text style={[styles.labelStyle, { color: this.props.theme.colors.text }]}>Confirm Password</Text>
                                    <TextInput
                                        mode='outlined'
                                        value={this.state.confirmPassword}
                                        label='Confirm Your Password'
                                        secureTextEntry={this.state.confirmSecureTextEntry ? true : false}
                                        left={<TextInput.Icon name={() => <Feather name='lock' color={theme.colors.text} size={16} />} />}
                                        right={this.state.confirmSecureTextEntry ? (
                                            <TextInput.Icon name={() =>
                                                <Feather name='eye-off' color='grey' size={16} />
                                            } onPress={() => {
                                                this.updateConfirmSecureTextEntry();
                                            }}/>
                                        ) : <TextInput.Icon name={() =>
                                                <Feather name='eye' color='grey' size={16} />
                                            } onPress={() => {
                                                this.updateConfirmSecureTextEntry();
                                            }}/>
                                        }                
                                        autoCapitalize='none'
                                        onChangeText={(val) => this.handleConfirmPasswordChange(val)}
                                    />
                                    {this.state.hasUserStartedTypingPassword && !this.state.isPasswordMatched ? (
                                        <Animatable.View animation='fadeInLeft' duration={500}>
                                            <Text style={styles.errorMsg}>Password and Confirm Password does not match</Text>
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
                                        <ActivityIndicator size='large' color='#02b389' />
                                    </View>
                                ) : (
                                    <View style={styles.button}>
                                        <TouchableOpacity
                                            style={styles.signIn}
                                            onPress={() => {
                                                this.setState({ isSignUpBtnClicked: true });
                                                this.registerHandle(this.state.email, this.state.password);
                                            }}>
                                            <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                                                <Text style={[styles.textSign, { color: '#ffffff' }]}>Sign Up</Text>
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
                                            <Text style={[styles.textSign, { color: '#02b389' }]}>Sign In</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Card.Content>
                        </Card>                        
                    </ScrollView>
                </Animatable.View>
                <Snackbar
                    visible={this.state.isSignUpBtnClicked && (!this.state.isEmailValid || !this.state.isPasswordValid)}
                    onDismiss={() => {
                        this.setState({ isSignUpBtnClicked: false });
                    }}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            this.setState({ isSignUpBtnClicked: false });
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
    return <SignUpScreen {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    formGroup:{
        marginBottom: hp('3%'),
    },
    textHeader: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: wp('8%'),
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
