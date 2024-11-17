import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from '../screens/Register'
import Login from '../screens/Login'
import NavegacionAnidada from './NavegacionAnidada'

const Stack = createNativeStackNavigator()

export default class NavegacionPrincipal extends Component {
 
  render() {
    
    return (
        <Stack.Navigator>
            <Stack.Screen name='register' component={Register}  options={{headerShown: false}} />
            <Stack.Screen name="logueado" component={NavegacionAnidada} options={{ headerShown: false }} />
            <Stack.Screen name='login' component={Login} options={{headerShown: false}} />
        </Stack.Navigator>
    )
  }
}