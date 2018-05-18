import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, BackHandler} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default class CoupleProfileScreen extends React.Component {
   
    state = {

        email: '',
        authenticating: false,
        UID : '', 
        couplesScore:'',
        female_fn:'' ,
        male_fn : '',
        mirg_date : '',
        daystogether : '',
    }

      componentDidMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
            this.getCoupleData();
      }
      
      componentWillUnmount() {
     
      }
 
       getCoupleData() 
        {
            
            const { navigate } = this.props.navigation;
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
              fetch('http://vps477048.ovh.net/vows/webservice/getcouple/'+user.uid, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                })
                .then(response => response.json())
                .then(response => { 
                    let oneDay = 24*60*60*1000;
                    let today = firstDate = new Date();
                    let miraage = new Date(response.marriage_date);
                        console.log(response);
                        this.setState({
                            couplesScore:response.score ,
                            male_fn : response.male.first_name ,
                            male_ln : response.male.last_name ,
                            female_fn : response.female.first_name ,
                            female_ln : response.female.last_name ,
                            mirg_date : response.marriage_date,
                            daystogether :  Math.round(Math.abs((today.getTime() - miraage.getTime())/(oneDay)))
                        })

                })
                .catch((error) => {
                    console.log(error);
                }); 
            }});
        }
      
 countdaystogether () 
 {
 
    
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
 }
    
             render(){
       
                const { navigate } = this.props.navigation;
                 console.log(this.state.couple)
                return (
           
                   <View>
                    <Text style={styles.bigblue}>Couple Profile</Text>
                    <Text style={styles.bigblack}>Male : {this.state.male_fn} {this.state.male_ln}</Text>
                    <Text style={styles.bigblack}>Female : {this.state.female_fn} {this.state.female_ln} </Text>
                    <Text style={styles.bigblack}>Couples Score : {this.state.couplesScore}</Text>
                    <Text style={styles.bigblack}>marriage date : {this.state.mirg_date.split('T',1)}</Text>
                    <Text style={styles.bigblack}>Days Together : {this.state.daystogether}</Text>
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
    },
    bigblue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
      alignItems:'center',
      justifyContent:'center',
    },
    bigblack: {
        color: 'black',
        fontSize: 30,
        alignItems:'center',
        justifyContent:'center',
      },
  });