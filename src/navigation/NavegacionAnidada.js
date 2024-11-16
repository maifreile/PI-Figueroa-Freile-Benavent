import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Home from '../screens/Home'


const Tab = createBottomTabNavigator()


export default class NavegacionAnidada extends Component {
  render() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name='home' component={Home} 
            options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />
                }}/>
           
            
        </Tab.Navigator>
    )
  }
}