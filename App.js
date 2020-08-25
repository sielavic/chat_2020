
import React, {Component} from 'react';
import { Button, View, StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Chat from './components/Chat';

console.disableYellowBox = true;
// Create the navigator

const RootStack = createStackNavigator({
    Login: {
      screen: Login
    },
   Chat: {
     screen: Chat
    },
   CreateAccount: {
      screen: CreateAccount
   }
  });












export default createAppContainer(RootStack);


  



//export default App;
