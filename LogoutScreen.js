import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View, AsyncStorage} from 'react-native';

import firebase from '../components/FireBase';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
 




export default class LogoutScreen extends React.Component {
   
    state = {
        email: '',
        password: '',
        authenticating: false, 
      }
        
      
  componentDidMount() {

  }

  onPressLogout() 
  {
     const { navigate } = this.props.navigation;
     FCM.getFCMToken().then(token => {
       fetch('http://vps477048.ovh.net/vows/webservice/deletetoken/'+token, {
         method: 'POST',
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
         },
         })
         .then(response => { 
           firebase.auth().signOut(); 
           AsyncStorage.removeItem('@logged');
           AsyncStorage.removeItem('partnerFound');
           AsyncStorage.removeItem('first_name');
           AsyncStorage.removeItem('partner_name');
           AsyncStorage.removeItem('pbordercolor');
           AsyncStorage.removeItem('partnerbirthdate');
           AsyncStorage.removeItem('miragedate');
           AsyncStorage.removeItem('usertooktest');
           AsyncStorage.removeItem('frunlovemaps');
           AsyncStorage.removeItem('usermood');
           navigate('Login')
         })
         .catch((error) => {
             console.log(error);
         }); 
        
     });
 
 }
 
  
      

          renderCurrentState(){
            const { navigate } = this.props.navigation;
            if (this.state.authenticating){
        
              return(
                <View  style={styles.form}>
                  <ActivityIndicator size='large' />
                </View>
        
              )
        
            }
            return (
                <View style={styles.form}>
                    <Button onPress={() => this.onPressLogout()}>Logout</Button>
                     <Button onPress={() => navigate('ForgetPassword')}>ForgetPassword Test</Button> 
                 </View>
              )
        }
 

    render(){
        const { navigate } = this.props.navigation;
       
        return (
          
            <View style={styles.container}>
         
               {this.renderCurrentState()}
            </View>
        );
    }

}
 
 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems : 'center',
      justifyContent: 'center',
      flexDirection:'row',
    },
    form :{
      flex: 1 ,
    }
  });