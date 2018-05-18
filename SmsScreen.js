import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, BackHandler,ScrollView} from 'react-native';
import { Input } from '../components/Input';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import { Button } from '../components/Button';
import firebase from '../components/FireBase';
import SendSMS from 'react-native-sms'
export default class SmsScreen extends React.Component {

    state = {
            checking : false,
            pinCode : '',
            truecode: false,
    };

     sendSMS ()
    {
        SendSMS.send({
            body: 'The default body of the SMS! https://github.com/tkporter/react-native-sms',
            recipients: ['50090388'],
            successTypes: ['sent', 'queued']
        }, (completed, cancelled, error) => {
    
            console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
    
        });
       
    }
 

    render(){

    const { navigate } = this.props.navigation;
      return (
     <View>
     <Button onPress={() => this.sendSMS()}>Send SMS</Button>
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