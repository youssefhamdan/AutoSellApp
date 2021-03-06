import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { supabase } from "../client";
import {useTranslation} from "react-i18next";

export default function SearchPage({ navigation }) {
    var query = "https://cjpffrmyafbesnptyfdj.supabase.co/rest/v1/posts?select=*";
    const [allMakes, SetAllMakes] = useState([]);
    const [allModels, SetAllModels] = useState([]);
    const [fabricant, setFabricant] = useState("");
    const [modele, setModele] = useState("");
    const [prix, setPrix] = useState("");
    const [annee, setAnnee] = useState("");
    const [carburant, setCarburant] = useState("");
    const [km, setKm] = useState("");
    const [puissance, setPuissance] = useState("");
    const [boite, setBoite] = useState("");
    const { t} = useTranslation();




    useEffect(() => {
        fetch('https://listing-creation.api.autoscout24.com/makes')
            .then((response) => response.json())
            .then((json) => SetAllMakes(json.makes.slice(800, 900)))
            .catch((error) => console.error(error))
    }, []);

    async function selectCarModels(make, id) {
        SetAllModels(allMakes[id-1].models)
    }

    function queryMade() {
        if (fabricant != "") {
            query += "&fabricant=eq." + fabricant;
        }
        if (modele != "") {
            query += "&modele=eq." + modele;
        }
        if (prix != "") {
            query += "&prix=lte." + prix;
        }
        if (annee != "") {
            query += "&annee=gte." + annee;
        }
        if (carburant != "") {
            query += "&carburant=eq." + carburant;
        }
        if (km != "") {
            query += "&km=lte." + km;
        }
        if (puissance != "") {
            query += "&puissance=lte." + puissance;
        }
        if (boite != "") {
            query += "&boite=eq." + boite;
        }
    }

    function reset() {
        setFabricant("");
        setModele("");
        setPrix("");
        setAnnee("");
        setCarburant("");
        setKm("");
        setPuissance("");
        setBoite("");
        setQuery("");
    }

    return (
        <>
            <ScrollView style={styles.scroll}>

                <Picker
                    style={styles.input}
                    selectedValue={fabricant}
                    onValueChange={(itemValue, itemIndex) => {
                        setFabricant(itemValue);
                        selectCarModels(itemValue, itemIndex);
                    }}

                >
                    <Picker.Item label={t('fabricant')} value="" />
                    {

                        allMakes.map((u, i) => {
                            return (
                                <Picker.Item key={i} label={u.name} value={u.name} />
                            )
                        })
                    }


                </Picker>

                <Picker
                    style={styles.input}
                    onValueChange={(itemValue) => {
                        setModele(itemValue);
                    }}
                    selectedValue={modele}
                >
                    <Picker.Item label={t('modele')} value="" />
                    {

                        allModels.map((u, i) => {
                            return (
                                <Picker.Item key={i} label={u.name} value={u.name} />
                            )
                        })
                    }


                </Picker>
                <TextInput
                    placeholderTextColor='black'
                    style={styles.input}
                    placeholder={t('prixmax')}
                    onChangeText={(v) => setPrix(v)}
                    keyboardType="numeric"
                />
                <TextInput
                    placeholderTextColor='black'
                    style={styles.input}
                    placeholder={t('anneemin')}
                    keyboardType="numeric"
                    onChangeText={(v) => setAnnee(v)}

                />
                <Picker
                    style={styles.input}
                    value={carburant}
                    onValueChange={(itemValue) => setCarburant(itemValue)}
                    selectedValue={carburant}
                >

                    <Picker.Item label={t('carburant')} value="" />
                    <Picker.Item label={t('essence')} value="Essence" />
                    <Picker.Item label="Diesel" value="Diesel" />
                    <Picker.Item label="Hybride" value="Hybride" />
                </Picker>

                <TextInput
                    placeholderTextColor='black'
                    style={styles.input}
                    placeholder={t('kilometragemax')}
                    keyboardType="numeric"
                    onChangeText={(v) => setKm(v)}
                />

                <TextInput
                    placeholderTextColor='black'
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder={t('puissancemax')}

                    onChangeText={(v) => setPuissance(v)}
                />

                <Picker
                    style={styles.input}
                    value={boite}
                    onValueChange={(itemValue) => setBoite(itemValue)}
                    selectedValue={boite}
                >
                    <Picker.Item label={t('boitedevitesse')} value="" />
                    <Picker.Item label={t('manuelle')} value="Manuelle" />
                    <Picker.Item label={t('automatique')} value="Automatique" />
                </Picker>

                <View style={styles.check}>
                    <Button
                        onPress={() => {
                            queryMade();
                            navigation.navigate('List', { searchData: query })
                        }}
                        title={t('buttonrecherche')}
                        type="solid"
                    />

                </View>

            </ScrollView>

        </>
    );
}

const styles = StyleSheet.create({

    scroll: {

    },
    input: {
        margin: 12,
        padding: 10,
        borderColor: 'black',
        backgroundColor: '#C9CCD5',
    },
    check: {
        padding: 10,
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