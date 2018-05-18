import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator,Image } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

 

/**
 * Screen for first tab.
 * You usually will have this in a separate file.
 */

class MoviesAndTV extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: () => <Icon size={24} name="home" color="white" />
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <TouchableOpacity onPress={() => navigate('Couples')}>
        <Text  >GOHOME</Text>
        <Text>Movies & TV</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

/**
 * Screen for second tab.
 * You usually will have this in a separate file.
 */
class Music extends Component {
  static navigationOptions = {
    tabBarLabel: 'Couples',
    tabBarIcon: () => <Icon size={24} name="users" color="white" />
  }

  render() {
    return (
      <View>
        <Text>Music</Text>
      </View>
    )
  }
}

/**
 * Screen for third tab.
 * You usually will have this in a separate file.
 */
class Books extends Component {
  static navigationOptions = {
    tabBarLabel: 'profile ',
    tabBarIcon: () => <Icon size={24} name="user" color="white" />
  }

  render() {
    return (
      <View>
        <Text>Books</Text>
      </View>
    )
  }
}

/**
 * react-navigation's TabNavigator.
 */
const MyApp = TabNavigator(
  {
    Home: { screen: MoviesAndTV },
    Music: { screen: Music },
    Books: { screen: Books }
  },
  {
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      bottomNavigationOptions: {
        labelColor: 'white',
        rippleColor: 'white',
        tabs: {
          Home: {
            barBackgroundColor: '#37474F',
            label : 'Home'
          },
          Music: {
            barBackgroundColor: '#00796B'
           
          },
          Books: {
            barBackgroundColor: '#5D4037'
          }
        }
      }
    }
  }
)


export default MyApp;