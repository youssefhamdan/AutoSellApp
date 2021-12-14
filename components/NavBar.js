import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'
import ListCar from './ListCar'
import SuplistCar from './SuplistCar';
import AddCar from './AddCar';
import carPage from './CarPage'
import SearchPage from './SearchPage';
import Favorite from './Favorite';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (

    <Tab.Navigator>
      <Tab.Screen
        name="Recherche"
        component={SearchPage}
        options={{
          tabBarLabel: 'Recherche',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Insérer une voiture"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Insertion',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-plus" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Espace favoris"
        component={Favorite}
        options={{
          tabBarLabel: 'Mes Favoris',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

