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
  DatePickerIOS,
  TouchableWithoutFeedback} from 'react-native';
 
import * as firebase from 'firebase' ; 
import {RkTextInput,RkText,RkButton} from 'react-native-ui-kitten';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons' 
import {WheelPicker, DatePicker, TimePicker} from 'react-native-wheel-picker-android'

export default class PeriodeCycleScreen extends React.Component {
  static navigationOptions = {
    headerStyle : {display:"none"}
  }
  constructor(props) {
    super(props);
    
    this.state = {
      
        email: '',
        authenticating: false,
        UID : '', 
        phone:'',
        bookmarked: false,
        modalVisible: false,
        activeT : 0 ,
        modalVisible2: false,
        daystogether : '0' ,
        ActivityIndicatorV : false ,
        cycledays : this.props.navigation.state.params ? this.props.navigation.state.params.cycledays  : '-' ,
        periodays : this.props.navigation.state.params ? this.props.navigation.state.params.periodays : '-',
        lastperiod: this.props.navigation.state.params ? this.props.navigation.state.params.day : '-',
        lastmonth : this.props.navigation.state.params ? this.props.navigation.state.params.month : '-',
        lastyear  : this.props.navigation.state.params ? this.props.navigation.state.params.year : '-',
        date:       this.props.navigation.state.params ? this.props.navigation.state.params.date : '-',

 
      }
    }

