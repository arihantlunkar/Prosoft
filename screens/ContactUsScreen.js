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
                                <Text style={{ fontWeight: 'bold' }}>Email :</Text>
                                {'\n'}
                                solution@chemtronicsindia.com
                                {'\n'}
                                {'\n'}
                                <Text style={{ fontWeight: 'bold' }}>Website :</Text>
                                {'\n'}
                                www.chemtronicsindia.com
                                {'\n'}
                                {'\n'}
                                <Text style={{ fontWeight: 'bold' }}>Contact No:</Text>
                                {'\n'}
                                +91-932 123 4527
                                {'\n'}
                                +91-2825 9933
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
