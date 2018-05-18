import React from 'react';
import { ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    View, 
    AsyncStorage, 
    Dimensions,
 } from 'react-native';

export default class PreCycleScreen extends React.Component { 
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
            const value =   AsyncStorage.getItem('@Cycleset').then((value) =>{ 
            if (value !== null){ 
                navigate('PeriodState');  
            }
            else { 
                navigate('PeriodeCycle'); 
            }
          })} catch (error) {
            
          }
   
     }
  


     render() {
        return (
            
            <View style={{height:Dimensions.get('window').height,justifyContent:'center'}}>
                {this.state.ActivityIndicatorV 
                ?   
                <View>
                <ActivityIndicator size='large'/> 
               
                    </View>
                :
                <Text> </Text>
                }
              
            
            </View>
        )

     }
    
}