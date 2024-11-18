import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Component } from "react";
import FormularioNuevoPost from "../components/FormularioNuevoPost";

class NuevoPost extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log("Se montó mi componente");
    }

    render() {
        return (
            <View style={styles.container}>
                <FormularioNuevoPost navigation={this.props.navigation} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center",
    },
    loginButton: {
        backgroundColor: "#6200ee",
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    loginButtonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default NuevoPost;
