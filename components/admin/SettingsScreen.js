import firebase from "firebase";
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import TitleModule from "./Layouts/TitleModule";

export default class SettingsScreen extends React.Component {

    render() {
        return(
            <View style={styles.mainContainer}>
                <View style={styles.innerContainer}>
                    <TitleModule title="Her kommer indstillinger"/>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding:40,
        marginTop:40,
    },
    stepImg:{
        width: '100%',
        height: '100%',
        minHeight:500
    },
    btn:{
        backgroundColor: '#0E71EB',
        borderRadius:10,
        padding: 20,
        margin:20
    },
    btnTxt:{
        color: "white"
    }
});