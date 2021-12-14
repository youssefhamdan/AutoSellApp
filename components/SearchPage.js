import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Button } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

export default function SearchPage({ navigation }) {
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
    const [query,setQuery] = useState("https://cjpffrmyafbesnptyfdj.supabase.co/rest/v1/posts?select=*");


    useEffect(() => {
        fetch('https://listing-creation.api.autoscout24.com/makes')
            .then((response) => response.json())
            .then((json) => SetAllMakes(json.makes.slice(800, 900)))
            .catch((error) => console.error(error))
    }, []);

    async function selectCarModels(make, id) {
        SetAllModels(allMakes[id].models)
    }

    function queryMade(){
        if(fabricant!=""){
            setQuery( query + "&fabricant=eq." + fabricant )
        }
        console.log("Query ", query);
    }

    function reset(){
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

                    {

                        allModels.map((u, i) => {
                            return (
                                <Picker.Item key={i} label={u.name} value={u.name} />
                            )
                        })
                    }


                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder="Prix"
                    onChangeText={(v) => setPrix(v)}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Année"
                    keyboardType="numeric"
                    onChangeText={(v) => setAnnee(v)}

                />
                <Picker
                    style={styles.input}
                    value={carburant}
                    onValueChange={(itemValue) => setCarburant(itemValue)}
                    selectedValue={carburant}
                >

                    <Picker.Item label="Carburant" value="" />
                    <Picker.Item label="Essence" value="Essence" />
                    <Picker.Item label="Diesel" value="Diesel" />
                    <Picker.Item label="Hybride" value="Hybride" />
                </Picker>

                <TextInput
                    style={styles.input}
                    placeholder="Kilométrage"
                    keyboardType="numeric"
                    onChangeText={(v) => setKm(v)}
                />

                <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder="Puissance"

                    onChangeText={(v) => setPuissance(v)}
                />

                <Picker
                    style={styles.input}
                    value={boite}
                    onValueChange={(itemValue) => setBoite(itemValue)}
                    selectedValue={boite}
                >
                    <Picker.Item label="Boite de vitesse" value="" />
                    <Picker.Item label="Manuelle" value="Manuelle" />
                    <Picker.Item label="Automatique" value="Automatique" />
                </Picker>

                <View style={styles.check}>
                    <Button
                        onPress={() => {
                            //console.log("POST", fabricant + "/" + modele + "/" + prix + "/" + annee + "/" + carburant + "/" + km + "/" + puissance + "/" + boite)
                            //console.log("POST", tab)
                            queryMade();
                            //reset();
                            
                            //navigation.navigate('List', { searchData: query }) 
                        }}
                        title="Recherche"
                        type="solid"
                    />

                </View>

            </ScrollView>

        </>
    );
}

const styles = StyleSheet.create({

    scroll: {
        backgroundColor: '#D2D2D2'
    },
    input: {
        margin: 12,
        padding: 10,
        borderColor: 'black',
        backgroundColor: 'white',
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