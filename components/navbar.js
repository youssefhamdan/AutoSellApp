import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'
import ListCar from './listCar'
import suplistCar from './suplistcar';
import AddCar from './AddCar';
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
        name="Insert a car"
        component={AddCar}
        options={{
          tabBarLabel: 'Insert',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-plus" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;