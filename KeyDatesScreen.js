import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, FlatList,ScrollView} from 'react-native';
import { Input } from '../components/Input';
import DatePicker from 'react-native-datepicker'
import { Button } from '../components/Button';
import firebase from '../components/FireBase';
import Calendar from 'react-native-calendar-select';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
export default class KeyDatesScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        uid:'',
        description : '' ,
        event : '' ,
        date : new Date() ,
        dates : ''
    };
 
  }
  componentDidMount(){
    this.getDates();
    }
    
   getDates(){
    this.authSubscription =  firebase.auth().onAuthStateChanged((user) => {
        fetch('http://vps477048.ovh.net/vows/webservice/getkeydate/'+user.uid, {
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
                            dates:response ,
                                       })
                     
                        
                    } 
                    
            })
            .catch((error) => {
                console.log(error);
            });
        })
   }

 
setDates(){
    this.authSubscription =  firebase.auth().onAuthStateChanged((user) => {
    fetch('http://vps477048.ovh.net/vows/webservice/setkeydate/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id : user.uid  ,
            date :  this.state.date,
            descriptions : this.state.description,
            event: this.state.event ,
        }),
        })
       
        .then(response => { 
                console.log(response);
                this.getDates();
        })
        .catch((error) => {
            console.log(error);
        });
    })}
 
    getScheduled() 
    {
      FCM.getScheduledLocalNotifications().then(notif=>console.log(notif));
    }

  render() {
  
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.form}>
        <Text>Special Dates</Text>


        <FlatList
                    data= {this.state.dates}
                        renderItem={({item}) =>
                                <View> 
                                  <Button onPress={() => navigate('KeyDate',{ date : {item}  })}> Date : {item.date.split("T",1)} / Event : {item.event} / Descriptions : {item.descriptions} </Button>
                                </View>
                        }
                    keyExtractor={(item, index) => index}
                 />
      <Text>Add Another Key Date</Text>

           <Input
            placeholder='Event Name'
            label = 'Event'
            onChangeText={event => this.setState({event})}
            value={this.state.event}
            />
             <Input
            placeholder='Description'
            label = 'Description'
        
            onChangeText={description => this.setState({description})}
            value={this.state.description}
            />

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

          

            <Button onPress={() => this.setDates()}>Add Date</Button>
    
 
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