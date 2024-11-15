import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class FormularioHome extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            comentario: ''
        }
    }

    enviarComentario(){
        if(
            this.state.username.length >= 4 && 
            this.state.comentario.length !== ''
        ){
                //De auth puedo sacar dos metodos
                //createUserWithEmailAndPassword
                auth
                .createUserWithEmailAndPassword(this.state.username, this.state.comentario)
                .then((user) => {
                    this.props.navigation.navigate('Home')
                })
                .catch(err => console.log('hubo un err en Firebase', err))

                //signinUserWithEmailAndPassword
                auth
                .signInWithEmailAndPassword(this.state.username, this.state.comentario)
                .then( user => {
                    
                })
                .catch(err => console.log('error en firebase', err))

        }
    }

  render() {
    return (
      <View>
        <Text>FormularioHome</Text>
        <View>
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Ingresa tu nombre de usuario'
                onChangeText={(texto) => this.setState({ username: texto})}
                value={this.state.username}
            />
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Que quieres comentar?'
                onChangeText={(texto) => this.setState({ comentario: texto}) }
                value={this.state.comentario}
            />
            <TouchableOpacity
                onPress={() => this.enviarComentario()}
            >
                <Text>
                    Comentar
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: 'red'
    }
})