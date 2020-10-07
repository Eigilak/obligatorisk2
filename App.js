import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View,LogBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "./components/Login/LoginScreen";
import SignUpScreen from "./components/Login/SignUpScreen";
import GLOBAL from './components/User.js'
import DashboardScreen from "./components/admin/DashboardScreen";
import CreateItemScreen from "./components/admin/CreateItemScreen";
import MissingItemScreen from "./components/admin/MissingItemScreen";
import firebase from "firebase";


/*Dette er min navigator til når man er logget ind*/
const AdminBottomNavigator = createBottomTabNavigator({
    DashboardScreen:{
        screen:DashboardScreen
    },
    CreateItemScreen:{
        screen:CreateItemScreen
    },
    MissingItemScreen:{
        screen:MissingItemScreen
    }

})
/*Min navigator hvis man ikke er logget ind*/
 const LoginBottomNavigator = createBottomTabNavigator({
     LoginScreen:{
         screen: LoginScreen
     },
     SignupScreen:{
         screen:SignUpScreen
     }
     });


 const LoginContainer = createAppContainer(LoginBottomNavigator)
 const AdminContainer = createAppContainer(AdminBottomNavigator)


export default class App extends React.Component{
     constructor() {
         super();
         GLOBAL.user = this
     }
    state={
        user:null
    }
    UNSAFE_componentWillMount() {
        const fireBaseConfig ={
            apiKey: "AIzaSyAAMyAaetUPuzNzy26yDezUyBO2n8DYYYA",
            authDomain: "obligatorisk2.firebaseapp.com",
            databaseURL: "https://obligatorisk2.firebaseio.com",
            projectId: "obligatorisk2",
            storageBucket: "obligatorisk2.appspot.com",
            messagingSenderId: "866031032215",
            appId: "1:866031032215:web:82e6cdff8a2a3da44996d2",
            measurementId: "G-GLFEXKB6LV"
        }
// vigtigt at tilføje nedestående if statement, da ellers init firebase flere gange
        if (!firebase.apps.length) {
            firebase.initializeApp(fireBaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });
        });
    }


    render() {
        if(!this.state.user){
            return <LoginContainer/>
        }else {
            return <AdminContainer/>
        }
    }
}