    setMenstrualcycle () {
      const { navigate } = this.props.navigation;
      if ((this.state.date == '-') || (this.state.cycledays == '-' )|| (this.state.periodays == '-' )) 
      {
        alert('Please fill all informations');
        return false ;
      }
      firebase.auth().onAuthStateChanged((user) => {
        fetch('http://vps477048.ovh.net/vows/webservice/setmenstruation/', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id : user.uid,
            start_date : this.state.date,
            duration : this.state.cycledays,
            periodelength : this.state.periodays, 

          }),
      
          }) 
          .then(response => { 
          
            navigate('PeriodDetails');
          })
          .catch((error) => {
              console.log(error);
          }); 
        

        })

    }

      openModalperiod() {
        this.setState({modalVisible2:true});
        this.setState({
          
          periodays : 2,
        }); 
      }  
      
      openModalcycle() {
        this.setState({
          modalVisible:true,
        
        });
        this.setState({
          
          cycledays : 20,
        });
        
      }

      closeModalperiod() {
        this.setState({modalVisible2:false}); 
      }  

      closeModalcycle() {
        this.setState({modalVisible:false}); 
      }
 

            componentDidMount() {
                console.log('Cycle DAYS ' ,  this.props.navigation.state.params)
                const { navigate } = this.props.navigation;
                BackHandler.addEventListener('hardwareBackPress', function() {
                    navigate('Home');
                  return true;
                 });
            }
             
 
             render(){
              let now = new Date()
              let wheelPickerData = ['20','21','22','23','24','25','26','27','28','29','30','31','32','33','34'];
              let periodData = ['2','3','4','5','6','7','9','10'];
              const { navigate } = this.props.navigation;
       
            return (
              <View style={{ flex: 1 }}>
                <View style={styles.container}>
                  <View style={{marginTop:'11%',marginLeft:18}}>
                    <Text style={{color:'#834ca4',fontSize:36,fontFamily:'Roboto-Bold'}}>Setup your</Text>
                    <Text style={{color:'#834ca4',fontSize:36,fontFamily:'Roboto-Bold'}}>period cycle</Text>
                  </View>
       
                <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
                      <View style={{width:339,backgroundColor:'#834ca4' ,height:321,borderRadius:20 , flexDirection:'row',marginTop:40,marginBottom:200}} >
                          
                        <View style={{flexDirection:'column',marginLeft:20}}>
                           <View style={{flexDirection:'row',marginTop:25}}>

                                <TouchableOpacity style={{marginTop:35,backgroundColor:'white',height:83,width:143 , borderRadius:4}}  onPress={()=> navigate('CalendarPeriod',{periodays:this.state.periodays,cycledays:this.state.cycledays})}  activeOpacity={0.6}>
                                <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10,marginRight:17, marginTop:7,fontSize:12}}>When did your last period start</Text>
                                <View style={{flexDirection:'row'}}>
                                <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10,marginTop:7,fontSize:19}}>{this.state.lastperiod}</Text>
                                <View style={{flexDirection:'column'}}>
                                <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10,marginTop:7,fontSize:11,textAlign:'center'}}>{this.state.lastmonth}</Text>
                                <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10 ,marginTop:-4,fontSize:11}}>{this.state.lastyear}</Text>
                                
                                </View>
                                <Image source={require('../Assets/periodCalendar.png')}  style={{width:25,height:27,marginLeft:44,marginTop:8}}/>
                                </View>
                                </TouchableOpacity>

                                <Image source={require('../Assets/CircularShapes.png')}  style={{width:96,height:100 ,marginLeft:30}}/>
                            </View>

                            <View style={{flexDirection:'row'}}>

                                <TouchableOpacity style={{marginTop:6,backgroundColor:'white',height:83,width:143 , borderRadius:4}} activeOpacity={0.6} onPress={() => this.openModalperiod()} >
                                    <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10,marginTop:7,fontSize:12,marginRight:17}}>How long is your period</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10,marginTop:7,fontSize:19}}>{this.state.periodays}</Text>
                                            <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10,marginTop:7,fontSize:11}}>Days</Text>
                                           
                                        </View>
                                        <Image source={require('../Assets/periodNote.png')}  style={{width:18,height:22,marginLeft:47,marginTop:8}}/>
                                        </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={{marginLeft:5,marginTop:6,backgroundColor:'white',height:83,width:143 , borderRadius:4}} activeOpacity={0.6} onPress={() => this.openModalcycle()}>
                                    <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10,marginTop:7,fontSize:12,marginRight:17}}>How long is your cycle</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10,marginTop:7,fontSize:19}}>{this.state.cycledays}</Text>
                                        <Text style={{color:'#834ca4',fontFamily:'Roboto-Bold',marginLeft:10,marginTop:7,fontSize:11}}>Days</Text>
                                        <Image source={require('../Assets/periodNote.png')}  style={{width:18,height:22,marginLeft:47,marginTop:8}}/>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>

                        <TouchableOpacity style={{position:'absolute',right:24,bottom:20  ,width:50}} onPress={()=> this.setMenstrualcycle() } >
                         
                          <Text style={{color:'#333947',fontFamily:'Roboto-Bold',color:'white',fontSize:17,textAlign:'right'}}>SAVE</Text>
                        
                        </TouchableOpacity>

                      </View>
                </View>

                   
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

                      <Modal
                        transparent= {true}
                        visible={this.state.modalVisible}
                        animationType={'fade'}
                        onRequestClose={() => this.closeModalcycle()}
                        style={{width:'50%'}}
                          >
                          
                       <View style={styles.modalContainer}>
                       <View style={styles.innerContainer}>
                       
                   <View style={{flexDirection:'row',height:72}}>
                         <Text style={{color:'#834ca4',fontSize:16,marginTop:27,fontWeight:'bold'}}>How long is your cycle</Text>
                         <Image source={require('../Assets/periodNote.png')}  style={{width:18,height:22,marginTop:27,marginLeft:18}}/> 
                       </View>
                          
                     
                        <View style={{backgroundColor:'#834ca4',height:320,width:'100%',borderBottomRightRadius:20,borderBottomLeftRadius:20}}>
                        
                        <View style={{flexDirection:'row',justifyContent:'center',marginTop:80}}>
                        
                         <WheelPicker
                           onItemSelected={(event)=>this.onItemSelectedcycle(event)}
                           isCurved
                           data={wheelPickerData}
                           itemTextColor = 'grey'
                           selectedItemTextColor = '#fffeff'
                           backgroundColor = '#834ca4'
                       
                           style={styles.wheelPicker}/>
                           <Text style={{color:'#fff',fontSize:18,fontFamily:'Roboto-Bold',marginTop:60}}>DAYS</Text>
                        
                      </View>
                        <Text style={{color:'#9B5BC1',textAlign:'center',marginTop:20}}>_________________________________</Text>
                        <Text style={{color:'#fff',textAlign:'right',marginRight:26,marginTop:6 ,fontSize:16,fontFamily:'Roboto-Bold'}} onPress={() => this.closeModalcycle()}>SET</Text>
                        </View>
                     
                     
                     </View>
                      </View>
                     
                    </Modal>

                    <Modal
                        transparent= {true}
                        visible={this.state.modalVisible2}
                        animationType={'fade'}
                        onRequestClose={ () => this.closeModalperiod()}
                        style={{width:'50%'}} 
                          >
                       
                       <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                          
                      <View style={{flexDirection:'row',height:72}}>
                            <Text style={{color:'#834ca4',fontSize:16,marginTop:27,fontWeight:'bold'}}>How long is your period</Text>
                            <Image source={require('../Assets/periodNote.png')}  style={{width:18,height:22,marginTop:27,marginLeft:18}}/> 
                          </View>
                             
                        
                           <View style={{backgroundColor:'#834ca4',height:320,width:'100%',borderBottomRightRadius:20,borderBottomLeftRadius:20}}>
                           
                           <View style={{flexDirection:'row',justifyContent:'center',marginTop:80}}>
                           
                            <WheelPicker
                              onItemSelected={(event)=>this.onItemSelectedperiod(event)}
                              isCurved
                              data={periodData}
                              itemTextColor = 'grey'
                              selectedItemTextColor = '#fffeff'
                              backgroundColor = '#834ca4'
                              style={styles.wheelPicker}/>
                              <Text style={{color:'#fff',fontSize:18,fontFamily:'Roboto-Bold',marginTop:60}}>DAYS</Text>
                           
                         </View>
                           <Text style={{color:'#9B5BC1',textAlign:'center',marginTop:20}}>_________________________________</Text>
                           <Text style={{color:'#fff',textAlign:'right',marginRight:26,marginTop:6 ,fontSize:16,fontFamily:'Roboto-Bold'}} onPress={ () => this.closeModalperiod()}>SET</Text>
                           </View>
                        
                        
                        </View>
                      </View>
                
                    </Modal>

                     
                     
                    
                     </View> 
        );
    }
    onItemSelectedcycle(event){
      this.setState({cycledays:event.data})
    }
  
    onItemSelectedperiod(event){
      this.setState({periodays:event.data})
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
    wheelPicker: {
      width:120,
      height: 150,
      
    
    },

    innerContainer: {
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius : 20,
      alignContent:'center',
      justifyContent: 'center' ,
      
      marginLeft : 56,
      marginRight : 56
    },
  });

  