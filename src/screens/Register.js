import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormularioRegister from '../components/FormularioRegister'

export default class Register extends Component {
  constructor(props) {
    super(props)
  }

  irAlLogin() {
    this.props.navigation.navigate('login')
  }

  render() {
    return (
      <View style={styles.container}>
        <FormularioRegister navigation={this.props.navigation} />
        <Text style={styles.text}>Si ya tienes una cuenta:</Text>
        <TouchableOpacity
          onPress={() => this.irAlLogin()}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Inicia sesión</Text>
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
    backgroundColor: '#f0f4f8',
    padding: 20,
  },

  loginButton: {
    backgroundColor: '#81c784',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#5e35b1',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});