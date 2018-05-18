import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View, ScrollView ,FlatList} from 'react-native';

import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default class DyksScreen extends React.Component {
   
    state = {
        email: '',
        DyksAv: false,
        UID : '',
        dyks:'', 
      }
      
      componentWillMount() {
            this.getdyks();
         }

      getdyks(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                fetch('http://vps477048.ovh.net/vows/webservice/getdyks/'+user.uid, {
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
                                this.setState({DyksAv:true,
                                             dyks:response ,})
                                this.renderCurrentStatus();
                                
                            }else{

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
       
                fetch('http://vps477048.ovh.net/vows/webservice/seendyks/'+id, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                 
                    })
            
                    .then(response => { 
                            console.log(response);
                            this.getdyks();
                    })
                    .catch((error) => {
                        console.log(error);
                    });          
            
     
    }
     
        renderCurrentStatus(){
            if (this.state.DyksAv){

            return ( 
                <View>
                 
                 <FlatList
                         data= {this.state.dyks}

                      renderItem={({item}) =>
                                            <View> 
                                               <Button onPress={() => this.seenTips(item.id_dyk_user)}>{item.dyk.message}</Button>
                                                 
                                            </View>
                }
          keyExtractor={(item, index) => index}
                     />
                </View>         
                           
            );
            }else{
             return ( <Text> No Did you know Available !</Text> );
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