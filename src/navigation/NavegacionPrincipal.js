import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from '../screens/Register'
import Login from '../screens/Login'
import NavegacionAnidada from './NavegacionAnidada'
import Home from '../screens/Home'
import NuevoPost from '../screens/NuevoPost'

const Stack = createNativeStackNavigator()

export default class NavegacionPrincipal extends Component {
 
  render() {
    
    return (
        <Stack.Navigator initialRouteName='login'>
            <Stack.Screen name='register' component={Register}  options={{headerShown: false}} />
            <Stack.Screen name="logueado" component={NavegacionAnidada} options={{ headerShown: false }} />
            <Stack.Screen name='login' component={Login} options={{headerShown: false}} />
            <Stack.Screen name="home" component={NavegacionAnidada} options={{ headerShown: false }} />
            <Stack.Screen name='newpost' component={NavegacionAnidada} options={{headerShown: false}} />
        </Stack.Navigator>
    )
  }
}