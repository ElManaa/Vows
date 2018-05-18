import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, BackHandler,ScrollView,AsyncStorage} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default class FunctionsBoardScreen extends React.Component {
   
    state = {
        email: '',
        authenticating: false,
        UID : '',
        gender : '',
        first_name:'',
        last_name :'',
        birthday : '',
        horoscope: '',
        weight : '',
        height : '',
        tshirt_size: '',
        ring_size:'',
        shoses_size:'',
        phone:'',
      }
   
      
        getWifeMonstruation(){
          firebase.auth().onAuthStateChanged((user) => {

            fetch('http://vps477048.ovh.net/vows/webservice/wifemonstruations/'+user.uid, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
          
              }) 
              .then(response => { 
                         console.log(response);
              })
              .catch((error) => {
                  console.log(error);
              }); 
            

           })
         
        }

      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
          

         try {
           console.log('Try ' + new Date().getDate() + '-' + new Date().getMonth()  + '-' + new Date().getFullYear() );
          const value =  AsyncStorage.getItem( new Date().getDate() + '-' + new Date().getMonth()  + '-' + new Date().getFullYear()  ).then((value) =>{ 
            
            console.log(value) 
           if (value == null )
           {
            console.log('No Data Found');
            this.getWifeMonstruation();
            try {
                 AsyncStorage.setItem( new Date().getDate() + '-' + new Date().getMonth()  + '-' + new Date().getFullYear()  , 'Menstruation');
              console.log('Stored');
            } catch (error) {
            console.log('error writing data : '+error)
            }
           }else {
              console.log("datafound" + value) ;
            //  AsyncStorage.removeItem( new Date().getDate() + '-' + new Date().getMonth()  + '-' + new Date().getFullYear() );
           }
          
          } );
        
           } catch (error) {
             console.log('Err');
             
            }
    
 
      }
      
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
      
      handleBackButton() {
        return true;
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
                  navigate('Login')
                })
                .catch((error) => {
                    console.log(error);
                }); 
               
            });
        
        }
 
             render(){
       
            const { navigate } = this.props.navigation;
       
            return (
          
            <ScrollView>
                   
            <Text style={styles.bigblue}>Functions Board</Text>
                
            <Button onPress={() => navigate('CouplesProfile')}>Couple Profile</Button>
            <Button onPress={() => navigate('Profile')}>Edit Your Profile</Button>
            <Button onPress={() => navigate('Questions')}>Check New Questions</Button>
            <Button onPress={() => navigate('Tips')}>Check New Tips</Button>
            <Button onPress={() => navigate('Dyks')}>Check New Dyks</Button>
            <Button onPress={() => navigate('Notifications')}>TestNotif</Button>
            <Button onPress={() => navigate('Image')}>UploadImg</Button>
            <Button onPress={() => navigate('AddVows')}>Add Vows</Button>
            <Button onPress={() => navigate('SMS')}>SMS</Button>
            <Button onPress={() => navigate('Birthday')}>Birthday</Button>
            <Button onPress={() => navigate('Vows')}>Check Partner Vows</Button>
            <Button onPress={() => navigate('UpdateVows')}>Update Your Vows</Button>
            <Button onPress={() => navigate('Calendar')}>Calendar</Button>
            <Button onPress={() => navigate('KeyDates',{ uid : this.state.UID })}>KeyDates</Button>
            <Button onPress={() => navigate('SpecialMoment')}>SpecialMoment</Button>
            <Button onPress={() => navigate('Invitations')}>Invitations</Button>
            <Button onPress={() => navigate('NothingBox')}>NothingBox</Button>
            <Button onPress={() => navigate('Navbar')}>SimpleBottomNavigation</Button>
            <Button onPress={() => navigate('SetMenstruation')}>SetMenstruation Days</Button>
            <Button onPress={() => this.onPressLogout() }>Logout</Button>

            </ScrollView>
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
    },
    bigblue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
      alignItems:'center',
      justifyContent:'center',
    },
  });