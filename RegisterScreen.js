import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,Picker , Image,Dimensions , KeyboardAvoidingView, TouchableOpacity, ScrollView} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {RkTextInput,RkText} from 'react-native-ui-kitten';

 
export default class RegisterScreen extends React.Component {
   
    static navigationOptions = {
        headerStyle : {display:"none"}
    }
    state = {
        email : '',
        password: '',
        authenticating: false,
        name  :'',
        gender:'',
        phone : '',
        steps : 1 ,
        MaleOpacity :1,
        FemaleOpacity : 1,
      }
    
      setstep2(){
          this.setState({
              steps : 2
          })
          this.renderCurrentState();
      }
      
      
      setstep3()
      {

        this.setState({
            steps : 3
        })
        this.renderCurrentState();

    }

    setfemale()
    {
        
        this.setState({FemaleOpacity:0.5,gender:'female',MaleOpacity:1})
    }

    setmale()
    {
        this.setState({MaleOpacity:0.5,gender:'male',FemaleOpacity:1}) 
    }
    
    setstep4(){
            if ((this.state.name != '') && (this.state.gender != ''))
            {
                this.setState({
                    steps : 4
                })
            }else {
                
                alert('Please enter your name and gender')
            }
       
         
    } 

    whenregister()
    {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                
                fetch('http://vps477048.ovh.net/vows/webservice/signup', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        UID: user.uid ,
                        email: user.email ,
                        gender : this.state.gender ,
                        first_name : this.state.name ,
                        phone : this.state.phone,
                    })
                    
                    })
                    .then(response => console.log(response))
                    .then(response => { 
                            
                        FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));
                        FCM.getFCMToken().then(token => {
                          fetch('http://vps477048.ovh.net/vows/webservice/settoken/', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                user_id : user.uid ,
                                token : token,
                            }),
                            })
                            .then(response => response.json())
                            .then(response => { 
                           
                             navigate('Partner');
                            })
                            .catch((error) => {
                                console.log(error);
                            }); 
                           
                      }); 
                    })
                    .catch((error) => {
                        console.log(error);
                    });          
            }
        })
    }
    
      componentDidMount()
      {
        firebase.auth().signOut();
        const { navigate } = this.props.navigation;

    }

   

          onPressSignUp(){
        
            const { navigate } = this.props.navigation;
            const{email,password} = this.state;
            if (this.state.email == '') 
            {
                alert('Please enter your email');
                return false ;
            } 
            if (this.state.phone == '') 
            {
                alert('Please enter your phone number');
                return false ;
            } 
            if (this.state.password == '')  
            {
                alert('Please enter a Password');
                return false ;
            } 
            if (this.state.password.length < 6)  
            {
                alert('Password should be 6 characters at least');
                return false ;
            } 
            this.setState({authenticating:true})
          
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(() => { 
               
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        
                        fetch('http://vps477048.ovh.net/vows/webservice/signup', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                UID: user.uid ,
                                email: user.email ,
                                gender : this.state.gender ,
                                first_name : this.state.name ,
                                phone : this.state.phone,
                            })
                            
                            })
                            .then(response => console.log(response))
                            .then(response => { 
                                    
                                FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));
                                FCM.getFCMToken().then(token => {
                                  fetch('http://vps477048.ovh.net/vows/webservice/settoken/', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        user_id : user.uid ,
                                        token : token,
                                    }),
                                    })
                                    .then(response => response.json())
                                    .then(response => { 
                                   
                                     navigate('Partner');
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    }); 
                                   
                              }); 
                            })
                            .catch((error) => {
                                console.log(error);
                            });          
                    }
                })
              
            })
            .catch((error) => { 
                this.setState({authenticating:false})
                alert(error, 'Error Creating User');
            })
          }

          renderCurrentState(){
            const { navigate } = this.props.navigation;
          
            if (this.state.authenticating){
        
              return(
                <View  style={{flexDirection:'row',justifyContent:'center',alignItems:'center' ,height:Dimensions.get('window').height}}>
                  <ActivityIndicator size='large' />
                </View>
        
              )
            }
            if (this.state.steps == 1 )
            {
            return (
                <ScrollView>
                <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row' }}>
                <Image source={require('../Assets/VowsLogo.png')}  style={{width:186,height:68,marginTop:'10%',marginBottom:15, }}/>
                 </View>
                 <Text style={{fontSize:20,color:'#FFF',margin:35,marginBottom:22,marginLeft:45,marginTop:60,fontFamily:'Roboto-Regular'}}>Create an Account</Text>
                
                <View style={{backgroundColor:'#fff',marginLeft:30,marginRight:30,height:280,borderRadius:20}}>
                
                <View style={{margin:35,marginBottom:0}}>
                <Text style={{fontSize:11,color:'#735d78',fontFamily:'Roboto-Regular'}}>Your Name</Text>
               <RkTextInput 
               placeholder='Your Name' 
               rkType='bordered'
               style={{backgroundColor:'#e1e1e1',height:35}} 
               inputStyle = {{fontSize:11,marginTop:0,padding:0}} 
                onChangeText={name => this.setState({name})} 
                value={this.state.name} />
                </View>

                    <View style={{ flexDirection: 'row' , justifyContent:'center',padding:40}}>
                    <TouchableOpacity onPress={() => this.setfemale() } >
                    <View style={{backgroundColor:'#e1e1e1',width:58,height:59, justifyContent:'center',flexDirection: 'row' ,marginRight:31 ,borderRadius:10,opacity:this.state.FemaleOpacity }}    >
                    <Image source={require('../Assets/FemaleIcon.png')}  style={{ width:22,height:33 ,marginTop:13 }}/>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.setmale() }>
                    <View style={{backgroundColor:'#e1e1e1',width:58,height:59 , justifyContent:'center',flexDirection: 'row'  ,borderRadius:10,opacity:this.state.MaleOpacity}}   >
                    <Image source={require('../Assets/MaleIcon.png')}  style={{  width:22,height:28,marginTop:16}} />
                    </View>
                    </TouchableOpacity>

                    </View>
                
                  
                <Text style={{position:'absolute',right:26,bottom:17,fontSize:14,color:'#6b3064',fontFamily:'Roboto-Bold'}} onPress={() => this.setstep4()}>NEXT </Text>
              </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:40}}>
                   
                        <Text style={{color:'#ffffff',fontFamily:'Roboto-Regular'}} onPress={() => navigate('Login')}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigate('Login')} >
                            <Text style={{color:'#ffffff',marginLeft:10,fontFamily:'Roboto-Regular'}} > Log In</Text>
                        </TouchableOpacity>
                    </View>



                </ScrollView>
              )
            }
 
            if (this.state.steps == 4 )
            {
            return (
                <ScrollView >
                <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row',marginTop:20,marginBottom:40}}>
                <Image source={require('../Assets/VowsLogo.png')}  style={{width:186,height:68,marginTop:'10%',marginBottom:10 }}/>
               
                 </View>
                 <Text style={{fontSize:20,color:'#FFF',margin:35,marginBottom:22,marginLeft:45 ,fontFamily:'Roboto-Regular' }}>Create an Account</Text>
                <KeyboardAvoidingView style={{backgroundColor:'#fff',marginLeft:30,marginRight:30,height:280,borderRadius:20}}  behavior='padding'>
                
               
                <KeyboardAvoidingView style={{marginRight:35,marginLeft:35,marginTop:20,marginBottom:0}}>

                <Text style={{fontSize:11,color:'#735d78',fontFamily:'Roboto-Regular'}}>Email Address</Text>

               <RkTextInput 
               placeholder='Your Email' 
               rkType='bordered' 
               style={{backgroundColor:'#e1e1e1',height:35}} 
               inputStyle = {{fontSize:11,marginTop:0,padding:0}}
               onChangeText={email => this.setState({email})} 
               value={this.state.email} />

                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={{marginRight:35,marginLeft:35,marginBottom:0}}>
                
                <Text style={{fontSize:11,color:'#735d78',fontFamily:'Roboto-Regular'}}>Phone Number</Text>
             
               <RkTextInput 
               placeholder='Your Phone Number' 
               rkType='bordered' 
               label={'+ 966 |'}
               labelStyle={{color: 'gray',fontSize:11,marginLeft:12,}}
               style={{backgroundColor:'#e1e1e1',height:35}} 
               inputStyle = {{fontSize:11,marginTop:4,padding:0}}
               onChangeText={phone => this.setState({phone})} 
               value={this.state.phone} />

                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={{marginRight:35,marginLeft:35,marginBottom:0}}>

                <Text style={{fontSize:11,color:'#735d78',fontFamily:'Roboto-Regular'}}>Password</Text>

               <RkTextInput 
               placeholder='Your Password' 
               rkType='bordered' 
               style={{backgroundColor:'#e1e1e1',height:35}} 
               inputStyle = {{fontSize:11,marginTop:0,padding:0}}  
               onChangeText={password => this.setState({password})} 
               value={this.state.password} 
               secureTextEntry={true} />
                
                </KeyboardAvoidingView>

                <Text style={{position:'absolute',right:0,bottom:0,marginBottom:15,marginRight:25,fontSize:14,color:'#6b3064',fontFamily:'Roboto-Bold'}} onPress={() => this.onPressSignUp()}>SUBMIT </Text>
              
              </KeyboardAvoidingView>

              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:40}}>
                        <Text style={{color:'#ffffff'}} onPress={() => navigate('Login')}>Already Have An Account ? </Text><Text style={{color:'#ffffff',marginLeft:20}} onPress={() => navigate('Login')}> Login</Text>

              </View>

                </ScrollView>
              )
            }
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
      flex: 1, 
      backgroundColor : '#6b3064' ,
    },
    form :{
      flex: 1 ,
    },
    img :{
        flex: 1 ,
      }
 
  });