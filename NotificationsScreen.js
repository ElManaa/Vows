import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import firebase from '../components/FireBase';
import { Button } from '../components/Button';

// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if(notif.local_notification){
      //this is a local notification
    }
    if(notif.opened_from_tray){
      //iOS: app is open/resumed because user clicked banner
      //Android: app is open/resumed because user clicked banner or tapped app icon
    }
    // await someAsyncCall();

    if(Platform.OS ==='ios'){
      //optional
      //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
      //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
      //notif._notificationType is available for iOS platfrom
      switch(notif._notificationType){
        case NotificationType.Remote:
          notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
          break;
        case NotificationType.NotificationResponse:
          notif.finish();
          break;
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
          break;
      }
    }
});
FCM.on(FCMEvent.RefreshToken, (token) => {
    console.log(token)
    // fcm token may not be available on first load, catch it here
});
        
    export default class NotificationsScreen extends React.Component {
      state = {
        
                token: '',
              
            }
        componentDidMount() {

            // iOS: show permission prompt for the first call. later just check permission in user settings
            // Android: check permission in user settings
            FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));
            
            FCM.getFCMToken().then(token => {
                console.log(token)
               this.setState({token:token}); 
            });
            
            this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
             console.log('Notifiiiff');
               console.log(notif);
            
              if(notif.opened_from_tray){
                const { navigate } = this.props.navigation;
                  navigate(notif.screen);
              }
            });
        
          FCM.getInitialNotification().then(notif => {
               console.log(notif)
            });
        }
    
        componentWillUnmount() {      
            //this.notificationListener.remove();
        }
    
     
        sendnotif () {

            fetch('https://fcm.googleapis.com/fcm/send', {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "key=AAAAsllAo3M:APA91bFVQYcJ7vFQlLgYilrFT31aLt1zlflmCXBt6vqbYUkvmch9U7OPip2twZVEJqqgrWsVvIUd9dwUKXcfWK5cJyfycjyqr2CNBksrv2IVvqSLTe5hBH0N2gbWCbdY2mVe3vBROiDA"
                },
                method: 'POST',
                json: true,
                body: JSON.stringify({
                  to : this.state.token,
                  data : {
                    custom_notification  : {
                       title : "Simple FCM Client",
                      body : "This is a notification with only NOTIFICATION.",
                      sound : "default",
                       priority : "high",
                        show_in_foreground : true
                    }
                  },
                  priority: 10
                }),
              }).then((response) => response.text())
              .then((responseData) => { console.log(responseData)})

              .catch(function(error) {
                // not called
                console.error(error)
              })

        }
          getScheduled() 
          {
            FCM.getScheduledLocalNotifications().then(notif=>console.log(notif));
          }
          

          schedulenotif()
          {
          
           
            FCM.scheduleLocalNotification({
              
              fire_date: new Date("2017/12/21 12:05:02 GMT+1").getTime(),       
              id: "UNIQ_ID_STRING",     
              body: "from future past",
          
          })
           
          }


          presentLocalNotification()
          {
            FCM.presentLocalNotification({
              id: "UNIQ_ID_STRING",                               // (optional for instant notification)
                                               // Android only, LED blinking (default false)
                                         
          });
          }
          
          reset(){
            FCM.cancelAllLocalNotifications()
           FCM.deleteInstanceId()
            .then( () => {
              //Deleted instance id successfully
              //This will reset Instance ID and revokes all tokens.
            })
            .catch(error => {
              //Error while deleting instance id
            });
          }


        render (){
            return (
                <View>

                <Button onPress={() => this.sendnotif()}>Send Notif</Button> 
                <Button onPress={() => this.getScheduled()}>getScheduled</Button>
                <Button onPress={() => this.schedulenotif()}>schedulenotif</Button>
                <Button onPress={() => this.presentLocalNotification() }>Present Local Notif</Button>
                <Button onPress={() => this.getScheduled()}>reset</Button>
                <Text>Current Token : {this.state.token}</Text>
                </View>
            ) ;
        }
    }