import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,Image,Dimensions, TouchableOpacity,Modal, ScrollView} from 'react-native';

import firebase from '../components/FireBase';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RkTextInput,RkText,RkButton,RkPicker} from 'react-native-ui-kitten';
import Grid from 'react-native-grid-component';
import ImageResizer from 'react-native-image-resizer';

export default class  ForgetPasswordScreen extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
          email :'',
    
        };
 
      }
    resetpassword()
    {

    
            
            firebase.auth().sendPasswordResetEmail(this.state.email).then(response => { 
                alert('Email Request Has Been Sent')
                console.log(response);
      
                
              })
              .catch((error) => {
                alert('Email not found , Please check again')
                  console.log(error);
              }); ;
        


       
    }


    render(){
        return (
        <View>
              <RkTextInput placeholder='Your Email' rkType='bordered' 
              style={{backgroundColor:'#e1e1e1',height:35}} 
              inputStyle = {{fontSize:11,marginTop:0,padding:0}} 
              onChangeText={email => this.setState({email})} 
              value={this.state.email} />
            <Button onPress={() => this.resetpassword()}>Send Email Reset Password</Button>

        </View>     
       
    )
}


}