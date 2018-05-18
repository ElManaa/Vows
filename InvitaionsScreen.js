import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, FlatList,ScrollView,Picker} from 'react-native';
import { Input } from '../components/Input'; 
import { Button } from '../components/Button';
import firebase from '../components/FireBase'; 
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

export default class  InvitationsScreen extends React.Component {


  constructor (props) {
    super(props);
    this.state = {
        uid:'',
        time : '' ,
        title : '' ,
        date : new Date() ,
        activities : ''
    };
 
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => { this.setState({ uid : user.uid}) })
    this.getinvitaitons();
    }
    
    getinvitaitons(){
    this.authSubscription =  firebase.auth().onAuthStateChanged((user) => {
        fetch('http://vps477048.ovh.net/vows/webservice/getinvitation/'+user.uid, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
       
            })
           
            .then(response => response.json())
            .then(response => { 
                    console.log(response);
                    if (response.length > 0 )
                    {
                        this.setState({ 
                            activities:response ,
                                       })
                     
                        
                    } 
                    
            })
            .catch((error) => {
                console.log(error);
            });
        })
   }

    render() {
  
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.form}>
        <Text>Invitation </Text>


        <FlatList
            data= {this.state.activities}
                renderItem={({item}) =>
                    <View> 
                        <Button onPress={() => navigate('ConfirmInvitations',{ activity : {item}  })}> Date : {item.date.split("T",1)} / Time : {item.time} / Activity : {item.title} </Button>
                    </View>
                }
            keyExtractor={(item, index) => index}
        />
     

 
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