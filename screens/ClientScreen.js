import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Chip } from 'react-native-paper';

class ClientScreen extends Component {
    render() {
        const { theme } = this.props;
        return (
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor='#02b389' barStyle={'light-content'} />
                <View style={styles.viewContainer}>
                    <Chip mode='flat' onPress={() => {}} style={styles.chip} selectedColor='#fff'>
                        Hotels
                    </Chip>
                    <View style={styles.imgContainer}>
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/ITC.png' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/JW Marriott.png' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Sun n Sand.jpg' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Oberoi.jpg' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Taj.png' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Intercontinental.jpg' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Rhythm-Resort.jpg' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Sayaji.jpg' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Radisson.png' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Club Mahindra.jpg' }} />
                    </View>
                </View>
                <View style={styles.viewContainer}>
                    <Chip mode='flat' onPress={() => {}} style={styles.chip} selectedColor='#fff'>
                        Developers
                    </Chip>
                    <View style={styles.imgContainer}>
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Lodha.png' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Shapoorji Pallonji.png' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Godrej.jpg' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/L&T.png' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Kanakia.jpg' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/malpani.png' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/icc.jpg' }} />
                    </View>
                </View>
                <View style={styles.viewContainer}>
                    <Chip mode='flat' onPress={() => {}} style={styles.chip} selectedColor='#fff'>
                        Manufacturing Industries
                    </Chip>
                    <View style={styles.imgContainer}>
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Cipla.jpg' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Honda.jpg' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Ssula.png' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Berger.png' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Lubrizol.png' }} />
                    </View>
                </View>
                <View style={styles.viewContainer}>
                    <Chip mode='flat' onPress={() => {}} style={styles.chip} selectedColor='#fff'>
                        HVAC
                    </Chip>
                    <View style={styles.imgContainer}>
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Bluestar.png' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Voltas.jpg' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Sterling.jpg' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/CBRE.jpg' }} />
                    </View>
                </View>
                <View style={styles.viewContainer}>
                    <Chip mode='flat' onPress={() => {}} style={styles.chip} selectedColor='#fff'>
                        Government
                    </Chip>
                    <View style={styles.imgContainer}>
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Berger.png' }} />
                    </View>
                </View>
                <View style={styles.viewContainer}>
                    <Chip mode='flat' onPress={() => {}} style={styles.chip} selectedColor='#fff'>
                        Exports
                    </Chip>
                    <View style={styles.imgContainer}>
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/LUX.jpg' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Creambell.png' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Crown.jpg' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/Indorama.png' }} />
                        <Image style={styles.imageThumbnail} resizeMode='contain' source={{ uri: 'http://chemtronicsindia.in/MobileApp/ClientLogo/has.png' }} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default function(props) {
    const theme = useTheme();
    return <ClientScreen {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    chip: {
        backgroundColor: '#02b389',
        borderRadius: 0,
    },
    imgContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
    },
    viewContainer: {
        borderColor: '#000',
        borderWidth: 0.5,
        marginBottom: 20,
    },
    imageThumbnail: {
        height: 100,
        width: 100,
        borderWidth: 0.5,
        borderColor: '#000',
        margin: 3,
    },
});
