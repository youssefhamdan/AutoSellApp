import React, {useEffect, useState} from "react";
import {SafeAreaView, StyleSheet, TextInput} from "react-native";
import {
    View,
    Text,
    Picker
} from 'react-native';
import {Button} from 'react-native-elements';
import {supabase} from "../client";

export default function HomeScreen({navigation}) {
    const [post, setPost] = useState({
        fabricant: "",
        modele: "",
        carburant: "",
        km: "",
        prix: "",
        annee: "",
        puissance: "",
        img: "https://cloud.leparking.fr/2021/08/23/01/06/seat-leon-seat-leon-1p-2-0-tdi-07-preto_8248044968.jpg",
        boite: ""
    })
    const [prix,setPrix]= useState("");
    const [km,setKm]= useState("");
    const [annee,setAnnee]= useState("");
    const [puissance,setPuissance]= useState("");
    const [allMakes, SetAllMakes] = useState([]);
    const [allModels, SetAllModels] = useState([]);
    const {fabricant, modele, carburant, boite} = post
    useEffect(() => {
        fetch('https://listing-creation.api.autoscout24.com/makes')
            .then((response) => response.json())
            .then((json) => SetAllMakes(json.makes.slice(800, 900)))
            .catch((error) => console.error(error))
    }, []);

    async function createPost() {
        console.log(post)

        console.log(typeof(prix))
        console.log("j'affiche prix : "+prix)
        await supabase.from('posts').insert([{
            fabricant,
            modele,
            carburant,
            km,
            prix,
            annee,
            puissance,
            img:"https://cloud.leparking.fr/2021/08/23/01/06/seat-leon-seat-leon-1p-2-0-tdi-07-preto_8248044968.jpg",
            boite
        }], {returning: 'minimal'})
        setPost({
            fabricant: "",
            modele: "",
            carburant: "",
            km: "",
            prix: "",
            annee: "",
            puissance: "",
            img: "https://cloud.leparking.fr/2021/08/23/01/06/seat-leon-seat-leon-1p-2-0-tdi-07-preto_8248044968.jpg",
            boite: ""
        })

    }


    async function selectCarModels(make, id) {
        SetAllModels(allMakes[id].models)
    }
    async function selectCarModelss(make) {

        console.log("j'affiche"+make)
    }
    return (
        <>

            <SafeAreaView>

                <Picker
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) => setPost({
                        ...post,
                        fabricant: itemValue
                    }, selectCarModels(itemValue, itemIndex))}
                    // onValueChange={(itemValue, itemIndex) => selectCarModels(itemValue,itemIndex)}
                    // onChange={e => setPost({ ...post, fabricant: e.target.value })}
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
                    onValueChange={(itemValue) => setPost({...post, modele: itemValue})}>

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
                    //value={prix.toString()}
                    onChangeText={(v)=>setPrix(v)}
                    keyboardType="numeric"
                    // onChange={e => setPost({ ...post, prix: e.target.value })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Année"
                    keyboardType="numeric"
                    onChangeText={(v)=>setAnnee(v)}

                />
                <Picker
                    style={styles.input}
                    value={carburant}
                    onValueChange={(itemValue) => setPost({...post, carburant: itemValue})}
                >

                    <Picker.Item label="Carburant" value=""/>
                    <Picker.Item label="Essence" value="Essence"/>
                    <Picker.Item label="Diesel" value="Diesel"/>
                    <Picker.Item label="Hybride" value="Hybride"/>
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder="Kilométrage"
                    keyboardType="numeric"
                    onChangeText={(v)=>setKm(v)}
                />
                <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder="Puissance"

                    onChangeText={(v)=>setPuissance(v)}
                />
                <Picker
                    style={styles.input}
                    value={boite}
                    onValueChange={(itemValue) => setPost({...post, boite: itemValue})}
                >
                    <Picker.Item label="Boite de vitesse" value=""/>
                    <Picker.Item label="Manuelle" value="Manuelle"/>
                    <Picker.Item label="Automatique" value="Automatique"/>
                </Picker>
                <View style={styles.check}>
                    <Button
                        //onPress={() =>
                        //    navigation.navigate('List')
                        //}
                        onPress={() =>
                            createPost()
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



