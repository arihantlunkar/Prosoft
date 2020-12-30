import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

class ClientScreen extends Component {
    render() {
        const { theme } = this.props;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#02b389' barStyle={'light-content'} />
                <Image style={styles.imageThumbnail} source={{ uri: 'https://www.chemtronicsindia.com/images/client-logo1.jpg' }} />
                <Image style={styles.imageThumbnail} source={{ uri: 'https://www.chemtronicsindia.com/images/client-logo2.jpg' }} />
                <Image style={styles.imageThumbnail} source={{ uri: 'https://www.chemtronicsindia.com/images/client-logo3.jpg' }} />
                <Image style={styles.imageThumbnail} source={{ uri: 'https://www.chemtronicsindia.com/images/client-logo4.jpg' }} />
                <Image style={styles.imageThumbnail} source={{ uri: 'https://www.chemtronicsindia.com/images/client-logo5.jpg' }} />
                <Image style={styles.imageThumbnail} source={{ uri: 'https://www.chemtronicsindia.com/images/client-logo6.jpg' }} />
                <Image style={styles.imageThumbnail} source={{ uri: 'https://www.chemtronicsindia.com/images/client-logo7.jpg' }} />
                <Image style={styles.imageThumbnail} source={{ uri: 'https://www.chemtronicsindia.com/images/client-logo8.jpg' }} />
                <Image style={styles.imageThumbnail} source={{ uri: 'https://www.chemtronicsindia.com/images/client-logo9.jpg' }} />
                <Image style={styles.imageThumbnail} source={{ uri: 'https://www.chemtronicsindia.com/images/client-logo10.jpg' }} />
                <Image style={styles.imageThumbnail} source={{ uri: 'https://www.chemtronicsindia.com/images/client-logo11.jpg' }} />
                <Image style={styles.imageThumbnail} source={{ uri: 'https://www.chemtronicsindia.com/images/client-logo12.jpg' }} />
            </View>
        );
    }
}

export default function(props) {
    const theme = useTheme();
    return <ClientScreen {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 15,
        backgroundColor: '#f4f4f4',
    },
    imageThumbnail: {
        height: 80,
        width: 97,
        borderWidth: 0.5,
        borderColor: '#000',
        margin: 5,
    },
});
