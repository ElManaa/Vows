import React from 'react';
import { ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  BackAndroid,
  BackHandler,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Modal,Button} from 'react-native';
import { Input } from '../components/Input';
 
import firebase from '../components/FireBase';
import {RkTextInput,RkText,RkAvoidKeyboard,RkButton} from 'react-native-ui-kitten';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-picker';
import SendSMS from 'react-native-sms';

class UselessTextInput extends React.Component {
  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable = {true}
        maxLength = {100}
      />
    );
  }
}

export default class AddVowsScreen extends React.Component {
  static navigationOptions = {
    headerStyle : {display:"none"}
}
    constructor(props) {
      super(props);
      this.state = {
        checking : false,
        thevow : '',
        avatarSource: '',
        modalVisible: false,
        modalVisibleHelp : false ,
        UID : '',
        finaluri:'',
    
      };
    }

    componentDidMount() 
    {

      console.log('what we got ' +this.props.navigation.state.params.partnerphone);
  
      
    }

    openhelpmodal()
    {
      this.setState({modalVisibleHelp:true})
    }

    closehelpmodal()
    {
      this.setState({modalVisibleHelp:false})
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


    sendSMS ()
    {
       if (this.state.thevow =='')
       {
         alert('You need to write at least 1 Vow');
         return false
       }
       
      var partnerphone = this.props.navigation.state.params.partnerphone ;
      console.log('var in SMS ' + partnerphone);
      const { navigate } = this.props.navigation;
      firebase.auth().onAuthStateChanged((user) => {
      fetch('http://vps477048.ovh.net/vows/webservice/matchphone/'+user.uid, {
        method: 'POST',
        headers: {
              Accept: 'application/json',
             'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone: partnerphone ,
        })
        })
        .then(response => response.json())
        .then(response => { 
              console.log(response);
          SendSMS.send({
            body: 'This is a Test link  https://this-is-a-test-link.com',
            recipients: [ partnerphone ],
            successTypes: ['sent', 'queued']
        }, (completed, cancelled, error) => {
            this.setVows()
          
            this.renderCurrentState();
        });


        })
        .catch((error) => {
            console.log(error);
        }); 
      })
    }

    openModal() {
      this.setState({modalVisible:true});
      
    }
  
    closeModal() {
      const { navigate } = this.props.navigation;
      this.setState({modalVisible:false});
      navigate('Birthday');
    }
 

    uploadimg(idvows)
    {
      const { navigate } = this.props.navigation;
        const data = new FormData(); 
        if (this.state.finaluri != '')
        {
      
          data.append('image', {
            uri: this.state.finaluri ,
            type: 'image/jpeg',  
            name: 'image'
          });

          fetch('http://vps477048.ovh.net/vows/webservice/setprofileimg/'+idvows, {
            method: 'post',
            body: data
          })
          .then(res => {
            console.log(res)
            navigate('Birthday');
          })
          .catch((error) => {
            console.log(error);
          });
        
           
        } 
      
    }



