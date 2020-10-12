import GLOBAL from '../../components/User.js'
import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView} from 'react-native';
import firebase from 'firebase';
import ItemListItem from "./item/ItemListItem";
import TitleModule from "./Layouts/TitleModule";

export default class CarList extends React.Component {
    state = {
        items: {},
        user:{}
    };

    /*Hent Globale user så vi kan bruge email*/
    constructor(props) {
        super(props);
        GLOBAL.user = this;
    }

    componentDidMount() {
        /*Hent alle mine items efter render*/
        firebase
            .database()
            .ref('/items')
            .on('value', snapshot => {
                this.setState({ items: snapshot.val() });
            });
        this.setState({user:GLOBAL.user.state.user})

    }


    render() {
        const { items,user } = this.state;
        // Vi viser ingenting hvis der ikke er data
        if (!items) {
            return (
                <View style={styles.mainContainer}>
                    <View style={styles.innerContainer}>
                        <TitleModule title={ user ? "Hej "+user.email :''}/>
                        <TitleModule title={"Du har endnu ikke oprettet nogle ejendele"}/>
                    </View>
                </View>
            );
        }
        // Flatlist forventer et array. Derfor tager vi alle values fra vores items objekt, og bruger som array til listen
        const ItemsArray = Object.values(items);
        // Vi skal også bruge alle IDer, så vi tager alle keys også.
        const ItemsKeys = Object.keys(items);

            return (
                <View style={styles.mainContainer}>
                    <View style={styles.innerContainer}>
                        <TitleModule title={ user ? "Hej "+user.email :''}/>
                        <TitleModule title="Her er alle dine ejendele og deres status"/>
                        <FlatList
                            data={ItemsArray}
                            // Vi bruger ItemsKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
                            keyExtractor={(item, index) => ItemsKeys[index]}
                            renderItem={({ item, index }) => (
                                <ItemListItem
                                    item={item}
                                    id={ItemsKeys[index]}
                                    onSelect={this.handleSelectCar}
                                />
                            )}
                        />
                    </View>
                </View>
            );

    }
}
const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding:20,
        marginTop:'30%'
    },
    innerContainer:{
        padding:40,
        marginVertical:80
    },
});