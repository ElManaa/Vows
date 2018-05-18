import React from 'react';
import { ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View, 
  BackHandler,
  ScrollView,
  AsyncStorage,
  Image,Dimensions,
  TouchableOpacity, 
  Modal, 
  TouchableWithoutFeedback} from 'react-native';
 
import * as firebase from 'firebase' ; 
 
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons' 
 

export default class PeriodeCycleMaleScreen extends React.Component {
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
        activeT : 2 ,
        daysleft : '',
        Moodname : '',
        partnername :'',
        Moodimage : 'symptoms_headache',
        symptomname : '',
        symptomimage : 'symptoms_headache',
        modalVisible2: false,
        modalVisible3: false,
        modalVisible4: false,
        modalVisible5: false,
        modalVisible6: false,
        daystogether : '0' ,
        ActivityIndicatorV : false ,
  
      }
    }

      openModaltea() {
        this.setState({modalVisible2:true}); 
      }  
      closeModaltea() {
        this.setState({modalVisible2:false}); 
      } 

      openModalfoot() {
        this.setState({modalVisible:true}); 
      } 
      closeModalfoot() {
        this.setState({modalVisible:false}); 
      }

      openModaldishes() {
        this.setState({modalVisible3:true}); 
      } 
      closeModaldishes() {
        this.setState({modalVisible3:false}); 
      }  

      openModalchocolate() {
        this.setState({modalVisible4:true}); 
      } 
      closeModalchocolate() {
        this.setState({modalVisible4:false}); 
      } 
 
      openModalfilm() {
        this.setState({modalVisible5:true}); 
      } 
      closeModalfilm() {
        this.setState({modalVisible5:false}); 
      } 

 
      getpartnercycle()
      {
        firebase.auth().onAuthStateChanged((user) => {
          
          fetch('http://vps477048.ovh.net/vows/webservice/partnersymptoms/'+user.uid, {
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
                partnername : response.first_name,

                symptomname : response.symptom.name,
                Moodname : response.mood.name,

                symptomimage : response.symptom.image,
                Moodimage : response.mood.image,
                daysleft : response.daysleft
              })

            })
            .catch((error) => {
                console.log(error);
            }); 
        })
      }

      componentDidMount() {
        this.getpartnercycle();
      }
      
        
 
             render(){
              let now = new Date()
              let wheelPickerData = ['21', '23', '24', '25', '26', '27', '28', '29'];
              const { navigate } = this.props.navigation;
       
            return (
              <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>

                  <View style={{marginTop:'13%',marginLeft:18}}>
                    <Text style={{color:'#834ca4',fontSize:36,fontFamily:'Roboto-Bold'}}>{this.state.daysleft} Days left</Text> 
                  </View>
       
                
                      <View style={{width:Dimensions.get('window').width-33,backgroundColor:'#834ca4' ,height:89,marginLeft:20,borderRadius:20 , flexDirection:'row',marginTop:40 }} >
                          
                      
                      <View style={{marginTop:13,marginLeft:17,flexDirection:'column'}}>
                      <View style={{width:43,height:50,backgroundColor:'#efefef',borderRadius:12,}}>
                      <Image source={{uri:'http://vps477048.ovh.net/vows/'+this.state.symptomimage}}  style={{width:35,height:35,margin:5}}/>
                      </View>
                      <Text style={{color:'#fff',fontSize:9,textAlign:'center'}}>{this.state.symptomname}</Text>
                      </View>



                      <View style={{marginTop:13,marginLeft:13,flexDirection:'column'}}>
                      <View style={{width:50,height:50,backgroundColor:'#efefef',borderRadius:12}}>
                      <Image  source={{uri:'http://vps477048.ovh.net/vows/'+this.state.Moodimage}}  style={{width:45,height:45,margin:2}}/>
                      </View>
                      <Text style={{color:'#fff',fontSize:9,textAlign:'center'}}>{this.state.Moodname}</Text>
                      </View>


                      <View style={{marginLeft:30}}>
                      <Text style={{color:'#fff',fontFamily:'Roboto-Bold',fontSize:14,marginTop:17}}>{this.state.partnername} is {'\n'}experiencing {'\n'}{this.state.symptomname}</Text>

                      </View>

              

                      </View>

                      <View style={{marginTop:29,marginBottom:100  }}>
                      <Text style={{color:'#834ca4',fontSize:18,fontFamily:'Roboto-Bold',marginLeft:18}}>Acts of kindness </Text> 
                      
                      <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center' }}>

                            <View style={{flexDirection:'row'}}>
                             <TouchableOpacity  activeOpacity={0.6} onPress={()=> this.openModaltea()}>
                              <View style={{backgroundColor:'#50E3C2',width:107,height:110,marginTop:11}}>

                              <Image source={require('../Assets/act_tea.png')}  style={{width:42,height:38,marginTop:13,marginLeft:8}}/>
                              <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:9,marginLeft:9,marginTop:19}}>Offer her tea</Text>
                             
                              </View>
                              </TouchableOpacity>
                              <TouchableOpacity  activeOpacity={0.6} onPress={()=> this.openModalfoot()}>
                              <View style={{backgroundColor:'#AFE37A',width:107,height:110,marginTop:11,marginLeft:9}}>

                              <Image source={require('../Assets/act_massage.png')}  style={{width:42,height:38,marginTop:13,marginLeft:8}}/>
                              <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:9,marginLeft:9,marginTop:19}}>Some foot massage would be nice</Text>
                             
                              </View>
                              </TouchableOpacity>
                              <TouchableOpacity  activeOpacity={0.6} onPress={()=> this.openModaldishes()}>
                              <View style={{backgroundColor:'#CDB2F9',width:107,height:110,marginTop:11,marginLeft:9}}>
                              <Image source={require('../Assets/act_wash.png')}  style={{width:42,height:38,marginTop:13,marginLeft:8}}/>
                              <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:9,marginLeft:9,marginTop:19}}>Make them sparkle:{'\n'}Wash the dishes {'\n'}maybe</Text>
                             
                              </View>
                              </TouchableOpacity>
                            </View>

                            <View style={{flexDirection:'row'}}>
                              <TouchableOpacity  activeOpacity={0.6} onPress={()=> this.openModalchocolate()}>
                              <View style={{backgroundColor:'#F46B6B',width:107,height:110,marginTop:11}}>
                              <Image source={require('../Assets/act_chocolate.png')}  style={{width:42,height:38,marginTop:13,marginLeft:8}}/>
                              <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:9,marginLeft:9,marginTop:19}}>Favorite chocolate!{'\n'}or doughnut </Text>
                             
                              </View>
                              </TouchableOpacity>
                              <TouchableOpacity  activeOpacity={0.6} onPress={()=> this.openModalfilm()} >
                              <View style={{backgroundColor:'#834CA4',width:107,height:110,marginTop:11,marginLeft:9}}>
                              <Image source={require('../Assets/act_movie.png')}  style={{width:42,height:38,marginTop:13,marginLeft:8}}/>
                              <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:9,marginLeft:9,marginTop:19}}>Pick a movie that{'\n'} would make her happy</Text>
                             
                              </View>
                              </TouchableOpacity>
                              <TouchableOpacity  activeOpacity={0.6} onPress={()=> this.openModaldishes()}>
                              <View style={{backgroundColor:'#4C77A4',width:107,height:110,marginTop:11,marginLeft:9}}>
                              <Image source={require('../Assets/act_wash.png')}  style={{width:42,height:38,marginTop:13,marginLeft:8}}/>
                              <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:9,marginLeft:9,marginTop:19}}>Make them sparkle:{'\n'}Wash the dishes {'\n'}maybe</Text>
                             
                              </View>
                              </TouchableOpacity>
                            </View>

                      </View>

                      </View>
  

                   
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
                        visible={this.state.modalVisible2}
                        animationType={'fade'}
                        onRequestClose={() => this.closeModaltea()}
                        style={{width:'50%'}}
                          >
                          
                       <View style={styles.modalContainer}>
                       <View style={styles.innerContainer}>
                       
               
                          
                     
                        <View style={{backgroundColor:'#50E3C2',height:170,width:'100%'}}>
                        <Image source={require('../Assets/act_tea.png')}  style={{width:43,height:53,marginTop:18,marginLeft:15}}/>
                        <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:12,marginLeft:9,marginTop:13}}>Offer her tea</Text>
                        
                        <Text style={{position:'absolute',color:'#6C2E65',right:26,bottom:18,fontSize:16,fontFamily:'Roboto-Bold'}} onPress={() => this.closeModaltea()}>Let’s Do it</Text>
                        </View>
                     
                     
                     </View>
                      </View>
                     
                    </Modal>

                    <Modal
                        transparent= {true}
                        visible={this.state.modalVisible}
                        animationType={'fade'}
                        onRequestClose={ () => this.closeModalfoot()}
                        style={{width:'50%'}} 
                          >
                       
                       <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                          
                        <View style={{backgroundColor:'#AFE37A',height:170,width:'100%'}}>
                        <Image source={require('../Assets/act_massage.png')}  style={{width:43,height:53,marginTop:18,marginLeft:15}}/>
                        <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:12,marginLeft:9,marginTop:13}}>Some foot massage {'\n'} would be nice</Text>
                        
                        <Text style={{position:'absolute',color:'#6C2E65',right:26,bottom:18,fontSize:16,fontFamily:'Roboto-Bold'}} onPress={() => this.closeModalfoot()}>Let’s Do it</Text>
                        </View>
                        
                        </View>
                      </View>
                
                    </Modal>

                    <Modal
                        transparent= {true}
                        visible={this.state.modalVisible3}
                        animationType={'fade'}
                        onRequestClose={ () => this.closeModaldishes()}
                        style={{width:'50%'}} 
                          >
                       
                       <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                          
                        <View style={{backgroundColor:'#CDB2F9',height:170,width:'100%'}}>
                        <Image source={require('../Assets/act_wash.png')}  style={{width:43,height:53,marginTop:18,marginLeft:15}}/>
                        <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:12,marginLeft:9,marginTop:13}}>Make them sparkle: {'\n'}Wash the dishes maybe</Text>
                        
                        <Text style={{position:'absolute',color:'#6C2E65',right:26,bottom:18,fontSize:16,fontFamily:'Roboto-Bold'}} onPress={() => this.closeModaldishes()}>Let’s Do it</Text>
                        </View>
                        
                        </View>
                      </View>
                
                    </Modal>

                    <Modal
                        transparent= {true}
                        visible={this.state.modalVisible4}
                        animationType={'fade'}
                        onRequestClose={ () => this.closeModalchocolate()}
                        style={{width:'50%'}} 
                          > 
                       <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}> 
                        <View style={{backgroundColor:'#F46B6B',height:170,width:'100%'}}>
                        <Image source={require('../Assets/act_chocolate.png')}  style={{width:43,height:53,marginTop:18,marginLeft:15}}/>
                        <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:12,marginLeft:9,marginTop:13}}>Favorite chocolate!{'\n'}or doughnut</Text> 
                        <Text style={{position:'absolute',color:'#6C2E65',right:26,bottom:18,fontSize:16,fontFamily:'Roboto-Bold'}} onPress={() => this.closeModalchocolate()}>Let’s Do it</Text>
                        </View> 
                        </View>
                      </View> 
                    </Modal>

                    <Modal
                        transparent= {true}
                        visible={this.state.modalVisible5}
                        animationType={'fade'}
                        onRequestClose={ () => this.closeModalfilm()}
                        style={{width:'50%'}} 
                          >
                       
                       <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                          
                        <View style={{backgroundColor:'#834CA4',height:170,width:'100%'}}>
                        <Image source={require('../Assets/act_movie.png')}  style={{width:43,height:53,marginTop:18,marginLeft:15}}/>
                        <Text style={{color:'white',fontFamily:'Roboto-Regular',fontSize:12,marginLeft:9,marginTop:13}}>Pick a movie that{'\n'} would make her happy</Text>
                        
                        <Text style={{position:'absolute',color:'#6C2E65',right:26,bottom:18,fontSize:16,fontFamily:'Roboto-Bold'}} onPress={() => this.closeModalfilm()}>Let’s Do it</Text>
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
      width:50,
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

  