import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, BackHandler,ScrollView} from 'react-native';
import { Input } from '../components/Input';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import { Button } from '../components/Button';
import firebase from '../components/FireBase';
import SendSMS from 'react-native-sms'
export default class WaitingScreen extends React.Component {

    state = {
            checking : true,
            notconfirmed : false,
    };

    componentDidMount() 
    {
        const { navigate } = this.props.navigation;

        if (this.checkrelation())
        {
            navigate('Home');
         
        }
        else
        {
            this.setState({
                checking : false,
                notconfirmed : true,
            })

            this.renderCurrentSituation();
        }
    }

     checkrelation ()
    {
        const { navigate } = this.props.navigation;
        this.setState({checking:true});
        this.renderCurrentSituation();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
        const { navigate } = this.props.navigation;
        fetch('http://vps477048.ovh.net/vows/webservice/checkrelationconfirmed/', {
          method: 'POST',
          headers: {
               Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UID : user.uid ,
           }),
          })
          .then(response => response.json())
          .then(response => { 
         console.log(response);
         if  (response) 
         {
             navigate('Home');
         }

          })
          .catch((error) => {
              console.log(error);
          });
        }
    })
       
    }
 

    renderCurrentSituation()
    {
        if (this.state.checking)
        {
            return (
                <View  style={styles.form}>
                <ActivityIndicator size='large' />
                </View>
            )
        }
        if (this.state.notconfirmed)
        {
            return(
               <View>
                <Text>Your Partner haven't joined VOWS yet</Text>
          
                </View>
             )

        }

    }

    render(){

    const { navigate } = this.props.navigation;
      return (
     <View>
         {this.renderCurrentSituation()}
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