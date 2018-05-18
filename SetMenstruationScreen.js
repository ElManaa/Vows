import React from 'react';
import { ActivityIndicator,Platform,StyleSheet,Text,View,BackAndroid, BackHandler,ScrollView,Picker} from 'react-native';
import { Input } from '../components/Input';
import moment from 'moment';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import { Button } from '../components/Button';
import firebase from '../components/FireBase';
import Calendar from 'react-native-calendar-select';

export default class SetMenstruationScreen extends React.Component {
    
  constructor (props) {
    super(props);
    this.state = {
        UID : '',
        PMS01: '',
        PMS02:'',
        PMS03:'',
      startDate: '20100101',  
      endDate: '20100101',
      cyclelength : '20',
    };
    this.confirmDate = this.confirmDate.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
    this.onSelect = this.onSelect.bind(this)
  }
  // when confirm button is clicked, an object is conveyed to outer component
  // contains following property:
  // startDate [Date Object], endDate [Date Object]
  // startMoment [Moment Object], endMoment [Moment Object]
  confirmDate({startDate, endDate, startMoment, endMoment}) {
    this.setState({
      startDate,
      endDate
    });
  }

  onSelect(id ,index, value){
    if (id == 1 )
    {
      this.setState({
        PMS01 : value
        })
    }else if (id == 2 )
    {
      this.setState({
        PMS02 : value
        })
    }else if (id == 3 )
    {
      this.setState({
        PMS03 : value
        })
    }
    
}
  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
        this.setState({
            UID: user.uid
        })
    } )
  }
  openCalendar() {
    this.calendar && this.calendar.open();
  }
  submitmenstruation()
   {
     console.log(this.state.startDate)
    
    fetch('http://vps477048.ovh.net/vows/webservice/setmenstruation/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id : this.state.UID ,
            duration : this.state.cyclelength,
            start_date : this.state.startDate,
            end_date: this.state.endDate ,
            PMS01 : this.state.PMS01,
            PMS02 : this.state.PMS02,
            PMS03 : this.state.PMS03,
        }),
        })
        .then(response => response.json())
        .then(response => { 
                console.log(response);
             
        })
        .catch((error) => {
            console.log(error);
        }); 
 
}
  render() {
    // It's an optional property, I use this to show the structure of customI18n object.
    let customI18n = {
      'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'text': {
        'start': 'Check in',
        'end': 'Check out',
        'date': 'Date',
        'save': 'Confirm',
        'clear': 'Reset'
      },
      'date': 'DD / MM'  // date format
    };
    // optional property, too.
    let color = {
      subColor: '#f0f0f0',
      mainColor :'#FA4DC4'
    };

    return (
      <View>
            <Text>Please Choose Your Full Cycle Length</Text>
            <Picker
                  selectedValue={this.state.cyclelength}
                  onValueChange={(itemValue, itemIndex) => this.setState({cyclelength: itemValue})}>

                  <Picker.Item label="20" value="20"/>
                  <Picker.Item label="21" value="21"/>
                  <Picker.Item label="22" value="22"/>
                  <Picker.Item label="23" value="23"/>
                  <Picker.Item label="24" value="24"/>
                  <Picker.Item label="25" value="25"/>
                  <Picker.Item label="26" value="26"/>
                  <Picker.Item label="27" value="27"/>
                  <Picker.Item label="28" value="28"/>
                  <Picker.Item label="29" value="29"/>
                  <Picker.Item label="30" value="30"/>
                  <Picker.Item label="31" value="31"/>
                  <Picker.Item label="32" value="32"/>
                  <Picker.Item label="33" value="33"/>
                  <Picker.Item label="34" value="34"/>
                  <Picker.Item label="35" value="35"/>
                  <Picker.Item label="36" value="36"/>
                  <Picker.Item label="37" value="37"/>
                  <Picker.Item label="38" value="38"/>
                  <Picker.Item label="39" value="39"/>
                  <Picker.Item label="40" value="40"/>
                  <Picker.Item label="41" value="41"/>
                  <Picker.Item label="42" value="42"/>
                  <Picker.Item label="43" value="43"/>

               </Picker>
               <Text>Please Specify the Periode Start date & length</Text>
       
       
      <Button title="Open Calendar" onPress={this.openCalendar}>Open Calendar</Button>
      <Calendar 
      i18n="en"
      ref={(calendar) => {this.calendar = calendar;}}
      customI18n={customI18n}
      color={color}
      format="YYYYMMDD"
      minDate="20180104"
      maxDate="20180510"

      startDate={this.state.startDate}  // Periode Starts
      endDate={this.state.endDate}      // Periode Ends

      ov1 = "20100101"                  // Ovulations
      ov2 = "20100101"                  // Ovulations
      ovday= "20100101"                 // Ovulations
      ov4 = "20100101"                  // Ovulations
      ov5 = "20100101"                  // Ovulations
      ov6 = "20100101"                  // Ovulations     
      PMS1 = "20100101"                 // PMS1
      PMS2 = "20100101"                 // PMS2
      PMS3 = "20100101"                 // PMS3
      PMS4 = "20100101"                 // PMS4
   
      startDate2 = "20100101"
      endDate2 =   "20100101"
      
      ov12 = "20100101"                  // Ovulations
      ov22 = "20100101"                  // Ovulations
      ovday2 = "20100101"                // Ovulations
      ov42 = "20100101"                  // Ovulations
      ov52 = "20100101"                  // Ovulations
      ov62 = "20100101"                  // Ovulations     
      PMS12 = "20100101"                 // PMS1
      PMS22 = "20100101"                 // PMS2
      PMS32 = "20100101"                 // PMS3
      PMS42 = "20100101"  
    
      onConfirm={this.confirmDate}
      male = "auto"
    />

             <Text>Question 01 About PMS</Text>

 
                <RadioGroup
                    onSelect = {(index, value) => this.onSelect(1,index, value)}
                    color='#9575b2'
                    highlightColor='#ccc8b9'
                >
                    <RadioButton value={'true'} >
                        <Text>Yes</Text>
                    </RadioButton>

                    <RadioButton value={'false'}>
                        <Text>No</Text>
                    </RadioButton>
 

                </RadioGroup>

                <Text>Question 02 About PMS</Text>

 
                <RadioGroup
                    onSelect = {(index, value) => this.onSelect(2,index, value)}
                    color='#9575b2'
                    highlightColor='#ccc8b9'
                >
                    <RadioButton value={'true'} >
                        <Text>Yes</Text>
                    </RadioButton>

                    <RadioButton value={'false'}>
                        <Text>No</Text>
                    </RadioButton>
 

                </RadioGroup>
                

                <Text>Question 03 About PMS</Text>

 
                <RadioGroup
                    onSelect = {(index, value) => this.onSelect(3,index, value)}
                    color='#9575b2'
                    highlightColor='#ccc8b9'
                >
                    <RadioButton value={'true'} >
                        <Text>Yes</Text>
                    </RadioButton>

                    <RadioButton value={'false'}>
                        <Text>No</Text>
                    </RadioButton>
 

                </RadioGroup>
                
                <Text>1 {this.state.PMS01} 2 {this.state.PMS02} 3  {this.state.PMS03} </Text>
                
 
        <Button onPress={() => this.submitmenstruation()}>Submit Menstruation </Button>
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
      marginTop: 40,
      padding: 20
    },
    form :{
      flex: 1 ,
    } ,
  text: {
      padding: 10,
      fontSize: 14,
},
  });