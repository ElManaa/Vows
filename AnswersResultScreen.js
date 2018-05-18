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
  FlatList,
ImageBackground} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {RkTextInput,RkText,RkButton} from 'react-native-ui-kitten';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

 

export default class AnswersResultScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerStyle : {backgroundColor:"#FECACA",elevation:0},

    headerTintColor: '#fff',
    headerTitleStyle: { color: '#fff',marginLeft:'25%' },

});

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
        nbcorrect : 0,
        correctedA : [],
        phone:'',
        modalVisible: false,
        Questions: [],
        Numquestion : 0 ,
        theresponse:'',
      }

    
   
      openModal() {
        this.setState({modalVisible:true});
        
      }
    
      closeModal() {
       
        this.setState({modalVisible:false});
  
      }

        getAnswers()
        {
          firebase.auth().onAuthStateChanged((user) => {

            fetch('http://vps477048.ovh.net/vows/webservice/getmycorrectedanswers/'+user.uid, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
          
              }) 
              .then(response => response.json())
              .then(response => { 
                   console.log(response);
                       
                this.setState({correctedA: response,nbcorrect : response.length})
                 

              })
              .catch((error) => {
                  console.log(error);
              }); 
            

           })
         
        }

        renderanswers()
        {
          
          if (this.state.nbcorrect > 0)  
            
        {
          return (
          this.state.correctedA.map((result, i) => {
           
            return(
              
          <View key={i} style={{backgroundColor:'#fff',marginLeft:20,borderRadius:20,marginBottom:12,marginTop:48,width:294,height:200 ,marginRight:0}}  behavior='padding'>
          
              <Text style={{margin:20,marginBottom:12,marginTop:25,fontSize:15,fontFamily:'Roboto-Bold',color:'#3d3188' }}>
           {result.lovemap.question}
              </Text>
              { result.correction == 'correct' ?
              
              
              <Text style={{marginLeft:20,fontSize:14,color:'#758696',fontSize:15,marginTop:5 ,width:'85%'}}>{result.response}</Text>
                : 
                <View>
                { result.correction == 'wrong' ?
                <Text style={{marginLeft:20,fontSize:14,color:'#758696',fontSize:15,marginTop:5 ,width:'85%'}}>{result.response}</Text>
                :
                <Text style={{marginLeft:20,fontSize:14,color:'#758696',fontSize:15,marginTop:5 ,width:'85%'}}>{result.correction}</Text>
                }
               </View>
           
            }
            
              <Text style={{marginLeft:20,fontSize:14,color:'#758696',fontSize:15,opacity:0.4}}>____________________________________</Text>
              
              {result.correction == 'correct' 
              
              ? 
              <View style={{flexDirection:'row',marginTop:18,marginBottom:18}}>
               <Image source={require('../Assets/answerCorrect.png')}  style={{height:25,width:25,marginLeft:20}}/>
               <Text style={{marginLeft:20,marginTop:2,fontFamily:'Roboto-Bold',color:'#6C2E65',fontSize:15}}>CORRECT</Text>
               </View>

               :
               <View style={{flexDirection:'row',marginTop:18,marginBottom:18}}>
               <Image source={require('../Assets/answerWrong.png')}  style={{height:25,width:25,marginLeft:20}}/>
               <Text style={{marginLeft:20,marginTop:2,fontFamily:'Roboto-Bold',color:'#6C2E65',fontSize:15}}>WRONG</Text>
               </View>
             }
                
           </View>
          ) 
        }) 
      ) 
        }  
          
          return(
          <View><Text></Text></View> 
         )
         
         
        }

       

       

      componentDidMount() {
        this.getAnswers(); 
        const { navigate } = this.props.navigation;
        BackHandler.addEventListener('hardwareBackPress', function() {
            navigate('MenuLoveMaps');
          return true;
       });
      }


     

             render(){
       
            const { navigate } = this.props.navigation;
       
            return (
          <View style={{ flex: 1 }}>
              <View style={styles.container} >
                 
                    <Text style={{marginLeft:20,marginRight:20,color:'#3D3188',fontSize:13,marginTop:54,width:'86%'}}>It’s normal if you don’t know some of the answers. It doesn’t make you less loving! Participating is what counts</Text>
                
                    <Image source={require('../Assets/LoveMapBg.png')}  style={{position:'absolute',bottom:0,width:Dimensions.get('window').width ,height:175,marginTop:25,marginRight:10,resizeMode:'stretch',}}/>
                    <ScrollView horizontal={true} >
                  {this.renderanswers()}

                    </ScrollView>
                  
            
             
             
            </View>
              
            <BottomNavigation
                        activeTab="1" 
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
                        />
                        <Tab
                          barBackgroundColor="#e6e3e3"
                          label="Settings"
                          icon={<Image source={require('../Assets/NavSettingsActive.png')}  style={{width:28,height:28 ,margin:-2}}/>}
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

  