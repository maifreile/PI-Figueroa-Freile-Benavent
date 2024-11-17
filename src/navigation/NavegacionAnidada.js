import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Busqueda from '../screens/Busqueda';

const Tab = createBottomTabNavigator()


export default class NavegacionAnidada extends Component {
  render() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name='Home' 
            component={Home} 
            options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome name="home" size={24} color="#7f7f7f" />
                }}
            />
           <Tab.Screen 
           name='Perfil' 
           component={Profile}  
           options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome name="user" size={24} color="#7f7f7f" />
            }}
            />
            <Tab.Screen
            name="Buscador"
            component={Busqueda}
            options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome name="search" size={24} color="#7f7f7f" />
              }}
            />
            
        </Tab.Navigator>
    )
  }
}