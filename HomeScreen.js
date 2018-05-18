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
 

export default class HomeScreen extends React.Component {
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
        horoscope: '',
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
        activeT : 0 ,
        modalVisible2: false,
        daystogether : '0' ,
        ActivityIndicatorV : true ,
        partner_name : ' ',
        pbordercolor : '#fff',
       
        daysleft : '',
        Moodname : '',
        partnername :'',
        Moodimage : 'symptoms_headache',
        symptomname : '',
        symptomimage : 'symptoms_headache',
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

      getpartnercycle()
      {
        firebase.auth().onAuthStateChanged((user) => {
          
          fetch('http://vps477048.ovh.net/vows/webservice/partnersymptoms/'+user.uid, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }, 
            }) 
            .then(response => response.json())
            .then(response => { 
              console.log(response);

              this.setState({
                partnername : response.first_name,

                symptomname : response.symptom.name,
                Moodname : response.mood.name,

                symptomimage : response.symptom.image,
                Moodimage : response.mood.image,
                daysleft : response.daysleft
              })
              
            })
            .catch((error) => {
                console.log(error);
            }); 
        })
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

      componentDidMount() {
        //this.getTips(); 
         this.getpartnercycle();
         this.getcoupleinfo()
     
      }
      
        
 
             render(){
       
            const { navigate } = this.props.navigation;
            
            return (
              <View style={styles.container}>
              { this.state.ActivityIndicatorV ? 
              <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'center',height:Dimensions.get('window').height}}>
              <ActivityIndicator size='large'></ActivityIndicator>
              
              </View>
              : 
              <View>
              { this.state.partnerFound ?  
                <View>
           
                   <View >
                   <ScrollView >
                      <View style={{marginTop: 40,marginLeft:18}}>
                      <Text style={{color:'#834ca4',fontSize:36,fontFamily:'Roboto-Bold'}}>{this.state.daysleft} Days left</Text> 
                    </View>
         
                  
                    <View style={{width:Dimensions.get('window').width-33,backgroundColor:'#834ca4' ,height:89,marginLeft:20,borderRadius:20 , flexDirection:'row',marginTop:40 }} >
                    
                
                <View style={{marginTop:13,marginLeft:17,flexDirection:'column'}}>
                <View style={{width:43,height:50,backgroundColor:'#efefef',borderRadius:12,}}>
                <Image source={{uri:'http://vps477048.ovh.net/vows/'+this.state.symptomimage}}  style={{width:35,height:35,margin:5}}/>
                </View>
                <Text style={{color:'#fff',fontSize:9,textAlign:'center'}}>{this.state.symptomname}</Text>
                </View>



                <View style={{marginTop:13,marginLeft:13,flexDirection:'column'}}>
                <View style={{width:50,height:50,backgroundColor:'#efefef',borderRadius:12}}>
                <Image  source={{uri:'http://vps477048.ovh.net/vows/'+this.state.Moodimage}}  style={{width:45,height:45,margin:2}}/>
                </View>
                <Text style={{color:'#fff',fontSize:9,textAlign:'center'}}>{this.state.Moodname}</Text>
                </View>


                <View style={{marginLeft:30}}>
                <Text style={{color:'#fff',fontFamily:'Roboto-Bold',fontSize:14,marginTop:17}}>{this.state.partnername} is {'\n'}experiencing {'\n'}{this.state.symptomname}</Text>

                </View>

        

                </View>
  
                        <View style={{marginTop:13  }}>
                        <Text style={{color:'#834ca4',fontSize:18,fontFamily:'Roboto-Bold',marginLeft:18}}>Acts of kindness </Text> 
                        
                        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
  
                              <View style={{flexDirection:'row'}}>
                               
                                <View style={{backgroundColor:'#50E3C2',width:107,height:110,marginTop:11}}>
  
                                <Image source={require('../Assets/act_tea.png')}  style={{width:42,height:38,marginTop:13,marginLeft:8}}/>
                                <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:9,marginLeft:9,marginTop:19}}>Offer her tea</Text>
                               
                                </View>
                             
                             
                                <View style={{backgroundColor:'#AFE37A',width:107,height:110,marginTop:11,marginLeft:9}}>
  
                                <Image source={require('../Assets/act_massage.png')}  style={{width:42,height:38,marginTop:13,marginLeft:8}}/>
                                <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:9,marginLeft:9,marginTop:19}}>Some foot massage would be nice</Text>
                               
                                </View>
                           
                                <View style={{backgroundColor:'#CDB2F9',width:107,height:110,marginTop:11,marginLeft:9}}>
                                <Image source={require('../Assets/act_wash.png')}  style={{width:42,height:38,marginTop:13,marginLeft:8}}/>
                                <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:9,marginLeft:9,marginTop:19}}>Make them sparkle:{'\n'}Wash the dishes {'\n'}maybe</Text>
                               
                                </View>
                               
                              </View>
  
                              <View style={{flexDirection:'row'}}>
                              
                                <View style={{backgroundColor:'#F46B6B',width:107,height:110,marginTop:11}}>
                                <Image source={require('../Assets/act_chocolate.png')}  style={{width:42,height:38,marginTop:13,marginLeft:8}}/>
                                <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:9,marginLeft:9,marginTop:19}}>Favorite chocolate!{'\n'}or doughnut </Text>
                               
                                </View>
                      
                                <View style={{backgroundColor:'#834CA4',width:107,height:110,marginTop:11,marginLeft:9}}>
                                <Image source={require('../Assets/act_movie.png')}  style={{width:42,height:38,marginTop:13,marginLeft:8}}/>
                                <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:9,marginLeft:9,marginTop:19}}>Pick a movie that{'\n'} would make her happy</Text>
                               
                                </View>
                       
                              
                                <View style={{backgroundColor:'#4C77A4',width:107,height:110,marginTop:11,marginLeft:9,opacity:0}}>
                                <Image source={require('../Assets/act_wash.png')}  style={{width:42,height:38,marginTop:13,marginLeft:8}}/>
                                <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:9,marginLeft:9,marginTop:19}}>Make them sparkle:{'\n'}Wash the dishes {'\n'}maybe</Text>
                               
                                </View>
                              
                              </View>
   
                        </View>    
  
                        </View>
             
         
                   
                    {true ? 
                    <View style={{width:Dimensions.get('window').width , flexDirection:'row',height:100,borderColor:'#efefef',marginTop:23,justifyContent:'center',alignContent:'center'}} >
                      <TouchableOpacity      activeOpacity={0.6}>
                      <ImageBackground  source={require('../Assets/AlbumsBg.png')}  style={{width:Dimensions.get('window').width-35,height:100,marginTop:0}} borderRadius={10}   >
                      <Image source={require('../Assets/AlbumMotif.png')}  style={{width:119,height:127,marginTop:-12,position:'absolute',right:-14}}/>
                         <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#fff',fontSize:19,fontFamily:'Roboto-bold',marginLeft:20,marginTop:24}}>Jana just added new pictures{'\n'}to the shared gallery</Text>
              
                         </View>
                         <View style={{position:'absolute',right:31,top:40}}><Image source={require('../Assets/PeriodArrow.png')} style={{width:9,height:17}}  /></View>
                          </ImageBackground>
                          </TouchableOpacity>
                      </View>
                      : <View></View>

                    }
          
           
                   {true ? 
                    <View style={{width:Dimensions.get('window').width , flexDirection:'row',height:86,borderColor:'#efefef',marginTop:11 ,justifyContent:'center',alignContent:'center'}} >
                      <TouchableOpacity      activeOpacity={0.6}>
                      <ImageBackground  source={require('../Assets/bdBG.png')}  style={{width:Dimensions.get('window').width-35,height:86,marginTop:0}} borderRadius={10}   >
                      <Image source={require('../Assets/bdBaloons.png')}  style={{resizeMode:'stretch',width:67,height:67,marginTop:8,position:'absolute',right:20}}/>
                         <View style={{flexDirection:'row'}}>
                         <Text style={{color:'#834ca4',marginTop:26,marginLeft:16,fontFamily:'Roboto-Bold',fontSize:24}}>{Moment(this.state.partnerbirthdate).format('DD')}</Text>
                         <View style={{flexDirection:'column',marginTop:20}}>
                                <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10,marginTop:7,fontSize:11, textAlign:'center'}}>{Moment(this.state.partnerbirthdate).format('MMM')}</Text>
                                <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10 ,fontSize:11}}>2018</Text>
                           </View>
                           <View style={{flexDirection:'column',marginTop:13,marginLeft:10}}>
                                <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10,marginTop:7,fontSize:16}}>Celebrate </Text>
                                <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10 ,fontSize:16}}>{this.state.partner_name}’s Birthday</Text>
                           </View>
                         </View>
                          </ImageBackground>
                          </TouchableOpacity>
                      </View>
                      : <View></View>

                    }

                    {true ? 
                      <View style={{width:Dimensions.get('window').width , flexDirection:'row',height:190,borderColor:'#efefef',marginTop:11,justifyContent:'center',alignContent:'center',marginBottom:100}} >
                        <TouchableOpacity      activeOpacity={0.6}>
                        <ImageBackground  source={require('../Assets/LoveMapsBg2.png')}  style={{width:Dimensions.get('window').width-35,height:190,marginTop:0}} borderRadius={10}   >
                      
                          <View style={{flexDirection:'row'}}>
                          <Text style={{color:'#fff',fontSize:19,fontFamily:'Roboto-bold',marginLeft:16,marginTop:24}}>Jana just added new pictures{'\n'}to the shared gallery</Text>
                
                          </View>
                          
                          <View style={{flexDirection:'row',position:'absolute',left:16,bottom:13.65}}>
                          <Text style={{color:'#fff',fontSize:19,fontFamily:'Roboto-bold'  }}>Check her answers</Text>
                
                          </View>
                          <View style={{position:'absolute',right:28,bottom:16.84}}><Image source={require('../Assets/PeriodArrow.png')} style={{width:9,height:17}}  /></View>
                            </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        : <View></View>

                    }


                </ScrollView>
              </View>
    
    
                     
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
                          onPress={()=> navigate('Profile')}
                      />
                        <Tab
                          barBackgroundColor="#e6e3e3"
                          label="Settings"
                          icon={<Image source={require('../Assets/NavSettingsActive.png')}  style={{width:28,height:28 ,margin:-2}}/>}
                          onPress={()=> navigate('Logout')}
                        />
            </BottomNavigation>

                   

                     

                  

                    </View>
                     

              : 
              <View style={{backgroundColor:'#6b3064',height:Dimensions.get('window').height}}>
              <Image source={require('../Assets/CoupleBackground.png')}  style={{width:Dimensions.get('window').width,height:300}}/>
              <Text style={{color:'white',fontSize:20,fontFamily:'Roboto-Regular',textAlign:'center',marginTop:100}}>Waiting for your
                    {'\n'}partner to join</Text>

                    <Text style={{fontSize:12,color:'white',textAlign:'center',opacity:0.4,marginTop:100}}>(You can remind your partner to accept the invitation quickly)</Text>
             
               </View>
              }
              </View>



                
                     }  
                     </View> 
        );
    }

}
 
 

const styles = StyleSheet.create({
  container: {
    
    height:Dimensions.get('window').height-21 ,
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
      bottom: 0,
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

  