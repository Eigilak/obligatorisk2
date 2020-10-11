import firebase from "firebase";
import {StyleSheet, Text, View, Button, TouchableOpacity, Image, Dimensions, TextInput} from 'react-native';
import * as React from 'react';
import GLOBAL from '../../components/User.js'
import step1 from '../../assets/images/scanIT/step1.png'
import TitleModule from "../admin/Layouts/TitleModule";

export default class ScanScreen extends React.Component {
    state={
        step:1,
        item_missing:''
    }

    render() {

        const{step} = this.state;
        const{navigation} = this.props

        if (step === 1){
            return(
                <View styles={styles.mainContainer}>
                    <TouchableOpacity onPress={() => { this.setState({step:2}) }}>
                        <Image
                            style={styles.stepImg}
                            source={require('../../assets/images/scanIT/step1.png')}
                            rezizeMode={'cover'}
                        />
                    </TouchableOpacity>
                </View>
            )
        }else if(step === 2){
            return (
                <View styles={styles.mainContainer}>
                    <TouchableOpacity style={styles.btn} onPress={() => { this.setState({step:3}) }}>
                        <Text style={styles.btnTxt}>
                            Send Lokation og automatisk besked om at produkt er fundet
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={() => { this.setState({step:3}) }}>
                        <Text style={styles.btnTxt}>
                            Send en besked om produkt er fundet
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={() => { this.setState({step:3}) }}>
                        <Text style={styles.btnTxt}>
                            Send automatisk besked at du har afleveret produktet hos politiet nærmest dig
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        } else if(step === 3){
            return(
                <View styles={styles.mainContainer}>
                    <TouchableOpacity onPress={() => { this.setState({step:4}) }}>
                        <Image
                            style={styles.stepImg}
                            source={require('../../assets/images/scanIT/step3.png')}
                            rezizeMode={'cover'}
                        />
                    </TouchableOpacity>
                </View>
            )
        } else if(step === 4){
            return(
                <View styles={styles.mainContainer}>
                    <TouchableOpacity onPress={() => { this.setState({step:5}) }}>
                        <Image
                            style={styles.stepImg}
                            source={require('../../assets/images/scanIT/step4.jpg')}
                            rezizeMode={'cover'}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
        else if(step === 5){
            return(
                <View styles={styles.mainContainer}>
                    <TouchableOpacity onPress={() => { this.setState({step:6}) }}>
                        <Image
                            style={styles.stepImg}
                            source={require('../../assets/images/scanIT/step5.jpg')}
                            rezizeMode={'cover'}
                        />
                    </TouchableOpacity>
                </View>
            )
        }

        else if(step === 6){
            return(
                <View style={styles.mainContainer}>
                    <View style={styles.innerContainer}>
                        <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen')}}>
                            <TitleModule title="Tak for at hjælpe med at gøre en forskel!"/>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

    }
}
const win = Dimensions.get('window');
const ratio = win.width/541; //541 is actual image width


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