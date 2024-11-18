import { View, Text, TouchableOpacity, StyleSheet} from "react-native"
import { Component } from 'react'

class Home extends Component{
constructor(props){
    super(props)
    this.state={
        user: ''
    }
}
 
ComponentDidMount(){
    console.log('Se monto mi componente')
}


render(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Momentos perrunos</Text>
        </View>
    )
}}

const styles = StyleSheet.create({
    container: {
        textAlign : 'center', 
        padding: 10,
        flex: 1
    },
    text: {
        textAlign: 'center'
    }
})


export default Home;