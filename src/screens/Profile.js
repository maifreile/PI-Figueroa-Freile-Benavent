import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      userPosts: [],
    };
  }

  componentDidMount() {
    const currentUserEmail = auth.currentUser?.email;

    if (currentUserEmail) {
      console.log('Usuario actual:', currentUserEmail);

          db.collection('users')
        .where('owner', '==', currentUserEmail)
        .onSnapshot((docs) => {
          let arrDocs = [];
          docs.forEach((doc) => {
            arrDocs.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          console.log('Información del usuario actualizada:', arrDocs);
          this.setState({ userInfo: arrDocs });
        });

     
      db.collection('posts')
        .where('owner', '==', currentUserEmail)
        .onSnapshot((docs) => {
          let posteos = [];
          docs.forEach((doc) => {
            posteos.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          console.log('Publicaciones del usuario actualizadas:', posteos);
          this.setState({ userPosts: posteos });
        });
    } else {
      console.error('No hay un usuario autenticado.');
    }
  }

  deletePost = (postId) => {
    db.collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        console.log('Publicación eliminada:', postId);
      })
      .catch((error) => console.error('Error al eliminar publicación:', error));
  };

  SignOut = () => {
    auth
      .signOut()
      .then(() => {
        this.setState({
          userInfo: [],
          userPosts: [],
        });
        this.props.navigation.replace('login');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>

        {this.state.userInfo.length > 0 && (
          <>
            <Text style={styles.username}>
              {this.state.userInfo[0].data.username}
            </Text>
            <Text style={styles.email}>
              {this.state.userInfo[0].data.owner}
            </Text>
          </>
        )}

        <Text style={styles.postCount}>
          Cantidad de publicaciones: {this.state.userPosts.length}
        </Text>

        <FlatList
          data={this.state.userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postItem}>
              <Text style={styles.postText}>{item.data.texto}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.deletePost(item.id)}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        />

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
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
    paddingTop: 50, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'rgb(94, 53, 177)', 
    textAlign: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(94, 53, 177)', 
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: 'rgba(94, 53, 177, 0.7)', 
    marginBottom: 20,
  },
  postCount: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  postItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
  postText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    fontSize: 14,
    color: '#ffffff',
  },
  signOutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});

