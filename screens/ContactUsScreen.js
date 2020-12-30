import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class ContactUsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#02b389' barStyle={'light-content'} />
                <ScrollView contentContainerStyle={styles.content}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title style={{ color: '#02b389' }}>Contact</Title>
                            <Paragraph>
                                Mail : solution@chemtronicsindia.com
                                {'\n'}
                                Sales Dept.: +91-22-2825 9933
                                {'\n'}
                                Mr. Sunil Shah : +91-93212 34527
                            </Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title style={{ color: '#02b389' }}>Head Office – Mumbai, India</Title>
                            <Paragraph>
                                <Text style={{ color: '#02b389' }}>Corporate Office:</Text>
                                {'\n'}
                                Station Road, Santacruz (West).
                                {'\n'}
                                Mumbai 400 054. Maharashtra INDIA
                                {'\n'}
                                {'\n'}
                                <Text style={{ color: '#02b389', fontWeight: 'bold' }}>Manufacturing / Warehouse:</Text>
                                {'\n'}# 02, Thakur Complex, Valiv, Vasai (East),
                                {'\n'}
                                Near Chamundeshwari Industrial Estate, Thane.
                                {'\n'}
                                Maharashtra INDIA {'\n'}
                                {'\n'}
                                <Text style={{ color: '#02b389', fontWeight: 'bold' }}>Projects & Sales Office:</Text>
                                {'\n'}28, Satyam Industrial Estate, Subhash Road,
                                {'\n'}
                                Jogeshwari (East), Mumbai - 400 060.
                                {'\n'}
                                Maharashtra INDIA
                            </Paragraph>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </View>
        );
    }
}

export default ContactUsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    content: {
        padding: 4,
    },
    card: {
        elevation: 1,
        borderRadius: 10,
        margin: wp('1%'),
    },
});
