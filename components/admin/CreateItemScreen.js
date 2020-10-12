import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView
} from 'react-native';
import firebase from 'firebase';
import TitleModule from "./Layouts/TitleModule";
import {Picker} from '@react-native-community/picker';



export default class CreateItemScreen extends React.Component {
    state = {
        item_name: '',
        brand: '',
        year: '',
        QR_id: '',
        status:'',
        item_found_placement:''
    };

    /*Holder øje med value change og sætter det i states */
    handleItem_nameChange = text => this.setState({ item_name: text });
    handleBrandChange = text => this.setState({ brand: text });
    handleYearChange = text => this.setState({ year: text });
    handleQR_IDChange = text => this.setState({ QR_id: text });
    handleStatusChange = text => {this.setState({status:text}), console.log(text)}

    handleSave = () => {
        const { item_name, brand, year, QR_id,status} = this.state;
        try {
            /*Gem til firebase og tag states med og derefter sæt dem til en intet værdi*/
            const reference = firebase
                .database()
                .ref('/items/')
                .push({ item_name, brand, year, QR_id,status
                });
            Alert.alert(`Saved`);
            this.setState({
                item_name: '',
                brand: '',
                year: '',
                QR_id: '',
                status: ''
            });
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };

    render() {
        const { item_name, brand, year, QR_id,status } = this.state;
        /*Alle mine input felter*/
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <TitleModule title="Opret din ejendel"/>

                    <View style={styles.row}>
                        <Text style={styles.label}>Ejendels navn</Text>
                        <TextInput
                            value={item_name}
                            onChangeText={this.handleItem_nameChange}
                            style={styles.input}
                        />

                        {!item_name && (
                            <Text style={{ color: "red" }}>{item_name}</Text>
                        )}
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Brand</Text>
                        <TextInput
                            value={brand}
                            onChangeText={this.handleBrandChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Årgang</Text>
                        <TextInput
                            value={year}
                            onChangeText={this.handleYearChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>QR_ID</Text>
                        <TextInput
                            value={QR_id}
                            onChangeText={this.handleQR_IDChange}
                            style={styles.input}
                        />
                    </View>

                    {/*Drop down liste*/}
                    <View style={styles.row}>
                        <Text style={styles.label}>Status</Text>
                        <Picker
                            selectedValue={status}
                            style={{ width: '50%',marginTop:-12,borderWidth: 1}}
                            onValueChange={this.handleStatusChange}>
                            <Picker.Item label="OK" value="OK" />
                            <Picker.Item label="Mistet" value="mistet" />
                            <Picker.Item label="Fundet" value="Fundet" />
                        </Picker>
                    </View>

                    <Button title="Tilføj ejendel" onPress={this.handleSave} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}
/*Styles*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal:40,
        marginVertical:150
    },
    scrollView:{
        minHeight:400
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: { fontWeight: 'bold', width: 100 },
    input: { borderWidth: 1, flex: 1 },
});