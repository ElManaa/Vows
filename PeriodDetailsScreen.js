import React from 'react';
import { ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View, 
  ScrollView,
  AsyncStorage,
  Image,Dimensions,
  TouchableOpacity, 
  Modal, 
  TouchableWithoutFeedback} from 'react-native';
 
import * as firebase from 'firebase' ; 
 
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons' 
 

export default class PeriodDetailsScreen extends React.Component {
  
    static navigationOptions = ({ navigation }) => ({
        headerStyle : {backgroundColor:"#834CA4",elevation:0},
        
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' ,alignSelf: 'center' },
        headerRight: (
            <TouchableOpacity
            onPress={() => {navigation.state.params.openModal()}}
              style={{ paddingRight: 5 }}>
               
            </TouchableOpacity>
        )
  
 });


  constructor(props) {
    super(props);
    
    this.state = {  
        ActivityIndicatorV : false , 
        flow1opacity : 1,
        flow2opacity : 1,
        flow3opacity : 1,
        symp1opacity : 1,
        symp2opacity : 1,
        symp3opacity : 1,
        symp4opacity : 1,
        symp5opacity : 1,
        symp6opacity : 1,
        mod1opacity : 1 ,
        mod2opacity : 1 ,
        mod3opacity : 1 ,
        mod4opacity : 1 ,
        mod5opacity : 1 ,
        mod6opacity : 1 ,
        mod7opacity : 1 ,
        flow : '',
        symptom : '',
        mood : 0, 

      }
    }


     _setflow1 () {
          this.setState({ flow1opacity : 1,
                          flow2opacity : 0.5,
                          flow3opacity : 0.5,
                          flow : '1'         })
     }

    _setflow2 () {
        this.setState({ flow1opacity : 0.5,
                        flow2opacity : 1,
                        flow3opacity : 0.5,
                        flow : '2'          })
    }

    _setflow3 () {
      this.setState({ flow1opacity : 0.5,
                      flow2opacity : 0.5,
                      flow3opacity : 1,
                      flow : '3'            })
    }

    _setsymp1 () {
      this.setState({ 
        symptom : '1',
        symp1opacity : 1,
        symp2opacity : 0.5,
        symp3opacity : 0.5,
        symp4opacity : 0.5,
        symp5opacity : 0.5,
        symp6opacity : 0.5,
      })
    }
    _setsymp2 () {
      this.setState({ 
        symptom : '2',
        symp1opacity : 0.5,
        symp2opacity : 1,
        symp3opacity : 0.5,
        symp4opacity : 0.5,
        symp5opacity : 0.5,
        symp6opacity : 0.5,
      })
    }
    _setsymp3 () {
      this.setState({ 
        symptom : '3',
        symp1opacity : 0.5,
        symp2opacity : 0.5,
        symp3opacity : 1,
        symp4opacity : 0.5,
        symp5opacity : 0.5,
        symp6opacity : 0.5,
      })
    }
     _setsymp4 () {
      this.setState({ 
        symptom : '4',
        symp1opacity : 0.5,
        symp2opacity : 0.5,
        symp3opacity : 0.5,
        symp4opacity : 1,
        symp5opacity : 0.5,
        symp6opacity : 0.5,
      })
    }
     _setsymp5 () {
      this.setState({ 
        symptom : '5',
        symp1opacity : 0.5,
        symp2opacity : 0.5,
        symp3opacity : 0.5,
        symp4opacity : 0.5,
        symp5opacity : 1,
        symp6opacity : 0.5,
      })
    }
     _setsymp6 () {
      this.setState({ 
        symptom : '6',
        symp1opacity : 0.5,
        symp2opacity : 0.5,
        symp3opacity : 0.5,
        symp4opacity : 0.5,
        symp5opacity : 0.5,
        symp6opacity : 1,
      })
    }

      _setmod1 () {
       this.setState({
        mood : 1,
        mod1opacity : 1 ,
        mod2opacity : 0.5 ,
        mod3opacity : 0.5 ,
        mod4opacity : 0.5 ,
        mod5opacity : 0.5 ,
        mod6opacity : 0.5 ,
        mod7opacity : 0.5 ,
       })
      }

