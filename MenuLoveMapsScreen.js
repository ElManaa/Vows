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
import {StackNavigator, HeaderBackButton} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {RkTextInput,RkText,RkButton} from 'react-native-ui-kitten';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

 

export default class MenuLoveMapsScreen extends React.Component {

    static navigationOptions = ({ navigation  }) => ({
        headerStyle : {backgroundColor:"#FECACA",elevation:0},
        headerTintColor: '#fff',
        headerTitleStyle: {alignSelf: 'center'},
        headerRight: (
          <TouchableOpacity
          onPress={() => {navigation.state.params.openModal()}}
            style={{ paddingRight: 5 }}>
             
          </TouchableOpacity>
      ),
      headerLeft: (
        <HeaderBackButton
        onPress={() => {navigation.navigate('Couples')}}
        title={'Back'}
        tintColor={'white'}
      />
    ),
    
      
 
  
    });

    state = {
        email: '',
        activityindicatorV: true,
        UID : '',
        gender : '',
        first_name:'',
        last_name :'',
        birthday : '',
        horoscope: '',
        weight : '',
        height : '',
        questionsleft : 0,
        reviewsleft:0,
        resultsleft:0,
        malename :'',
        femalename:'',
        malepts : 0,
        femalepts :0 ,
        tshirt_size: '',
        ring_size:'',
        shoses_size:'',
        phone:'',
        activeT : 1 ,
        modalVisible: false,
      }
 
      openModal() {
      
        this.setState({modalVisible:true});
        
      }
    
      closeModal() { 
        this.setState({modalVisible:false}); 
      }

      
  _handleBackPress = () => {
    alert('héhé');
  }
        getlovemapmenu (){
          firebase.auth().onAuthStateChanged((user) => {

            fetch('http://vps477048.ovh.net/vows/webservice/lovemapmenu/'+user.uid, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
          
              }) 
              .then(response => response.json())
              .then(response => { 
                        this.setState({
                          questionsleft:response.nbrquestions ,
                          reviewsleft : response.partneranswers,
                          resultsleft : response.results ,
                          malepts : response.male.score,
                          malename : response.male.first_name,
                          femalepts : response.female.score,
                          femalename : response.female.first_name,
                          activityindicatorV:false
                        })
              })
              .catch((error) => {
                  console.log(error);
              });  
           }) 
        }
        
        
      componentDidMount() {
        const { navigate } = this.props.navigation;
        BackHandler.addEventListener('hardwareBackPress', function() {
            navigate('Couples');
          return true;
       });
        this.getlovemapmenu();
      
      }
      
      
             render(){
       
            const { navigate } = this.props.navigation;
       
            return (


               
          <View style={{ flex: 1 }}> 
     
              <ScrollView style={styles.container} >
              
              
             <Image source={require('../Assets/LoveMapBg.png')}  style={{position:'absolute',bottom:0,width:Dimensions.get('window').width ,height:175,marginTop:Dimensions.get('window').height-50}}/>
           
              <View style={{flexDirection:'row',justifyContent:'center'}}>

                    <View style={{backgroundColor:'#64b2ff',borderRadius:12,height:110,width:120,marginTop:20}}  >
                  
                      <Text style={{marginTop:6,fontSize:20,fontFamily:'Roboto-Regular',color:'#fff',fontWeight:'500',marginBottom:-8,textAlign:'center'}}>{this.state.femalename}</Text>
            
                      <Text style={{marginLeft:0,fontSize:45,fontFamily:'Roboto-Regular',color:'#fff',textAlign:'center',fontWeight:'500'}}>{this.state.femalepts}</Text>
                      <Text style={{marginLeft:0,fontSize:14,fontFamily:'Roboto-Regular',color:'#fff',textAlign:'center'}}>Points</Text>
                  
                  
                  </View>

                  <View style={{backgroundColor:'#ff8b81',marginLeft:18,borderRadius:12,height:110,width:120,marginBottom:12,marginTop:20}}  behavior='padding'>
                  
                      <Text style={{marginTop:6,fontSize:20,fontFamily:'Roboto-Regular',color:'#fff',fontWeight:'500',marginBottom:-8,textAlign:'center'}}>{this.state.malename}</Text>
                      
                        <Text style={{marginLeft:0,fontSize:45,fontFamily:'Roboto-Bold',color:'#fff',textAlign:'center'}}>{this.state.malepts}</Text>
                        <Text style={{marginLeft:0,fontSize:14,fontFamily:'Roboto-Regular',color:'#fff',textAlign:'center'}}>Points</Text>
                      
                  </View>

             </View>
             
             <TouchableOpacity onPress={() => navigate('Questionsmap')} activeOpacity={0.6}>
              <View style={{backgroundColor:'#fff',marginLeft:40,marginRight:40,borderRadius:20,height:108,marginBottom:12}}  behavior='padding'>
            
                <Text style={{margin:20,marginBottom:12,marginTop:29,textAlign:'center',fontSize:18,fontFamily:'Roboto-Bold',color:'#3d3188' }}>Answer questions</Text>
                <Text style={{textAlign:'center',fontSize:14,color:'#758696'}}>({this.state.questionsleft} left)</Text>
            
             </View>
             </TouchableOpacity>

             <TouchableOpacity onPress={() => navigate('PartnerAnswer')} activeOpacity={0.6}>
             <View style={{backgroundColor:'#fff',marginLeft:40,marginRight:40,borderRadius:20,height:108,marginBottom:12}}  behavior='padding'>
            
                <Text style={{margin:20,marginBottom:12,marginTop:29,textAlign:'center',fontSize:18,fontFamily:'Roboto-Bold',color:'#3d3188' }}>Review partner answers</Text>
                <Text style={{textAlign:'center',fontSize:14,color:'#758696'}}>({this.state.reviewsleft} left)</Text>
            
             </View>
             </TouchableOpacity>

             <TouchableOpacity   onPress={() => navigate('AnswersResult')} activeOpacity={0.6}>
             <View style={{backgroundColor:'#fff',marginLeft:40,marginRight:40,borderRadius:20,height:108,marginBottom:100}}  behavior='padding'>
            
                <Text style={{margin:20,marginBottom:12,marginTop:29,textAlign:'center',fontSize:18,fontFamily:'Roboto-Bold',color:'#3d3188' }}>My answers results</Text>
                <Text style={{textAlign:'center',fontSize:14,color:'#758696'}}>({this.state.resultsleft} left)</Text>
            
             </View>
          
             
             </TouchableOpacity>
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

  