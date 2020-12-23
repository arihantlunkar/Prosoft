import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

class HomeScreen extends Component {
    render() {
        const { theme } = this.props;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#02b389' barStyle={'light-content'} />
                <Animatable.View animation='fadeInUpBig' style={{ backgroundColor: theme.colors.background }}>
                    <Text style={{ color: theme.colors.text }}>Home Screen</Text>
                </Animatable.View>
            </View>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
});