      _setmod2 () {
        this.setState({
          mood : 2,
       mod1opacity : 0.5 ,
       mod2opacity : 1 ,
       mod3opacity : 0.5 ,
       mod4opacity : 0.5 ,
       mod5opacity : 0.5 ,
       mod6opacity : 0.5 ,
       mod7opacity : 0.5 ,
       })
      }

    
    _setmod3 () {
      this.setState({
        mood : 3,
       mod1opacity : 0.5 ,
       mod2opacity : 0.5 ,
       mod3opacity : 1 ,
       mod4opacity : 0.5 ,
       mod5opacity : 0.5 ,
       mod6opacity : 0.5 ,
       mod7opacity : 0.5 ,
      })
    } 
    _setmod4 () {
      this.setState({
        mood : 4,
       mod1opacity : 0.5 ,
       mod2opacity : 0.5 ,
       mod3opacity : 0.5 ,
       mod4opacity : 1 ,
       mod5opacity : 0.5 ,
       mod6opacity : 0.5 ,
       mod7opacity : 0.5 ,
      })
    }

    _setmod5 () {
      this.setState({
        mood : 5,
       mod1opacity : 0.5 ,
       mod2opacity : 0.5 ,
       mod3opacity : 0.5 ,
       mod4opacity : 0.5 ,
       mod5opacity : 1 ,
       mod6opacity : 0.5 ,
       mod7opacity : 0.5 ,
      })
    }

    _setmod6 () {
      this.setState({
        mood : 6,
       mod1opacity : 0.5 ,
       mod2opacity : 0.5 ,
       mod3opacity : 0.5 ,
       mod4opacity : 0.5 ,
       mod5opacity : 0.5 ,
       mod6opacity : 1 ,
       mod7opacity : 0.5 ,
      })
    }

    _setmod7 () {
      this.setState({
        mood : 7,
       mod1opacity : 0.5 ,
       mod2opacity : 0.5 ,
       mod3opacity : 0.5 ,
       mod4opacity : 0.5 ,
       mod5opacity : 0.5 ,
       mod6opacity : 0.5 ,
       mod7opacity : 1 ,
      })
    }
  
