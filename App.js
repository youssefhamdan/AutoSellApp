import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from './components/NavBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import SuplistCar from './components/SuplistCar';
import carPage from './components/CarPage';
import SearchPage from './components/SearchPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return ( 
    <>
    
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="navBar" component={NavBar} options={{headerShown: false}}/>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name="List" component={SuplistCar} />
        <Stack.Screen name="Search" component={SearchPage} />
        <Stack.Screen name="CarPage" component={carPage} />
       
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
