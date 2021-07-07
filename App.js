import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, Button, TextInput, Image, Text, View, StyleSheet } from 'react-native';
import {Splash} from './screens/Splash';
import {Details} from './screens/Details';
import {HomeScreen} from './screens/Home';
import {Products} from './screens/Products';

const Stack = createStackNavigator();

const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ title: '', headerShown:false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
          title: 'Choose a product',
          headerStyle: {
            backgroundColor: '#0e4194',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null
        }}
        />
        <Stack.Screen name="Details" component={Details} options={{
          title: 'Details',
          headerStyle: {
            backgroundColor: '#0e4194',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}} />
        <Stack.Screen
          name="Products"
          component={Products}
          options={{
          title: 'Add a product',
          headerStyle: {
            backgroundColor: '#0e4194',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;