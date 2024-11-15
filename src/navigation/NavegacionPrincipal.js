import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from '../screens/Register'

const Stack = createNativeStackNavigator()

export default class NavegacionPrincipal extends Component {
  render() {
    return (
        <Stack.Navigator>
           
            <Stack.Screen name='register' component={Register}  options={{headerShown: false}} />
           
        </Stack.Navigator>
    )
  }
}