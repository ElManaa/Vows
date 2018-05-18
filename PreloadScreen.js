import React from 'react';
import { ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    View, 
    AsyncStorage, 
    Dimensions,
 } from 'react-native';

export default class PreloadScreen extends React.Component { 
    static navigationOptions = {
        headerStyle : {display:"none"}
    }

    constructor(props) {
        super(props);
        this.state = { 
            ActivityIndicatorV: true, 
        }
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        try {
            const value =   AsyncStorage.getItem('@firstrun:key').then((value) =>{ 
            if (value !== null){ 
                try {
                    const value =   AsyncStorage.getItem('@logged').then((value) =>{ 
                        
                        if (value !== null){
                            navigate('Home'); 
                        }else{
                            navigate('Login'); 
                        }


                     })
                    }catch (error) {
                        console.log('error writing data : '+error)
                      } 

            }
            else {
              
              try {
                AsyncStorage.setItem('@firstrun:key','BYEL');
                 navigate('Walkthrow');
                 } catch (error) {
                console.log('error writing data : '+error)
                  }
            }
          })} catch (error) {
            
          }
   
     }


     render() {
        return (
            
            <View style={{height:Dimensions.get('window').height,justifyContent:'center'}}>
                {this.state.ActivityIndicatorV 
                ?   <View>
                <ActivityIndicator size='large'/> 
                
                    </View>
                :
                <Text> </Text>
                }
              
            
            </View>
        )

     }
    
}