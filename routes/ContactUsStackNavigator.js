import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import ContactUsScreen from '../screens/ContactUsScreen';

const ContactUsStack = createStackNavigator();

const ContactUsStackNavigator = ({ navigation }) => (
    <ContactUsStack.Navigator
        initialRouteName='ContactUs'
        screenOptions={{
            headerStyle: {
                backgroundColor: '#02b389',
            },
            headerTintColor: '#fff',
        }}>
        <ContactUsStack.Screen
            name='ContactUsScreen'
            component={ContactUsScreen}
            options={{
                title: 'Contact Us',
                headerLeft: () => <Icon.Button name='ios-menu' size={30} backgroundColor='#02b389' iconStyle={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />,
            }}
        />
    </ContactUsStack.Navigator>
);

export default ContactUsStackNavigator;
