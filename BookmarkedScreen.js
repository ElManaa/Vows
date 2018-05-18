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

 

export default class BookmarkedScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerStyle : {backgroundColor:"#efefef",elevation:0},
 
        headerTintColor: '#758696',
        headerTitleStyle: { color: '#758696',marginLeft:'20%' },
  
 });

    state = {
        email: '',
        authenticating: false,
        UID : '',
        gender : '',
        Nbtips : 0,
        Tips : [], 
        phone:'',
        modalVisible: false,
        activeT : 1 ,
      }

    
      removebookmark (id) 
      { 

          fetch('http://vps477048.ovh.net/vows/webservice/removebookmark/'+id, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
          
              }) 
            
              .then(response => { 
 
                 
              this.loadbookmarked();
        
              })
              .catch((error) => {
                  console.log(error);
              }); 
      }


      loadbookmarked () 
      {
        
        firebase.auth().onAuthStateChanged((user) => {
            console.log ('http://vps477048.ovh.net/vows/webservice/getbookmarktips/'+user.uid);
            fetch('http://vps477048.ovh.net/vows/webservice/getbookmarktips/'+user.uid, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
          
              }) 
            
              .then(response => { 
                response = response._bodyInit ;
                response = JSON.parse(response);
           
                  console.log (response);
                  this.setState({Nbtips:response.length,
                                  Tips:response  })
        
              })
              .catch((error) => {
                  console.log(error);
              }); 
             
           })
      }
      

      componentDidMount() {
     
    
            this.loadbookmarked();
            const { navigate } = this.props.navigation;
            BackHandler.addEventListener('hardwareBackPress', function() {
                navigate('Couples');
              return true;
           });
      }
      
     
 

             render(){
       
            const { navigate } = this.props.navigation;
       
            return (
          <View style={{ flex: 1 }}>
              <View style={styles.container} >
              {  this.state.Tips.map((result, i) => {
                  return(
                      
              <View key={i} style={{backgroundColor:'#fff',marginLeft:24,marginRight:24 ,marginTop:7,padding:10}}  behavior='padding'>
                    <View style={{alignContent:'center',justifyContent:'center',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontWeight:'100',fontSize:16,marginTop:13,color:'#3D3188',alignItems:'center',width:'88%'}}>
                       {result.tip.message}
                        </Text>
                         <TouchableOpacity onPress={() => this.removebookmark(result.id_bookmarked_tip)} style={{marginTop:'20%'}}>
                        <Image source={require('../Assets/Bookmarked.png')}  style={{width:17,height:21 }}  /> 
                   </TouchableOpacity>
                    </View> 
              </View>) })}
            
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

  