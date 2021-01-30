import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class AboutUsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#02b389' barStyle={'light-content'} />
                <ScrollView contentContainerStyle={styles.content}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title style={{ color: '#02b389' }}>About Application</Title>
                            <Paragraph>
                                PROSOFT – Selection Guide is a Projection Software for model selection guide. This selection guide is for MEP consultants, Architects, HVAC professionals & contractors,
                                real estate developers, cold room consultants, clean room consultants & contractors.
                                {'\n'}
                                {'\n'}
                                In this application one has to entre only one data input & instantly software processes on predefined design basses & optimum model is displayed.
                                {'\n'}
                                {'\n'}
                                The software is suitable for selecting most appropriate models for Pharma, API, food & Beverage, dairy, bakery, aquaculture, hotels, resorts, hospital, health care, IT
                                office, Banks & many more.
                                {'\n'}
                                {'\n'}
                                Pl. contact us if you have any queries, we will be more than happy to assist you.
                                {'\n'}
                                {'\n'}
                                Write to : solution@chemtronicsindia.com
                                {'\n'}
                                Call us : +91-932 123 4527
                            </Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title style={{ color: '#02b389' }}>"Chemtronics" – Company Profile</Title>
                            <Paragraph>
                                Chemtronics is an international solution providing company in the field of air, water & wastewater, established in 2004 in Mumbai, India. Our vision is to be a top
                                preferred global innovative solution providing company for the benefit of the environment & mankind.
                                {'\n'}
                                {'\n'}
                                We are a team of engineers, philosophers, professionals, designers & developers over 30 years of field experience in solving, designing, developing & executing
                                solutions for our clients & their customers limitations, stagnation & saturation. Our core competency is to understand root cause & then offer most appropriate, optimum
                                and time tested solutions. For this if required we design & develop innovative sustainable solutions, which we subsequently standardise.
                                {'\n'}
                                {'\n'}
                                We focus on solution & technology selection & mix which can offer high return on investment, enhance quality or production or process and can reduce time, energy, cost,
                                spoilage, rejection & recall.
                                {'\n'}
                                {'\n'}
                                We implement our solutions partnering with experienced business associates, by training human resources to implement these solutions for betterment of their client’s
                                customer.
                                {'\n'}
                                {'\n'}
                                Chemtronics covers a wide spectrum of manufacturing industries & segments to name some of them are Pharma & API, food & beverage, dairy, bakery, aquaculture, hotels &
                                hospitality, hospitals & healthcare. We also cater to a wide range of applications like, IAQ, exhaust pollutant & odour control, clean room, fumigation, disinfection &
                                sterilisation, purified water system, water & wastewater treatment, recycle & reuse.
                                {'\n'}
                                {'\n'}
                                Recently we have developed “ECOBOI” technology for treatment of air, which is a registered trade mark under Chemtronics and is under patenting & CE certification. This
                                is a game changer with multiple benefits & advantages in manufacturing, commercial & institutional applications.
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
