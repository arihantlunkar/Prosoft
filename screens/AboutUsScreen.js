import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

class AboutUsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#02b389' barStyle={'light-content'} />
                <ScrollView contentContainerStyle={styles.content}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title style={{ color: '#02b389', fontWeight: 'bold' }}>Vision</Title>
                            <Paragraph>
                                To apply ozone technology globally with industry experienced business associates. And to train human resources for successful implementation of environment friendly
                                ozone technology for benefit of mankind.
                            </Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title style={{ color: '#02b389', fontWeight: 'bold' }}>Mission</Title>
                            <Paragraph>
                                {'\u2022' + ' '}To provide comprehensive plug & play integrated ozone system.
                                {'\n'}
                                {'\u2022' + ' '}Quick return on investment.
                                {'\n'}
                                {'\u2022' + ' '}Enhance Process, Product, and Production.
                                {'\n'}
                                {'\u2022' + ' '}Reduce rejection & spoilage.
                                {'\n'}
                                {'\u2022' + ' '}Energy efficient & environment friendly.
                                {'\n'}
                            </Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title style={{ color: '#02b389', fontWeight: 'bold' }}>Offerings</Title>
                            <Paragraph>
                                1. 100,000 man-hours experience in air, water & waste water treatment.
                                {'\n'}
                                {'\n'}
                                2. Optimum Sizing, Creative Designing & System integration with peripheral Equipment for New Projects & Retrofitting in existing projects
                                {'\n'}
                                {'\n'}
                                3. In house manufacturing of IV-Generation integrated ozone system in compliance to ISO Standards.
                                {'\n'}
                                {'\n'}
                                4. Engineering System implementation.
                                {'\n'}
                                {'\n'}
                                5. Efficient & effective after sales service.
                                {'\n'}
                                {'\n'}
                            </Paragraph>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </View>
        );
    }
}

export default AboutUsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 4,
    },
    card: {
        margin: 4,
    },
});
