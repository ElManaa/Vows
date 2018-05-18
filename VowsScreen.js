import React from 'react';
import { ActivityIndicator,
 Platform,
 StyleSheet,
 Text,
 View , 
 DatePickerAndroid,
 Image,
 KeyboardAvoidingView,
 Dimensions,
 Modal} from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {RkTextInput,RkText} from 'react-native-ui-kitten';
import SendSMS from 'react-native-sms'

export default class VowsScreen extends React.Component {



  static navigationOptions = {
    headerStyle : {display:"none"}
    }


    
    state = {
      checking : true,
      thevows : '',
    };

    componentDidMount (){
      this.getVows();
    }

    getVows ()
    {
      const { navigate } = this.props.navigation;
      this.setState({
        checking : false,})
        this.renderCurrentState();
      firebase.auth().onAuthStateChanged((user) => {
        if (user) { 
          fetch('http://vps477048.ovh.net/vows/webservice/gettheirvows/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id : user.uid ,       
             }),

            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                 if (response.length >0) {
                  this.setState({
                    checking : false,
                    thevows : response[0].vow,
                  })
                 }
                 else 
                 {
                    this.setState({
                      checking : false,
                      thevows : 'there is No Vows Found'
                    })
                 }
                 this.renderCurrentState();
                 
            })
            .catch((error) => {
                console.log(error);
            }); 

        } 
      })
    }
 
    renderCurrentState(){

        const { navigate } = this.props.navigation;

        if (this.state.checking){
    
          return(
            <View  style={styles.form}>
              <ActivityIndicator size='large' />
            </View>
    
          )
    
        } else{

          return (
            <View >
            <View style={{justifyContent:'center',alignContent:'center'}}>
            <Image source={require('../Assets/CoupleBackground.png')}  style={{width:Dimensions.get('window').width,height:300,}}/>
           
             </View>
        
            <KeyboardAvoidingView style={{backgroundColor:'#fff',marginLeft:30,marginRight:30,borderRadius:20,height:320,marginBottom:100,marginTop:25}}  behavior='padding'>
            
            <KeyboardAvoidingView style={{marginRight:0,marginLeft:0,marginTop:20,marginBottom:0}}>
            <Text style={{fontSize:20,color:'#735d78',textAlign:'center',fontFamily:'Roboto-Bold'}}>Your partner’s vows to you</Text>
            
               
            </KeyboardAvoidingView>
            
              <View style={{marginRight:44,marginLeft:80,marginTop:39}}>
            <Text style={{fontSize:15,color:'#735d78',textAlign:'right',marginBottom:28,color:'#656d75'}}>
                       {this.state.thevows}
                      
                      </Text>
            </View>
          
    
            <Text style={{position:'absolute',right:33,bottom:28, fontSize:14,color:'#6b3064',fontFamily:'Roboto-Bold'}} onPress={() => navigate('AddVowsPartner')}>Write Your Vows</Text>
             
          </KeyboardAvoidingView>
      
           
            </View>
         
          );
        }
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
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor : '#6b3064' ,
  },
    form :{
      flex: 1 ,
    }
  });