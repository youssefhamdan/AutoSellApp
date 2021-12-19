import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from './components/NavBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InsertPage from './components/InsertPage';
import ListCar from './components/ListCar';
import carPage from './components/CarPage';
import SearchPage from './components/SearchPage';
import { supabase } from "./client"
import AuthScreen from './components/AuthScreen';
import CreateAccount from './components/CreateAccount';
import Favorite from "./components/Favorite";
import i18n from "./i18n/i18n";
import Settings from "./components/Settings";
import {useTranslation} from "react-i18next";

const Stack = createNativeStackNavigator();

export default function App() {
  const [auth, setAuth] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    setAuth(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session);
      setAuth(session)
    });
  });
  return (
    <>

      <NavigationContainer>
       <Stack.Navigator>
       {auth ?<><Stack.Screen name="navBar" component={NavBar} options={{ headerShown: false }} />
          <Stack.Screen
            name="Home"
            component={InsertPage}
            options={{ title: 'Home' }}
          />
          <Stack.Screen options={{ title: t('titrelisteannonce') }} name="List" component={ListCar} />
          <Stack.Screen name="Search" component={SearchPage} />
          <Stack.Screen options={{ title: t('annonce') }} name="CarPage" component={carPage} />
          <Stack.Screen name="Favoris" component={Favorite} />
          <Stack.Screen options={{ title: 'Settings' }} name="Settings" component={Settings} />
          </>: <>
          <Stack.Screen options={{ title: t('authentification') }} name="Authentification" component={AuthScreen} />
          <Stack.Screen options={{ title: t('titresignup') }} name="Account" component={CreateAccount} />
          </>
          }
        </Stack.Navigator>
        
      </NavigationContainer>


    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
