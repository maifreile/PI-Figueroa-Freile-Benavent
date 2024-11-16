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
            this.setState({error:'Ingrese un formato de email valido'})
            return
        }

        if (password.lenght < 1) {
            this.setState({error:'Debe ingresar una password'})
            return
        }

        auth
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('logueado'))
        .catch((err)=>{
            console.log('error sin parsear',err)
            const error= JSON.parse(err.message)
            console.log('error parseado', error);
            if (error.error.message === "INVALID_LOGIN_CREDENTIALS") { //si pongo un mail valido pero no la password
                this.setState({error: 'Alguno de los datos ingresados no es correcto'})
            }
        })

    }
  render() {
    return (
      <View>
        <Text>Formulario Login</Text>
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
            <Text>
                {this.state.error}
            </Text>
        }
        <TouchableOpacity onPress={()=> this.submit(this.state.email, this.state.password) }
            >
                <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      marginStart: 20,
      paddingHorizontal: 10
    },
    input: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      marginVertical: 10,
      borderRadius: 6,
      borderStyle: 'solid'
    },
    button: {
      backgroundColor: '#28a745',
      paddingHorizontal: 10,
      paddingVertical: 10,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      alignItems: 'center',
      marginBottom: 10,
    },
    buttonText: {
      color:'#fff'
  },
  });
