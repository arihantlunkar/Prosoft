import React from 'react';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import DrawerContent from './screens/DrawerContent';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import AboutUsStackNavigator from './routes/AboutUsStackNavigator';
import ContactUsStackNavigator from './routes/ContactUsStackNavigator';
import ClientStackNavigator from './routes/ClientStackNavigator';
import HomeStackNavigator from './routes/HomeStackNavigator';

class App extends React.Component {
    customDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: '#ffffff',
            text: '#333333',
            primary: '#02b389',
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
            primary: '#02b389',
        },
    };
    constructor(props) {
        super(props);
        this.navigationCallback = this.navigationCallback.bind(this);
        this.toggleThemeCallback = this.toggleThemeCallback.bind(this);
        this.setUserNameCallback = this.setUserNameCallback.bind(this);

        this.state = {
            goToScreen: 'Splash',
            isDarkTheme: false,
            username: null,
        };
    }
    async navigationCallback(val) {
        if (val === 'SignInOrHome') {
            this.setState({ username: await AsyncStorage.getItem('username') });
            this.setState({ isDarkTheme: (await AsyncStorage.getItem('storedTheme')) === 'Dark' ? true : false });
            this.state.username !== null ? this.setState({ goToScreen: 'Home' }) : this.setState({ goToScreen: 'SignIn' });
        } else if (val === 'Home' && null !== this.state.username) {
            await AsyncStorage.setItem('username', this.state.username);
            this.setState({ goToScreen: val });
        } else if (val === 'SignIn' || null === this.state.username) {
            await AsyncStorage.removeItem('username');
            this.setState({ username: null });
            this.setState({ goToScreen: val });
        } else this.setState({ goToScreen: val });
    }
    async toggleThemeCallback() {
        await AsyncStorage.setItem('storedTheme', !this.state.isDarkTheme ? 'Dark' : 'Default');
        this.setState({ isDarkTheme: !this.state.isDarkTheme });
    }
    setUserNameCallback(val) {
        this.setState({ username: val });
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
                    ) : this.state.goToScreen === 'Home' && null !== this.state.username ? (
                        <Drawer.Navigator
                            drawerContent={(props) => (
                                <DrawerContent {...props} navigationCallback={this.navigationCallback} toggleThemeCallback={this.toggleThemeCallback} username={this.state.username} />
                            )}>
                            <Drawer.Screen name='Home' component={HomeStackNavigator} />
                            <Drawer.Screen name='AboutUs' component={AboutUsStackNavigator} />
                            <Drawer.Screen name='ContactUs' component={ContactUsStackNavigator} />
                            <Drawer.Screen name='Client' component={ClientStackNavigator} />
                        </Drawer.Navigator>
                    ) : (
                                    <SignInScreen navigationCallback={this.navigationCallback} setUserNameCallback={this.setUserNameCallback} />
                                )}
                </NavigationContainer>
            </PaperProvider>
        );
    }
}

export default App;
