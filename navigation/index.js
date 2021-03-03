import { MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';
import { Provider } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native'

import MainTabNavigator from './MainTabNavigator';

import BookDetailsScreen from '../screens/BookDetailsScreen'
import NavFilter from '../components/NavFilter';
import LibraryDetailsScreen from '../screens/LibraryDetailsScreen';
import DotMenu from '../components/DotMenu';


export default function Navigation() {

    return (
        <Provider>
            <NavigationContainer>
                <ModalNavigator />
            </NavigationContainer>
        </Provider>
    );
}

const Stack = createStackNavigator();
const modalStack = createStackNavigator();

function ModalNavigator() {
    return (
        <modalStack.Navigator
            mode="modal"
            initialRouteName="Root"
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
                cardStyleInterpolator: ({ current: { progress } }) => ({
                    cardStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 0.5, 0.9, 1],
                            outputRange: [0, 0.25, 0.7, 1],
                        }),
                    },
                    overlayStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.5],
                            extrapolate: 'clamp',
                        }),
                    },
                }),
            }}
        >
            <modalStack.Screen name="MyModal" component={ModalScreen} />
            <modalStack.Screen name="Root" component={RootNavigator} />
        </modalStack.Navigator>
    );
}
function RootNavigator() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.light.tint,
                    shadowOpacity: 0,
                    elevation: 0,
                },
                headerTintColor: Colors.light.background,
                headerTitleAlign: "left",
                headerTitleStyle: {
                    fontWeight: "500",
                }
            }}
        >
            <Stack.Screen
                name="Root"
                component={MainTabNavigator}
                options={{
                    title: 'KiTakip',
                    headerRight: () => {
                        const navigation = useNavigation();
                        const onClick = () => { navigation.navigate('MyModal') }
                        return (
                            <SafeAreaView style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginRight: 10,
                            }}>
                                <Ionicons name="search-outline" size={34} color="white" />
                                <TouchableOpacity onPress={onClick}>
                                    <AntDesign name="filter" size={34} color="white" />
                                </TouchableOpacity>
                                <MaterialCommunityIcons name="dots-vertical" size={34} color={"white"} />
                            </SafeAreaView>
                        )
                    },
                }}
            />
            <Stack.Screen
                name="BookDetails"
                component={BookDetailsScreen}
                options={({ route }) => ({
                    title: route.params.name,
                    headerRight: () => (
                        <View style={{
                            flexDirection: "row",
                            width: 100,
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginRight: 10,
                        }}>
                            <MaterialCommunityIcons name="dots-vertical" size={24} color={"white"} />
                        </View>
                    )
                })}
            />
            <Stack.Screen
                name="LibaryDetails"
                component={LibraryDetailsScreen}
                options={({ route }) => ({
                    title: route.params.book.name,
                    headerRight: () => (<DotMenu id={route.params.book.id} name={route.params.book.name} />)
                })}
            />
        </Stack.Navigator>
    );
}
function ModalScreen() {
    return (
        <NavFilter />
    );
}