    setSymptoms () {
      if ((this.state.mood == 0 ) || (this.state.flow == '' )|| (this.state.symptom == '' )) 
      {
        alert('Please fill all informations')
        return false ;
      }
      const { navigate } = this.props.navigation;
      firebase.auth().onAuthStateChanged((user) => {
        
        fetch('http://vps477048.ovh.net/vows/webservice/setsymptoms/'+user.uid, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            flow : this.state.flow,
            symptom : this.state.symptom ,
            mood : this.state.mood + 2,  
          }),
      
          }) 
          .then(response => {
            try {
              AsyncStorage.setItem('@Cycleset','BYEL'); 
               } catch (error) {
              console.log('error writing data : '+error)
                } 
            navigate('PeriodState')
          })
          .catch((error) => {
              console.log(error);
          });   
        })

    }



      openModalperiod() {
        this.setState({modalVisible2:true}); 
      }  
      
      openModalcycle() {
        this.setState({modalVisible:true});
        
      }

      closeModalperiod() {
        this.setState({modalVisible2:false}); 
      }  

      closeModalcycle() {
        this.setState({modalVisible:false}); 
      }
 

      componentDidMount() {
          console.log('Cycle DAYS ' ,  this.props.navigation.state.params)
      }
      
        
 
             render(){
              let now = new Date()
              let wheelPickerData = ['21', '23', '24', '25', '26', '27', '28', '29'];
              const { navigate } = this.props.navigation;
       
            return (
              <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
 

                    <View style={{marginTop:6,marginLeft:22}}>
                        <Text style={{color:'white',fontSize:14,fontFamily:'Roboto-Bold'}}>Menstruation Flow</Text>
                        <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=> this._setflow1()} activeOpacity={1}>
                            <View style={{height:75,width:65,backgroundColor:'#FFFFFF',borderRadius:4,marginTop:7,flexDirection:'column',opacity:this.state.flow1opacity}}>
                            <Image source={require('../Assets/menstruation_light.png')}  style={{width:18,height:25,marginTop:16,marginLeft:24}}/>
                            <Text style={{color:'#4A4A4A',textAlign:'center',marginTop:8,fontSize:9}}>Light</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this._setflow2()} activeOpacity={1}>
                            <View style={{height:75,width:65,backgroundColor:'#FFFFFF',borderRadius:4,marginTop:7,marginLeft:3,flexDirection:'column',opacity:this.state.flow2opacity}}>
                            <Image source={require('../Assets/menstruation_medium.png')}  style={{width:18,height:25,marginTop:16,marginLeft:24}}/>
                            <Text style={{color:'#4A4A4A',textAlign:'center',marginTop:8,fontSize:9}}>Medium</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this._setflow3()} activeOpacity={1}>
                            <View style={{height:75,width:65,backgroundColor:'#FFFFFF',borderRadius:4,marginTop:7,marginLeft:3,flexDirection:'column',opacity:this.state.flow3opacity}}>
                            <Image source={require('../Assets/menstruation_heavy.png')}  style={{width:18,height:25,marginTop:16,marginLeft:24}}/>
                            <Text style={{color:'#4A4A4A',textAlign:'center',marginTop:8,fontSize:9}}>Heavy</Text>
                            </View>
                            </TouchableOpacity>
                            </View>
                    </View>

                    <View style={{marginTop:20,marginLeft:22}}>
                        <Text style={{color:'white',fontSize:14,fontFamily:'Roboto-Bold'}}>Symptoms</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity  activeOpacity={1} onPress={()=> this._setsymp1()} >
                            <View style={{height:75,width:65,backgroundColor:'#FFFFFF',borderRadius:4,marginTop:7,flexDirection:'column',justifyContent:'center',opacity:this.state.symp1opacity}}>
                            <Image source={require('../Assets/symptoms_feeling_good.png')}  style={{width:35,height:35,marginTop:8,marginLeft:15}}/>
                            <Text style={{color:'#4A4A4A',textAlign:'center',fontSize:9}}>Feeling{'\n'}Good</Text> 
                            </View>
                            </TouchableOpacity>


                            <TouchableOpacity  activeOpacity={1} onPress={()=> this._setsymp2()}>
                            <View style={{height:75,width:65,backgroundColor:'#FFFFFF',borderRadius:4,marginTop:7,marginLeft:3,opacity:this.state.symp2opacity}}>
                            <Image source={require('../Assets/symptoms_abdominal_cramping.png')}  style={{width:35,height:35,marginTop:8,marginLeft:15}}/>
                            <Text style={{color:'#4A4A4A',textAlign:'center',marginTop:5,fontSize:9}}>Abdominal{'\n'}Cramping</Text> 
                            </View> 
                            </TouchableOpacity>


                            <TouchableOpacity  activeOpacity={1} onPress={()=> this._setsymp3()}>
                            <View style={{height:75,width:65,backgroundColor:'#FFFFFF',borderRadius:4,marginTop:7,marginLeft:3,opacity:this.state.symp3opacity}}>
                            <Image source={require('../Assets/symptoms_bloating.png')}  style={{width:35,height:35,marginTop:8,marginLeft:15}}/>
                            <Text style={{color:'#4A4A4A',textAlign:'center',marginTop:5,fontSize:9}}>Bloating</Text> 
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity  activeOpacity={1} onPress={()=> this._setsymp4()}>
                            <View style={{height:75,width:65,backgroundColor:'#FFFFFF',borderRadius:4,marginTop:7,marginLeft:3,opacity:this.state.symp4opacity}}>
                            <Image source={require('../Assets/symptoms_food_cravings.png')}  style={{width:35,height:35,marginTop:8,marginLeft:15}}/>
                            <Text style={{color:'#4A4A4A',textAlign:'center',marginTop:5,fontSize:9}}>Food{'\n'}Cravings</Text> 
                            </View>
                            </TouchableOpacity >
                            <TouchableOpacity  activeOpacity={1} onPress={()=> this._setsymp5()}>
                            <View style={{height:75,width:65,backgroundColor:'#FFFFFF',borderRadius:4,marginTop:7,marginLeft:3,opacity:this.state.symp5opacity}}>
                            <Image source={require('../Assets/symptoms_headache.png')}  style={{width:35,height:35,marginTop:8,marginLeft:15}}/>
                            <Text style={{color:'#4A4A4A',textAlign:'center',marginTop:5,fontSize:9}}>Headache</Text> 
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity  activeOpacity={1} onPress={()=> this._setsymp6()}>
                            <View style={{height:75,width:65,backgroundColor:'#FFFFFF',borderRadius:4,marginTop:7,marginLeft:3,marginRight:30,opacity:this.state.symp6opacity}}>
                            <Image source={require('../Assets/symptoms_muscle_aches.png')}  style={{width:35,height:35,marginTop:8,marginLeft:15}}/>
                            <Text style={{color:'#4A4A4A',textAlign:'center',marginTop:5,fontSize:9}}>Muscle Aches</Text> 
                            </View>
                            </TouchableOpacity>
                            </ScrollView>
                    </View>
                
                    <View style={{marginTop:20,marginLeft:22,marginBottom:50}}>
                        <Text style={{color:'white',fontSize:14,fontFamily:'Roboto-Bold'}}>Mood</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                       <TouchableOpacity style={{marginTop:9}} onPress={()=> this._setmod1()} activeOpacity={1}>
                        <View style={{flexDirection:'column',opacity:this.state.mod1opacity}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoLove.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{textAlign:'center',fontSize:11,marginTop:4,color:'white'}}>In love</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:9,marginLeft:5}} onPress={()=> this._setmod2()} activeOpacity={1}>
                        <View style={{flexDirection:'column',opacity:this.state.mod2opacity}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoNervous.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{textAlign:'center',fontSize:11,marginTop:4,color:'white'}}>Nervous</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:9,marginLeft:5}} onPress={()=> this._setmod3()} activeOpacity={1}>
                        <View style={{flexDirection:'column',opacity:this.state.mod3opacity}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoTired.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{textAlign:'center',fontSize:11,marginTop:4,color:'white'}}>Tired</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:9,marginLeft:5}} onPress={()=> this._setmod4()} activeOpacity={1}>
                        <View style={{flexDirection:'column',opacity:this.state.mod4opacity}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoAngry.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{textAlign:'center',fontSize:11,marginTop:4,color:'white'}}>Angry</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:9,marginLeft:5}} onPress={()=> this._setmod5()} activeOpacity={1}>
                        <View style={{flexDirection:'column',opacity:this.state.mod5opacity}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoAngry.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{textAlign:'center',fontSize:11,marginTop:4,color:'white'}}>Depressed</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:9,marginLeft:5}} onPress={()=> this._setmod6()} activeOpacity={1}>
                        <View style={{flexDirection:'column',opacity:this.state.mod6opacity}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoFrustrated.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{textAlign:'center',fontSize:11,marginTop:4,color:'white'}}>Frustrated</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:9,marginLeft:5,marginRight:20}} onPress={()=> this._setmod7()} activeOpacity={1}>
                        <View style={{flexDirection:'column',opacity:this.state.mod7opacity}} >
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,borderRadius:10,flexDirection:'column',justifyContent:'center',alignContent:'center'}}>
                        <Image source={require('../Assets/EmoWorried.png')}  style={{width:45,height:45,margin:2}}/>
                        </View>
                        <Text style={{textAlign:'center',fontSize:11,marginTop:4,color:'white'}}>Worried</Text>
                        </View>
                        </TouchableOpacity>


                            </ScrollView>
                    </View>
                 
                    <TouchableOpacity onPress={() => this.setSymptoms ()}>
                      <Text style={{color:'white',fontSize:16,textAlign:'right',marginRight:26,fontFamily:'Roboto-Bold',marginBottom:25}}>SAVE</Text>
                    </TouchableOpacity>
                   
              </ScrollView>
     
                    
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
   
    backgroundColor : '#834CA4' ,
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

  