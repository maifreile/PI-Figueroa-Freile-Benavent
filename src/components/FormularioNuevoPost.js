import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { Component } from "react";
import { db } from "../firebase/config";
import { auth } from "../firebase/config"; 

class FormularioNuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: "",
      error: "",
    };
  }

  publicadoExitosamente() {
    this.setState({ texto: "", error: "" }); 
    console.log("Posteo compartido exitosamente.");
    this.props.navigation.navigate("home");
  }

  submit(texto) {
    if (texto.length === 0) {
      this.setState({ error: "El campo no puede estar vacío" });
      return;
    }

    if (texto.length < 2) {
        this.setState({ error: "ingrese texto mas largo" });
        return;
      }

    const usuario = auth.currentUser;

    if (usuario) {
      db.collection("posts")
        .add({
          owner: usuario.email, 
          createdAt: Date.now(), 
          texto: texto, 
          likes: [], 
        })
        .then(() => {
          this.props.navigation.navigate("home"); 
          this.publicadoExitosamente
        })
        .catch((error) => {
          console.error("Error al crear el post:", error);
          this.setState({ error: "Hubo un problema al publicar el post." });
        });
    } else {
      this.setState({ error: "Debes estar autenticado para publicar un post." });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>¡Comparte algo con tus amigos!</Text>
          <TextInput
            style={styles.input}
            placeholder="Texto"
            keyboardType="default"
            onChangeText={(texto) => this.setState({ texto, error: "" })}
            value={this.state.texto}
          />
          {this.state.error !== "" && <Text style={styles.error}>{this.state.error}</Text>}
          <TouchableOpacity onPress={() => this.submit(this.state.texto)} style={styles.boton}>
            <Text style={styles.botonTexto}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#f0f4f8",
    borderWidth: 1,
    borderColor: "#bebebe",
    borderRadius: 8,
    padding: 50,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#5e35b1",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "80%",
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: "#D3C6E5",
    marginVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  boton: {
    backgroundColor: "#b0a6da",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginTop: 10,
    width: "46%", 
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  botonTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "#d32f2f",
    marginVertical: 10,
    textAlign: "center",
  },
});

export default FormularioNuevoPost;
