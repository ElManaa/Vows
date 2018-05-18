import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,Image,Dimensions, TouchableOpacity,Modal, BackHandler, ScrollView} from 'react-native';

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
import ImageResizer from 'react-native-image-resizer';

export default class  AlbumScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerStyle : {backgroundColor:"#1D232D"},
 
        headerTintColor: 'white',
        headerTitleStyle: { color: 'white',marginLeft:'36%' },
        headerRight: (
            <TouchableOpacity
            onPress={() => {navigation.state.params.openModal()}}
              style={{ paddingRight: 5 }}>
               <Icon name={"add-circle"} size={30} color={"#fff"} />
            </TouchableOpacity>
        )
 });
  
   
  constructor(props) {  
    super(props);
    this.state = {
      avatarSource: '',
      modalVisible: false,
      pickedValue:'' ,
      pikerVisible : false ,
      ActivityIndicatorVisible : false ,
      albumname : '',
      NumberAlbums : 0 ,
      myphotos : [],
      hisphotos : [],
      myavatar : '',
      myname : '',
      partneravatar : '',
      partnername : '',
      iscompressing : false,
      activeT : 1 ,
      date:"2018-04-27",
      finaluri :'',
            }

            this.props.navigation.setParams({
                openModal: this.openModal.bind(this)
              });
    }
  
  // More info on all the options is below in the README...just some common use cases shown here
  openModal() {
    this.setState({modalVisible:true});
    
  }

  closeModal() {
   
    this.setState({modalVisible:false});

  }
  
  async openAndroidDatePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      });
  
        console ( year +' '+ month + ' ' + ' day ' + day)
    
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }


  getphotos () 
  {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('http://vps477048.ovh.net/vows/webservice/getphotos/'+this.props.navigation.state.params.idalbum + '/'+user.uid)
      fetch('http://vps477048.ovh.net/vows/webservice/getphotos/'+this.props.navigation.state.params.idalbum + '/'+user.uid, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    
        }) 
      
        .then(response => { 
          response = response._bodyInit ;
          response = JSON.parse(response);
     
            console.log (response.me[0]);
          this.setState({myphotos:response.mine});
          this.setState({hisphotos:response.his});

          this.setState({myavatar:response.me[0].image});
          this.setState({partneravatar:response.partner[0].image});

          this.setState({myname:response.me[0].first_name});
          this.setState({partnername:response.partner[0].first_name});
 
          this.setState({NumberAlbums:response.mine.length + response.his.length});
   
        
           
        })
        .catch((error) => {
            console.log(error);
        }); 
       
     })
  }


  imagepicker (){
      
        options = {
        title: 'Select Avatar',
        customButtons: [
            {name: 'fb', title: 'Choose Photo from Facebook'},
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
        };
   
      ImagePicker.showImagePicker(options, (response) => {
      
        console.log('Response = ', response);
        this.setState({iscompressing:true});
        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };
      
          ImageResizer.createResizedImage(source.uri, response.width/3, response.height/3, 'JPEG',30,0).then((response) => {
            console.log ('URI ' + response.uri)  
            console.log ('size ' + response.size) 
            this.setState({
            finaluri: response.uri
           });
           this.setState({iscompressing:false});
           }).catch((err) => {
  
           });
      
          this.setState({
            avatarSource: source
          });
        this.renderCurrentState();
          console.log('SOurce : ' + this.state.avatarSource);
        }
      });
 }
      
    componentDidMount() 
        {  
            this.props.navigation.setParams({
                openModal: this.openModal.bind(this)
              });
              const { navigate } = this.props.navigation;
              BackHandler.addEventListener('hardwareBackPress', function() {
                  navigate('Gallery');
                return true;
             });
              this.getphotos();
            
        }
     

        setphotoimg(idalbum)
        {
          const data = new FormData();
    
          data.append('image', {
            uri: this.state.finaluri ,
            type: 'image/jpeg',  
            name: 'image'
          });

          fetch('http://vps477048.ovh.net/vows/webservice/setphotoimg/'+idalbum, {
            method: 'post',
            body: data
          })
          .then(res => {
            console.log(res)
            
            this.setState({ modalVisible:false,
                            ActivityIndicatorVisible:false ,
                            albumname : '',
                            avatarSource : '', 
                            finaluri :''});
                            this.getphotos();
          })
          .catch((error) => {
            console.log(error);
          });  
        }
        saveDetails() {
          
        }
    
        Createphoto(){
          if (this.state.finaluri == '')
          {
            if (this.state.iscompressing)
            {
              alert('Please wait until uploading ends');
              return false ;
            }
            alert('You need to upload a picture first');
            return false ;
          }
         
          this.setState({ActivityIndicatorVisible:true});
          firebase.auth().onAuthStateChanged((user) => {
            console.log('UserId ' + user.uid + ' Album ' + this.state.albumname + ' Created ' + this.state.date);
            fetch('http://vps477048.ovh.net/vows/webservice/setphoto/', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id : user.uid ,
                description : this.state.albumname ,
                created : this.state.date ,
                album_id : this.props.navigation.state.params.idalbum
               }),
              }) 
              .then(response => response.json())
              .then(response => { 
                   
                       
               console.log(response);

               this.setphotoimg(response.id_photo);
            
                 

              })
              .catch((error) => {
                  console.log(error);
              }); 
            

           })
         
        }
      
   
        renderalbums()
        {
          var Albums = [];

          for( let i = 0 ; i < this.state.NumberAlbums ; i++ ){
            
            Albums.push(

                 <View  key={i}  style={{marginLeft:15,width:157,height:168,borderRadius:20,marginBottom:100,marginTop:20}}  >
                      <TouchableOpacity onPress={() => this.openModal()}>
                          <View style={{backgroundColor:'#3A4250',width:157,height:168,borderRadius:10,alignContent:'center'}} >
                             <Image source={{uri: 'http://vps477048.ovh.net/vows/'+this.state.Albums[i].image  }}   style={{resizeMode:'stretch',width:157,height:168,borderRadius:50}} />
                             <Text style={{color:'white',fontWeight:'normal',fontSize:14,marginTop:18,marginLeft:45}}>Add Photo</Text>
                          </View>
                      </TouchableOpacity>
                </View>
               
                )
              }
              return (
                <View >{Albums}</View>)
        }
      
 
          renderCurrentState()
          {  
            const { navigate } = this.props.navigation;
              if (this.state.NumberAlbums > 0 )
               {
               
                return ( 
                  
                    <View style={{ flex: 1 }}>
                      <View style={styles.container} >
                       <ScrollView>
                          <View style={{flexDirection:'row'  }}>
                                    <Image
                                    style={{width: 50, height: 50 , borderRadius:90, marginTop:12 ,marginLeft:15}}
                                    source={{uri: 'http://vps477048.ovh.net/vows/'+this.state.myavatar}}
                                    
                                    />
                
                                <Text style={{fontSize:20,color:'#FFF',marginLeft:35,marginBottom:20,fontWeight:'bold',marginTop:20}}>{this.state.myname}</Text>
                          </View>
                      
                          <ScrollView horizontal={true} style={{marginBottom:50}}>
                         
                       
                         {this.state.myphotos.map((result, i) => {
                          
                           return (
                            <View key={i} style={{marginLeft:15,width:157,height:168,borderRadius:20,marginBottom:50,marginTop:20}}  >
                              <TouchableOpacity onPress={() => navigate('Photo',{idphoto:result.id_photo})}>
                                  <View style={{backgroundColor:'#3A4250',width:157,height:168,borderRadius:10,alignContent:'center'}} >
                                      <Image source={{uri: 'http://vps477048.ovh.net/vows/'+result.image  }}   style={{resizeMode:'stretch',width:157,height:168,borderRadius:50}} />
                                        <Text style={{color:'white',fontWeight:'normal',fontSize:14,marginTop:18,marginLeft:45}}>Add Photo</Text>
                                 </View>
                             </TouchableOpacity>
                           </View> 
                           )
                            
                         })}
                         
                          </ScrollView >
      
                          <View style={{flexDirection:'row' ,marginTop:-40 }}>
                                    <Image
                                    style={{width: 50, height: 50 , borderRadius:90, marginTop:12 ,marginLeft:15}}
                                    source={{uri: 'http://vps477048.ovh.net/vows/'+this.state.partneravatar}}
                                    
                                    />
                
                                <Text style={{fontSize:20,color:'#FFF',marginLeft:35,marginBottom:20,fontWeight:'bold',marginTop:20}}>{this.state.partnername}</Text>
                          </View>
                      
                    

                          <ScrollView horizontal={true} style={{marginBottom:50}}>
                         
                       
                         {this.state.hisphotos.map((result, i) => {
                          
                           return (
                            <View key={i} style={{marginLeft:15,width:157,height:168,borderRadius:20,marginBottom:50,marginTop:20}}  >
                              <TouchableOpacity onPress={() => navigate('Photo',{idphoto:result.id_photo})}>
                                  <View style={{backgroundColor:'#3A4250',width:157,height:168,borderRadius:10,alignContent:'center'}} >
                                      <Image source={{uri: 'http://vps477048.ovh.net/vows/'+result.image  }}   style={{resizeMode:'stretch',width:157,height:168,borderRadius:50}} />
                                        <Text style={{color:'white',fontWeight:'normal',fontSize:14,marginTop:18,marginLeft:45}}>Add Photo</Text>
                                 </View>
                             </TouchableOpacity>
                           </View> 
                           ) 
                         })}
                         
                          </ScrollView >


                          </ScrollView>
                        
                  
                   
                 
                  </View>
                    
                   
                          </View>
                 
                )
              }
           return (
              
            <View  >
            <Text style={{color:'white',fontSize:16,fontWeight:'bold',textAlign:'center',marginRight:10,marginLeft:10,marginTop:35}}>Share moments of you together or ones you would only want them to see. </Text>
            
            <TouchableOpacity onPress={() => this.openModal()}>
                <View style={{backgroundColor:'#3A4250',width:157,height:152,marginTop:30,marginLeft:'27%',borderRadius:10,alignContent:'center'}} >
                <Image source={require('../Assets/AddImageAlbum.png')}  style={{width:55,height:43 ,marginTop:40,marginLeft:51}} />
                <Text style={{color:'white',fontWeight:'normal',fontSize:14,marginTop:18,marginLeft:45}}>Add Photo</Text>
                </View>
            </TouchableOpacity>
           
            
             </View>
            
             )

        }
 

    render(){
      
        const { navigate } = this.props.navigation;
       
        return (
          
            <View style={styles.container}>
        {this.renderCurrentState()}
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
            <Modal
                        transparent= {true}
                        visible={this.state.modalVisible}
                        animationType={'fade'}
                        onRequestClose={() => this.closeModal()}
                        style={{width:'50%'}}
                          >
                       <View style={styles.modalContainer}>
                       <View style={styles.innerContainer}>
                       { this.state.ActivityIndicatorVisible ? <ActivityIndicator size='large' /> :
                          <View style={{alignItems: 'center', alignContent:'center',justifyContent: 'center' }}>
                      

                         <Text style={{color:'#834ca4',fontSize:18,marginTop:25,marginBottom:20,fontWeight:'bold'}}>Create New Album</Text> 
                         <Text style={{color:'#834ca4',fontSize:18,}}>Photo Description</Text> 
                          
                         <RkTextInput 
                         rkType='bordered' 
                         style={{backgroundColor:'#e1e1e1',marginLeft:40,marginRight:40}} 
                         onChangeText={(albumname) => this.setState({albumname})}
                         value={this.state.albumname} 
                            />

                          <Text style={{color:'#834ca4',fontSize:18,marginTop:18}}>Photos Date</Text> 
                          
                          <DatePicker
                            style={{width:250  ,marginTop:10, marginLeft:30,  marginRight:50 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="1960-01-01"
                            maxDate="2050-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                                },
                                dateInput: {
                                marginLeft: 36
                                }
                            
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                            />


                          <Text style={{color:'#834ca4',fontSize:18,textAlign:'center',marginTop:20}}>IMAGE</Text> 
                          
                             {this.state.finaluri != "" ?
                           <Text  style={{color:'green',fontSize:18,textAlign:'center',marginBottom:80}}  >UPLOADED</Text> 
                           :   
                           <Text  style={{color:'#834ca4',fontSize:18,textAlign:'center',marginBottom:80,marginTop:20,fontWeight:'500'}} onPress={() => this.imagepicker()}>SELECT IMAGE</Text> 
                        
                           }

                           <Text  style={{position:'absolute',color:'#834ca4',fontSize:18,bottom:0,right:0,marginRight:30,marginBottom:23}} onPress={() => this.Createphoto()}>CREATE</Text>
                           <Text  style={{position:'absolute',color:'#834ca4',fontSize:18,bottom:0,left:0,marginLeft:30,marginBottom:23}} onPress={() => this.closeModal()}>CANCEL</Text>
                     
                           </View>
                          }
                     </View>
                      </View>
                    </Modal>
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