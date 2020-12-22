import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import ProductListingScreen from './ProductListingScreen';

const HomeStack = createStackNavigator();
const ProductListingStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator initialRouteName='Home' activeColor='#fff' barStyle={{ backgroundColor: '#02b389' }}>
        <Tab.Screen
            name='Home'
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarColor: '#02b389',
                tabBarIcon: ({ color }) => <Icon name='ios-home' color={color} size={26} />,
            }}
        />
        <Tab.Screen
            name='ProductListing'
            component={ProductListingStackScreen}
            options={{
                tabBarLabel: 'Products',
                tabBarColor: '#02b389',
                tabBarIcon: ({ color }) => <Icon name='ios-git-compare' color={color} size={26} />,
            }}
        />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
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

const ProductListingStackScreen = ({ navigation }) => (
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
