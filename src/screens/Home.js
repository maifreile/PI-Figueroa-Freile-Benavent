import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { Component } from "react";
import { db, auth } from "../firebase/config";
import Like from "../components/Like";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
    };
  }

  componentDidMount() {
    console.log("Se montó mi componente");

    db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        this.setState({
          posteos: posts,
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Occogram posts</Text>
        <FlatList 
          data={this.state.posteos} 
          keyExtractor={(item) => item.id.toString()} 
          numColumns={2} 
          renderItem={({ item }) => (
            <Like item={item}/>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#5e35b1",
    borderRadius: 10,
    height: 40,
  },

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
  textoBotonLike: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Home;