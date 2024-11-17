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
            this.setState({error: 'Ingrese un formato de email válido'})
            return
        }
        
        if(username.length < 2){
            this.setState({error: 'Ingrese un nombre de usuario'})
            return
        }

        if(password.length < 5){
            this.setState({error: 'Ingrese una contraseña más larga'})
            return
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            if(user){
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    username: username,
                })
                .then(
                    () => this.props.navigation.navigate('login')
                )

            }
        })
        .catch(err => {
            if (err.code === "auth/email-already-in-use"){
                this.setState({error: 'El email ya esta en uso'})
            }
        })

    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Occogram</Text>
                <Text style={styles.subtitle}>Registrate para ver fotos y videos de tus amigos.</Text>
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
                    <Text style={styles.errorText}>
                        {this.state.error}
                    </Text>
                }
                <TouchableOpacity
                    onPress={()=> this.submit(this.state.email, this.state.username, this.state.password)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Registrarte</Text>
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
        backgroundColor: '#f0f4f8', // Color de fondo suave
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
    subtitle:{
        fontSize: 18,
        textAlign: 'center',
        color: '#7f7f7f', // Color principal de la aplicación
        marginBottom: 20,
    },
    input: {
        height: 50,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: '#D3C6E5',
        marginVertical: 10,
        borderRadius: 8,
        fontSize:16,
        backgroundColor: '#ffffff', // Fondo blanco para los inputs
        shadowColor: '#000',
       
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
        color: '#d32f2f', 
        marginVertical: 10,
    },
});