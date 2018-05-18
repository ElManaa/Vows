import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, BackHandler,ScrollView} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import Switch from 'react-native-switch-pro';
export default class NothingBoxScreen extends React.Component {
  constructor (props) {
  
    super(props);
 
    this.state = {
      UID : '',
      value:false,
    };
    this.checknothingbox();
  }
  

  

  checknothingbox(){
    firebase.auth().onAuthStateChanged((user) => {
    fetch('http://vps477048.ovh.net/vows/webservice/checknothingbox/'+user.uid, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if (response.nothingbox  == 1 )
        {
          this.setState({
            value: true,
        })
        }else
        {
          this.setState({
            value: false,
        })
        }
          
      })
      .catch((error) => {
          console.log(error);
      }); 
  } )
}

componentWillUnmount(){
 // this.disablenothingbox();
}
  setnothingbox(){
    firebase.auth().onAuthStateChanged((user) => {
    fetch('http://vps477048.ovh.net/vows/webservice/setnothingbox/'+user.uid, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      })
      .then(response => {
        console.log(response);
        console.log(user.uid);
      })
      .catch((error) => {
          console.log(error);
      }); 
  } )
}
  disablenothingbox(){
    firebase.auth().onAuthStateChanged((user) => {
    fetch('http://vps477048.ovh.net/vows/webservice/endnothingbox/'+user.uid, {
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
    } )
  }
 
             render(){
       
            const { navigate } = this.props.navigation;
       
            return (
          
            <ScrollView>
                   
            <Text style={styles.bigblue}>Nothing Box</Text>
            <Switch 
            style={{width:600} }
              value={this.state.value}
             onAsyncPress={(callback) => {
                  if (this.state.value)
                  {
                      this.setState({ value : false} );
                      this.disablenothingbox();
                  
                  }else{
                    this.setState({ value : true} );
                    this.setnothingbox();
                  }
              }}
                   />
 

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