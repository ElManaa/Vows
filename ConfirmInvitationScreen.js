import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, FlatList,ScrollView} from 'react-native';
import { Input } from '../components/Input';
import DatePicker from 'react-native-datepicker'
import { Button } from '../components/Button';
import firebase from '../components/FireBase'; 
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

export default class ConfirmInvitationScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        uid:'',
        description : '' ,
        event : '' ,
        date : new Date() ,
        dates : ''
    };
 
  }
  componentDidMount(){
  
    }
 
  
    acceptInvitation ()
    {
        const { navigate } = this.props.navigation;
        fetch('http://vps477048.ovh.net/vows/webservice/confirmactivity/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                confirmed : 1,
                activity_id : this.props.navigation.state.params.activity.item.id_activity,
            }),
       
            })
         
            .then(response => response.json())
            .then(response => { 
                      console.log(response);
                      navigate('Invitations');
                    
            })
            .catch((error) => {
                console.log(error);
            });
    }
  
    denyInvitation ()
    {
        const { navigate } = this.props.navigation;
        fetch('http://vps477048.ovh.net/vows/webservice/confirmactivity/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                confirmed : -1,
                activity_id : this.props.navigation.state.params.activity.item.id_activity,
            }),
       
            })
         
            .then(response => response.json())
            .then(response => { 
                      console.log(response);
                      navigate('Invitations');
                    
            })
            .catch((error) => {
                console.log(error);
            });
    }
  
    render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.form}>
 
      <Text>Confirm this invitation </Text>
        <Button  > Date : {this.props.navigation.state.params.activity.item.date.split("T",1)} / Event : {this.props.navigation.state.params.activity.item.title} / Event : {this.props.navigation.state.params.activity.item.time} </Button>
        <Button onPress={() => this.acceptInvitation()}>Confirm</Button>
        <Button onPress={() => this.denyInvitation()}>Not Now</Button>
 
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