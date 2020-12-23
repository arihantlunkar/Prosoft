import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FlatListSlider } from 'react-native-flatlist-slider';
import { Card, Title, Paragraph } from 'react-native-paper';

class ClientScreen extends Component {
    render() {
        const { theme } = this.props;
        const images = [
            {
                image: 'https://www.chemtronicsindia.com/images/client-logo1.jpg',
                desc: 'Air India',
            },
            {
                image: 'https://www.chemtronicsindia.com/images/client-logo2.jpg',
                desc: 'Avanti Feeds Limited',
            },
            {
                image: 'https://www.chemtronicsindia.com/images/client-logo3.jpg',
                desc: 'Cipla',
            },
            {
                image: 'https://www.chemtronicsindia.com/images/client-logo4.jpg',
                desc: 'Club Mahindra',
            },
            {
                image: 'https://www.chemtronicsindia.com/images/client-logo5.jpg',
                desc: 'Essar Projects',
            },
            {
                image: 'https://www.chemtronicsindia.com/images/client-logo6.jpg',
                desc: 'Gail (India) Limited',
            },
            {
                image: 'https://www.chemtronicsindia.com/images/client-logo7.jpg',
                desc: 'Hyatt - Hotels & Resorts',
            },
            {
                image: 'https://www.chemtronicsindia.com/images/client-logo8.jpg',
                desc: 'JW Marriott - Hotels & Resorts',
            },
            {
                image: 'https://www.chemtronicsindia.com/images/client-logo9.jpg',
                desc: 'Iskon',
            },
            {
                image: 'https://www.chemtronicsindia.com/images/client-logo10.jpg',
                desc: 'ITC Limited',
            },
            {
                image: 'https://www.chemtronicsindia.com/images/client-logo11.jpg',
                desc: 'Taj - Hotels Resorts & Palaces',
            },
            {
                image: 'https://www.chemtronicsindia.com/images/client-logo12.jpg',
                desc: 'LUX - Island Resorts',
            },
        ];
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#02b389' barStyle={'light-content'} />
                <ScrollView contentContainerStyle={styles.content}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title style={{ color: '#02b389' }}>Our Clients</Title>
                            <Text />
                            <FlatListSlider
                                data={images}
                                width={97}
                                height={80}
                                timer={5000}
                                separatorWidth={20}
                                onPress={(item) => {
                                    console.log(item);
                                }}
                            />
                        </Card.Content>
                    </Card>
                </ScrollView>
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
    },
    content: {
        padding: 4,
    },
    card: {
        margin: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
