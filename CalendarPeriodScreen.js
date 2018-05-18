import React from 'react';
import { ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  BackAndroid, 
  BackHandler,
  ScrollView,
  AsyncStorage,
  Image,Dimensions,
  TouchableOpacity, 
  Modal,
  TouchableWithoutFeedback} from 'react-native'; 
import * as firebase from 'firebase' ;

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
 
import {LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
};

LocaleConfig.defaultLocale = 'fr';

 
export default class CalendarPeriodScreen extends React.Component {
  static navigationOptions = {
    headerStyle : {display:"none"}
  }

  constructor(props) {
    super(props);
    this.state = {
      
      cycledays : this.props.navigation.state.params ? this.props.navigation.state.params.cycledays  : '-' ,
      periodays : this.props.navigation.state.params ? this.props.navigation.state.params.periodays : '-',
 
      selected : '2018-04-01',
      day :'' ,
      month : '' ,
      year : '' , 
    };
    this.onDayPress = this.onDayPress.bind(this);
}

 
 

      componentDidMount() {
   
      }
      
        
 
             render(){
       
            const { navigate } = this.props.navigation;
       
            return (
              <View style={{ flex: 1 }}>
                   <View style={styles.container}>


                   <View style={{ backgroundColor:'#834ca4',height:106}}>
                   <TouchableOpacity onPress={() => navigate('PeriodeCycle',{periodays:this.state.periodays,cycledays:this.state.cycledays})}>
                   <Image source={require('../Assets/backarrow.png')}  style={{width:10,height:18,marginLeft:17,marginTop:20}}/>
                   </TouchableOpacity>
                   <Text style={{color:'#fff',fontFamily:'Roboto-Bold',fontSize:14,textAlign:'center',marginTop:25}}>When did your last period start</Text>
                    </View>

                  <View style={{flexDirection:'row',justifyContent:'center',marginTop:25}}>
                  <Image source={require('../Assets/periodCalendar.png')}  style={{width:25,height:27}}/>
                    <Text style={{color:'#834CA4',fontSize:22,fontFamily:'Roboto-Bold',marginTop:3,marginLeft:17}}>{this.state.day}</Text>
                    <Text style={{color:'#834CA4',fontSize:18,fontFamily:'Roboto-Bold',marginTop:6,marginLeft:10}}>{this.state.month}, {this.state.year}</Text>
                  </View>
                
                  <View style={{marginTop:37,marginLeft:27,marginRight:23}} >


        
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={{[this.state.selected]: {selected: true}}}
        
          theme={{
            calendarBackground: '#efefef',
            textSectionTitleColor: '#9e9e9e',
            dayTextColor: 'black',
            todayTextColor: '#009688',
            selectedDayTextColor: 'white',
            monthTextColor: '#834ca4',
            selectedDayBackgroundColor: '#834ca4',
            arrowColor: '#834ca4',
            // textDisabledColor: 'red',
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }
            }
          }}
        />
 
     
          </View>
          <TouchableOpacity onPress={() => navigate('PeriodeCycle',{periodays:this.state.periodays,cycledays:this.state.cycledays,day:this.state.day,month:this.state.month,year:this.state.year,date:this.state.selected})}>
            <Text style={{textAlign:'right',marginRight:44,marginTop:40,marginBottom:100,fontSize:16,color:'#834ca4',fontFamily:'Roboto-Bold'}}>NEXT</Text>

                    </TouchableOpacity>  
              </View>
     
                
                     
                      
                     </View> 
        );
    }

    onDayPress(day) {
     
      this.setState( 
        {
          selected: day.dateString,
          year:day.dateString.substr(0,4),
          month:this.findmonth(day.dateString.substr(5,2)),
          day:day.dateString.substr(8,2)
        });

     
     }


     findmonth (number) 
     {
       
       switch(number) {
         case '01':
             return 'JAN';
         case '02':
             return 'FEV';
         case '03':
             return 'MAR';
         case '04':
             return 'APR';
         case '05':
             return 'MAY';
         case '06':
             return 'JUN';
         case '07':
             return 'JUL';
         case '08':
             return 'AUG';
         case '09':
             return 'SEP';
         case '10':
             return 'OCT';
         case '11':
             return 'NOV';
         case '12':
             return 'DEC'; 
       }
    }

}
 
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor : '#efefef' ,
  },
    form :{
      flex: 1 ,
    },
    bigblue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
      alignItems:'center',
      justifyContent:'center',
    },
    bottomNavigation: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 56
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center', 
      backgroundColor: 'rgba(0,0,0,0.5)', 
    },

    innerContainer: {
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius : 20,
      alignContent:'center',
      justifyContent: 'center' ,
      marginLeft : 30,
      marginRight : 30
    },
  });

  