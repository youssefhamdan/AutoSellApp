import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'
import ListCar from './listCar'
import suplistCar from './suplistcar';
import carPage from './carPage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="3 Résultats de la recherche "
        component={suplistCar}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="apps" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={carPage}
        options={{
          headerShown: false,
          tabBarLabel: 'About',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="copyright" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;