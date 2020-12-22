import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import ClientScreen from '../screens/ClientScreen';

const ClientStack = createStackNavigator();

const ClientStackNavigator = ({ navigation }) => (
    <ClientStack.Navigator
        initialRouteName='Client'
        screenOptions={{
            headerStyle: {
                backgroundColor: '#02b389',
            },
            headerTintColor: '#fff',
        }}>
        <ClientStack.Screen
            name='ClientScreen'
            component={ClientScreen}
            options={{
                title: 'Clients',
                headerLeft: () => <Icon.Button name='ios-menu' size={30} backgroundColor='#02b389' iconStyle={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />,
            }}
        />
    </ClientStack.Navigator>
);

export default ClientStackNavigator;
