import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import ProductListingScreen from '../screens/ProductListingScreen';

const HomeStack = createStackNavigator();
const ProductListingStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

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
    </HomeStack.Navigator>
);

const ProductListingStackNavigator = ({ navigation }) => (
    <ProductListingStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#02b389',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {},
        }}>
        <ProductListingStack.Screen
            name='All Products'
            component={ProductListingScreen}
            options={{
                headerLeft: () => <Icon.Button name='ios-menu' size={30} backgroundColor='#02b389' iconStyle={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />,
            }}
        />
    </ProductListingStack.Navigator>
);

const MainTabNavigator = () => (
    <Tab.Navigator initialRouteName='Home' activeColor='#fff' barStyle={{ backgroundColor: '#02b389' }}>
        <Tab.Screen
            name='Home'
            component={HomeStackNavigator}
            options={{
                tabBarLabel: 'Home',
                tabBarColor: '#02b389',
                tabBarIcon: ({ color }) => <Icon name='ios-home' color={color} size={26} />,
            }}
        />
        <Tab.Screen
            name='ProductListing'
            component={ProductListingStackNavigator}
            options={{
                tabBarLabel: 'Products',
                tabBarColor: '#02b389',
                tabBarIcon: ({ color }) => <Icon name='ios-git-compare' color={color} size={26} />,
            }}
        />
    </Tab.Navigator>
);

export default MainTabNavigator;
