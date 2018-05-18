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
TouchableWithoutFeedback,
TouchableHighlight,
TouchableNativeFeedback} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {RkTextInput,RkText,RkButton} from 'react-native-ui-kitten';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Moment from 'moment';
 
export default class CouplesScreen extends React.Component {
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
        tshirt_size: '',
        ring_size:'',
        shoses_size:'',
        phone:'',
        
        activeT : 1 ,
        modalVisible: false,
        ActivityIndicatorV : true,
        daystogether :'0',
      }
      getcoupleinfo()
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
              let oneDay = 24*60*60*1000;
              let today = firstDate = new Date();
              let miraage = new Date(response.marriage_date);
              console.log(response);
                if (user.uid == response.male.id_user)
                {
                  console.log('here')
                    this.setState({
                      first_name: response.male.first_name,
                      gender : 'male',
                      daystogether :  Math.round(Math.abs((today.getTime() - miraage.getTime())/(oneDay)))
                    
                    })
                }else {
                    this.setState({
                      first_name: response.female.first_name,
                      gender : 'female',
                      daystogether :  Math.round(Math.abs((today.getTime() - miraage.getTime())/(oneDay))) 
                    })
                }
                 this.setState({ActivityIndicatorV:false})
            })
            .catch((error) => {
                console.log(error);
            });  }}) 
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

        gotomaps ()
        {
          const { navigate } = this.props.navigation;
          navigate('Lovemaps');
        }

      componentDidMount() { 
        const { navigate } = this.props.navigation;
        BackHandler.addEventListener('hardwareBackPress', function() {
            navigate('Home');
          return true;
       });
        try {
         AsyncStorage.getItem('miragedate').then((value) =>{
           if (value != null)
           {
            
            this.setState({ ActivityIndicatorV:false,daystogether :  Math.round(Math.abs((new Date().getTime() - new Date(value).getTime())/(24*60*60*1000))) })

           }else{
            this.getcoupleinfo();  
           } 
        })
     
           }catch(error){
                
           }

          }
      

           onPressLogout() 
        {
            const { navigate } = this.props.navigation;
            FCM.getFCMToken().then(token => {
              fetch('http://vps477048.ovh.net/vows/webservice/deletetoken/'+token, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                })
                .then(response => {
 
                  firebase.auth().signOut();
                  navigate('Login')
                })
                .catch((error) => {
                    console.log(error);
                }); 
               
            });
        
        }

             render(){
       
            const { navigate } = this.props.navigation;
       
            return (
          <View style={{ flex: 1 }}>
   { this.state.ActivityIndicatorV ? 
              <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'center',height:Dimensions.get('window').height}}>
              <ActivityIndicator size='large'></ActivityIndicator>
              
              </View>
              :  
          <View style={{ height:Dimensions.get('window').height,backgroundColor : '#efefef'}}>
            <ScrollView  >
                   <View  >
                      <View style={{flexDirection:'row' ,justifyContent: 'flex-end',marginRight:37,marginBottom:10}}>
                        <Image source={require('../Assets/CoupleIconHome.png')}  style={{width:40,height:40,marginTop:25,marginRight:10}}/>
                        <Text style={{color:'#758696',fontSize:22,marginTop:33,textAlign:'right'}}>{this.state.daystogether} days</Text>
                      </View>

             
                 
                  <View style={{width:Dimensions.get('window').width-19  ,marginLeft:'0%' ,borderRadius:20 ,marginLeft:'2.1%', flexDirection:'row',borderWidth:10,height:250,borderColor:'#efefef'}} >
                       <TouchableOpacity  onPress={ () => navigate('Lovemaps')}  activeOpacity={0.6}>
                        <ImageBackground  source={require('../Assets/LoveMapsBg.png')}  style={{width:Dimensions.get('window').width-35,height:230,marginTop:0,marginRight:10}} borderRadius={10}   >
                     
                    
                   
                          <View style={{flexDirection:'column',marginTop:10,width:'100%'}}>
                          <Text style={{color:'#fff',fontSize:35,marginLeft:10,fontFamily:'Roboto-Bold'}}>Love Maps </Text>
                          <Text style={{color:'#fff',fontSize:25,fontFamily:'Roboto-Bold',marginLeft:10,marginTop:-9}}>Game! </Text>
                          <View style={{flexDirection:'column',marginTop:90}}>
                          <Text style={{left:0,bottom:10,color:'#fff',marginLeft:10,fontFamily:'Roboto-Regular'}}>Knowing the little things about   </Text>
                          <Text style={{left:0,bottom:10,color:'#fff',marginLeft:10,marginTop:-5,fontFamily:'Roboto-Regular'}}>your partner life strengthen your  </Text>
                          <Text style={{left:0,bottom:10,color:'#fff',marginLeft:10,marginTop:-4,fontFamily:'Roboto-Regular'}}>friendship and your intimacy</Text>
                          </View>
                          <Text style={{position:'absolute',right:0,bottom:25,color:'#fff',marginRight:23,fontFamily:'Roboto-Bold'}}>START</Text>
                          </View>
                          </ImageBackground>
                          </TouchableOpacity>
                      </View>
                   
                      
                       
                      <View style={{width:Dimensions.get('window').width-19  ,marginLeft:'0%' ,borderRadius:20,marginLeft:'2.1%' , flexDirection:'row',borderWidth:10,height:190,borderColor:'#efefef',marginTop:-7}} >
                      <TouchableOpacity  onPress={ () => navigate('Gallery')}  activeOpacity={0.6}>
                      <ImageBackground  source={require('../Assets/AlbumBg.png')}  style={{width:Dimensions.get('window').width-35,height:170,marginTop:0,marginRight:10}} borderRadius={10}   >
                    <Image source={require('../Assets/AlbumIcon.png')}  style={{resizeMode:'stretch',width:38,height:40,marginTop:8,position:'absolute',right:30,top:15}}/>
                          <View style={{flexDirection:'column',marginTop:10,width:'100%'}}>
                          <Text style={{color:'#333947',fontSize:35,fontFamily:'Roboto-Bold',marginLeft:10}}>Create Your</Text>
                          <Text style={{color:'#333947',fontSize:25,fontFamily:'Roboto-Bold',marginLeft:10,marginTop:-9}}>Shared Gallery </Text>
                          <View style={{flexDirection:'column',marginTop:12}}>
                          <Text style={{left:0,bottom:10,color:'#333947',marginLeft:10,fontSize:12,fontFamily:'Roboto-Regular'}}>Share moments of you together or  </Text>
                          <Text style={{left:0,bottom:10,color:'#333947',marginLeft:10,marginTop:-5,fontSize:12 ,fontFamily:'Roboto-Regular'}}>ones you would only want them to   </Text>
                          <Text style={{left:0,bottom:10,color:'#333947',marginLeft:10,marginTop:-4,fontSize:12 ,fontFamily:'Roboto-Regular'}}>see. </Text>
                          <Text style={{left:0,bottom:10,color:'#333947',marginLeft:10,marginTop:7,fontSize:12 ,fontFamily:'Roboto-Regular'}}>We’re serious about your privacy! </Text>

                          </View>
                          <Text style={{position:'absolute',right:0,bottom:25,color:'#333947',marginRight:23,fontFamily:'Roboto-Bold'}}>START</Text>
                          </View>
                          </ImageBackground>
                          </TouchableOpacity>
                      </View>
                      

                 <TouchableOpacity  onPress={ () => navigate('bookmarked')}  activeOpacity={0.6} >
                      <View style={{width:Dimensions.get('window').width-33,backgroundColor:'#ffd66c' ,height:70,marginLeft:'4%' ,borderRadius:15 , flexDirection:'row',marginBottom:100}} >
                       
                          <View style={{flexDirection:'column',marginTop:7}}>
                          <Text style={{color:'#333947',fontSize:20,fontWeight:'500',marginLeft:15,fontFamily:'Roboto-Bold'}}>Your </Text>
                          <Text style={{color:'#333947',fontSize:20,fontWeight:'500',marginLeft:15,marginTop:-4,fontFamily:'Roboto-Bold'}}>Daily Tips </Text>
                         
                          </View>
                          <Image source={require('../Assets/Birds.png')}  style={{resizeMode:'stretch',width:85,height:58,marginTop:8,marginLeft:'36%'}}/>
                      </View>
                      </TouchableOpacity>

                
              </View>
    
            </ScrollView>
                     
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

                      <Modal
                        transparent= {true}
                        visible={this.state.modalVisible}
                        animationType={'fade'}
                        onRequestClose={() => this.closeModal()}
                        style={{width:'50%'}}
                          >
                       <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                          
                  
                            <Text style={{color:'#834ca4',fontSize:18,marginTop:45}}>ENTER YOUR 4 MBTI</Text> 
                            <Text style={{color:'#834ca4',fontSize:18,marginBottom:20}}>LETTER SCORE</Text> 
                             
                            <RkTextInput 
                            rkType='bordered' 
                            style={{backgroundColor:'#e1e1e1',marginBottom:80,marginLeft:40,marginRight:40}} 
                            onChangeText={(thevow) => this.setState({thevow})}
                            value={this.state.partnerName} 
                          /> 
                              <Text  style={{position:'absolute',color:'#834ca4',fontSize:18,bottom:0,right:0,marginRight:30,marginBottom:23}} onPress={() => this.closeModal()}>SUBMIT</Text>
                        
                        
                        </View>
                      </View>
                    </Modal>
                    </View> }  
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

  