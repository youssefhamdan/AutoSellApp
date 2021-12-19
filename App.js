import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from './components/NavBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import SuplistCar from './components/SuplistCar';
import carPage from './components/CarPage';
import SearchPage from './components/SearchPage';
import { supabase } from "./client"
import AuthScreen from './components/AuthScreen';
import CreateAccount from './components/CreateAccount';
import Favorite from "./components/Favorite";
import i18n from "./i18n/i18n";

const Stack = createNativeStackNavigator();

export default function App() {
  const [auth, setAuth] = useState(false);

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
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen options={{ title: 'Liste d\'annonces' }} name="List" component={SuplistCar} />
          <Stack.Screen name="Search" component={SearchPage} />
          <Stack.Screen options={{ title: 'Annonce' }} name="CarPage" component={carPage} />
          <Stack.Screen name="Favoris" component={Favorite} />
          </>: <>
          <Stack.Screen options={{ title: 'Authentification' }} name="Authentification" component={AuthScreen} />
          <Stack.Screen options={{ title: 'Créer un compte' }} name="Account" component={CreateAccount} />
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
