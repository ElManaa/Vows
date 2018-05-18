import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View, ScrollView ,FlatList} from 'react-native';

import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default class TipsScreen extends React.Component {
   
    state = {
        email: '',
        TipsAv: false,
        UID : '',
        Tips:'',
       
       
      }
      
      componentWillMount() {
            this.getTips();
         }

      getTips(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                fetch('http://vps477048.ovh.net/vows/webservice/checkdailytips/'+user.uid, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    })
                    .then(response => response.json())
                    .then(response => { 
                            console.log(response);
                            if (response.length > 0 )
                            {
                                this.setState({TipsAv:true,
                                                Tips:response ,})
                                this.renderCurrentStatus();
                                
                            } 
                            this.setState({
                                UID : user.uid,
                                email : user.email,
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    });          
            }
        })
    }

      seenTips(id){
       
                fetch('http://vps477048.ovh.net/vows/webservice/seentips/'+this.state.UID, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      
                        tip_id : id ,
                    }),
                    })
                    .then(response => response.json())
                    .then(response => { 
                            console.log(response);
                         
                    })
                    .catch((error) => {
                        console.log(error);
                    });          
            
     
    }
     
        renderCurrentStatus(){
            if (this.state.TipsAv){

            return ( 
                <View>
                 
                 <FlatList
                         data= {this.state.Tips}

                      renderItem={({item}) =>
                                            <View> 
                                               <Button onPress={() => this.seenTips(item.id_tip)}>{item.message}</Button>
                                                <Text>Tip Category :{item.category.name}</Text>  
                                            </View>
                }
          keyExtractor={(item, index) => index}
                     />
                </View>         
                           
            );
            }else{
             return ( <Text> No Tips Available !</Text> );
            }
        }
    
    render(){
       
                const { navigate } = this.props.navigation;
       
                return (
                <View>
                {this.renderCurrentStatus()}
                </View>

                );
    }

}
 
 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems : 'center',
      justifyContent: 'center',
      flexDirection:'row',
    },
    form :{
      flex: 1 ,
    }
  });