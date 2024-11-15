import { Text, View, TouchableOpacity, TouchableOpacityBase } from 'react-native'
import React, { Component } from 'react'
import FormularioRegister from '../components/FormularioRegister'

export default class Register extends Component {
    constructor(props){
        super(props)
    }

    irAlLogin(){
        this.props.navigation.navigate('login')
    }

    // goToAnidada(){
    //     this.props.navigation.navigate('navegacion')
    // }
  render() {
    return (
      <View>
        <Text>Register</Text>
        <FormularioRegister navigation={this.props.navigation} />
        <TouchableOpacity
        onPress={()=> this.irAlLogin()}
        >
            <Text>Ir al login</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
            onPress={()=> this.goToAnidada()}
        >
            <Text>Ir a la navegacion anidada</Text>
        </TouchableOpacity> */}
      </View>
    )
  }
}