import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View, FlatList} from 'react-native';

import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default class QuestionScreen extends React.Component {
   
    state = {
        email: '',
        QuestionAnswred: false,
        tipAv : false,
        tiptxt: '',
        UID : '',
        Question:'',
      }
      
      componentDidMount() {
          console.log ('Question Page');

 
            
         }

         
         onPressAnswerQuestion ( answerchoosed,id_rep ) {
            const { navigate } = this.props.navigation;
            fetch('http://vps477048.ovh.net/vows/webservice/answerdailyquestion/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.props.navigation.state.params.uid ,
                    question_id: this.props.navigation.state.params.question.item.id_question ,
                    answer_id : id_rep ,
                    
                })
                })
                .then(response => response.json())
                .then(response => { 
                        console.log(response);
                        console.log(answerchoosed);
                            this.setState({QuestionAnswred: true,})
                            if (answerchoosed.tip_id != '')
                            {
                                this.setState({tipAv: true,
                                               tiptxt:answerchoosed.tip.message}) 
                            }
                            this.renderCurrentStatus();
                            
                         
                })
                .catch((error) => {
                    console.log(error);
                }); 
         }

     
        renderCurrentStatus(){
            const { navigate } = this.props.navigation;
            if (!(this.state.QuestionAnswred)){
            return ( 
               
                 
            
          <View > 
          <Text  style={styles.bigblue} >{this.props.navigation.state.params.question.item.question}</Text>  
    
          <FlatList
          data= {this.props.navigation.state.params.question.item.answers}

            renderItem={({item}) => 
            <View> 
            <Button onPress={() => this.onPressAnswerQuestion(item,item.id_answer)}>{item.answer}</Button>
            </View>
                 }
            keyExtractor={(item, indexkey) => indexkey}
           /> 
          </View>
               
                       
                   
                           
            );
            }else{

                if (this.state.tipAv)
                {
                    return ( 
                        <View>
                         <Text  style={styles.bigblue} >Tip</Text>
                         <Text >{this.state.tiptxt}</Text>

                         <Button onPress={() =>  navigate('Home')}>Go Back Home</Button>
                       </View>
                       );

                }
                else{

                
             return ( 
                 <View>
                  <Text  style={styles.bigblue} >Thank You For Answering</Text>
                  <Button onPress={() =>  navigate('Home')}>Home</Button>
                </View>
                );
              }
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
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
      },
 
  });