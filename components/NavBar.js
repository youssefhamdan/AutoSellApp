import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'
import ListCar from './ListCar'
import SuplistCar from './SuplistCar';
import AddCar from './AddCar';
import carPage from './CarPage'
import SearchPage from './SearchPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export default function NavBar() {
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
        name="Insert a car"
        component={AddCar}
        options={{
          tabBarLabel: 'Insert',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-plus" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-plus" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

