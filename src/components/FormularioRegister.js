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

    componentDidMount() {
        auth.onAuthStateChanged(user => {
          if (user) {
            this.props.navigation.navigate('logueado')
          }
        })
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

        if (!this.validacionEmail(email)) {
            this.setState({ errorEmail: 'Ingrese un formato de email válido' });
            return false;
        } else {
            this.setState({ errorEmail: '' });
            return true;
        }
    }
    VerificarPassword() {
        const { password } = this.state;

        if (!this.validacionPassword(password)) {
            this.setState({ errorPassword: 'La contraseña debe tener una longitud mínima de 5 caracteres.' });
            return false;
        } else {
            this.setState({ errorPassword: '' });
            return true;
        }
    }

    VerificarUsername() {
        const { username } = this.state;

        if (!this.validacionUsername(username)) {
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
                        style={[
                            styles.button,
                            this.validacionForm() ? styles.buttonEnabled : styles.buttonDisabled,
                        ]}
                        disabled={!this.validacionForm()}
                        onPress={() => this.submit()}>
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
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
        padding: 20,
    },
    formContainer: {
        width: '95%',
        backgroundColor: '#f0f4f8',
        borderWidth: 1,
        borderColor: '#bebebe',
        borderRadius: 10,
        padding: 25,
    },
    title: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        color: '#5e35b1',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#7f7f7f',
        marginBottom: 15,
    },
    input: {
        height: 40,
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1.5,
        borderColor: '#D3C6E5',
        marginVertical: 8,
        borderRadius: 8,
        fontSize: 16,
        fontFamily: ' BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;',
        backgroundColor: '#f0f4f8',
        color: '#000',
    },
    errorText: {
        color: '#d32f2f',
        fontSize: 12,
        textAlign: 'left',
    },
    button: {
        marginTop: 20,
        alignSelf: 'center',
        width: '80%',
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonDisabled: {
        backgroundColor: '#bfa2d8',
    },
    buttonEnabled: {
        backgroundColor: 'rgb(94, 53, 177)',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

