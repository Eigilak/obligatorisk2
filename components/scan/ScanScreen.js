import firebase from "firebase";
import {StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Alert} from 'react-native';
import * as React from 'react';
import GLOBAL from '../../components/User.js'
import step1 from '../../assets/images/scanIT/step1.png'
import TitleModule from "../admin/Layouts/TitleModule";

export default class ScanScreen extends React.Component {
    state={
        step:1,
        status:'fundet',
        items:'',
        firstItem:''
    }


    changeMissingStatus = () => {
        try{
            const {item_missing} = this.state;
            firebase
                .database()
                .ref('/items')
                .on('value', snapshot => {
                    this.setState({ items: snapshot.val() });
                    const items = snapshot.val()
                    const firstItem_id = Object.keys(items)[0]
                    const item_vals = Object.values(items)[0]

                    console.log(item_vals)
                    firebase
                        .database()
                        .ref('/items/'+firstItem_id)
                        // Vi bruger update, så kun de felter vi angiver, bliver ændret
                        .update({ status });
                    // Når bilen er ændret, går vi tilbage.

                    this.setState({step:1})
                    Alert.alert(item_vals.item_missing ?'Tak for at have fundet:'+ item_vals.item_name+" som er meldt savnet" : 'Tak for din besked' );

                    this.props.navigation.navigate("Login");
                });
        }catch (e){
            console.log(e)
        }




   /*  this.setState({step:6})*/
    }

    render() {

        const{step} = this.state;
        const{navigation} = this.props

        if (step === 1){
            return(
                <View styles={styles.mainContainer}>
                    <TouchableOpacity onPress={() => { this.setState({step:2})  }}>
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
                    <View style={styles.innerContainer}>
                        <TitleModule title="Vælg en mulighed"/>
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
                    <TouchableOpacity onPress={this.changeMissingStatus}>
                        <Image
                            style={styles.stepImg}
                            source={require('../../assets/images/scanIT/step5.jpg')}
                            rezizeMode={'cover'}
                        />
                    </TouchableOpacity>
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
        marginTop:20

    },
    innerContainer:{
        padding:40,
        marginVertical:80
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