import firebase from "firebase";
import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';
import GLOBAL from '../../components/User.js'

export default class DashboardScreen extends React.Component {

    constructor() {
        super();
        GLOBAL.user = this
    }

    componentDidMount() {
        this.setState({user:GLOBAL.user.state.user})
    }

    state={
        user: null
    }


    render() {
        const {user} = this.state
        return(
            <View>
                <View>
                    <Text>
                       render!
                    </Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer:{
        minWidth:'80%'
    },
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 40,
    },
});