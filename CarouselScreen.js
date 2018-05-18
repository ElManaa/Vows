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
    ImageBackground,
    TouchableWithoutFeedback} from 'react-native';

    import Carousel from 'react-native-snap-carousel';
 
      const horizontalMargin = 5;
      const slideWidth = 380; 
      const sliderWidth = Dimensions.get('window').width;
      const sliderHeight = Dimensions.get('window').height;
      const itemWidth = Dimensions.get('window').width - 80;
      const itemHeight = 320;

      
    export default class CarouselScreen extends React.Component {


        constructor(props) {
            super(props);
            this.state = {
                 entries : [
                 {
                  
                  title: "something",
                  color:'rgb(250,104,124)'
                },
                {
                
                  title: "something five",
                  color:'aqua'
                },
              {
                
                title: "something flour",
                color:'aqua'
              }
              ] 
          
            };
          }
       
          _renderItem ({item, index}) {
            return (
                <View style={{width: itemWidth,
                              height: itemHeight,
                              paddingHorizontal: horizontalMargin}}>

                   <View style={{backgroundColor:'#fff',borderRadius:20,height:300,marginBottom:100,marginTop:'3%'}}  behavior='padding'>
                    
                        <View>
                            <Text style={{fontWeight:'500',fontSize:20,marginTop:45,color:'#3D3188',marginLeft:20 }}> {index}</Text>
                            <Text style={{ fontWeight:'400',fontSize:17,marginTop:14,color:'#3D3188',marginLeft:20,marginRight:20,lineHeight: 30 }}>{item.title}</Text>
                        </View>
                                
                        <TouchableOpacity onPress={() => navigate('MenuLoveMaps')} style={{position:'absolute',right:0,bottom:25,marginRight:23}}>
                             <Text style={{fontWeight : 'bold'}} >GOOD</Text>
                        </TouchableOpacity>

                   </View>

                </View>
            );
        }
    
        render () {
            return (
                <View >
              
                <Text  onPress={() => { this._carousel.snapToNext(); }}  style={{ marginLeft:200}}>NEXT </Text>
                <Text  onPress={() => { this._carousel.snapToPrev(); }}>PREV</Text>
                 
        
                </View>
            );
        }
    }

 