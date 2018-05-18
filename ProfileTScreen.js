import React from 'react';
import { ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  BackAndroid, 
  BackHandler,
  ScrollView,
  AsyncStorage,
  Image,Dimensions,
  TouchableOpacity, 
  Modal,
  ImageBackground,
  TouchableWithoutFeedback} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {RkTextInput,RkText,RkButton} from 'react-native-ui-kitten';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Moment from 'moment';
 

export default class ProfileTScreen extends React.Component {
  static navigationOptions = {
    headerStyle : {display:"none"}
  }

    state = {
        email: '',
        authenticating: false,
        UID : '',
        gender : '',
        first_name:'',
        last_name :'',
        birthday : '',
        showmenstrual : false,
        weight : '',
        height : '', 
        partnerBirthday : false ,
        partnerFound:false,
        dailytipid: '',
        dailytiptext : 'If an argument gets too heated, take a 20- minute break, and agree to approach the topic again when you are both calm',
        phone:'',
        bookmarked: false,
        modalVisible: false,
        modalfeeling: false,
        activeT : 2 ,
        modalVisible2: false,
        daystogether : '0' ,
        ActivityIndicatorV : true ,
 
        pbordercolor : '#fff',
      }

      openModaltip() {
        this.setState({modalVisible2:true}); 
      } 

      closeModaltip() { 
        if (this.state.bookmarked )
        {
          this.bookmarktip(this.state.dailytipid); 
        }
        
        
        this.setState({modalVisible2:false}); 
      }  
      openModal() {
        this.setState({modalVisible:true});
        
      }
 
      openmodalfeeling()
      {
        this.setState({modalfeeling:true})
      }

      closemodalfeeling()
      {
        this.setState({modalfeeling:false})
      }

      bookmarkon () {
      
        this.setState({bookmarked:true})

       // this.closeModaltip()
      }

      bookmarktip (tipid) 
      {
            firebase.auth().onAuthStateChanged((user) => {
        
            fetch('http://vps477048.ovh.net/vows/webservice/setbookmarktips/', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id : user.uid ,
                tip_id : tipid,
         
               }),
              }) 
              .then(response => response.json())
              .then(response => { 
  
              })
              .catch((error) => {
                  console.log(error);
              });  
            
           })
      }

      seenTips(id){
        console.log('http://vps477048.ovh.net/vows/webservice/seentips/'+this.state.UID);
          fetch('http://vps477048.ovh.net/vows/webservice/seentips/'+this.state.UID, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  tip_id : id ,
              }),
              })

              .then(response => response.json())
              .then(response => { 
                console.log('Seentips' +id + ' ' +  this.state.UID);
                      console.log(response);
                  
              })
              .catch((error) => {
                  console.log(error);
              });          
              
      }

      getTips(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.setState({UID:user.uid});
                fetch('http://vps477048.ovh.net/vows/webservice/checkdailytips/'+user.uid, {
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
                                this.setState({ modalVisible2:true,
                                                dailytiptext:response[0].message ,
                                                dailytipid : response[0].id_tip  })
                                                this.setState({
                                                  UID : user.uid,
                                                  email : user.email,
                                              })
                                this.seenTips(response[0].id_tip)
                                
                            } 
                            
                    })
                    .catch((error) => {
                        console.log(error);
                    });          
            }
        })
      }


        getcoupleinfo()
        {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
           fetch('http://vps477048.ovh.net/vows/webservice/getuser/'+user.uid, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              })
              .then(response => response.json())
              .then(response => {
                this.setState({ActivityIndicatorV:false}) 
                let oneDay = 24*60*60*1000;
                let today = firstDate = new Date();
                let todaybirthday = Moment(today).format('MM-DD') ;
               
                console.log('Birthday : ' + Moment(response.birthday).format('MM-DD') + ' TodayBirthday ' + todaybirthday);
               
 
                      this.setState({
                        first_name: response.first_name,
                        gender : response.gender, 
                      })

                      if (response.gender == 'male')
                      {

                          if (response.couple.female.first_name != null)
                          {

                            this.setState({
                              partnerFound : true,
                              partner_name: response.couple.female.first_name,
                              pbordercolor : '#ff8b81',
                              partnerbirthdate : response.couple.female.birthday,
                          
                            })


                            if (Moment(response.couple.female.birthday).format('MM-DD') == todaybirthday)
                            { 
                              this.setState({
                                partnerBirthday : true,
                              
                              }) 
                            } 
                          } 

                      }else{

                        if (response.couple.male.first_name != null)
                        {
                          this.setState({
                            partnerFound : true,
                            partner_name: response.couple.male.first_name,
                            pbordercolor : '#64b2ff',
                            partnerbirthdate : response.couple.male.birthday,
                          })

                          if (Moment(response.couple.male.birthday).format('MM-DD') == todaybirthday)
                          { 
                            this.setState({
                              partnerBirthday : true,
                            
                            }) 
                          }


                        }

                      }
  
                    
                      let miraage = new Date(response.couple.marriage_date);
                      this.setState({ daystogether :  Math.round(Math.abs((today.getTime() - miraage.getTime())/(oneDay))) })
                  
                  }
               )
              .catch((error) => {
                  console.log(error);
              });  }}) 
             
              
        }


        closeModal() { 
          this.setState({modalVisible:false}); 
        }

        getWifeMonstruation(){
          firebase.auth().onAuthStateChanged((user) => {

            fetch('http://vps477048.ovh.net/vows/webservice/wifemonstruations/'+user.uid, {
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
            

          })
         
        }

      
        checkpartnerperiod ()
        {
          firebase.auth().onAuthStateChanged((user) => {
            
            fetch('http://vps477048.ovh.net/vows/webservice/partnerinmenstrualcycle/'+user.uid, {
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
                this.setState({
                    showmenstrual : true
                })
                
              })
              .catch((error) => {
                  console.log(error);
              }); 
          })
        }

      componentDidMount() {
 
      
      }
       
             render(){
       
            const { navigate } = this.props.navigation;
       
            return (
              <View style={{ flex: 1 }}>
               <View style={{  height:Dimensions.get('window').height}}>
              <BottomNavigation
                        activeTab={this.state.activeT} 
                        labelColor="#834ca4"
                        rippleColor="white"
                        style={styles.bottomNavigation}
                      >
                        <Tab
                          barBackgroundColor="#e6e3e3"
                          label="Home"
                          icon={  <Image source={require('../Assets/NavHomeActive.png')}  style={{width:28,height:28 ,margin:-2}}/>}
                          onPress={()=> navigate('Home')}
                       />
                        <Tab
                          barBackgroundColor="#e6e3e3"
                          label="Couples"
                          icon={  <Image source={require('../Assets/NavCoupleActive.png')}  style={{width:24,height:20,marginLeft:-1 }}/>}
                          onPress={()=> navigate('Couples')}
                        />
                        <Tab
                          barBackgroundColor="#e6e3e3"
                          label="Profile"
                          icon={<Image source={require('../Assets/NavProfileActive.png')}  style={{width:28,height:28 ,margin:-2}}/>}
                     
                      />
                        <Tab
                          barBackgroundColor="#e6e3e3"
                          label="Settings"
                          icon={<Image source={require('../Assets/NavSettingsActive.png')}  style={{width:28,height:28 ,margin:-2}}/>}
                          onPress={()=> navigate('Logout')}
                        />
            </BottomNavigation>
                     </View>   
                     </View>
        );
    }

}
 
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
    backgroundColor : '#efefef' ,
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
    bottomNavigation: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 20,
      height: 56
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
  });

  