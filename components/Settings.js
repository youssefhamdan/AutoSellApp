import React, { useState, useEffect } from 'react';
import { supabase } from "../client";
import { Button } from "react-native-elements";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";


export default function Settings({ navigation }) {
    const { t, i18n } = useTranslation();
    const [post, setPost] = useState({
        fabricant: "",
        modele: "",
        carburant: "",
        km: "",
        prix: "",
        annee: "",
        puissance: "",
        img: "",
        boite: ""
    })
    const [language, setLanguage] = useState("");
    // useEffect(()=>{
    //         supabase.auth.signOut();
    // });

    const change = (data) => {
        i18n.changeLanguage(data)
    }


    return (<>
        <View>
            <View style={styles.textView}>
                <Text style={styles.text}> {t('langue')} </Text>
            </View>

            <Picker
                style={styles.input}
                selectedValue={language}
                onValueChange={(itemValue) => change(itemValue
                    ,setLanguage(itemValue))}
            >
                <Picker.Item label={t('langue')} value="" />
                <Picker.Item label="Francais" value="fr" />
                <Picker.Item label="English" value="en" />


            </Picker>

            <View style={styles.textView}>
                <Text style={styles.text}> {t('deconnexion')} </Text>
            </View>

            <View style={styles.button}>
                <Button

                    onPress={() => {
                        supabase.auth.signOut();
                    }
                    }
                    title={t('deconnexion')}
                    type="solid"
                />
            </View>

        </View>
    </>);
}

const styles = StyleSheet.create({
    input: {
        color: 'black',
        margin: 12,
        padding: 10,
        backgroundColor: '#C9CCD5',
    },
    textView: {
        margin: 12
    },
    button:{
        padding: 10,
    },
    text:{
        fontSize: 20, 
        fontWeight: 'bold'
    }

});
