import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyTabs from './components/navbar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import suplistCar from './components/suplistcar';
import carPage from './components/carPage';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

const Stack = createNativeStackNavigator();

export default function App() {
  return ( 
    <>
    
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="navBar" component={MyTabs} options={{headerShown: false}}/>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name="List" component={suplistCar} />
        <Stack.Screen name="CarPage" component={carPage} />
       
      </Stack.Navigator>
    </NavigationContainer> 

    
    </>
  );
}
defineCustomElements(window);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
