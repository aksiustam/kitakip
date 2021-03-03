import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';


import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Colors from '../constants/Colors';


import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

const MainTab = createMaterialTopTabNavigator();

export default function MainTabNavigator() {

  return (
    <MainTab.Navigator
      initialRouteName="search"
      tabBarOptions={{
        activeTintColor: Colors.light.background,
        style: {

          backgroundColor: Colors.light.tint,
        },
        indicatorStyle: {
          backgroundColor: "#03dac4",
          height: 4,
        },
        labelStyle: {
          fontWeight: "bold",
        },
        showIcon: true,
      }}

    >
      <MainTab.Screen
        name="bookLibary"
        component={LibraryScreen}
        options={{
          tabBarIcon: () => <AntDesign name="book" size={24} color="white" />,
          tabBarLabel: () => null,

        }}
      />
      <MainTab.Screen
        name="search"
        component={SearchScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="search" size={24} color="white" />,
          tabBarLabel: () => null
        }}

      />
      <MainTab.Screen
        name="favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="star" size={24} color="white" />,
          tabBarLabel: () => null
        }}
      />
    </MainTab.Navigator>
  );
}
