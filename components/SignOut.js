import React, { useState, useEffect } from 'react';
import { supabase } from "../client";
import {Button} from "react-native-elements";
import {useTranslation} from "react-i18*next";
import i18n from "../i18n/i18n";
import {Picker} from "@react-native-picker/picker";
import {StyleSheet} from "react-native";

export default function SignOut({ navigation }) {
    const { t,i18n } = useTranslation();
    const [language, setLanguage] = useState("fr");
    // useEffect(()=>{
    //         supabase.auth.signOut();
    // });

    const change = (data) => {
        i18n.changeLanguage(data).then(r => console.log("salut"))
    }

    return (<>
    <Picker
        style={styles.input}
        //onValueChange={(itemValue, ) => change(itemValue),console.log(itemValue)}
        //selectedValue={language}
        onValueChange={(itemValue) => change(itemValue
        , console.log(itemValue))}
    >
        <Picker.Item label="Francais" value="fr" />
        <Picker.Item label="English" value="en" />


    </Picker></>);
}

const styles = StyleSheet.create({
    input: {
        color: 'black',
        margin: 12,
        padding: 10,
        backgroundColor: '#C9CCD5',
    },
    inputPicker: {
        color: 'black',
        margin: 12,
        padding: 10,
        backgroundColor: 'white',
    },
    check: {
        padding: 10,
    },
    inputError: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: 'red',
        color: 'black',
        backgroundColor: 'white',
    },
    inputDes: {
        height: 200,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: 'black',
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
});
