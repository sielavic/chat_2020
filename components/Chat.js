import React from 'react';
import { GiftedChat, Bubble,
  Send, Day, Time,
  
  SystemMessage } from 'react-native-gifted-chat'; // 0.3.0
import {
  StyleSheet,  Dimensions, Text,
  TextInput,  TouchableOpacity, View, ActivityIndicator, StatusBar, Date,
  Button,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import firebaseSvc from '../FirebaseSvc';
import 'dayjs/locale/fr'







  





function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#6646ee' />
        </View>
      </Send>
    );
  }








function renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#6646ee'
          },
          left: {
          backgroundColor: '#45445D'
        }


        }}
        textStyle={{
          right: {
            color: '#fff'
          },
          left: {
            color: '#fff'
          }
        }}

        timeTextStyle={{
        left: {
          color: '#000',
        },
        right: {
          color: '#000',
        },
      }}
      />
    );
  }

 function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
      </View>
    );
  }


function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }



console.disableYellowBox = true;


type Props = {
  name?: string,
  email?: string,
  avatar?: string,
  
};

class Chat extends React.Component<Props> {

  constructor(props) {
    super(props);
  }

 static navigationOptions = {
    title: "Avatar",
    
    headerTintColor: 'white'
   , 
  // headerStyle: { height: 50 },
   headerStyle: {
     height: 40,
     backgroundColor : '#6646ee'
  },
//header: null
  };

 renderDay(props) {
    return <Day {...props} textStyle={{color: 'red'}}/>
  }








  

  state = {
    messages: [],
   
  };

 get user() {
    return {
      name: this.props.navigation.state.params.name,
      email: this.props.navigation.state.params.email,
      avatar: this.props.navigation.state.params.avatar,
      id: firebaseSvc.uid,
      _id: firebaseSvc.uid, // need for gifted-chat
    };
  }



 




  render() {


  



    return (


   
    
 




      <GiftedChat
        messages={this.state.messages}
        onSend={firebaseSvc.send}
        user={this.user}
        renderSystemMessage={renderSystemMessage}
        placeholder='Type your message here...'
        alwaysShowSend
        renderBubble={renderBubble}
        renderSend={renderSend}
        scrollToBottom={true}
        scrollToBottomComponent={scrollToBottomComponent}
        renderLoading={renderLoading}
        renderDay={this.renderDay}
        
        loadEarlier={true}
        onLoadEarlier={true}
        isLoadingEarlier={true}




renderTime={(props) => (
    <View style={props.containerStyle}>
      <Text size={10} style={{marginHorizontal: 10, marginBottom: 5}} bold color={props.position === "left" ? 'gray' : 'white'}>
        {`${props.currentMessage.createdAt.toDate().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}
      </Text>
    </View>
  )}
     />

 


    );



  }

  






  componentDidMount() {
    firebaseSvc.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    firebaseSvc.refOff();
  }










}



  
  

 
    
    
   






function renderSystemMessage(props) {
  return (
    <SystemMessage
      {...props}
      wrapperStyle={styles.systemMessageWrapper}
      textStyle={styles.systemMessageText}
    />
  );
}

const styles = StyleSheet.create({
  // ... rest of the styles remain unchanged
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

});




 








export default Chat;