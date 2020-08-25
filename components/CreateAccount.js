import React from 'react';
import * as firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as ImageManipulator from 'expo-image-manipulator';


import { Title, IconButton } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import {
  StyleSheet,
  TextInput, View,
  Button, Dimensions, Image, StatusBar
} from 'react-native';
import firebaseSvc from '../FirebaseSvc';




class CreateAccount extends React.Component {
 static navigationOptions = {
   
    title: 'хуй',
header: null
  };

  state = {
    name: "",
    email: "",
   password: "",
   avatar: "",
  };

  onPressCreate = async () => {
    console.log('Аккаунт успешно создан:' );
    try {
      var user = {
        name: this.state.name,
       email: this.state.email, 
        password: this.state.password,
        avatar: this.state.avatar
      };
      await firebaseSvc.createAccount(user);
    } catch ({ message }) {
      console.log('Регистрация провалена:' + message);
    }
  };

  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });
  onChangeTextName = name => this.setState({ name });
   //updateAvatar = avatar => this.setState({avatar});
   
  


  
 onImageUpload = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    try {
      // only if user allows permission to camera roll
      if (cameraRollPerm === 'granted') {
        console.log('choosing image granted...');


        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });


        console.log(
          'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
        );
        


        //console.log("scale image to x:" + wantedwidth + " y:" + wantedheight);
 
  let exampleImageUri = await  
  ImageManipulator.manipulateAsync(
              pickerResult.uri,
                [{ resize: 
                { width: 150, height: 192 } }],
                [{
                crop:
            {
              originX: 0,
               originY: 0,
               width: 128,
               height: 117
                }}],
               
                { compress: 0, format: "PNG",  base64: false },
        // "jpeg",
     );
    

      var resizedUri = Image.resolveAssetSource(exampleImageUri).uri



//ОБНОВЛЕНИЕ АВАТАРА

 
var updateAvatar = async (url) => {
    //await this.setState({ avatar: url });
    var user = firebase.auth().currentUser;
    if (user != null) {
      user.updateProfile({ 
        photoURL: url})
      .then(function() {
        console.log("Обновление аватара успешно из базы "   );
        alert("Аватарка сохранена.");
      }, function(error) {
        console.warn("Error update avatar.");
        alert("Error update avatar. Error:" + error.message);
      });
    } else {
      console.log("can't update avatar, user is not login.");
      alert("Unable to update avatar. You must login first.");
    }
  }








//СОЗДАНИЕ АВАТАРА
       
      var uploadUrl = await firebaseSvc.uploadImage(resizedUri);
        //let uploadUrl = await firebaseSvc.uploadImageAsync(resizedUri);
        await this.setState({avatar: uploadUrl });
        console.log(" - Из криет части :"   );
        console.log(" - СТАТА АВАТАРА this.state.avatar:"  );       //this.setState({avatar});
       await updateAvatar(uploadUrl); //might failed
      }
    } catch (err) {
      console.log('onImageUpload error:' + err.message);
      alert('Upload image error:' + err.message);
    }
  };


  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor='#6646ee' barStyle="light-content" />

      <Title style={styles.titleText}>Register to chat</Title>

        
        <FormInput
        labelName='Email'
          //style={styles.nameInput}
          autoCapitalize='none'
          //placeHolder="test3@gmail.com"
          onChangeText={this.onChangeTextEmail}
          value={this.state.email}
        />

       
        <FormInput
          labelName='Password'
          secureTextEntry={true}
          //style={styles.nameInput}
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
        />
        
        <FormButton
          title="Sign up"
          modeValue='contained'
          labelStyle={styles.loginButtonLabel}
         // style={styles.buttonText}
          onPress={this.onPressCreate }
        />
        <IconButton
        icon='keyboard-backspace'
        size={30}
        style={styles.navButton}
        color='#6646ee'
        onPress={() => this.props.navigation.navigate('Login')}
      /> 
      </View>
      //  <Button
      //   title="Загрузить аваторку"
      //   style={styles.buttonText}
         // this.onImageUpload
     //  />

       
     //   <Button
     //     title="Логин"
      //    style={styles.buttonText}
      //    onPress={() => this.props.navigation.navigate("Login")
    //      }
       // />
      
    );
  }
}


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
  loginButtonLabel: {
    fontSize: 22
  },
  
  navButton: {
    marginTop: 10
  }
});

export default CreateAccount;