    setVows ()
    {
      const data = new FormData();
      data.append('image', {
        uri: this.state.avatarSource.uri ,
        type: 'image/jpeg',  
        name: 'image'
      });
      const { navigate } = this.props.navigation;
      this.setState({checking : true });

      this.renderCurrentState();

      firebase.auth().onAuthStateChanged((user) => {
        if (user) { 
          fetch('http://vps477048.ovh.net/vows/webservice/setvows/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id : user.uid ,  
              vow : this.state.thevow, 
 
             })
           

            })
            .then(response => response.json())
            .then(response => {
                if (response)
                
                        this.setState({checking : false });
                  
                        
                        this.uploadimg(user.uid);
                       this.openModal(); 
            })

            .catch((error) => {
                console.log(error);
            }); 

        }
      })
    }

    renderCurrentState(){
        
        const { navigate } = this.props.navigation;

        if (this.state.checking){
    
          return(
            <View  style={styles.container}>
              <ActivityIndicator size='large' />
            </View>
    
          )
    
        } else{

          if (this.state.avatarSource != "" ) 
          {
            return (
            <View >
            <View style={{justifyContent:'center',alignContent:'center'}}>
            <Image source={require('../Assets/CoupleBackground.png')}  style={{width:Dimensions.get('window').width,height:300,}}/>
           
             </View>
           
           
             <View style={{backgroundColor:'#fff',marginLeft:30,marginRight:30,borderRadius:20,height:322,marginBottom:100,marginTop:30}}  behavior='padding'>
             <Text 
             style={{position:'absolute',right:18 ,marginTop:28,fontSize:10,color:'#6b3064',textAlign:'center'}} 
             onPress={() => this.imagepicker()}>Add your profile {"\n"}image</Text>
              <Text style={{fontSize:20,color:'#6b3064',marginLeft:28,marginBottom:20,fontFamily:'Roboto-Bold',marginTop:17}}>Renew your Vows</Text>
              <View style={{marginRight:35,marginLeft:35,marginTop:0,marginBottom:24}}>
              
              <RkTextInput 
              placeholder='Write Your Vow' rkType='bordered' 
              style={{backgroundColor:'#e1e1e1' ,height:196}} 
              onChangeText={(thevow) => this.setState({thevow})}
              inputStyle = {{fontSize:12,marginTop:0,padding:0}} 
              value={this.state.thevow} 
              multiline = {true}
                />
  
              </View>
          
              <Text 
            style={{position:'absolute',right:31,bottom:26, fontSize:14,color:'#6b3064',fontFamily:'Roboto-Bold' }} 
            onPress={() => this.sendSMS()}>SEND</Text>
            <Text 
            style={{position:'absolute',bottom:28,left:31 ,fontSize:12,color:'#6b3064',fontFamily:'Roboto-Bold' }} 
            onPress = {() => this.openhelpmodal()}> Help Exemples </Text>
           </View>
           <View style={{position:'absolute',marginBottom:0,marginTop:295,right:0,marginRight:55}}>
        
            <Image
              style={{width: 58, height: 58 , borderRadius:90 ,}}
              source={this.state.avatarSource}
              onPress={() => this.imagepicker()}
              />
           </View>
          <Modal
             transparent= {true}
                visible={this.state.modalVisible}
                animationType={'fade'}
                onRequestClose={() => this.closeModal()}
                style={{width:'50%'}}
            >
              <View style={styles.modalContainer}>
                <View style={styles.innerContainer}>
                  <Text style={{color:'#834ca4',fontSize:24,marginBottom:25,marginTop:20}}>Invitation Sent</Text>
                  <Text style={{color:'#834ca4',fontSize:18}}>We sent a warm invitation to  </Text>
                  <Text style={{color:'#834ca4',fontSize:18}}> Jana. We’ll let you know  </Text>
                  <Text style={{color:'#834ca4',fontSize:18,marginBottom:70}}>   when she log in  </Text>
                  <Text  style={{position:'absolute',color:'#834ca4',fontSize:18,bottom:0,right:0,marginRight:40,marginBottom:23}} onPress={() => this.closeModal()}>Ok</Text>
                  
                </View>
              </View>
            </Modal> 
          
          </View> 
          ) 

          }

          return (
            
            <View >
            <View style={{justifyContent:'center',alignContent:'center'}}>
            <Image source={require('../Assets/CoupleBackground.png')}  style={{width:Dimensions.get('window').width,height:300,}}/>
           
             </View>
            
           
            <View style={{backgroundColor:'#fff',marginLeft:30,marginRight:30,borderRadius:20,height:322,marginBottom:100,marginTop:30}}  behavior='padding'>
            <Text 
            style={{position:'absolute',right:18 ,marginTop:28,fontSize:10,color:'#6b3064',textAlign:'center'}} 
            onPress={() => this.imagepicker()}>Add your profile {"\n"}image</Text>
             <Text style={{fontSize:20,color:'#6b3064',marginLeft:28,marginBottom:20,fontFamily:'Roboto-Bold',marginTop:17}}>Renew your Vows</Text>
            <View style={{marginRight:35,marginLeft:35,marginTop:0,marginBottom:24}}>
            
            <RkTextInput 
            placeholder='Write Your Vow' rkType='bordered' 
            style={{backgroundColor:'#e1e1e1' ,height:196}} 
            onChangeText={(thevow) => this.setState({thevow})}
            inputStyle = {{fontSize:12,marginTop:0,padding:0}} 
            value={this.state.thevow} 
            multiline = {true}
              />

            </View>
          
            <Text 
            style={{position:'absolute',right:31,bottom:26, fontSize:14,color:'#6b3064',fontFamily:'Roboto-Bold' }} 
            onPress={() => this.sendSMS()}>SEND </Text>
            <Text 
            style={{position:'absolute',bottom:28,left:31 ,fontSize:12,color:'#6b3064',fontFamily:'Roboto-Bold' }} 
            onPress = {() => this.openhelpmodal()}> Help Exemples </Text>
           </View>
           <View style={{position:'absolute',marginBottom:0,marginTop:295,right:0,marginRight:56}}>
           <RkButton
            rkType='circle' 
            style={{width:58,height:58,backgroundColor:'#d8d8d8' }} 
            onPress={() => this.imagepicker()}>
             {/* + */}
            </RkButton>
           </View>

          <Modal
             transparent= {true}
             visible={this.state.modalVisible}
             animationType={'fade'}
             onRequestClose={() => this.closeModal()}
             style={{width:'50%'}}
            >
              <View style={styles.modalContainer}>
                <View style={styles.innerContainer}>
                  <Text style={{color:'#834ca4',fontSize:24,marginBottom:25,marginTop:20}}>Invitation Sent</Text>
                  <Text style={{color:'#834ca4',fontSize:18}}>We sent a warm invitation to  </Text>
                  <Text style={{color:'#834ca4',fontSize:18}}> Jana. We’ll let you know  </Text>
                  <Text style={{color:'#834ca4',fontSize:18,marginBottom:70}}>   when she log in  </Text>
                  <Text  style={{position:'absolute',color:'#834ca4',fontSize:18,bottom:0,right:0,marginRight:40,marginBottom:23}} onPress={() => this.closeModal()}>Ok</Text>
                  
                </View>
              </View>
            </Modal>

            <Modal
             transparent= {true}
             visible={this.state.modalVisibleHelp}
             animationType={'fade'}
             onRequestClose={() => this.closehelpmodal()}
             style={{width:'50%'}}
            >
              <View style={styles.modalContainer}>
                <View style={styles.innerContainerH}>
                  <Text style={{color:'#834ca4',fontSize:21,marginBottom:25,marginTop:20,fontFamily:'Roboto-Bold',textAlign:'center'}}>Help examples</Text>
                  <Text style={{color:'#656d75',fontSize:12,textAlign:'right',marginRight:40,marginLeft:30,marginTop:40}}>
                  ".....اعاهدك باني احبك للابد يا حبيبي...."{"\n"}
                    في كل لحظه من لحظات حياتي وأنا أحلم بأنك معي {"\n"}
                    وفي كل ثانية من كلامي معك وأنا غارقة في حنــــــــــان صوتك الدافئ {"\n"}
                    فقلبي هو المرسى {"\n"}
                    ونبضي هو مركبك {"\n"}
                    وعيناي هي المنارة التي سترشدك الى طريق قلبي {"\n"} </Text>
                  <Text style={{color:'#ce95ff',fontWeight:'500'}}>__________________________</Text>

                  <Text style={{color:'#656d75',marginTop:20,fontSize:12,textAlign:'right',marginRight:40,marginLeft:30,marginBottom:50}}>
                  ".....اعاهدك باني احبك للابد يا حبيبي...."{"\n"}
                    في كل لحظه من لحظات حياتي وأنا أحلم بأنك معي {"\n"}
                    وفي كل ثانية من كلامي معك وأنا غارقة في حنــــــــــان صوتك الدافئ {"\n"}
                    فقلبي هو المرسى {"\n"}
                    ونبضي هو مركبك {"\n"}
                    وعيناي هي المنارة التي سترشدك الى طريق قلبي {"\n"} </Text>
                  <Text  style={{ color:'#834ca4',fontSize:17,textAlign:'center',marginBottom:23,fontFamily:'Roboto-Bold'}} onPress={() => this.closehelpmodal()}>CLOSE</Text>
                  
                </View>
              </View>
            </Modal>
          
            </View>

          ) 
        }
    }



    render()
    {
        
       const { navigate } = this.props.navigation;
       return (
        <View style={styles.container}>
        
                    {this.renderCurrentState()}
                  </View>
              )
     }

}







const styles = StyleSheet.create({
  
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center', 
          backgroundColor : '#6b3064' ,
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
        innerContainerH: {
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius : 10,
          alignContent:'center',
          justifyContent: 'center' ,
          marginLeft : 30,
          marginRight : 30
        },
  
        paragraph: {
          margin: 24,
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#34495e',
        },
      });