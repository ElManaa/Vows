import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,Image,Dimensions, BackHandler,TouchableOpacity,Modal, ScrollView} from 'react-native';

import firebase from '../components/FireBase';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RkTextInput,RkText,RkButton,RkPicker} from 'react-native-ui-kitten';
import Grid from 'react-native-grid-component';
import ImageViewer from 'react-native-image-zoom-viewer';
 

export default class  PhotoScreen extends React.Component {
   
    static navigationOptions = {
        headerStyle : {backgroundColor:"#1D232D"},
        title: 'Albumz',
        headerTintColor: 'white',
        headerTitleStyle: { color: 'white',marginLeft:'28%' }
      }
  
   
  constructor(props) {  
    super(props);
    this.state = {
      avatarSource: '',
      modalVisible: false,
      comment:'' ,
      pikerVisible : false ,
      ActivityIndicatorVisible : false ,
      albumname : '',
      NumberAlbums : 0 ,
      myphotos : [],
      hisphotos : [],
      uid : '',
      liked : false ,
      Nbcomments : 0,
      comments : [],
      date:"2017-12-15",
      thephoto:'',
      description:'',
      ownername:'',
      activeT : 1 ,
      owneravatar:'',
            }
 
    }
    closeModal() { 
      this.setState({modalVisible:false}); 
    }
    openModal() {
      this.setState({modalVisible:true});
      
    }
    getComment()
    {
      firebase.auth().onAuthStateChanged((user) => {
          
         fetch('http://vps477048.ovh.net/vows/webservice/getcomments/'+this.props.navigation.state.params.idphoto, {
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
           },
 
           })  
           .then(response => { 
             response = response._bodyInit ;
             response = JSON.parse(response);

           
             this.setState({comments:response})    
             this.setState({Nbcomments:response.length})
              
           })
           .catch((error) => {
               console.log(error);
           }); 
          
        })
    }


    likephoto(id) {
      this.setState({liked:true})
      fetch('http://vps477048.ovh.net/vows/webservice/likephoto/'+this.props.navigation.state.params.idphoto , {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, 
        })  
        .then(response => { 
          response = response._bodyInit ;
          response = JSON.parse(response); 
        })
        .catch((error) => {
            console.log(error);
        }); 
    }



    dislikephoto () {
      this.setState({liked:false})
      fetch('http://vps477048.ovh.net/vows/webservice/dislikephoto/'+this.props.navigation.state.params.idphoto, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
      
    
        })  
        .then(response => { 
          response = response._bodyInit ;
          response = JSON.parse(response);
                
          
        })
        .catch((error) => {
            console.log(error);
        });
    }

  setComment()
  {
    firebase.auth().onAuthStateChanged((user) => {
        
       fetch('http://vps477048.ovh.net/vows/webservice/setcomment/', {
         method: 'POST',
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            user_id : user.uid ,
            comment : this.state.comment ,
            photo_id : this.props.navigation.state.params.idphoto
           }),
     
         })  
         .then(response => { 
           response = response._bodyInit ;
           response = JSON.parse(response);
                 

                this. getComment();
                this.setState({comment:''})
 
         })
         .catch((error) => {
             console.log(error);
         }); 
        
      })
  }
 

  getphoto () 
  {
    firebase.auth().onAuthStateChanged((user) => {
       
      fetch('http://vps477048.ovh.net/vows/webservice/getphoto/'+this.props.navigation.state.params.idphoto, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    
        })  
        .then(response => { 
          response = response._bodyInit ;
          response = JSON.parse(response);
                
               

          this.setState({thephoto:response.image});
          this.setState({description:response.description});
          this.setState({ownername:response.user.first_name});
          this.setState({owneravatar:response.user.image});
          this.setState({idphoto: response.id_photo });
          if (response.liked == 1 )
          {
            this.setState({liked:true});
          }


        })
        .catch((error) => {
            console.log(error);
        }); 
       
     })
  }


    
    componentDidMount() 
        {  
            firebase.auth().onAuthStateChanged((user) => { this.setState({uid:user.uid})})
              this.getphoto();
                this.getComment();
                const { goBack } = this.props.navigation;
                BackHandler.addEventListener('hardwareBackPress2', function() {
                  goBack(null);
                  return true;
               });
        }
     
 
 
          renderCurrentState()
          {  
  
                return ( 
                  
                    <View style={{ flex: 1 }}>
                    <View style={styles.container} >
                      <ScrollView>
                         <View style={{flexDirection:'row'  }}>
                                    <Image
                                    style={{width: 50, height: 50 , borderRadius:90, marginTop:12 ,marginLeft:15}}
                                    source={{uri: 'http://vps477048.ovh.net/vows/'+this.state.owneravatar}}
                                    
                                    />
                
                                <Text style={{fontSize:20,color:'#FFF',marginLeft:35,marginBottom:20,fontWeight:'bold',marginTop:20}}>{this.state.ownername}</Text>
                          </View>
 
                        
                            <View style={{marginLeft:15,width:Dimensions.get('window').width-25,height:204,borderRadius:20,marginBottom:20,marginTop:20}}  >
                               
                                 <TouchableOpacity onPress={()=>this.openModal()}>
                                  <View style={{backgroundColor:'#3A4250',width:'100%',height:204,borderRadius:10,alignContent:'center'}} >
                               
                                      <Image source={{uri: 'http://vps477048.ovh.net/vows/'+this.state.thephoto  }}   style={{resizeMode:'cover',width:'100%',height:204,borderRadius:10}} />
                                   
                                 </View>
                     </TouchableOpacity>
                           </View>  

                           <Text style={{color:'white',fontSize:11,marginLeft:15,marginRight:10,width:'92%'}}>{this.state.description}</Text>
                           <View style={{flexDirection:'row'  }}>
                            <Text style={{color:'white',fontSize:14,marginLeft:15,marginRight:10,marginTop:30,fontWeight:'bold'}}>LET’S SHARE THIS</Text>
                            {this.state.liked ?
                            <TouchableOpacity onPress = {() => this.dislikephoto(this.state.idphoto)}
                                              style={{marginLeft:'50%'}}>
                              <Image source={require('../Assets/LikePhoto.png')}  style={{width:20,height:19,marginTop:30  }}/>
                            </TouchableOpacity>
                              :
                              <TouchableOpacity  onPress = {() => this.likephoto(this.state.idphoto)}
                              style={{marginLeft:'50%'}}>
                              <Image source={require('../Assets/LikeMedium.png')}  style={{width:20,height:19,marginTop:30  }}/>
                              </TouchableOpacity>
                          }
                          </View>
                          <View style={{marginBottom:100}}> 

                        {this.state.Nbcomments > 0  ? 
                            <View>
                    { this.state.comments.map((result, i) => {
                        return(
                            <View key={i}>
                                    {result.user_id != this.state.uid ? 
                                        <View>
                                            <Text style={{color:'white',fontSize:14,marginLeft:15,marginRight:10,marginTop:30,fontWeight:'bold'}}>{result.user.first_name}</Text>
                                            <View style={{marginTop:10,backgroundColor:'#3a4250',width:'50%',marginLeft:15,borderRadius:15,borderTopLeftRadius:0}}>
                                                <Text style={{color:'#fff',marginTop:11,marginLeft:15,marginBottom:11,fontWeight:'bold'}}>{result.comment}</Text>
                                                </View>
                                        </View>
                                        :
                                        <View>
                                            <Text style={{color:'white',fontSize:14,marginLeft:10,marginRight:15,marginTop:30,fontWeight:'bold',textAlign:'right'}}>{result.user.first_name}</Text>
                                            <View style={{marginTop:10,backgroundColor:'#3a4250',width:'50%',right:0,borderRadius:15,borderTopRightRadius:0,marginLeft:'46%'}}>
                                                <Text style={{color:'#fff',marginTop:11,marginRight:15,marginBottom:11,fontWeight:'bold',textAlign:'right'}}>{result.comment}</Text>
                                                </View>
                                        </View> 

                                        }
                            </View> )
                                        })}

                            </View>
                            : 
                            <View><Text style={{color:'white',fontSize:14,marginLeft:15,marginRight:10,marginTop:30,fontWeight:'bold'}}>No Comments</Text></View>
                        
                        
                        }
 



                          </View>
                          </ScrollView>
                        
                  
                        <Text></Text>


                        <Modal visible={this.state.modalVisible} transparent={true}  onRequestClose={() => this.closeModal()}>

                         <ImageViewer imageUrls={[{ url: 'http://vps477048.ovh.net/vows/'+this.state.thephoto}]}/>

                      </Modal>




                  </View>
                    <View style={styles.bottomNavigation}>
                      <View style={{flexDirection:'row'  }}>
                        <RkTextInput 
                              rkType='bordered ' 
                              placeholder='Enter Message'
                              placeholderTextColor = '#fff'
                              color = '#fff'
                              style={{backgroundColor:'#ccc',marginLeft:20,width:241,height:48,marginTop:10,borderRadius:10}} 
                              onChangeText={(comment) => this.setState({comment})}
                              value={this.state.comment} 
                                />

                        <RkButton  style={{marginTop:19,backgroundColor: '#ccc',width:72,height:29,marginLeft:15}}
                                    contentStyle={{color: '#6B3064'}}
                                    onPress={() => this.setComment() } > SEND</RkButton>

                      </View>

                  </View>
                   
               </View>
                 
                )
        

        }
 

    render(){
      
        const { navigate } = this.props.navigation;
       
        return (
          
            <View style={styles.container}>
        {this.renderCurrentState()}
             </View>
        );
    }

}
 
 

const styles = StyleSheet.create({
    container: {
        height:Dimensions.get('window').height-76,
      backgroundColor:'#282f3b',
 
    },
    bottomNavigation: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 70,
        backgroundColor:'#1d232d'
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
    form :{
      flex: 1 ,
    },
    item: {
      flex: 1,
      height: 160,
      margin: 1
    },
    list: {
      flex: 1
    },
  });