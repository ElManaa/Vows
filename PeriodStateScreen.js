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
  BackHandler,
  TouchableWithoutFeedback} from 'react-native';
  import {StackNavigator, HeaderBackButton} from 'react-navigation';
import * as firebase from 'firebase' ; 
 
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons' 
 
 

export default class PeriodStateScreen extends React.Component {
  
    static navigationOptions = ({ navigation }) => ({
        headerStyle : {backgroundColor:"#834CA4",elevation:0},
        
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' ,alignSelf: 'center' },
        headerRight: (
            <TouchableOpacity
            onPress={() => {navigation.state.params.openModal()}}
              style={{ paddingRight: 5 }}>
               
            </TouchableOpacity>
        ),
        headerLeft: (
          <HeaderBackButton
          onPress={() => {navigation.navigate('Home')}}
          title={'Back'}
          tintColor={'white'}
        /> )
  
 });


  constructor(props) {
    super(props);
    
    this.state = {
      
        email: '',
        authenticating: false,
        UID : '', 
        phone:'',
        bookmarked: false,
        modalVisible: false,
        showscale : false,
        activeT : 0 ,
        periodscale: [],
        modalVisible2: false,
        daystogether : '0' ,
        ActivityIndicatorV : false ,
        Menstruationname : '',
        Menstruationimage : 'symptoms_headache',
        Moodname : '',
        Moodimage : 'symptoms_headache',
        symptomname : '',
        symptomimage : 'symptoms_headache',
        startmonth : '',
        endmonth : '' ,
        dayendmonth : 1 ,

 
      }
    }


    findmonth (number) 
    {
      
      switch(number) {
        case '01':
            return 'JAN';
        case '02':
            return 'FEV';
        case '03':
            return 'MAR';
        case '04':
            return 'APR';
        case '05':
            return 'MAY';
        case '06':
            return 'JUN';
        case '07':
            return 'JUL';
        case '08':
            return 'AUG';
        case '09':
            return 'SEP';
        case '10':
            return 'OCT';
        case '11':
            return 'NOV';
        case '12':
            return 'DEC'; 
      }
   }

