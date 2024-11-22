import { Text, View, FlatList, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'

export default class Busqueda extends Component {
    constructor(props){
        super(props)
        this.state= {
            users: [],
            search: ''
        }
    }

    componentDidMount(){
        db
        .collection('users')
        .onSnapshot((docs)=> {
            let arrDocs = []

            docs.forEach((doc) => arrDocs.push({
                id: doc.id,
                data: doc.data()
            }))

            this.setState({
                users: arrDocs
            })

        })
    }

    evitarSubmit(event) {
        console.log(event)
        event.preventDefault()
    }

    controlarInputs(text){
        this.setState({
            search: text
        })
    }


  render() {
    const {users, search} = this.state;
    const filterUsers = users.filter(user => 
        user.data.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Buscar usuario por nombre"
            onChangeText={event => this.controlarInputs(event)}
            value={search}
        />
        {search.length >0 && filterUsers.length > 0 
            ? (
            <FlatList
                data={filterUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.userText}>{item.data.username}</Text>
                )}
            />
        ) : (
            search.length >0 &&
            <Text style={styles.noUser }>El nombre de usuario no existe</Text>
        )}
    </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8', 
        padding: 20,
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
    userText: {
        fontSize: 18,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FADADD', 
    },
    noUser:  {
        fontSize: 16,
        color: '#dc3545', 
        textAlign: 'center',
        marginTop: 20,
    },
});