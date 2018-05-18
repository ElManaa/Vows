import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, FlatList,ScrollView,Picker} from 'react-native';
import { Input } from '../components/Input';
import DatePicker from 'react-native-datepicker'
import { Button } from '../components/Button';
import firebase from '../components/FireBase';
import Calendar from 'react-native-calendar-select';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
export default class SpecialMomentScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        uid:'',
        time : '' ,
        title : '' ,
        date : new Date() ,
        activities : ''
    };
 
  }
  componentDidMount(){
    this.getactivities();
    }
    
    getactivities(){
    this.authSubscription =  firebase.auth().onAuthStateChanged((user) => {
        fetch('http://vps477048.ovh.net/vows/webservice/getactivities/'+user.uid, {
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
                        this.setState({ 
                            activities:response ,
                                       })
                     
                        
                    } 
                    
            })
            .catch((error) => {
                console.log(error);
            });
        })
   }

 
   setActivity(){
    this.authSubscription =  firebase.auth().onAuthStateChanged((user) => {
    fetch('http://vps477048.ovh.net/vows/webservice/addactivity/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id : user.uid  ,
            title :  this.state.title,
            time : this.state.time,
            date :this.state.date,
        }),
        })
       
        .then(response => { 
                console.log(response);
                this.getactivities();
        })
        .catch((error) => {
            console.log(error);
        });
    })}
 
 

  render() {
  
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.form}>
        <Text>Activities </Text>


        <FlatList
                    data= {this.state.activities}
                        renderItem={({item}) =>
                                <View> 
                                  <Button > Date : {item.date.split("T",1)} / Time : {item.time} / Activity : {item.title} </Button>
                                </View>
                        }
                    keyExtractor={(item, index) => index}
                 />
      <Text>Add Acitivty</Text>

           <Input
            placeholder='Activity'
            label = 'Activity'
            onChangeText={title  => this.setState({title})}
            value={this.state.title}
            />
            
            <Picker
                  selectedValue={this.state.time}
                  onValueChange={(itemValue, itemIndex) => this.setState({time: itemValue})}>
                  <Picker.Item label="الصبح" value="الصبح" />
                  <Picker.Item label="بعد العصر" value="بعد العصر" />
                  <Picker.Item label="العشاء" value="العشاء" />
               </Picker>

                <DatePicker
                    style={{width: 200}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1960-01-01"
                    maxDate="2050-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />

          

            <Button onPress={() => this.setActivity()}>Add Activity</Button>
    

 
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