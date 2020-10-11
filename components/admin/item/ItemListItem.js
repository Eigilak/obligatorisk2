import * as React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class ItemListItem extends React.Component {
    handlePress = () => {
        // Her pakker vi ting ud fra props
        const {id, onSelect} = this.props
        // Kalder den onSelect prop vi får, med det ID vi har fået som argument.
        onSelect(id)
    };

    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={this.handlePress}>
                <Text style={styles.label}>
                    {item.item_name} {item.brand} - Status: {item.item_missing ? 'Mistet' : 'ok' }
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});