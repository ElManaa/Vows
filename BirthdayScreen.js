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
 ImageBackground,
 Modal} from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {RkTextInput,RkText,RkButton} from 'react-native-ui-kitten';
import SendSMS from 'react-native-sms';

export default class BirthdayScreen extends React.Component {
 
  static navigationOptions = {
    headerStyle : {display:"none"}
    }
      state = {
        partnerfound : false,
        partnerPhone : '',
        partnerName : '', 
        UID : '' ,
        modalVisible: false,
        email : '',
        init : firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.setState({UID: user.uid,
                          email: user.email})
          }
        }),
        steps: 1 ,
        miragedate:'',
        date:"2017-12-15",
        year : '1990',
        month : 'JAN' ,
        day : '01',

      };
      
 
      componentDidMount() 
      {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
        
          }
         })
      }
   
      setbirthday()
      {
        const { navigate } = this.props.navigation;
        fetch('http://vps477048.ovh.net/vows/webservice/setbirthday/'+this.state.UID, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date : this.state.date ,
          }),
          })
      
          .then(response => { 
            navigate('setmirage')
              
          })
          .catch((error) => {
              console.log(error);
          });
      }

        findmonth (number) 
      {
        
        switch(number) {
          case '01':
              return 'JAN';
          case '02':
              return 'FEV';
          case '03':
              return 'MAR';
          case '04':
              return 'APR';
          case '05':
              return 'MAY';
          case '06':
              return 'JUN';
          case '07':
              return 'JUL';
          case '08':
              return 'AUG';
          case '09':
              return 'SEP';
          case '10':
              return 'OCT';
          case '11':
              return 'NOV';
          case '12':
              return 'DEC';
         
        }
      }
 
 
      async openAndroidDatePicker() {
        try {
          const {action, year, month, day} = await DatePickerAndroid.open({
            date: new Date()
          });
      
            console.log( year +' '+ month + ' ' + ' day ' + day)
        this.setState({day:day,year:year,month:month});
        } catch ({code, message}) {
          console.warn('Cannot open date picker', message);
        }
      }
 


      renderCurrentState()
      {
        const { navigate } = this.props.navigation;
 
         return (  
            <View>
            <Image source={require('../Assets/BirthdaySkyBackground.png')}  style={{position:'absolute',width:Dimensions.get('window').width,height:428,borderBottomRightRadius:30,borderBottomLeftRadius:30}}/>
            <Text style={{fontSize:24,color:'#735d78',fontWeight:'bold' ,textAlign:'right',marginRight:50,marginTop:109 }}>Your {'\n'} Birthday </Text>
         
          <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row',width:Dimensions.get('window').width}}>


             <View style={{backgroundColor:'#6b3064',marginLeft:50,marginRight:50,borderRadius:10,height:130 ,width:263,marginTop:97,justifyContent:'center'}}  >
              <View style={{flexDirection:'row' ,justifyContent:'center',marginRight:60,marginBottom:70,marginTop:70,marginLeft:80}}>
              <Text style={{fontSize:20,color:'#fff',marginTop:55,fontFamily:'Roboto-Regular'  }}>{this.state.day}</Text>
              <Image source={require('../Assets/DateSeparator.png')}  style={{width:1,height:46,marginTop:40,marginLeft:10,marginRight:10}}/>
              <Text style={{fontSize:20,color:'#fff',marginTop:55,fontFamily:'Roboto-Regular'  }}>{this.state.month}</Text>
              <Image source={require('../Assets/DateSeparator.png')}  style={{width:1,height:46,marginTop:40,marginLeft:10,marginRight:10}}/>
              <Text style={{fontSize:20,color:'#fff',marginTop:55,fontFamily:'Roboto-Regular'  }}>{this.state.year}</Text>
              </View>
          
             
              
      
              <DatePicker
                style={{width:300,bottom:25 ,position:'absolute',opacity:0}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1960-01-01"
                maxDate="2050-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  } 
                }}
                onDateChange={(date) => {this.setState({date: date,year:date.substr(0,4),month:this.findmonth(date.substr(5,2)),day:date.substr(8,2)})}}
              />

              
            </View>
            </View>   
            <View style={{position:'absolute',justifyContent:'center',alignContent:'center',flexDirection:'row',marginTop:230 ,width:Dimensions.get('window').width}}> 
            <Image source={require('../Assets/BirthdaySignup.png')}  style={{width:80,height:80}}/>
                  </View>
        

              <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row',marginTop:133}}>
                  <RkButton 
                  style={{marginBottom:'20%',backgroundColor:'#ff8b81' ,width:150,height:36}}
                  onPress={() => this.setbirthday()}
                  >
                    NEXT
                  </RkButton>
              </View>    

              </View>
       

          )  
    }
 
      render() { 
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

      modalContainer: {
        flex: 1,
        justifyContent: 'center', 
        backgroundColor: 'rgba(0,0,0,0.5)', 
      },

      innerContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius : 20,
        alignContent:'center',
        justifyContent: 'center' ,
        marginLeft : 30,
        marginRight : 30
      },

      paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
      },
    });

   
   