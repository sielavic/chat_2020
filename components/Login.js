

import React from 'react';
import { Title } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';


import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {
  StyleSheet,  Dimensions, 
  TextInput,  TouchableOpacity, View, StatusBar,
  Button,
} from 'react-native';

import firebaseSvc from '../FirebaseSvc';
import * as firebase from 'firebase';
//import "firebase/auth";
//import "firebase/firestore";
//import * as firebase from "firebase/app";
import { auth, initializeApp, storage } from 'firebase';
import { v4 as uuid } from 'uuid';
//import uuid from 'uuid';
import * as ImageManipulator from 'expo-image-manipulator';
//import ImagePicker from 'react-native-image-picker';






class Login extends React.Component {
 static navigationOptions = {
    title: 'хуй',
    
header: null
  };
  





  state = {
    name: '',
    email: "",
    password: "",
    avatar: 'https://firebasestorage.googleapis.com/v0/b/rn-todo-app-bbbed.appspot.com/o/user.png?alt=media&token=ce79ec12-5c10-4a28-b165-ecc80834c7a3',
 };


  // using Fire.js
  onPressLogin = async () => {
    console.log('pressing login... email:' );
    var user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      avatar: this.state.avatar
    };

  

 console.log(" - Из ЛОГИНА this.state.avatar:"  );

    var response = firebaseSvc.login(
      user,
      this.loginSuccess,
      this.loginFailed

    );
  };



  loginSuccess = () => {
    console.log('login successful, navigate to chat.');
    this.props.navigation.navigate('Chat', {
     name: this.state.name,
      email: this.state.email,
      avatar: this.state.avatar
    });
  };
  loginFailed = () => {
    console.log('login failed ***');
    alert('Login failure. Please tried again.');
  };



  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });

 

  render() {
    return (

      <View style={styles.container}>
      
       <StatusBar backgroundColor='#6646ee' barStyle="light-content" />



      <Title style={styles.titleText}>Welcome to Avatar app</Title>
        
        <FormInput
          style={styles.nameInput}
           labelName='Email'
           autoCapitalize='none'
          onChangeText={this.onChangeTextEmail}
          value={this.state.email}
        />
        
        <FormInput
        labelName='Password'
        secureTextEntry={true}
          style={styles.nameInput}
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
        />
        <FormButton
          modeValue='contained'
          title="Login"
          style={styles.loginButtonLabel}
          onPress={this.onPressLogin}
        />

        <FormButton
          title="New user? Join here"
          uppercase={false}
          style={styles.navButtonText}
          onPress={() => this.props.navigation.navigate("CreateAccount")}
        />
      </View>
    );
  }
}
const { width, height } = Dimensions.get('screen');
//const offset = 16;
const styles = StyleSheet.create({

container: {
   
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
    color: '#6646ee'
  },



  
  nameInput: {
   marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15
  },
  loginButtonLabel: {
    fontSize: 22,
  },
navButtonText:{
fontSize: 16
}


});

export default Login;

