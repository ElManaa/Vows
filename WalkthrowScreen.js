import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
 
    backgroundColor: '#6b3064',
     
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6b3064',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6b3064',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
 
export default class WalkthrowScreen extends Component {
    static navigationOptions = {
        headerStyle : {display:"none"}
      }

    

  render(){
    const { navigate } = this.props.navigation;
    return (
      <Swiper 
      style={styles.wrapper} 
      showsButtons={true}
  
      loop = {false}
      nextButton = { <Image source={require('../Assets/wt_right.png')}  style={{width:12,height:21,marginRight:22}}/>}
      prevButton = { <Image source={require('../Assets/wt_left.png')}  style={{width:12,height:21,marginLeft:22}}/>}
    
      
      dot = {<View style={{backgroundColor:'#8a3980', width: 6, height: 6,borderRadius: 4, marginLeft: 4, marginRight: 4, marginTop: 3, marginBottom: 3,}} />}
      activeDot = {<View style={{backgroundColor:'#fff', width: 6, height: 6,borderRadius: 4, marginLeft: 4, marginRight: 4, marginTop: 3, marginBottom: 3,}} />}
       >
        <View style={styles.slide1}>
       
                <Image source={require('../Assets/wt_1.png')}  style={{width:Dimensions.get('window').width,height:320}}/>
                <Text style={{color:'white',fontSize:18,fontFamily:'Roboto-Regular',textAlign:'center',marginTop:24}}>Welcome To</Text>
                <View style={{marginTop:14,alignItems:'center',justifyContent:'center',backgroundColor:'transparent'}}>
                <Image source={require('../Assets/wt_logo.png')}  style={{width:173,height:63}}/>
                <Text style={{color:'white',fontSize:18,textAlign:'center',marginTop:31}}> Congratulations{'\n'} 
                                                                                            on renewing your vows!</Text>
                </View>
                <Image source={require('../Assets/wtbg_motif.png')}  style={{width:Dimensions.get('window').width,height:530,position:'absolute',top:260}}/>
        </View>

        <View style={styles.slide2}>
        <Image source={require('../Assets/wtbg_motif.png')}  style={{width:Dimensions.get('window').width,height:430,position:'absolute',bottom:-100}}/>
             <Image source={require('../Assets/wt_2.png')}  style={{width:320,height:320}}/>
                <Text style={{color:'white',fontSize:18,fontFamily:'Roboto-Regular',textAlign:'center',marginTop:24}}>An app customized for you</Text>
                <View style={{alignItems:'center',justifyContent:'center'}}>
               
                <Text style={{color:'white',fontSize:18,textAlign:'center',marginTop:23}}>Vows uses your personality type to help deepen your relationship with your {'\n'}spouse… make sure you appreciate your spouse for who they are! </Text>
                </View>
                
        </View>


        <View style={styles.slide3}>
        <Image source={require('../Assets/wtbg_motif.png')}  style={{width:Dimensions.get('window').width,height:430,position:'absolute',bottom:-100}}/>
        <Image source={require('../Assets/wt_3.png')}  style={{width:320,height:320}}/>
                <Text style={{color:'white',fontSize:18,fontFamily:'Roboto-Regular',textAlign:'center',marginTop:17}}>Strengthen your bond with{'\n'}Love Maps</Text>
                <View style={{alignItems:'center',justifyContent:'center'}}>
               
                <Text style={{color:'white',fontSize:18,textAlign:'center',marginTop:11}}>Get to know your spouse better {'\n'}and have lots of fun in the process… let some friendly competition fire up your relationship!  </Text>
                </View>
               
        </View>
        <View style={styles.slide3}>
        <Image source={require('../Assets/wtbg_motif.png')}  style={{width:Dimensions.get('window').width,height:430,position:'absolute',bottom:-100}}/>
        <Image source={require('../Assets/wt_4.png')}  style={{width:320,height:320}}/>
                <Text style={{color:'white',fontSize:18,fontFamily:'Roboto-Regular',textAlign:'center',marginTop:17}}>Monitor her cycle</Text>
                <View style={{alignItems:'center',justifyContent:'center'}}>
               
                <Text style={{color:'white',fontSize:18,textAlign:'center',marginTop:11}}>Let Vows help you take care of your {'\n'}spouse… it’ll keep you informed {'\n'}about her menstrual cycle and keep {'\n'}you updated about how she’s {'\n'}feeling!  </Text>
                </View>
               
        </View>
        <View style={styles.slide3}>
        <Image source={require('../Assets/wtbg_motif.png')}  style={{width:Dimensions.get('window').width,height:430,position:'absolute',bottom:-100}}/>
        <Image source={require('../Assets/wt_5.png')}  style={{width:320,height:320}}/>
                <Text style={{color:'white',fontSize:18,fontFamily:'Roboto-Regular',textAlign:'center',marginTop:17}}>Share your feelings</Text>
                <View style={{alignItems:'center',justifyContent:'center'}}>
               
                <Text style={{color:'white',fontSize:18,textAlign:'center',marginTop:11}}>Telling your spouse how you feel is {'\n'}just a tap away… communicating {'\n'}with your spouse could not be {'\n'}easier!</Text>
                </View>
            
        </View>
        <View style={styles.slide3}>
        <Image source={require('../Assets/wtbg_motif.png')}  style={{width:Dimensions.get('window').width,height:430,position:'absolute',bottom:-100}}/>
            <Image source={require('../Assets/wt_6.png')}  style={{width:320,height:320}}/>
                 <Text style={{color:'white',fontSize:18,fontFamily:'Roboto-Regular',textAlign:'center',marginTop:17}}>Enjoy your moments together</Text>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'white',fontSize:18,textAlign:'center',marginTop:11}}>Sharing pictures with your spouse {'\n'}has never been easier… a private {'\n'}photo album just for both of you!</Text>
                </View>
                <TouchableOpacity style={{right:28,bottom:22,position:'absolute'}} onPress={()=> navigate('Register')}>
               <Text style={{color:'white',fontSize:16,fontFamily:'Roboto-Bold'}}>START</Text>
                </TouchableOpacity>
               
        </View>
      </Swiper>
    );
  }
}