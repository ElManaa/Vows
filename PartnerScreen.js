import React from 'react';
import { ActivityIndicator,
 Platform,
 StyleSheet,
 Text,
 View , 
 DatePickerAndroid,
 Image,
 KeyboardAvoidingView,
 Dimensions,
 Modal} from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {RkTextInput,RkText} from 'react-native-ui-kitten';
import SendSMS from 'react-native-sms';

export default class PartnerScreen extends React.Component {
 
  static navigationOptions = {
    headerStyle : {display:"none"}
}
    state = {
       partnerfound : false,
       partnerPhone : '',
       partnerName : '', 
       partnerImage : '',
       UID : '' ,
       modalVisible: false,
       email : '',
       init : firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({UID: user.uid,
                         email: user.email})
        }
       }),
       steps: 1 ,
       miragedate:'',
       date:"2017-12-15"
      };
      


      openModal() {
        this.setState({modalVisible:true});
        
      }
    
      closeModal() {
        const { navigate } = this.props.navigation;
        this.setState({modalVisible:false});
        if (this.state.partnerName == '')
        {
          alert('Partner name is Required');
          return false ;
        }
      
        if (this.state.partnerPhone == '' )
        {
          alert('Partner Phone Number is Required');
          return false ;
        }

        var number = this.state.partnerPhone ; 
        
        navigate('AddVows',{partnerphone:number});
      }



      componentDidMount() 
      {
        this.setState({steps:1});
        console.log('Current States : Steps '+ this.state.steps + ' ModalVisible ' + this.state.modalVisible)
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            fetch('http://vps477048.ovh.net/vows/webservice/checkmatch/'+this.state.UID, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              })
              .then(response => response.json())
              .then(response => { 
                console.log('Response Check Match '+ response);
                  if (response != null)
                  {
                    console.log('Setting Partner Found True')
                     this.setState({
                      partnerfound: true,
                      partnerName : response.first_name,
                      partnerPhone: response.phone,
                      partnerImage : response.image,
                       
                     });
                     this.getmirage();
                     this.renderCurrentState();
                 }
              })
              .catch((error) => {
                  console.log(error);
              }); 
          }
         })
      }
  
      setmirage()
      {
        const { navigate } = this.props.navigation;
        fetch('http://vps477048.ovh.net/vows/webservice/setmirage/'+this.state.UID, {
          method: 'POST',
          headers: {
               Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date : this.state.date ,
           }),
          })
      
          .then(response => { 
            if (this.state.partnerfound)
            {
              navigate('Vows');
            }else{
              navigate('AddVows');
            }
               
          })
          .catch((error) => {
              console.log(error);
          });
      }

      getmirage()
      {
        const { navigate } = this.props.navigation;
        fetch('http://vps477048.ovh.net/vows/webservice/getmirage/'+this.state.UID, {
          method: 'POST',
          headers: {
               Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          })
          .then(response => response.json())
          .then(response => { 
               console.log(response);
               this.setState({
                 miragedate : response.marriage_date,
               })
               this.renderCurrentState();
          })
          .catch((error) => {
              console.log(error);
          });
      }

      sendSMS ()
      { 
        console.log('Send SMS Flagged');
        const { navigate } = this.props.navigation;
        fetch('http://vps477048.ovh.net/vows/webservice/matchphone/'+this.state.UID, {
          method: 'POST',
          headers: {
                Accept: 'application/json',
               'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              phone: this.state.partnerPhone ,
          })
          })
          .then(response => response.json())
          .then(response => { 

            SendSMS.send({
              body: 'vows link  https://github.com/tkporter/react-native-sms',
              recipients: [ this.state.partnerPhone ],
              successTypes: ['sent', 'queued']
          }, (completed, cancelled, error) => {
      
             this.openModal()
              this.renderCurrentState();
          });


          })
          .catch((error) => {
              console.log(error);
          }); 
    
         
      }
    
      setsteps3()
      {
        console.log('Setting Step 3') ;
          this.setState({
            steps : 3  
          });
          this.renderCurrentState();
      }
      setsteps2()
      {
        console.log('Setting Step 2') ;
          this.setState({
            steps : 2  
          });
          this.renderCurrentState();
      }


      onPressConfirmeRelation(){
       
        const { navigate } = this.props.navigation;
        fetch('http://vps477048.ovh.net/vows/webservice/confirmematch/'+this.state.UID, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          })
          
          .then(response => { 
            navigate('Vows');
          })
          .catch((error) => {
              console.log(error);
          }); 

      }

      onPressDeclineRelation(){
        fetch('http://vps477048.ovh.net/vows/webservice/declinematch/'+this.state.UID, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          })
          .then(response => response.json())
          .then(response => { 
        
            alert('Request Refused');
              
            this.setState({
              partnerfound: false,
              partnerEmail: '',

             });
             this.renderCurrentState();
             
          })
          .catch((error) => {
              console.log(error);
          }); 
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






      renderCurrentState()
      {
        const { navigate } = this.props.navigation;
        if (this.state.partnerfound){
            if (this.state.steps == 1 )
            {
              return(

                <View style={{alignContent:'center'}} >
                <View style={{justifyContent:'center',alignContent:'center'}}>
                <Image source={require('../Assets/CoupleBackground.png')}  style={{width:Dimensions.get('window').width,height:300,}}/>
               
                 </View>
            
              <View style={{backgroundColor:'#fff',marginLeft:30,marginRight:30,borderRadius:20,height:322,marginBottom:100,marginTop:25}}  behavior='padding'>
                
                <View style={{marginRight:0,marginLeft:0,marginTop:20,marginBottom:0,justifyContent:'center',alignContent:'center'}}>
                  <Text style={{fontSize:20,color:'#735d78',textAlign:'center',fontFamily:'Roboto-Bold'}}>Your partner invite is waiting</Text>
                    <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row',marginTop:20}}>
                      <Image
                      style={{width: 120, height: 120 , borderRadius:90, margin:20 ,marginBottom:5}}
                      source={{uri : 'http://vps477048.ovh.net/vows/'+this.state.partnerImage}}
                
                      />
                      </View>
                </View>
              
                <Text style={{fontSize:14,color:'#735d78',textAlign:'center',fontFamily:'Roboto-Regular'}}>{this.state.partnerName}</Text>
                <Text style={{fontSize:10,color:'#735d78',textAlign:'center',marginBottom:28,fontFamily:'Roboto-Regular'}}>({this.state.partnerPhone})</Text>
              
              
        
                <Text style={{position:'absolute',right:26.5,bottom:26,fontSize:14,color:'#6b3064',fontFamily:'Roboto-Bold'}} onPress={() => this.onPressConfirmeRelation()}>Accept </Text>
                <Text style={{position:'absolute',left:20,bottom:19,fontSize:14,color:'#6b3064',fontFamily:'Roboto-Bold'}}  >I don't know {"\n"} this person </Text>
             
              </View>
          
               
                </View>
        
             )
            } 
    
        }
        if (this.state.steps == 1)
        {
        return (  

          <View >
          <View style={{justifyContent:'center',alignContent:'center'}}>
          <Image source={require('../Assets/CoupleBackground.png')}  style={{width:Dimensions.get('window').width,height:300,}}/>
         
           </View>
            
           <Text style={{fontSize:20,color:'#FFF',marginLeft:43,marginBottom:25,fontFamily:'Roboto-Bold',marginTop:6,lineHeight:27}}>Invite Your Partner</Text>
          <View style={{backgroundColor:'#fff',marginLeft:30,marginRight:30,borderRadius:20,height:231,marginBottom:100 }}  behavior='padding'>
          
          <KeyboardAvoidingView style={{marginRight:35,marginLeft:35,marginTop:20,marginBottom:0}}>

          <Text style={{fontSize:11,color:'#735d78',fontFamily:'Roboto-Regular'}}>Name</Text>
        
         <RkTextInput 
         placeholder='Your Partner Name'
         rkType='bordered' 
         style={{backgroundColor:'#e1e1e1',height:35}} 
         inputStyle = {{fontSize:11,marginTop:0,padding:0}}
         onChangeText={partnerName => this.setState({partnerName})} 
         value={this.state.partnerName} />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView style={{marginRight:35,marginLeft:35,marginBottom:0}}>

          <Text style={{fontSize:11,color:'#735d78',fontFamily:'Roboto-Regular'}}>Phone Number</Text>

         <RkTextInput 

         placeholder='Phone Number' 
         rkType='bordered' 
         label={'+ 966 |'}
         labelStyle={{color: 'gray',fontSize:11,marginLeft:12,}}
         style={{backgroundColor:'#e1e1e1',height:35}} 
         inputStyle = {{fontSize:11,marginTop:4,padding:0}}
         onChangeText={partnerPhone => this.setState({partnerPhone})} 
         value={this.state.partnerPhone} />

          </KeyboardAvoidingView>
  
          <Text style={{position:'absolute',right:25,bottom:17, fontSize:14,color:'#6b3064',fontFamily:'Roboto-Bold'}} onPress={() => this.closeModal()}>NEXT</Text>
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
      if (this.state.steps == 2)
      {
      return (  

      <View  style={styles.form}>
       <Text>Enter Your Mirage Date</Text>
       <DatePicker
        style={{width: 200}}
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
      
      <Button onPress={() => this.setmirage()}>Submit Date</Button>
 
      </View>
      
          ) 
      }
    }
  


      render() 
      { 
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

      paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
      },
    });

   
   