    getmenstrualstate ()
    {
      firebase.auth().onAuthStateChanged((user) => {
        
        fetch('http://vps477048.ovh.net/vows/webservice/getuserwithmenstruation/'+user.uid, {
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
     
                Menstruationname : response.flow.name,
                symptomname : response.symptom.name,
                Moodname : response.mood.name,
                Menstruationimage : response.flow.image,
                symptomimage : response.symptom.image,
                Moodimage : response.mood.image,


                periodscale : response.month ,
                showscale : true,

                startmonth:this.findmonth(response.menstruation[0].start_date.substr(5,2)),
                endmonth:this.findmonth(response.menstruation[0].end_date.substr(5,2)),
                 
             })

             if (this.state.startmonth == this.state.endmonth)
             {
                this.setState({
                  dayendmonth : 30,
                })
             }
      
          })
          .catch((error) => {
              console.log(error);
          }); 
        

        })

    }

    createwhite (n)
    {
      var result = [];
      for (var i = 0; i < n; i++) {
        result.push(<View style={{width:4,height:21,borderRadius:2,backgroundColor:'#fff',marginTop:17,marginRight:6}} key={i}></View>);
      }
      return result;
    }

     createsinglered (n)
    {
      var result = [];
      for (var i = 0; i < n; i++) {
        result.push(<View style={{width:4,height:21,borderRadius:2,backgroundColor:'#F77789',marginTop:17,marginRight:6}} key={i}></View>);
      }
      return result;
    }

     createred (n)
    {
       
      return (
      <View style={{flexDirection:'column'}}>
      <View style={{flexDirection:'row'}}>
         {this.createsinglered (n)}
      </View>
      <Text style={{color:'#F77789',marginTop:5,fontSize:11,fontFamily:'Roboto-Bold'}}>Period</Text>
     </View>)

     
    }   

   createsingleblue (n)
    {
      var result = [];
      for (var i = 0; i < n; i++) {
        result.push(<View style={{width:4,height:21,borderRadius:2,backgroundColor:'#72DDE5',marginTop:17,marginRight:6}} key={i}></View>);
      }
      return result;
    }

    createblue (n)
    {
      return (
        <View style={{flexDirection:'column'}}>
        
          <View style={{flexDirection:'row'}}>
            {this.createsingleblue(n)}
          </View> 
          <View style={{flexDirection:'row'}}>

            <Text style={{color:'#72DDE5',marginTop:5,fontSize:11,fontFamily:'Roboto-Bold'}}>Fertile</Text>
        
          </View>
      
        </View>
      )
    }

    createyellow()
    {
      return (
          
        <View style={{flexDirection:'column'}}>
        <View style={{width:4,height:39,borderRadius:2,backgroundColor:'#FBF604',marginTop:0,marginRight:6}}></View>
        <Text style={{color:'#FBF604',fontSize:11,fontFamily:'Roboto-Bold',position:'absolute',flex:1,width:60,marginLeft:8,marginTop:-4}}>Ovulation</Text>
 
        </View>
       
      )
    }
 

    generatecycle ()
    {
       var cycle = [] ;
      let periodarray = this.state.periodscale  ; 
      
       numlignes = 1 ;
     
       type = periodarray[1];
      
       for(index = 2 ; index<=30 ; index++)
       { 

        while( periodarray[index] == type ) 
        {
             index = index + 1  ;
             numlignes ++ ;  
        }
        

          if (type == 'white')
         {
              cycle.push(this.createwhite(numlignes));
         } else if ( type == 'red')
         {
             cycle.push(this.createred(numlignes-1));
             cycle.push(this.createwhite(1));
          } else if ( type == 'blue')
          {
              cycle.push(this.createblue(numlignes));
          } 
            else if ( type == 'yellow')
          {
             cycle.push(this.createyellow(numlignes));
              cycle.push(this.createsingleblue(1));
              index = index + 1 ;
          }
     
      type = periodarray[index];
      numlignes = 1 ;

      }
        
      return cycle;
 
    }

      componentDidMount() {
        const { navigate } = this.props.navigation;
        BackHandler.addEventListener('hardwareBackPress', function() {
            navigate('Home');
          return true;
       });
          this.getmenstrualstate();
       
      }
      
        
 
             render(){
              let now = new Date()
              let wheelPickerData = ['21', '23', '24', '25', '26', '27', '28', '29'];
              const { navigate } = this.props.navigation;
         
    
          return (
            <View style={{ flex: 1 }}>


              <ScrollView style={styles.container}>

                <View style={{backgroundColor:'#5b2c77',height:450,borderRadius:12,marginLeft:11,marginRight:11}}>
                   
                    <View style={{marginTop:10,marginLeft:21}}>
                      <Text style={{color:'#fff',fontSize:36,fontFamily:'Roboto-Bold'}}>6 Days Late</Text>
                      <Text style={{color:'#fff',fontSize:14,fontFamily:'Roboto-Bold'}}>Some text goes here</Text>
                    </View>

                
       
                    <View>

                      <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                          <Text style={{fontSize:11,color:'white',fontFamily:'Roboto-Bold',marginLeft:11,marginTop:47}}>{this.state.startmonth} 1</Text>
                          <Text style={{fontSize:11,color:'white',fontFamily:'Roboto-Bold',marginRight:11 ,marginTop:47,textAlign:'right'}}>{this.state.endmonth} {this.state.dayendmonth}</Text>
                      </View>

                        {this.state.showscale ? 
                        <View style={{flexDirection:'row',marginLeft:11 ,width:336}}>{this.generatecycle()}</View>
                        : 
                        <View></View>
                        }  

                    </View>

                    <View style={{height:88,marginTop:62,flexDirection:'row',justifyContent:'space-between',marginLeft:41,marginRight:41}}>
                    
                      
                      <View style={{flexDirection:'column',justifyContent:'center',alignContent:'center',alignItems:'center' }}>
                        <Text style={{color:'white',fontSize:9,fontFamily:'Roboto-Bold',textAlign:'center'}}>Menstruation </Text>
                        
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,borderRadius:10,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:6}}>
                          <Image source={{uri:'http://vps477048.ovh.net/vows/'+this.state.Menstruationimage}}  style={{width:18,height:25 }}/>
                        </View>
                      
                         <Text style={{textAlign:'center',fontSize:9,marginTop:3,color:'white'}}>{this.state.Menstruationname}</Text>
 
                      </View>


                      <View style={{flexDirection:'column',justifyContent:'center',alignContent:'center',alignItems:'center' }}>
                         <Text style={{color:'white',fontSize:9,fontFamily:'Roboto-Bold',textAlign:'center'}}>Mood </Text>
                      
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,borderRadius:10,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:6}}>
                          <Image source={{uri:'http://vps477048.ovh.net/vows/'+this.state.Moodimage}}  style={{width:45,height:45,margin:2}}/>
                        </View>
                      
                         <Text style={{textAlign:'center',fontSize:9,marginTop:3,color:'white'}}>{this.state.Moodname}</Text> 
                      </View>
                    
                      <View style={{flexDirection:'column',justifyContent:'center',alignContent:'center',alignItems:'center' }}>
                        <Text style={{color:'white',fontSize:9,fontFamily:'Roboto-Bold',textAlign:'center'}}>Symptoms</Text>
                      
                        <View style={{backgroundColor:'#efefef' ,width:50,height:50,borderRadius:10,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:6}}>
                         <Image source={{uri:'http://vps477048.ovh.net/vows/'+this.state.symptomimage}}  style={{width:35,height:35,marginTop:2,}}/>
                        
                        </View>
                    
          
                         <Text style={{textAlign:'center',fontSize:9,marginTop:3,color:'white'}}>{this.state.symptomname}</Text>


                      </View>
                  

                    </View>
                   
                </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:35,marginLeft:30}}>
                        
                        <TouchableOpacity activeOpacity={0.6} onPress={() => navigate('PeriodeCycle')}>
                            <View style={{backgroundColor:'#5b2c77',height:40,width:150,borderRadius:4,marginLeft:11,marginRight:11,marginTop:25,flexDirection:'row',justifyContent:'center'}}>
                               <Text style={{color:'white' ,fontSize:16,fontFamily:'Roboto-Bold',marginTop:8}}>Setup period cycle</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.6} onPress={() => navigate('PeriodDetails')} >
                            <View style={{backgroundColor:'#5b2c77',height:40,width:110,borderRadius:4,marginLeft:11,marginRight:11,marginTop:25,flexDirection:'row',justifyContent:'center'}}>
                               <Text style={{color:'white' ,fontSize:16,fontFamily:'Roboto-Bold',marginTop:8}}>Edit details</Text>
                            </View>
                       </TouchableOpacity>

                    </View>

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

  