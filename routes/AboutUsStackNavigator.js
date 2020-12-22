import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import AboutUsScreen from '../screens/AboutUsScreen';

const AboutUsStack = createStackNavigator();

const AboutUsStackNavigator = ({ navigation }) => (
    <AboutUsStack.Navigator
        initialRouteName='AboutUs'
        screenOptions={{
            headerStyle: {
                backgroundColor: '#02b389',
            },
            headerTintColor: '#fff',
        }}>
        <AboutUsStack.Screen
            name='AboutUsScreen'
            component={AboutUsScreen}
            options={{
                title: 'About Us',
                headerLeft: () => <Icon.Button name='ios-menu' size={30} backgroundColor='#02b389' iconStyle={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />,
            }}
        />
    </AboutUsStack.Navigator>
);

export default AboutUsStackNavigator;
