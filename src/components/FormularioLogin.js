import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class FormularioLogin extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    submit(email,password){
        if (!email.includes('@')) {
            this.setState({error:'Ingrese un formato de email válido'})
            return
        }

        if (password.lenght < 1) {
            this.setState({error:'Ingrese una contraseña más larga'})
            return
        }

        auth
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('logueado'))
        .catch((err)=>{
            console.log('error sin parsear',err)
            const error= JSON.parse(err.message)
            console.log('error parseado', error);
            if (error.error.message === "INVALID_LOGIN_CREDENTIALS") { 
                this.setState({error: 'Alguno de los datos ingresados no es correcto'})
            }
        })

    }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Occogram</Text>
          <TextInput
              style={styles.input}
              placeholder='Ingrese su correo'
              keyboardType='email-adress'
              onChangeText={(text) => this.setState({email: text, error:''})}
              value={this.state.email}
          />
          <TextInput
              style={styles.input}
              placeholder='Ingrese su password'
              keyboardType='default'
              onChangeText={(text) => this.setState({password: text, error:''})}
              value={this.state.password}
              secureTextEntry= {true}
          />

          {
              this.state.error !== ''
              &&
              <Text style= {styles.errorText}>
                  {this.state.error}
              </Text>
          }
          <TouchableOpacity onPress={()=> this.submit(this.state.email, this.state.password) }
              >
                  <Text style={styles.buttonText}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f4f8', // Fondo blanco
      padding: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#f0f4f8', // Mismo color de fondo
    borderWidth: 1, // Borde fino
    borderColor: '#bebebe', // Color del borde
    borderRadius: 8,
    padding: 50, // Espaciado interno
  },
  title: {
      textAlign: 'center',
      fontSize: 32,
      fontWeight: 'bold',
      color: '#5e35b1', // Color principal de la aplicación
      marginBottom: 20,
  },
  input: {
      height: 50,
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderWidth: 2,
      borderColor: '#D3C6E5', // Color de borde
      marginVertical: 10,
      borderRadius: 8,
      fontSize: 16,
      backgroundColor: '#f0f4f8', // Fondo suave para los inputs
  },
  buttonText: {
      backgroundColor: '#bfa2d8', // Color del botón
      paddingVertical: 15,
      paddingHorizontal: 20,
      textAlign: "center",
      borderRadius: 8,
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
  },
  errorText: {
      color: '#d32f2f', // Color rojo para los errores
      marginVertical: 10,
  }
});
