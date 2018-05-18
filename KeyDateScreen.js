import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, FlatList,ScrollView} from 'react-native';
import { Input } from '../components/Input';
import DatePicker from 'react-native-datepicker'
import { Button } from '../components/Button';
import firebase from '../components/FireBase';
import Calendar from 'react-native-calendar-select';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
export default class KeyDateScreen extends React.Component {
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
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        console.log('Notifiiiff');
          console.log(notif);
          FCM.presentLocalNotification({
            id: new Date().getTime().toString(),
            title: 'notif.title',
            body: 'notif.body',
            url: 'notif.url',
            icon: 'ic_notification',
            large_icon: 'ic_notification',
            sound:'default',
          
            priority: 'high',
            
           
            show_in_foreground: true,
            priority: 10
          })

         if(notif.opened_from_tray){
           const { navigate } = this.props.navigation;
             navigate(notif.screen);
         }

  
       });
    }
    
    triggerOneday(){
        console.log (new Date(this.props.navigation.state.params.date.item.date.split("T",1)).getTime() + 86400);
        FCM.scheduleLocalNotification({
           
            fire_date: new Date(this.props.navigation.state.params.date.item.date.split("T",1)).getTime() + 86400,     
            id: "Its One Day Before " + this.props.navigation.state.params.date.item.event,     
            title : "One Dat Reminder"   ,  
            body: "Its One Day Before " + this.props.navigation.state.params.date.item.event,   
            show_in_foreground: true,
            sound:'default',
            priority: 10,
        })
   }

   triggerOneWeek(){

    FCM.scheduleLocalNotification({
        
        fire_date: new Date(this.props.navigation.state.params.date.item.date.split("T",1)).getTime() + 604800,   
        id: "Its One Week Before " + this.props.navigation.state.params.date.item.event,   
        title : "One Week Reminder"   ,  
        body: "Its One Week Before " + this.props.navigation.state.params.date.item.event,     
        show_in_foreground: true,
        sound:'default',
        priority: 10,
    })
   }

   triggerOneMonth(){

    FCM.scheduleLocalNotification({
        
        fire_date: new Date(this.props.navigation.state.params.date.item.date.split("T",1)).getTime() + 2592000,       
        id: "Its One Month Before " + this.props.navigation.state.params.date.item.event  ,   
        title : "One Month Reminder"   ,
        body: "Its One Month Before " + this.props.navigation.state.params.date.item.event  ,  
        show_in_foreground: true,
        sound:'default',
        priority: 10,
    })
   }
 
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.form}>
 
      <Text>Set A Trigger to this event </Text>
      <Button  > Date : {this.props.navigation.state.params.date.item.date.split("T",1)} / Event : {this.props.navigation.state.params.date.item.event}  </Button>
     <Button onPress={() => this.triggerOneday()}>Notify Me before 1 Day</Button>
     <Button onPress={() => this.triggerOneWeek()}>Notify Me before 1 week</Button>
     <Button onPress={() => this.triggerOneMonth()}>Notify Me before 1 month</Button>


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