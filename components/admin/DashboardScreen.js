import GLOBAL from '../../components/User.js'
import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView} from 'react-native';
import firebase from 'firebase';
import ItemListItem from "./item/ItemListItem";
import TitleModule from "./Layouts/TitleModule";

export default class CarList extends React.Component {
    state = {
        items: {},
    };

    componentDidMount() {
        firebase
            .database()
            .ref('/items')
            .on('value', snapshot => {
                this.setState({ items: snapshot.val() });
            });
    }

    handleSelectCar = id => {
        this.props.navigation.navigate('CarDetails', { id });
    };

    render() {
        const { items } = this.state;
        // Vi viser ingenting hvis der ikke er data
        if (!items) {
            return null;
        }
        // Flatlist forventer et array. Derfor tager vi alle values fra vores items objekt, og bruger som array til listen
        const carArray = Object.values(items);
        // Vi skal også bruge alle IDer, så vi tager alle keys også.
        const carKeys = Object.keys(items);
        return (
            <View style={styles.mainContainer}>
                <View style={styles.innerContainer}>
                    <TitleModule title="Her er alle dine ejendele og deres status"/>
                    <FlatList
                        data={carArray}
                        // Vi bruger carKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
                        keyExtractor={(item, index) => carKeys[index]}
                        renderItem={({ item, index }) => (
                            <ItemListItem
                                item={item}
                                id={carKeys[index]}
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
    }
});