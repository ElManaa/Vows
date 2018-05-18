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
 
export default class PartnerAnswerScreen extends React.Component {

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
        Nbanswers : 0 ,
        theresponse : '',
        malename :'',
        femalename:'',
        malepts : 0,
        femalepts :0 ,
        Answers : [] ,
        tshirt_size: '',
        ring_size:'',
        shoses_size:'',
        phone:'',
        activeT : 1 ,
        correction:'',
        correctionV : 0,
        modalVisible: false,
      }
 
      openModal() {
        this.setState({modalVisible:true});
        
      }
    
      closeModal() { 
        this.setState({modalVisible:false}); 
      }

      setcorrectionV(){
        this.setState({correctionV:1})
      }

      setcorrection (quizid,correction,pts)
      {
        this.setState({ 
          correctionV : 0 ,
         })
        firebase.auth().onAuthStateChanged((user) => {
      
        fetch('http://vps477048.ovh.net/vows/webservice/setcorrectionanswer/'+user.uid, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({
            correction : correction ,
            loveanswer_id: quizid ,
            pts : pts ,
           }), 
          })
          .then(response => response.json())
          .then(response => { 
            
             console.log(response);
            
             this.state.Answers.splice(0,1);
             if (correction == 'correct')
             {
                if (this.state.gender == 'male')
                {
                  this.setState({
                    malepts :this.state.malepts + 1,
                    femalepts :this.state.femalepts + pts,
                    correctionV : 0 ,
                   })
                }else {
                  this.setState({
                    malepts :this.state.malepts + pts,
                    femalepts :this.state.femalepts +1,
                   })
                }
             
             }else {

              if (this.state.gender == 'male')
              {
                this.setState({
                  malepts :this.state.malepts + 1,
                  femalepts :this.state.femalepts + 0,
                  correctionV : 0 ,
                 })
              }else {
                this.setState({
                  malepts :this.state.malepts + 0,
                  femalepts :this.state.femalepts +1,
                 })
              }
             }
             this.setState({theresponse:''});
                  
          }) 
          .catch((error) => { 
              console.log(error); 
          });

        })
      }

      renderquestion()
      { const { navigate } = this.props.navigation;
        if (this.state.Answers == 0 ) 
        {
          return (
            <ScrollView >
               
               <View style={{flexDirection:'row' }}>
               <RkButton
               onPress={() => navigate('MenuLoveMaps')}
                style={{width:50 , backgroundColor:'#FECACA'}}
               >
                <Image source={require('../Assets/left-arrow.png')}  style={{height:16,width:16,marginTop:20  }}   />
            </RkButton>
            <Text style={{fontSize:20,color:'#FFF',marginLeft:'22%',marginBottom:10,fontWeight:'bold',marginTop:15,marginBottom:40}}>Final Score</Text>
              </View>
              <Image source={require('../Assets/LoveMapBg.png')}  style={{position:'absolute',bottom:0,width:Dimensions.get('window').width ,height:175,marginTop:25,marginRight:10,resizeMode:'stretch',}}/>
            <View style={{backgroundColor:'#fff',marginLeft:40,marginRight:40,borderRadius:20,marginBottom:120,marginTop:50}}  behavior='padding'>
            <Text style={{textAlign:'center',color:'#834ca4',fontFamily:'Roboto-Bold',fontSize:20,marginTop:20}}> Final Score</Text>
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
            <View style={{marginTop:0 ,backgroundColor:'#834ca4',height:121,marginTop:13,marginLeft:10 ,marginRight:10,borderRadius:12  }}>
             <Text style={{color:'white',marginLeft:12,marginTop:9,fontFamily:'Roboto-Regular',fontSize:12}}>Article</Text>
             <Text style={{color:'white',marginLeft:12,fontFamily:'Roboto-Regular',fontWeight:'500',fontSize:14,width:'90%'}}>The Sound Relationship House: Build Love Maps</Text>
             <Text style={{color:'white',marginLeft:12,fontFamily:'Roboto-Regular',fontSize:9,marginTop:5}}>https://www.gottman.com</Text>
             <Text style={{color:'white',position:'absolute',right:21,bottom:14,fontFamily:'Roboto-Regular',fontWeight:'500'}}>Read</Text>
                      
            </View>

            <Text style={{textAlign:'center',color:'#834ca4',fontFamily:'Roboto-Bold',fontSize:10,marginTop:12,marginBottom:12}} >More questions will be added soon</Text>
      </View>
      
      </ScrollView>
          )
        }


        return (
          <View>
                  <Text style={{fontSize:20,color:'#FFF',marginLeft:35,marginBottom:10,fontWeight:'bold',marginTop:15,marginBottom:40}}>Love Maps</Text>
              <Image source={require('../Assets/LoveMapBg.png')}  style={{position:'absolute',bottom:0,width:Dimensions.get('window').width ,height:175,marginTop:25,marginRight:10,resizeMode:'stretch',}}/>
               <View style={{flexDirection:'row',justifyContent:'center'}}>
              
                                  <View style={{backgroundColor:'#64b2ff',borderRadius:12,height:110,width:120,marginTop:5}}  >
                                
                                    <Text style={{marginTop:6,fontSize:20,fontFamily:'Roboto-Regular',color:'#fff',fontWeight:'500',marginBottom:-8,textAlign:'center'}}>{this.state.femalename}</Text>
                          
                                    <Text style={{marginLeft:0,fontSize:45,fontFamily:'Roboto-Regular',color:'#fff',textAlign:'center',fontWeight:'500'}}>{this.state.femalepts}</Text>
                                    <Text style={{marginLeft:0,fontSize:14,fontFamily:'Roboto-Regular',color:'#fff',textAlign:'center'}}>Points</Text>
                                
                                
                                </View>
              
                                <View style={{backgroundColor:'#ff8b81',marginLeft:18,borderRadius:12,height:110,width:120,marginBottom:12,marginTop:5}}  behavior='padding'>
                                
                                    <Text style={{marginTop:6,fontSize:20,fontFamily:'Roboto-Regular',color:'#fff',fontWeight:'500',marginBottom:-8,textAlign:'center'}}>{this.state.malename}</Text>
                                    
                                      <Text style={{marginLeft:0,fontSize:45,fontFamily:'Roboto-Bold',color:'#fff',textAlign:'center'}}>{this.state.malepts}</Text>
                                      <Text style={{marginLeft:0,fontSize:14,fontFamily:'Roboto-Regular',color:'#fff',textAlign:'center'}}>Points</Text>
                                    
                                </View>
              
               </View>

               <View style={{width:Dimensions.get('window').width,justifyContent:'center',alignContent:'center',flexDirection:'row'}}>
          <View style={{backgroundColor:'#fff',borderRadius:20,height:178,width:294,marginBottom:12}} >
          
              <Text style={{margin:20,marginBottom:12,marginTop:25,fontSize:15,fontFamily:'Roboto-Bold',color:'#3d3188' }}>
            {this.state.Answers[0].lovemap.question}
              </Text>
              <Text style={{marginLeft:20,fontSize:14,color:'#758696',fontSize:15,marginTop:5}}>  {this.state.Answers[0].response}</Text>
              <Text style={{marginLeft:20,fontSize:14,color:'#758696',fontSize:15,opacity:0.4}}>____________________________________</Text>
              <View style={{flexDirection:'row',marginTop:18}}>
              <TouchableOpacity onPress={() => this.setcorrectionV()}>
              <Text style={{marginLeft:90,fontFamily:'Roboto-Bold',color:'#6C2E65',fontSize:14}}>WRONG</Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => this.setcorrection(this.state.Answers[0].id_loveanswer,'correct',this.state.Answers[0].lovemap.points)}>
              <Text style={{marginLeft:50,fontFamily:'Roboto-Bold',color:'#6C2E65',fontSize:14}}>CORRECT</Text>
              </TouchableOpacity>
                  </View>
          
           </View>
           </View>
           <View style={{width:Dimensions.get('window').width,justifyContent:'center',alignContent:'center',flexDirection:'row'}}>
              <View style={{backgroundColor:'#fff',borderRadius:20,height:150,width:294,marginBottom:100,opacity:this.state.correctionV}} >
                    <View style={{alignContent:'center',justifyContent:'center',flexDirection:'column',margin:20,marginBottom:15}}>
                    
                    
                    <RkTextInput 
                    rkType='bordered' 
                    style={{backgroundColor:'#e1e1e1' }} 
                    onChangeText={(theresponse) => this.setState({theresponse})}
                    value={this.state.theresponse} 
                      /> 


                    </View>
                    <TouchableOpacity onPress={() => this.setcorrection(this.state.Answers[0].id_loveanswer,this.state.theresponse,this.state.Answers[0].lovemap.points)}>
                    <View style={{marginTop:0  }}>
                       <Text style={{textAlign:'right',marginRight:29,color:'#7f8f9e',fontWeight:'bold',fontSize:16,marginTop:0}} >NEXT</Text>
                              
                    </View>
                    </TouchableOpacity>
              </View>

              
              </View>
              </View>
        )
      }
 

        getpartnerAnswers ()
        {
          console.log('getpartneranswerstarted');
          firebase.auth().onAuthStateChanged((user) => {

            fetch('http://vps477048.ovh.net/vows/webservice/getpartnerloveanswers/'+user.uid, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              }, 
              })
              .then(response => response.json())
              .then(response => { 
                console.log('getpartneranswerstarted Resp');
                  console.log(response);
                       this.setState({
                        malepts : response.male.score,
                        malename : response.male.first_name,
                        femalepts : response.female.score,
                        femalename : response.female.first_name,
                        Nbanswers : response.loveanswers.length,
                        Answers  : response.loveanswers,
                        gender :  response.male.id_user == user.uid ? 'male' : 'female' ,
                       }) 
                       console.log (this.state.gender);
                      
              }) 
              .catch((error) => { 
                  console.log(error); 
              }); 
            

           })
         
        }
        
        
      componentDidMount() {  
          this.getpartnerAnswers()
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

              <ScrollView style={styles.container}  >    
             {this.renderquestion()}
 
            </ScrollView>
                    
            <BottomNavigation
                        activeTab =  {this.state.activeT}
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
    height:Dimensions.get('window').height,
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

  