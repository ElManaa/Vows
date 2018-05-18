import React from 'react';
import { ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage} from 'react-native';

import firebase from '../components/FireBase';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
 
import {RkTextInput,RkText} from 'react-native-ui-kitten';



export default class LoginScreen extends React.Component {

  static navigationOptions = {
    headerStyle : {display:"none"}
}
   
constructor(props) {
  super(props);
  this.state = {
    email :'',
    password : ''
  };
  this.onDayPress = this.onDayPress.bind(this);
}
        
onDayPress(day) {
  this.setState({
    selected: day.dateString
  });
}
      
  componentDidMount() {
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
 
     
       if(notif.opened_from_tray){
         const { navigate } = this.props.navigation;
           navigate(notif.screen);
       }
     });
    const { navigate } = this.props.navigation;
    this.authSubscription =  firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));
        FCM.getFCMToken().then(token => {


          fetch('http://vps477048.ovh.net/vows/webservice/settoken/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id : user.uid ,
                token : token,
            }),
            })
            .then(response => response.json())
            .then(response => { 
                    console.log(response);
                 
            })
            .catch((error) => {
                console.log(error);
            });  
         });
            // navigate('Home');
      }
  

      
  })
  }

  componentWillUnmount() 
  {
    const { navigate } = this.props.navigation;
    this.authSubscription();
    navigate('Register');
  }
  
          onPressSignIn(){
           
            if (this.state.email == '')
            {
              alert ('Please enter your Email');
              return false ;
            }
            if (this.state.password == '')
            {
              alert ('Please enter your Password');
              return false ;
            }

              this.setState({authenticating:true})
            const { navigate } = this.props.navigation;
            const{email,password} = this.state;
            firebase.auth().signInWithEmailAndPassword(email,password)
            .then( () => {
              navigate('Home');
              try {
                AsyncStorage.setItem('@logged','BYEL'); 
                 } catch (error) {
                console.log('error writing data : '+error)
                  }
            })
            .catch( () => {   
              this.setState({authenticating:false});
                alert('Error Login', 'Error Login');
            }) 
        
        
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


              <View >
               <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row',marginBottom:80 }}>
                   <Image source={require('../Assets/VowsLogo.png')}  style={{width:186,height:68,marginTop:'10%',marginBottom:30 }}/>
               </View>
                <Text style={{fontSize:20,marginTop:42,marginBottom:20,color:'white',fontWeight:'300',marginLeft:45,fontFamily:'Roboto-Regular'}}>Login</Text>
             
             
              <View style={{backgroundColor:'#fff',marginLeft:30,marginRight:30,height:223,borderRadius:20}}>
               

              <KeyboardAvoidingView style={{margin:35,marginBottom:0,marginTop:0}}>
              <Text style={{fontSize:11,color:'#735d78',marginTop:32 ,fontFamily:'Roboto-Regular'}}>Email</Text>
              <RkTextInput placeholder='Your Name' rkType='bordered' 
              style={{backgroundColor:'#e1e1e1',height:35}} 
              inputStyle = {{fontSize:11,marginTop:0,padding:0}} 
              onChangeText={email => this.setState({email})} 
              value={this.state.email} />
              </KeyboardAvoidingView>

              <KeyboardAvoidingView style={{marginRight:35,marginLeft:35,marginBottom:0}}>
                <Text style={{fontSize:11,color:'#735d78',fontFamily:'Roboto-Regular'}}>Password</Text>
               <RkTextInput placeholder='Your Password' rkType='bordered'
                style={{backgroundColor:'#e1e1e1',height:35}}  
                onChangeText={password => this.setState({password})}
                inputStyle = {{fontSize:11,marginTop:0,padding:0}} 
                 value={this.state.password} secureTextEntry={true} />
                </KeyboardAvoidingView>
              
               
              <Text style={{position:'absolute',right:0,bottom:0,marginBottom:'4%',marginRight:25,fontSize:14,color:'#6b3064' ,fontFamily:'Roboto-Regular',fontWeight:'500'}} onPress={() => this.onPressSignIn()}>LOGIN</Text>
             
             </View>
                 
                  <View style={{flexDirection:'row',marginTop:20,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{color:'#ffffff',fontFamily:'Roboto-Regular',fontSize:12}}>Don't Have An Account ? </Text>
                      <TouchableOpacity onPress={() => this.componentWillUnmount() } >
                      <Text style={{color:'#ffffff',marginLeft:20,fontFamily:'Roboto-Regular',fontSize:12}}> Register</Text>
                      </TouchableOpacity>
                 
                  </View>

              </View>
             
              )
        }
 

    render()
    {
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
    backgroundColor : '#6b3064' ,
  },
  form :{
    flex: 1 ,
    flexDirection : 'column',
    justifyContent : 'center'
  },
  img :{
      flex: 1 ,
    }
  });