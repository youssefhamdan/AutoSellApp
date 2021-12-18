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
          <Stack.Screen name="List" component={SuplistCar} />
          <Stack.Screen name="Search" component={SearchPage} />
          <Stack.Screen name="CarPage" component={carPage} />
          <Stack.Screen name="Favoris" component={Favorite} />
          </>: <>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
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
