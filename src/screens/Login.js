import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
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
      <View style={styles.container}>
        <FormularioLogin navigation={this.props.navigation}/>
        <Text style={styles.text}>¿No tienes una cuenta?</Text>
        <TouchableOpacity
            onPress={() => this.irARegister()}
            style={styles.registerButton}
        >
            <Text style={styles.registerButtonText}>Registrate</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8', // Color de fondo suave
        padding: 20,
    },
    registerButton: {
        backgroundColor: '#81c784', // Color pastel para el botón
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
      fontSize: 16,
      color: '#5e35b1', // Color pastel para el texto de aviso
      textAlign: 'center',
      marginTop: 20,
      fontStyle: 'italic', // Estilo en cursiva para el texto
  },
  })
