import { View, StyleSheet } from "react-native";
import { Component } from "react";
import FormularioNuevoPost from "../components/FormularioNuevoPost";

class NuevoPost extends Component {
    constructor(props) {
        super(props)
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
    }
});

export default NuevoPost;
