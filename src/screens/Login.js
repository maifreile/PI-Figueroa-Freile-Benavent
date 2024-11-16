import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormularioLogin from '../components/FormularioLogin'
import { auth } from '../firebase/config';

export default class Login extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){}
   

    irARegister(){
        this.props.navigation.navigate('register')
    }

    irAAnidada(){
      this.props.navigation.navigate('logueado')
    }

  render() {
    return (
      <View>
        <Text>Login</Text>
        <FormularioLogin navigation={this.props.navigation}/>
        <TouchableOpacity
            onPress={() => this.irARegister()}
        >
            <Text>Vamos al register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}