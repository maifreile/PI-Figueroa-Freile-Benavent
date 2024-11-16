import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class FormularioRegister extends Component {
    constructor(props){
        super(props)
        this.state={
            email: '',
            username:'',
            password:'',
            error:''
        }
    }

    submit(email, username, password){
        if(!email.includes('@')){
            this.setState({error: 'Ingrese un formato de email valido'})
            return
        }
        
        if(username.length < 2){
            this.setState({error: 'Ingrese un username'})
            return
        }

        if(password.length < 5){
            this.setState({error: 'Ingrese una password mas larga'})
            return
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            if(user){
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    bio: bio,
                    username: username,
                    imagenPerfil: ''
                })
                .then(
                    () => this.props.navigation.navigate('Login')
                )

                
            }
        })
        .catch(err => {
            if (err.code === "auth/email-already-in-use"){
                this.setState({error: 'el email ya esta en uso'})
            }
        })

    }


    render() {
        return (
        <View>
            <TextInput
                style={styles.input}
                placeholder='Ingrese su correo'
                keyboardType='email-address'
                onChangeText={(text) => this.setState({email: text, error: ''})}
                value={this.state.email}
            />
            <TextInput
                style={styles.input}
                placeholder='Ingrese su username'
                keyboardType='default'
                onChangeText={(text) => this.setState({username: text, error: ''})}
                value={this.state.username}
            />
           
            <TextInput
                value={this.state.password}
                style={styles.input}
                placeholder='Ingrese su password'
                keyboardType='default'
                onChangeText={(text) => this.setState({password: text, error: ''})}
                secureTextEntry={true}
            />
            {
                this.state.error !== '' 
                &&
                <Text>
                    {this.state.error}
                </Text>
            }
            <TouchableOpacity
                onPress={()=> this.submit(this.state.email, this.state.username, this.state.password)}
            >
                <Text>Registrarse</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 10
    }, 
    btn: {
        background: 'blue',
        marginBottom: 10
    }
})