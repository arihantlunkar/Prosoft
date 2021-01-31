import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';

class SplashScreen extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigationCallback('SignInOrHome');
        }, 2000);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#02b389' barStyle='light-content' />
                <View style={styles.header}>
                    <Animatable.Image animation='bounceIn' duraton='100' source={require('../assets/logo.png')} style={styles.logo} resizeMode='stretch' />
                </View>
            </View>
        );
    }
}

export default SplashScreen;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#02b389',
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: height_logo,
        height: height_logo,
    },
});
