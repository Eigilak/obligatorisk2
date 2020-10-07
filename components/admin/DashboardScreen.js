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

    logOut=async ()=>{
        try {
            const response = await firebase.auth().signOut();
            console.log(response)
            GLOBAL.user.setState({user:null });
            this.props.navigation.navigate('LoginScreen')
        } catch (e) {
            console.log(e);
        }
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

                <View>
                    <Button title="Log out" onPress={this.logOut}/>
                </View>
            </View>
        )
    }
}