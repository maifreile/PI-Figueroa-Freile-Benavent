import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import firebase from "firebase";
import { db, auth } from '../firebase/config';

export default class Like extends Component {
    constructor(props){
        super(props)
        const arrLikes = this.props.item.data.arrLikes || [] // si no recupera nada, que sea un array vacio
        let liked = false // inicializo liked como false
        
        // para verificar si el mail del usuario esta en el array de likes
        if (auth.currentUser) {          
            const userEmail = auth.currentUser.email
            if (arrLikes.includes(userEmail)) {
                liked = true
            }
        }
        
        this.state= {
            liked: liked, // estado de liked
            cantLikes: arrLikes.length,
        }
    }

    likear(idDocumento){
        db
        .collection('posts')
        .doc(idDocumento)
        .update({
            arrLikes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                liked: true,
                cantLikes: this.state.cantLikes + 1,
            })
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    }

    disLike(idDocumento){
        db
        .collection('posts')
        .doc(idDocumento)
        .update({
            arrLikes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                liked: false,
                cantLikes: this.state.cantLikes - 1,
            })
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    }



  render() {
    return (
        <View style={styles.postContainer}>
        <Text style={styles.email}>{this.props.item.data.owner} publicó: </Text>
        <Text style={styles.texto}>{this.props.item.data.texto}</Text>
        {
            this.state.liked ?
            <TouchableOpacity 
            style={styles.botonDislike} 
            onPress={() => this.disLike(this.props.item.id)}
            >
            <Text style={styles.textoBotonLike}>Dislike</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity 
            style={styles.botonlike} 
            onPress={() => this.likear(this.props.item.id)}
            >
            <Text style={styles.textoBotonLike}>Like</Text>
            </TouchableOpacity>
        }
        <Text style={styles.likes}>{this.state.cantLikes} likes</Text> 
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
    postContainer: {
      backgroundColor: "#d7d4e4",
      padding: 20,
      marginBottom: 10,
      borderRadius: 10,
      flex: 1, 
      marginHorizontal: 5, 
    },
    email: {
      fontSize: 12,
      color: "#555",
      marginBottom: 5,
      textAlign: 'center'
    },
    texto: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
      textAlign: 'center'
    },
    likes: {
      fontSize: 12,
      color: "#888",
      marginBottom: 5,
      textAlign: 'center',
      marginVertical: 10
    },
    botonlike: {
      backgroundColor: "#7e57c2",
      paddingVertical: 2,
      borderRadius: 5,
      alignItems: "center",
      width: '30%',
      alignSelf: 'center'
    },
    botonDislike:{
      backgroundColor: "#808080",
      paddingVertical: 2,
      borderRadius: 5,
      alignItems: "center",
      width: '30%',
      alignSelf: 'center'
    },
    textoBotonLike: {
      color: "#fff",
      fontWeight: "bold",
    },
  });