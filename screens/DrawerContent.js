import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Drawer, TouchableRipple, useTheme, Text, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

class DrawerContent extends React.Component {
    render() {
        const { theme } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Avatar.Image
                                    source={{
                                        uri: 'https://www.chemtronicsindia.in/assets/img/img_avatar.png',
                                    }}
                                    size={50}
                                />
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>{this.props.username.split('@')[0]}</Title>
                                    <Caption style={styles.caption}>@{this.props.username.split('@')[1]}</Caption>
                                </View>
                            </View>
                        </View>

                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                icon={({ color, size }) => <Icon name='home' color={color} size={size} style={{ width: 30, height: 25 }} />}
                                label='Home'
                                onPress={() => {
                                    this.props.navigation.navigate('Home');
                                }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => <Icon name='user' color={color} size={size} style={{ width: 30, height: 25 }} />}
                                label='About Us'
                                onPress={() => {
                                    this.props.navigation.navigate('AboutUs');
                                }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => <Icon name='handshake-o' color={color} size={size} style={{ width: 30, height: 25 }} />}
                                label='Clients'
                                onPress={() => {
                                    this.props.navigation.navigate('Client');
                                }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => <Icon name='phone' color={color} size={size} style={{ width: 30, height: 25 }} />}
                                label='Contact Us'
                                onPress={() => {
                                    this.props.navigation.navigate('ContactUs');
                                }}
                            />
                        </Drawer.Section>
                        {/* <Drawer.Section title='Preferences'>
                            <TouchableRipple
                                onPress={() => {
                                    this.props.toggleThemeCallback();
                                }}>
                                <View style={styles.preference}>
                                    <Text>Dark Theme</Text>
                                    <View pointerEvents='none'>
                                        <Switch value={theme.dark} />
                                    </View>
                                </View>
                            </TouchableRipple>
                        </Drawer.Section> */}
                    </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => <Icon name='sign-out' color={color} size={size} />}
                        label='Sign Out'
                        onPress={() => {
                            this.props.navigation.closeDrawer();
                            this.props.navigationCallback('SignIn');
                        }}
                    />
                </Drawer.Section>
            </View>
        );
    }
}
export default function(props) {
    const theme = useTheme();
    return <DrawerContent {...props} theme={theme} />;
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
