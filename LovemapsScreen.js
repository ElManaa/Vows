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
ImageBackground} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {RkTextInput,RkText,RkButton} from 'react-native-ui-kitten';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

 

export default class LovemapsScreen extends React.Component {

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
        checking:true,
        modalVisible: false,
      }
 
      openModal() {
        this.setState({modalVisible:true});
        
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
        
        
        componentWillMount(){
         
        }

      componentDidMount() {
 
        const { navigate } = this.props.navigation;
        try {
          const value =   AsyncStorage.getItem('frunlovemaps').then((value) =>{ 
          if (value !== null){ 
              navigate('MenuLoveMaps');  
          }
          else { 
            this.setState({
              checking:false ,
            })
            try {
              AsyncStorage.setItem('frunlovemaps', 'true');
                } catch (error) {
              console.log('error writing 22data : '+error)
                }
          }
        })} catch (error) {
          
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
              <View style={styles.container} >
                {this.state.checking ?
                <View></View>
              :<View>
             
               <Text style={{fontSize:17,color:'#FFF',marginLeft:35,marginBottom:20,fontWeight:'bold',marginTop:'-8%'}}> </Text>
             
              <View style={{backgroundColor:'#fff',marginLeft:40,marginRight:40,borderRadius:20,height:380,marginBottom:100,marginTop:60}}  behavior='padding'>
            
                    <View style={{alignContent:'center',justifyContent:'center',flexDirection:'row'}}>
                    <Text style={{fontWeight:'500',fontSize:20,marginTop:65,color:'#3D3188',fontFamily:'Roboto-Bold'}}>Why Love Map</Text>
                  
                        </View>
                        <View style={{alignContent:'center',justifyContent:'center',flexDirection:'row'}}>
                    <Text style={{fontWeight:'100',fontSize:18,marginTop:20,color:'#3D3188',alignItems:'center',marginLeft:10,marginRight:10,textAlign: 'center',fontFamily:'Roboto-Regular'}}>
                    Knowing the little things about your partner life strengthen your friendship and your intimacy. The knowledge you build of each other springs love and a wall to stand all coming marital storms</Text>
                  
                        </View>
                        <View style={{flexDirection:'column',alignContent:'center',justifyContent:'center'}}>
                        <TouchableOpacity
                         onPress={() => navigate('MenuLoveMaps')}
                         style={{marginTop:61 ,height:50,top:-30}}

                         >
                      <Text style={{textAlign:'center',fontFamily:'Roboto-Regular',color:'#758696',marginTop:15}}>START</Text>
                      </TouchableOpacity>
                      </View>
            
             </View>
          
             
             
             <Image source={require('../Assets/LoveMapBg.png')}  style={{position:'absolute',bottom:0,width:Dimensions.get('window').width ,height:175,marginTop:25,marginRight:10,resizeMode:'stretch',}}/>
                  </View>
          }
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
                    </View>
                    
        );
    }

}
 
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor : '#FECACA' ,
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

  