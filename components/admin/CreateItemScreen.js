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
import CheckBox from '@react-native-community/checkbox';



export default class AddCar extends React.Component {
    state = {
        item_name: '',
        brand: '',
        year: '',
        QR_id: '',
        item_missing:'',
        item_found:'',
        item_found_placement:''
    };

    handleItem_nameChange = text => this.setState({ item_name: text });

    handleBrandChange = text => this.setState({ brand: text });

    handleYearChange = text => this.setState({ year: text });

    handleQR_IDChange = text => this.setState({ QR_id: text });

    handleSave = () => {
        const { item_name, brand, year, QR_id,item_missing,item_found } = this.state;
        try {
            const reference = firebase
                .database()
                .ref('/items/')
                .push({ item_name, brand, year, QR_id,item_missing,item_found
                });
            Alert.alert(`Saved`);
            this.setState({
                item_name: '',
                brand: '',
                year: '',
                QR_id: '',
                item_missing:false,
                item_found:''
            });
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };

    render() {
        const { item_name, brand, year, QR_id,item_missing } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <TitleModule title="Opret din ejendel"/>

                    <View style={styles.row}>
                        <Text style={styles.label}>Item Name</Text>
                        <TextInput
                            value={item_name}
                            onChangeText={this.handleItem_nameChange}
                            style={styles.input}
                        />
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
                        <Text style={styles.label}>Year</Text>
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

                    <View style={styles.row}>
                        <Text style={styles.label}>Is item missing?</Text>
                        <CheckBox
                            value={item_missing}
                            onValueChange={() => { this.setState({ item_missing: !item_missing })}}
                        />
                    </View>
                    <Button title="Add Item" onPress={this.handleSave} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal:40,
        marginVertical:150
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: { fontWeight: 'bold', width: 100 },
    input: { borderWidth: 1, flex: 1 },
});