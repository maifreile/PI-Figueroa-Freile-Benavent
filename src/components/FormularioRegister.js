import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class FormularioRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            password: '',
            errorEmail: '',
            errorPassword: '',
            errorUsername: '',
            error: ''
        }
    }
//Voy hacer una validacion para cada categroia
validacionEmail(email) {
    return email.includes('@');
}

validacionPassword(password) {
    return password.length >= 5;
}

validacionUsername(username) {
    return username.length >= 2;
}

VerificarEmail() {
    const { email } = this.state;

    if (email === '') {
        this.setState({ errorEmail: 'El campo de email no puede estar vacío.' });
        return false;
    } else if (!this.validacionEmail(email)) {
        this.setState({ errorEmail: 'Email debe utilizar un @.' });
        return false;
    } else {
        this.setState({ errorEmail: '' });
        return true;
    }
}
VerificarPassword() {
    const { password } = this.state;

    if (password === '') {
        this.setState({ errorPassword: 'El campo de contraseña no puede estar vacío.' });
        return false;
    } else if (!this.validacionPassword(password)) {
        this.setState({ errorPassword: 'La contraseña debe tener una longitud mínima de 5 caracteres.' });
        return false;
    } else {
        this.setState({ errorPassword: '' });
        return true;
    }
}

VerificarUsername() {
    const { username } = this.state;

    if (username === '') {
        this.setState({ errorUsername: 'El campo de username no puede estar vacío.' });
        return false;
    } else if (!this.validacionUsername(username)) {
        this.setState({ errorUsername: 'El username debe tener al menos 2 caracteres.' });
        return false;
    } else {
        this.setState({ errorUsername: '' });
        return true;
    }
}

validacionForm() {
    const { email, password, username } = this.state;
    return email !== '' && password !== '' && username !== '';
}
    submit() {
        const EmailValido = this.VerificarEmail();
        const PasswordValido = this.VerificarPassword();
        const UsernameValido = this.VerificarUsername();

        if (EmailValido && PasswordValido && UsernameValido) {
            auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    db.collection('users').add({
                        owner: this.state.email,
                        createdAt: Date.now(),
                        username: this.state.username,
                    })
                        .then(() => this.props.navigation.navigate('login'))
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ error: error.message })
                });
        }
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
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                    />
                    {this.state.errorEmail ? <Text style={styles.errorText}>{this.state.errorEmail}</Text> : null}

                    <TextInput
                        style={styles.input}
                        placeholder='Ingrese su username'
                        onChangeText={(text) => this.setState({ username: text })}
                        value={this.state.username}
                    />
                    {this.state.errorUsername ? <Text style={styles.errorText}>{this.state.errorUsername}</Text> : null}

                    <TextInput
                        style={styles.input}
                        placeholder='Ingrese su password'
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                    />
                    {this.state.errorPassword ? <Text style={styles.errorText}>{this.state.errorPassword}</Text> : null}

                    {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}

                    <TouchableOpacity
                        style={styles.button}
                        disabled={!this.validacionForm()}
                        onPress={() => this.submit()}
                    >
                        <Text style={styles.buttonText}>Registrarme</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8', 
        padding: 20,
    },
    formContainer: {
        width: '90%',
        backgroundColor: '#f0f4f8', 
        borderWidth: 1, 
        borderColor: '#bebebe', 
        borderRadius: 8,
        padding: 50, 
    },
    title: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#5e35b1', 
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#7f7f7f', 
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
        fontSize: 16,
        backgroundColor: '#ffffff', 
        shadowColor: '#000',
    },
    buttonText: {
        backgroundColor: '#bfa2d8', 
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
