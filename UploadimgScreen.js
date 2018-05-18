import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,Image} from 'react-native';

import firebase from '../components/FireBase';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {StackNavigator} from 'react-navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import ImagePicker from 'react-native-image-picker';

 

export default class  UploadimgScreen extends React.Component {
   
  constructor(props) {  
    super(props);
    this.state = {
      avatarSource: '',
    }
    }
  
  // More info on all the options is below in the README...just some common use cases shown here
 
  
  imagepicker (){
      
    options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
   
      ImagePicker.showImagePicker(options, (response) => {
      
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };
      
        
      
          this.setState({
            avatarSource: source
          });
        this.renderCurrentState();
          console.log('SOurce : ' + this.state.avatarSource);
        }
      });
    }
        componentDidMount() 
        {
    
        }

        sendRq()
        {
          const data = new FormData();
      
          data.append('image', {
            uri: this.state.avatarSource.uri ,
            type: 'image/jpeg',  
            name: 'image'
          });

          fetch('http://vps477048.ovh.net/vows/webservice/testimg/', {
            method: 'post',
            body: data
          })
          .then(res => {
            console.log(res)
          })
          .catch((error) => {
            console.log(error);
          }); 


        }
     
      

          renderCurrentState()
          {
            
           if (this.state.avatarSource != "")
           {
             return (
               <View>
              <Image
              style={{width: 150, height: 150 , borderRadius:90, margin:5 ,}}
              source={this.state.avatarSource}
              />
    <Button onPress={() => this.imagepicker()}>ImgPicker</Button>
    <Button onPress={() => this.sendRq()}>height</Button>
            </View>
             )
             
           }
           return (
            <View>
 <Button onPress={() => this.imagepicker()}>ImgPicker</Button>
 <Button onPress={() => this.sendRq()}>height</Button>
          </View>
             )
        }
 

    render(){
        const { navigate } = this.props.navigation;
       
        return (
          
            <View>
        {this.renderCurrentState()}
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
 
    },
    form :{
      flex: 1 ,
    }
  });