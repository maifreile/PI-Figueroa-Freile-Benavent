import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
    };
  }

  componentDidMount() {
    if (auth.currentUser?.email) {
      console.log('Usuario actual:', auth.currentUser.email);

      db.collection('users')
        .where('owner', '==', auth.currentUser.email)
        .onSnapshot((docs) => {
          let arrDocs = [];
          docs.forEach((doc) => {
            console.log('Documento:', doc.data());
            arrDocs.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          console.log('userInfo actualizado:', arrDocs);
          this.setState({ userInfo: arrDocs });
        });
    } else {
      console.error('No hay un usuario autenticado.');
    }
  }

  SignOut = () => {
    auth
      .signOut()
      .then(() => {
       
        this.props.navigation.replace('login'); // Redirige a la pantalla de login
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
        Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.');
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Aquí va el usuario</Text>
        {this.state.userInfo.length > 0 ? (
          <Text style={styles.username}>{this.state.userInfo[0].data.username}</Text>
        ) : (
          <Text style={styles.loading}>Cargando usuario...</Text>
        )}

        {/* Botón para cerrar sesión */}
        <TouchableOpacity style={styles.signOutButton} onPress={this.SignOut}>
          <Text style={styles.signOutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    );
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5e35b1',
    textAlign: 'center'
  },
  subtitle:{
    fontSize: 18,
    textAlign: 'center',
    color: '#7f7f7f', // Color principal de la aplicación
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 30,
  },
  loading: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
  },
  signOutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});
