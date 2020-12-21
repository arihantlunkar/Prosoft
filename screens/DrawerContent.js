import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props) {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri:
                                        'data:image/png;base64,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',
                                }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>arihant.lunkar</Title>
                                <Caption style={styles.caption}>arihant-cse15@snu.edu.in</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        {/* <DrawerItem
                            icon={({ color, size }) => <Icon name='home-outline' color={color} size={size} />}
                            label='Home'
                            onPress={() => {
                                props.navigation.navigate('Home');
                            }}
                        /> */}
                        <DrawerItem
                            icon={({ color, size }) => <Icon name='account-outline' color={color} size={size} />}
                            label='About Chemtronics'
                            onPress={() => {
                                props.navigation.navigate('AboutChemtronicsScreen');
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => <Icon name='bookmark-off-outline' color={color} size={size} />}
                            label='Clients'
                            onPress={() => {
                                props.navigation.navigate('ClientScreen');
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => <Icon name='settings-outline' color={color} size={size} />}
                            label='Contact Us'
                            onPress={() => {
                                props.navigation.navigate('ContactUsScreen');
                            }}
                        />
                    </Drawer.Section>
                    {/* <Drawer.Section title='Preferences'>
                        <TouchableRipple
                            onPress={() => {
                                props.toggleThemeCallback();
                            }}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents='none'>
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => <Icon name='exit-to-app' color={color} size={size} />}
                    label='Sign Out'
                    onPress={() => {
                        props.navigationCallback('SignIn');
                    }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
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
