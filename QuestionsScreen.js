import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View, ScrollView ,FlatList} from 'react-native';

import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default class QuestionsScreen extends React.Component {
   
    state = {
        email: '',
        QuestionsAv: false,
        UID : '',
        Questions:'',
      }
      
      componentDidMount() {
            this.getQuestions();
         }

      getQuestions(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                fetch('http://vps477048.ovh.net/vows/webservice/checkdailyquestions/'+user.uid, {
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
                                this.setState({QuestionsAv:true,
                                                 Questions:response ,
                                               })
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
     
        renderCurrentStatus(){
            const { navigate } = this.props.navigation;
            if (this.state.QuestionsAv){
            return ( 
                <View>
                 
                 <FlatList
                    data= {this.state.Questions}
                        renderItem={({item}) =>
                                <View> 
                                  <Button onPress={() => navigate('Question',{ question : {item} , uid : this.state.UID })}>{item.question}</Button>
                                  <Text>Answered By Partner : {  item.answered ? 'Yes' :  'No' }</Text>
                                </View>
                        }
                    keyExtractor={(item, index) => index}
                 />
                       
                </View>         
                           
            );
            }else{
             return ( <Text> No Questions Available !</Text> );
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