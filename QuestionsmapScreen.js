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
import {RkTextInput,RkText,RkButton} from 'react-native-ui-kitten';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Carousel from 'react-native-snap-carousel';

const horizontalMargin = 0;
const slideWidth = 500; 
const sliderWidth = Dimensions.get('window').width;
const sliderHeight = Dimensions.get('window').height;
const itemWidth = Dimensions.get('window').width - 60;
const itemHeight = 400;
const theresp = '';

export default class QuestionsmapScreen extends React.Component {

  static navigationOptions = {
    headerStyle : {display:"none"}
  }
  constructor(props) {
    super(props);
    this.state = { 
        ActivityIndicatorV: true,
        UID : '',
        gender : '',
        first_name:'',
        last_name :'', 
        phone:'',
        modalVisible: false,
        Questions: [],
        Numquestion : 0 ,
        theresponse:'',
    }

      this._renderItem = this._renderItem.bind(this);
  }
 
        getQuestions(){
          firebase.auth().onAuthStateChanged((user) => {

            fetch('http://vps477048.ovh.net/vows/webservice/checkdailylovemaps/'+user.uid, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
          
              }) 
              .then(response => response.json())
              .then(response => { 
                   console.log(response.length);   
                this.setState({Questions: response,
                  Numquestion : response.length,
                  ActivityIndicatorV: false})
                 

              })
              .catch((error) => {
                  console.log(error);
              }); 
            

           })
         
        }

         remplir (val,index) {
         
           questions = this.state.Questions ;
           questions[index].theresp = val.theresponse ;
           this.setState({Questions:questions});
           this.setState({UID:'223'})
          
         }

        submitanswer (lovemapid,resp,index)
        {
          this._carousel.snapToNext(); 
            firebase.auth().onAuthStateChanged((user) => {
                
                fetch('http://vps477048.ovh.net/vows/webservice/setloveanswerquestion/', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id : user.uid,
                        lovemap_id : lovemapid,
                        response : resp,
 
                    }),
                
                    }) 
                    .then(response => response.json())
                    .then(response => { 
                    console.log(response);
                           
                 //  this.state.Questions.splice(index,1);
                       console.log(this.state.Questions);
                       this.setState({theresponse:'',Numquestion: this.state.Numquestion-1});


                    })
                    .catch((error) => {
                        console.log(error);
                    }); 
                

                })
        }

        _renderItem ({item, index}) {
            console.log('start Rendering Questions')
          return (
              <View style={{width: itemWidth,
                            height: itemHeight,
                            paddingHorizontal: horizontalMargin}}>

                        <View style={{backgroundColor:'#fff',width:Dimensions.get('window').width-70,borderRadius:20,height:255,marginBottom:100,marginTop:32}}  behavior='padding'>
                          <View style={{flexDirection:'row',height:90}}>
                            <Text style={{fontWeight:'500',fontSize:20,marginTop:23,color:'#3D3188',textAlign: 'left',marginLeft:32,marginRight:32,width:'80%'}}>{item.question}</Text>

                          </View>


                          <View style={{alignContent:'center',justifyContent:'center',flexDirection:'column',margin:20,marginBottom:30}}>

                          <RkTextInput 
                          rkType='bordered' 
                          style={{backgroundColor:'#e1e1e1' }} 
                          onChangeText={(theresponse) => this.remplir({theresponse},index)} 
                          value={this.state.Questions[index].theresp} 
                           /> 
                          </View> 
                          
                              <TouchableOpacity style={{position:'absolute',left:16,bottom:28,height:20}} onPress={() => this.submitanswer(item.id_lovemap,'I don t know',index)}>
                                <Text style={{fontSize:12,fontFamily:'Roboto-Regular',color:'#758696' }} >I don't know</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={{position:'absolute',right:22,bottom:28,height:20}} onPress={() => this.submitanswer(item.id_lovemap,this.state.Questions[index].theresp,index)}>
                                <Text style={{fontSize:15,fontFamily:'Roboto-Bold',color:'#758696'}} >SET</Text> 
                              </TouchableOpacity>
                        </View> 

              </View>
          );
      }

      componentDidMount() {
        this.getQuestions();
        const { navigate } = this.props.navigation;
        BackHandler.addEventListener('hardwareBackPress', function() {
            navigate('MenuLoveMaps');
          return true;
       });
      }
         

             render() {
       
            const { navigate } = this.props.navigation;
       
            return (
          <View style={{ flex: 1 }}>
              <View style={styles.container} >
              <Image source={require('../Assets/LoveMapBg.png')}  style={{position:'absolute',bottom:0,width:Dimensions.get('window').width ,height:175,marginTop:25,marginRight:10,resizeMode:'stretch'}}/>
                <Text style={{fontSize:20,color:'#FFF',marginLeft:35,fontWeight:'bold',marginTop:15}}>Love Maps</Text>
                   
                

                <View>
                  { 
                    (this.state.ActivityIndicatorV)  
                    ? 
                    <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',height:Dimensions.get('window').height-200}}>
                        <ActivityIndicator size="large"></ActivityIndicator> 
                    </View> 
                    :

                    <View>
                       
                      { (this.state.Numquestion > 0) 
                      ? 
                      <View>
                      <Text style={{marginLeft:35,marginRight:20,color:'#3D3188',fontSize:14,marginTop:30}}>It’s normal if you don’t know some of the answers. It doesn’t make you less loving! Participating is what counts</Text>
                        <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.Questions}
                        renderItem={this._renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth} 
                        /> 
                        </View>
                      : 
                              
                      <View style={{backgroundColor:'#fff',marginLeft:40,marginRight:40,borderRadius:20,height:300,marginBottom:100,marginTop:116,width:Dimensions.get('window').width-80}}  behavior='padding'>
                              
                        <View  >
                            <Text style={{fontWeight:'500',fontSize:20,marginTop:45,color:'#3D3188',marginLeft:20 }}>AWESOME!</Text>
                            <Text style={{ fontWeight:'400',fontSize:17,marginTop:14,color:'#3D3188',marginLeft:20,marginRight:20,lineHeight: 30 }}>Remember: Love map is about bringing you closer by knowing and recalling the little details about each other’s lives.</Text> 
                        </View>
                                          
                        <TouchableOpacity onPress={() => navigate('MenuLoveMaps')} style={{position:'absolute',right:0,bottom:25,marginRight:23}}>
                          <Text style={{fontWeight : 'bold'}} >GOOD</Text>
                        </TouchableOpacity>

                       </View>
                          
                          
                      } 
                    </View> 
                  }
               </View>





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

  