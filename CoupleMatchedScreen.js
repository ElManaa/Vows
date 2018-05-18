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
import SendSMS from 'react-native-sms';

export default class CoupleMatchedScreen extends React.Component {
   
   
  static navigationOptions = {
    headerStyle : {display:"none"}
  }


  constructor(props) {
    super(props);
    this.state = {
    malephoto : '',
    malename : '',
    femalephoto : '',
    femalename : '',
  
    };
  }

  getCouplesinfo ()
  {
    
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
              this.setState({
                  malename: response.male.first_name,
                  femalename: response.female.first_name,
                  malephoto: response.male.image,
                  femalephoto: response.female.image,

              })
          })

          .catch((error) => {
              console.log(error);
          }); 

      }
    })
  }
      componentWillMount() 
      {
        this.getCouplesinfo()
      }
         render(){
       
                const { navigate } = this.props.navigation;
       
            return (
          
        
              <View style={styles.container} >
                <View style={{justifyContent:'center',alignContent:'center'}}>
                <Image source={require('../Assets/CoupleBackground.png')}  style={{width:Dimensions.get('window').width,height:300,}}/>
               
                 </View>
            
                <View style={{backgroundColor:'#fff',marginLeft:30,marginRight:30,borderRadius:20,height:322,width:321,marginBottom:100,marginTop:25}}  behavior='padding'>
                
                <View style={{marginRight:35,marginLeft:35,marginTop:20,marginBottom:0}}>
                <Text style={{fontSize:17,color:'#735d78',textAlign:'center',fontWeight:'bold'}}>Welcome to the first day {"\n"}
                    of your new life</Text>
                <View style={{flexDirection:'row',marginTop:39,justifyContent:'center'}}>

                  <View  style={{flexDirection:'column'}}>
                    <Image
                    style={{width: 102, height: 102 , borderRadius:90, marginBottom:5}}
                    source={{uri: 'http://vps477048.ovh.net/vows/'+this.state.femalephoto}}
              
                    />
                      <Text style={{fontSize:17,color:'#735d78',textAlign:'center'}}>{this.state.femalename}</Text>
                  </View>

                    <View  style={{flexDirection:'column'}}>
                     <Image
                    style={{width: 102, height: 102 , borderRadius:90,marginBottom:5,marginLeft:-2}}
                    source={{uri: 'http://vps477048.ovh.net/vows/'+this.state.malephoto}}
              
                    />
                     <Text style={{fontSize:17,color:'#735d78',textAlign:'center'}}>{this.state.malename}</Text>
                    </View>
                 </View>
                    
                </View> 
                <Text style={{position:'absolute',right:26,bottom:26,fontSize:14,color:'#6b3064',fontWeight:'bold'}} onPress={() => navigate('Birthday')}>FINISH </Text>
               
              </View>
          
               
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