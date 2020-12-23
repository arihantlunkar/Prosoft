import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button, Card, Title } from 'react-native-paper';

import { rexnordData } from '../model/data';

class ProductListingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
        };
        rexnordData.forEach((item, index) => {
            if (1 == index) {
                this.state.items = item.subcategory;
            }
        });
    }
    renderCardContent(characteristics, position) {
        const length = characteristics.length;
        return characteristics.map((item, index) => {
            if ((position == 'left' && index <= length / 2 && index != 0) || (position == 'right' && index > length / 2 && index != 0)) {
                return (
                    <Text key={item.key} style={{ color: this.props.theme.colors.text }}>
                        {item.key} : {item.value}
                    </Text>
                );
            }
        });
    }
    renderCard(item) {
        return (
            <Card style={styles.card} key={item.characteristics[0].value}>
                <Card.Cover
                    source={{
                        uri: item.url,
                    }}
                />
                <Card.Content>
                    <Title>
                        {item.characteristics[0].key}: {item.characteristics[0].value}
                    </Title>
                    <View style={styles.cardContentStyle}>
                        <View>{this.renderCardContent(item.characteristics, 'left')}</View>
                        <View style={styles.cardContentSecondViewStyle}>{this.renderCardContent(item.characteristics, 'right')}</View>
                    </View>
                    <Button
                        mode='contained'
                        style={styles.marginBtn}
                        onPress={(item) => {
                            console.log(item);
                        }}>
                        Request Quotation
                    </Button>
                </Card.Content>
            </Card>
        );
    }
    renderCards() {
        return this.state.items.map((i) => {
            return this.renderCard(i);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#02b389' barStyle={'light-content'} />
                <ScrollView contentContainerStyle={styles.content}>{this.renderCards()}</ScrollView>
            </View>
        );
    }
}

export default function(props) {
    const theme = useTheme();
    return <ProductListingScreen {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    cardContentStyle: {
        flex: 2,
        flexDirection: 'row',
    },
    marginBtn: {
        marginTop: 10,
        backgroundColor: '#02b389',
    },
    cardContentSecondViewStyle: {
        marginLeft: 20,
    },
    containerText: {
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});
