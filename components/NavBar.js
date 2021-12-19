import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'
import SearchPage from './SearchPage';
import Favorite from './Favorite';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { supabase } from "../client";
import Settings from './Settings';
import { View, Button, StyleSheet, ScrollView, Text } from 'react-native';
import SuplistCar from "./SuplistCar";
import {useTranslation} from "react-i18next";
import { Icon } from 'react-native-elements'
const Tab = createBottomTabNavigator();

export default function NavBar() {
  const {t} = useTranslation();
  return (

    <Tab.Navigator>
      <Tab.Screen
        name={t('titrerecherche')}
        component={SearchPage}
        options={{
          tabBarLabel: t('navrecherche'),
          tabBarIcon: ({ color, size }) => (
              <Icon type='antdesign' name="search1" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={t('titreinserer')}
        component={HomeScreen}
        options={{
          tabBarLabel: t('navinserer'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-plus" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={t('titrefavoris')}
        component={Favorite}
        options={{
          tabBarLabel: t('titrefavoris'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={t('parametres')}
        component={Settings}
        options={{
          tabBarLabel: t('parametres'),
          tabBarIcon: ({ color, size }) => (
            <Icon type='antdesign' name="setting" color={color} size={size} />
          ),
        }}
      />


    </Tab.Navigator>
  );
}

