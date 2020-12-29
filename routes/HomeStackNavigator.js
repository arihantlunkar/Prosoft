import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import ResultScreen from '../screens/ResultScreen';

const HomeStack = createStackNavigator();

const HomeStackNavigator = ({ navigation }) => (
    <HomeStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#02b389',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {},
        }}>
        <HomeStack.Screen
            name='Home'
            component={HomeScreen}
            options={{
                title: 'Home',
                headerLeft: () => <Icon.Button name='ios-menu' size={30} backgroundColor='#02b389' iconStyle={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />,
            }}
        />
        <HomeStack.Screen
            name='Result'
            component={ResultScreen}
            options={{
                title: '',
            }}
        />
    </HomeStack.Navigator>
);

export default HomeStackNavigator;
