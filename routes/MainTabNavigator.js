import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import ProductListingScreen from '../screens/ProductListingScreen';
import ClientScreen from '../screens/ClientScreen';

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
        <HomeStack.Screen name='Client' component={ClientScreen} />
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
            name='ProductListing'
            component={ProductListingScreen}
            options={{
                title: 'All Products',
                headerLeft: () => <Icon.Button name='ios-menu' size={30} backgroundColor='#02b389' iconStyle={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />,
            }}
        />
    </ProductListingStack.Navigator>
);

const MainTabNavigator = () => (
    <Tab.Navigator initialRouteName='HomeTab' activeColor='#fff' barStyle={{ backgroundColor: '#02b389' }}>
        <Tab.Screen
            name='HomeTab'
            component={HomeStackNavigator}
            options={{
                tabBarLabel: 'Home',
                tabBarColor: '#02b389',
                tabBarIcon: ({ color }) => <Icon name='ios-home' color={color} size={26} />,
            }}
        />
        <Tab.Screen
            name='ProductListingTab'
            component={ProductListingStackNavigator}
            options={{
                tabBarLabel: 'Products',
                tabBarColor: '#02b389',
                tabBarIcon: ({ color }) => <Icon name='ios-cart' color={color} size={26} />,
            }}
        />
    </Tab.Navigator>
);

export default MainTabNavigator;
