import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,Picker, ScrollView} from 'react-native';

import * as firebase from 'firebase' ;
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default class ProfileScreen extends React.Component {
   
    state = {
        email: '',
        authenticating: false,
        UID : '',
        gender : '',
        first_name:'',
        last_name :'',
        birthday : '',
        horoscope: '',
        weight : '',
        height : '',
        tshirt_size: '',
        ring_size:'',
        shoses_size:'',
        phone:'',
        security_code:'',
       
       
      }
      

      componentWillMount() {
            this.getProfile();
         }

      getProfile(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                fetch('http://vps477048.ovh.net/vows/webservice/getuser/'+user.uid, {
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
                          UID : user.uid,
                        email: response.email,
                        gender : response.gender,
                        first_name: response.first_name,
                        last_name : response.last_name,
                        birthday : response.birthday,
                        horoscope: response.horoscope,
                        weight :  response.weight,
                        height : response.height,
                        tshirt_size: response.tshirt_size,
                        ring_size: response.ring_size,
                        shoses_size: response.shoses_size,
                        phone: response.phone,
                        security_code:response.security_code,
                      }) 
                    
                    })
                    .catch((error) => {
                        console.log(error);
                    });          
            }
        })
    }
     

    onPressUpdate()
    {
        const { navigate } = this.props.navigation;
        fetch('http://vps477048.ovh.net/vows/webservice/completeprofile/'+this.state.UID, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                gender : this.state.gender,
                first_name: this.state.first_name,
                last_name : this.state.last_name,
                birthday : this.state.birthday,
                horoscope: this.state.horoscope,
                weight :  this.state.weight,
                height : this.state.height,
                tshirt_size: this.state.tshirt_size,
                ring_size: this.state.ring_size,
                shoses_size: this.state.shoses_size,
                phone: this.state.phone,
                security_code : this.state.security_code,
            })
            })
            .then(response => response.json())
            .then(response => { 
                console.log(response); 
                navigate('AddVows');
            })
            .catch((error) => {
                console.log(error);
            }); 
    }

    
             render(){
       
                const { navigate } = this.props.navigation;
       
        return (
          
            <View >
                    <ScrollView>
            <Text>Please Complete Your Profile</Text>
            <Input
                placeholder='Enter Your First Name'
                label = 'First Name'
                onChangeText={first_name => this.setState({first_name})}
                value={this.state.first_name}
            />
            <Input
                placeholder='Enter Your Last Name'
                label = 'Last Name'
                onChangeText={last_name => this.setState({last_name})}
                value={this.state.last_name}
            />
            <Input
                placeholder='Enter Your birthday'
                label = 'birthday'
                onChangeText={birthday => this.setState({birthday})}
                value={this.state.birthday}
            />
             <Input
                placeholder='Enter Your phone Number'
                label = 'Phone'
                onChangeText={phone => this.setState({phone})}
                value={this.state.phone}
            />
            <Input
                placeholder='Enter Your horoscope'
                label = 'horoscope'
                onChangeText={horoscope => this.setState({horoscope})}
                value={this.state.horoscope}
            />
            <Input
                placeholder='Enter Your Email'
                label = 'Email'
                onChangeText={email => this.setState({email})}
                value={this.state.email}
            />
            <Input
                placeholder='Enter Your weight'
                label = 'weight'
                onChangeText={weight => this.setState({weight})}
                value={this.state.weight}
            />

        <Input 
                placeholder='Enter Your height'
                label = 'height'
                onChangeText={height => this.setState({height})}
                value={this.state.height}
            />
        <Input 
                placeholder='Enter Your shirt size'
                label = 'shirt size'
                onChangeText={tshirt_size => this.setState({tshirt_size})}
                value={this.state.tshirt_size}
            />
             <Input 
                placeholder='Enter Your Ring Size'
                label = 'Ring Size'
                onChangeText={ring_size => this.setState({ring_size})}
                value={this.state.ring_size}
            />
             <Input 
                placeholder='Enter Your Shoses Size'
                label = 'Shoses Size'
                onChangeText={shoses_size => this.setState({shoses_size})}
                value={this.state.shoses_size}
            />
            
            <Picker
            selectedValue={this.state.gender}
            onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            </Picker>

            <Input 
                placeholder='Enter a Security Code'
                label = 'Security Code'
                onChangeText={security_code => this.setState({security_code})}
                value={this.state.security_code}
            />
            
            <Button onPress={() => this.onPressUpdate()}>Update Profile</Button>
            </ScrollView>
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