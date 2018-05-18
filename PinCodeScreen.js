import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, BackHandler,ScrollView} from 'react-native';
import { Input } from '../components/Input';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import { Button } from '../components/Button';
import firebase from '../components/FireBase';
export default class PinCodeScreen extends React.Component {

    state = {
            checking : false,
            pinCode : '',
            truecode: false,
    };

    checkcode ()
    {
      const { navigate } = this.props.navigation;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) { 
          fetch('http://vps477048.ovh.net/vows/webservice/checkpin/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id : user.uid ,
              security_code : this.state.pinCode,         
             }),

            })
            .then(response => response.json())
            .then(response => {
          console.log(response);
                 if (response)
                 {
                    navigate('Home');
                 } else{
                   alert('Wrong PIN Code');
                 }
                 
            })
            .catch((error) => {
                console.log(error);
            }); 

        }
      })
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

    renderCurrentState(){

        const { navigate } = this.props.navigation;

        if (this.state.checking){
    
          return(
            <View  style={styles.form}>
              <ActivityIndicator size='large' />
            </View>
    
          )
    
        }else if (this.state.truecode){  

            return (
                navigate('Home')
            )
        } else{
          return (
            
              <View>
                     
              <Text style={styles.bigblue}>Please Enter Your Pin Code</Text>
  
             <Input
                 placeholder='Enter Your Security Code'
                 label = 'Security Code To Access'
                 secureTextEntry
                 onChangeText={pinCode => this.setState({pinCode})}
                 value={this.state.pinCode}
             />
 
             <Button onPress={() => this.checkcode()}>Validate Code</Button>
             <Button onPress={() => this.onPressLogout()}>Logout</Button>
              </View>
          );
        }
    }



    render(){
        
             const { navigate } = this.props.navigation;
             return (
       this.renderCurrentState()
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