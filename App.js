import React from 'react';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerContent } from './screens/DrawerContent';
import AboutChemtronicsScreen from './screens/AboutChemtronicsScreen';
import ClientScreen from './screens/ClientScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import MainTabScreen from './screens/MainTabScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';

class App extends React.Component {
    customDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: '#ffffff',
            text: '#333333',
        },
    };

    customDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            background: '#333333',
            text: '#ffffff',
        },
    };
    constructor(props) {
        super(props);
        this.navigationCallback = this.navigationCallback.bind(this);
        this.toggleThemeCallback = this.toggleThemeCallback.bind(this);
        this.setUserDataCallback = this.setUserDataCallback.bind(this);

        this.state = {
            goToScreen: 'Splash',
            isDarkTheme: false,
            userData: null,
        };
    }
    async navigationCallback(val) {
        if (val === 'SignInOrHome') {
            var isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            isLoggedIn === 'true' ? this.setState({ goToScreen: 'Home' }) : this.setState({ goToScreen: 'SignIn' });
        } else if (val === 'Home') {
            await AsyncStorage.setItem('isLoggedIn', 'true');
            this.setState({ goToScreen: val });
        } else if (val === 'SignIn') {
            await AsyncStorage.removeItem('isLoggedIn');
            this.setState({ goToScreen: val });
        } else this.setState({ goToScreen: val });
    }
    toggleThemeCallback() {
        this.setState({ isDarkTheme: !this.state.isDarkTheme });
    }
    setUserDataCallback(data) {
        this.setState({ userData: data });
    }
    render() {
        const Drawer = createDrawerNavigator();
        return (
            <PaperProvider theme={this.state.isDarkTheme ? this.customDarkTheme : this.customDefaultTheme}>
                <NavigationContainer theme={this.state.isDarkTheme ? this.customDarkTheme : this.customDefaultTheme}>
                    {this.state.goToScreen === 'Splash' ? (
                        <SplashScreen navigationCallback={this.navigationCallback} />
                    ) : this.state.goToScreen === 'SignUp' ? (
                        <SignUpScreen navigationCallback={this.navigationCallback} />
                    ) : this.state.goToScreen === 'Home' && null !== this.state.userData ? (
                        <Drawer.Navigator
                            drawerContent={(props) => (
                                <DrawerContent {...props} navigationCallback={this.navigationCallback} toggleThemeCallback={this.toggleThemeCallback} userData={this.state.userData} />
                            )}>
                            <Drawer.Screen name='HomeDrawer' component={MainTabScreen} />
                            <Drawer.Screen name='AboutChemtronicsScreen' component={AboutChemtronicsScreen} />
                            <Drawer.Screen name='ContactUsScreen' component={ContactUsScreen} />
                            <Drawer.Screen name='ClientScreen' component={ClientScreen} />
                        </Drawer.Navigator>
                    ) : (
                        <SignInScreen navigationCallback={this.navigationCallback} setUserDataCallback={this.setUserDataCallback} />
                    )}
                </NavigationContainer>
            </PaperProvider>
        );
    }
}

export default App;
