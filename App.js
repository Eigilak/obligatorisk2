import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Alert,Platform,LogBox} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "./components/Login/LoginScreen";
import SignUpScreen from "./components/Login/SignUpScreen";
import GLOBAL from './components/User.js'
import DashboardScreen from "./components/admin/DashboardScreen";
import CreateItemScreen from "./components/admin/CreateItemScreen";
import SettingsScreen from "./components/admin/SettingsScreen";
import firebase from "firebase";
import LogOutScreen from "./components/admin/LogOutScreen";
import ScanScreen from "./components/scan/ScanScreen";
import { AntDesign,MaterialIcons,Ionicons } from '@expo/vector-icons';

LogBox.ignoreAllLogs(true)

/*Dette er min navigator til når man er logget ind*/
const AdminBottomNavigator = createBottomTabNavigator({
    Dashboard:{
        screen:DashboardScreen,
        navigationOptions:{
            tabBarIcon:({tintColor}) =>(
                <AntDesign name="dashboard" size={24} color={tintColor} />
                )
        }
    },
    CreateItem:{
        screen:CreateItemScreen,
        navigationOptions:{
            tabBarIcon:({tintColor}) =>(
                <AntDesign name="pluscircle" size={24} color={tintColor} />
                )
        }
    },
    SettingsScreen:{
        screen:SettingsScreen,
        navigationOptions:{
            tabBarIcon:({tintColor}) =>(
                <AntDesign name="setting" size={24} color={tintColor} />                )
        }
    },
    LogOut: {
        screen: LogOutScreen,
        navigationOptions: ({navigation}) => ({
            tabBarOnPress: (scene, jumpToIndex) => {
                if(Platform.OS === 'web')
                {
                    if(confirm('Vil du logge ud? ')){

                        try {
                            const response =  firebase.auth().signOut();
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }else {
                    return Alert.alert(   // Shows up the alert without redirecting anywhere
                        'Godkendt følgende'
                        , 'Vil du gerne logge ud?'
                        , [
                            {
                                text: 'Ja', onPress:async () => {
                                    try {
                                        const response = await firebase.auth().signOut();

                                    } catch (e) {
                                        console.log(e);
                                    }
                                }
                            },
                            {text: 'Nej'}
                        ]
                    );

                }


            }
            ,
            tabBarIcon:({tintColor}) =>(
                <AntDesign name="logout" size={24} color={tintColor} />
            )

        }),

    }
});
/*Min navigator hvis man ikke er logget ind*/
 const LoginBottomNavigator = createBottomTabNavigator({
     Login:{
         screen: LoginScreen,
         navigationOptions:{
             tabBarIcon:({tintColor}) =>(
                 <AntDesign name="login" size={24} color={tintColor} />
             )
         }
     },
     Signup:{
         screen:SignUpScreen,
         navigationOptions:{
             tabBarIcon:({tintColor}) =>(
                 <MaterialIcons name="account-circle" size={24} color={tintColor} />             )
         }
     },
     ScanIt:{
         screen:ScanScreen,
         navigationOptions:{
             tabBarIcon:({tintColor}) =>(
                 <AntDesign name="scan1" size={24} color={tintColor} />
             )
         }
     }
     });


 const LoginContainer = createAppContainer(LoginBottomNavigator)
 const AdminContainer = createAppContainer(AdminBottomNavigator)




export default class App extends React.Component{
     constructor() {
         super();
         GLOBAL.user = this
         this.init();
         this.observeAuth();
     }
    state={
        user:null
    }


    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }


    init = () =>{
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
    }
    observeAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });

            GLOBAL.user.setState({
                user:user
            })
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