import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import {
    View,
    Text,
    Picker,
} from 'react-native';
import { Button } from 'react-native-elements';
import {supabase} from "../client";
export default function HomeScreen({ navigation }) {
    const [allMakes, SetAllMakes] = useState([]);
    const [allModels, SetAllModels] = useState([]);

    useEffect(() => {
        fetch('https://listing-creation.api.autoscout24.com/makes')
            .then((response) => response.json())
            .then((json) => SetAllMakes(json.makes.slice(800,900)))
            .catch((error) => console.error(error))
    }, []);



    console.log(allMakes)

    async function selectCarModels(make,id) {
       SetAllModels(allMakes[id].models)



    }
    return (
        <>

            <SafeAreaView>

                <Picker
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) => selectCarModels(itemValue,itemIndex)}
                >

                    {

                        allMakes.map((u, i) => {
                            return (
                                <Picker.Item label={u.name} value={u.name}/>
                            )
                        })
                    }


                </Picker>

                <Picker
                    style={styles.input}
                >

                    {

                        allModels.map((u, i) => {
                            return (
                                <Picker.Item label={u.name} value={u.name}/>
                            )
                        })
                    }


                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder="Prix"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Année"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Carburant"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Kilométrage"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Puissance"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Boite"
                />
                <View style={styles.check}>
                    <Button
                        onPress={() =>
                            navigation.navigate('List')
                        }
                        title="Rechercher"
                        type="solid"
                    />
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: 'black',
        backgroundColor: 'white',
    },
    check: {
        padding: 10,
        color: "#f5f200"
    }
});



