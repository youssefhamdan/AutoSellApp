import React from "react";
import { StyleSheet,Text } from 'react-native';

export default function Favorite() {

    return (
        <Text style={styles.text}>Espace Favoris</Text>
    );

}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop : 150
    },
});