// import React from 'react';
// import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, BackHandler,ScrollView} from 'react-native';
// import { Input } from '../components/Input';
// import moment from 'moment';
// import { Button }  from '../components/Button';
// import firebase from '../components/FireBase';
// import Calendar from 'react-native-calendar-select';

// export default class CalendarScreen extends React.Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       startDate: "20180123",  
//       endDate: "20180125",  
//       ov1 : "20100101",  
//       ov2 : "20100101",  
//       ovday : "20100101",  
//       ov4 : "20100101",  
//       ov5 : "20100101",  
//       ov6 : "20100101",  
//       PMS1 : "20100101",  
//       PMS2 : "20100101",  
//       PMS3 : "20100101",  
//       PMS4 : "20100101",  

//       startDate2: "20180220",  
//       endDate2: "20180222",  
//       ov12 : "20180211",  
//       ov22 : "20180211",  
//       ovday2 : "20100101",  
//       ov42 : "20100101",  
//       ov52 : "20100101",  
//       ov62 : "20100101",  
//       PMS12: "20100101",  
//       PMS22 : "20100101",  
//       PMS32 : "20100101",  
//       PMS42 : "20100101",  

//       today : new Date() ,
//       CycleEnd : "20190101",
//       fetchingData: true
//     };
//     this.confirmDate = this.confirmDate.bind(this);
//     this.openCalendar = this.openCalendar.bind(this);
  
//   }
 
//   componentWillMount(){
//     console.disableYellowBox = true;
//     firebase.auth().onAuthStateChanged((user) => {
//       this.setState({
//           UID: user.uid
//       })
//       this.getMenstruation();
//   } )
   
//   }

//   confirmDate({startDate, endDate, startMoment, endMoment}) {
//     this.setState({
//       startDate,
//       endDate
//     });
//   }

//   getMenstruation () {
 

//     fetch('http://vps477048.ovh.net/vows/webservice/wifemonstruations/'+this.state.UID, {
//       method: 'POST',
//       headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//       },
    
//       })
//       .then(response => response.json())
//       .then(response => { 
               
//               this.setState({
//                 startDate: response[0].start_date,
//                 endDate:   response[0].period_end,  
//                 ov1 :  moment(new Date (response[0].ovulation_date) ).subtract(2,'day'), 
//                 ov2 :  moment(new Date (response[0].ovulation_date) ).subtract(1,'day'), 
//                 ovday :  response[0].ovulation_date,   
//                 ov4 :  moment(new Date (response[0].ovulation_date) ).add(1,'day'), 
//                 ov5 : moment(new Date (response[0].ovulation_date) ).add(2,'day'),   
//                 ov6 : moment(new Date (response[0].ovulation_date) ).add(3,'day'), 
//                 startDate2: response[1].start_date,
//                 endDate2:   response[1].period_end,  
//                 ov12 :  moment(new Date (response[1].ovulation_date) ).subtract(2,'day'), 
//                 ov22 :  moment(new Date (response[1].ovulation_date) ).subtract(1,'day'), 
//                 ovday2 :  response[1].ovulation_date,   
//                 ov42 :  moment(new Date (response[1].ovulation_date) ).add(1,'day'), 
//                 ov52 : moment(new Date (response[1].ovulation_date) ).add(2,'day'),   
//                 ov62 : moment(new Date (response[1].ovulation_date) ).add(3,'day'),

//                 today : new Date() ,
//                 CycleEnd :  response[1].end_date,
//                 fetchingData :false,
//               })

//               if (response[0].PMS_date != null )
//               {
//                 this.setState({
//                   PMS1 :  moment(new Date (response[0].PMS_date) ).subtract(3,'day'),
//                   PMS2 :  moment(new Date (response[0].PMS_date) ).subtract(2,'day'),
//                   PMS3 :  moment(new Date (response[0].PMS_date) ).subtract(1,'day'),
//                   PMS4 : response[0].PMS_date,  
//                 })
//               }
              
//               if (response[1].PMS_date != null )
//               {
//                 this.setState({
//                   PMS12 :  moment(new Date (response[1].PMS_date) ).subtract(3,'day'),
//                   PMS22 :  moment(new Date (response[1].PMS_date) ).subtract(2,'day'),
//                   PMS32 :  moment(new Date (response[1].PMS_date) ).subtract(1,'day'),
//                   PMS42 : response[1].PMS_date,  
//                 })
//               }

//       })
//       .catch((error) => {
//           console.log(error);
//       }); 
//   }
//   openCalendar() {
//     this.calendar && this.calendar.open();
//   }
//   // in render function
//   render() {
//     // It's an optional property, I use this to show the structure of customI18n object.
//     let customI18n = {
//       'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
//       'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//       'text': {
//         'start': 'Check in',
//         'end': 'Check out',
//         'date': 'Date',
//         'save': 'Confirm',
//         'clear': 'Reset'
//       },
//       'date': 'DD / MM'  // date format
//     };
//     // optional property, too.
//     let color = {
//       subColor: '#f0f0f0',
//       mainColor :'#FA4DC4'
//     };
//         if (this.state.fetchingData)
//         {
//           return(
//             <View><Text>Loading Data </Text></View>
//           )

//         }else {

       
//     return (
     
//       <View >
      
//         <Button title="Open Calendar" onPress={this.openCalendar}></Button> 
       
      
//         <Calendar 
//           i18n="en"
//           ref={(calendar) => {this.calendar = calendar;}}
//           customI18n={customI18n}
//           color={color}
//           format="YYYYMMDD"
          
//           minDate={this.state.today}
//           maxDate={this.state.CycleEnd}

//           startDate={this.state.startDate}        // Periode Starts
//           endDate={this.state.endDate}            // Periode Ends

//           ov1 = {this.state.ov1}                  // Ovulations
//           ov2 = {this.state.ov2}                  // Ovulations
//           ovday= {this.state.ovday}               // Ovulations
//           ov4 = {this.state.ov4}                  // Ovulations
//           ov5 = {this.state.ov5}                  // Ovulations
//           ov6 = {this.state.ov6}                  // Ovulations     

//           PMS1 = {this.state.PMS1}                // PMS1
//           PMS2 = {this.state.PMS2}                // PMS2
//           PMS3 = {this.state.PMS3}                // PMS3
//           PMS4 = {this.state.PMS4}                // PMS4


//           startDate2={this.state.startDate2}        // Periode Starts
//           endDate2={this.state.endDate2}            // Periode Ends

//           ov12 = {this.state.ov12}                  // Ovulations
//           ov22 = {this.state.ov22}                  // Ovulations
//           ovday2= {this.state.ovday2}               // Ovulations
//           ov42 = {this.state.ov42}                  // Ovulations
//           ov52 = {this.state.ov52}                  // Ovulations
//           ov62 = {this.state.ov62}                  // Ovulations     

//           PMS12 = {this.state.PMS12}                // PMS12
//           PMS22 = {this.state.PMS22}                // PMS22
//           PMS32 = {this.state.PMS32}                // PMS32
//           PMS42 = {this.state.PMS42}                // PMS42
        
//           onConfirm={this.confirmDate}
//           male = "none"
//         />
//         <Text>Start Date {this.state.startDate}</Text>
          
//       </View>
//     );
//   }
// }

// }







// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 20,
//       alignItems : 'center',
//       justifyContent: 'center',
//       flexDirection:'row',
//     },
//     form :{
//       flex: 1 ,
//     }
//   });