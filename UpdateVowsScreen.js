import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, BackHandler,ScrollView,TextInput} from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import firebase from '../components/FireBase';


class UselessTextInput extends React.Component {
  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable = {true}
        maxLength = {100}
      />
    );
  }
}

export default class UpdateVowsScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        checking : false,
        thevow : '',
     
      };
    }

    componentDidMount()
    {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) { 
      fetch('http://vps477048.ovh.net/vows/webservice/myvows/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id : user.uid ,       
         }),

        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
             if (response.length >0) {
              this.setState({
                checking : false,
                thevow : response[0].vow,
              })
             }
             else 
             {
                this.setState({
                  checking : false,
                  thevow : 'there is No Vows Found'
                })
             }
             this.renderCurrentState();
             
        })
        .catch((error) => {
            console.log(error);
        }); 
      }
    })
  }


    setVows ()
    {
      const { navigate } = this.props.navigation;
      this.setState({checking : true });

      this.renderCurrentState();

      firebase.auth().onAuthStateChanged((user) => {
        if (user) { 
          fetch('http://vps477048.ovh.net/vows/webservice/setvows/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id : user.uid ,  
              vow : this.state.thevow,     
             }),

            })
            .then(response => response.json())
            .then(response => {
                if (response)
                {
                        this.setState({checking : false });
                  
                        this.renderCurrentState();

                        alert('Vows Updated');
                        navigate('Home');
                }else
                {
                  this.setState({checking : false });
                  
                        this.renderCurrentState();

                        alert('Error Accured please try Again');
                }
                
                 
            })
            .catch((error) => {
                console.log(error);
            }); 

        }
      })
    }

  

    renderCurrentState(){

        const { navigate } = this.props.navigation;

        if (this.state.checking){
    
          return(
            <View  style={styles.container}>
              <ActivityIndicator size='large' />
            </View>
    
          )
    
        } else{

          return (
            
            <View style={{
              borderBottomColor: '#000',
              borderBottomWidth: 1,
            
               }}
            >
            <Text>add your vows to your partner</Text>
            
              <UselessTextInput
                placeholder= 'أضف ععهودك هنا'
                multiline = {true}
                numberOfLines = {2}
                onChangeText={(thevow) => this.setState({thevow})}
                value={this.state.thevow}
              />
            <Button onPress={() => this.setVows()}>Update Vows</Button>
            </View>

          );
        }
    }



    render()
    {
        
       const { navigate } = this.props.navigation;
       return (
                   this.renderCurrentState()
                  )
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