import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {
    View,
    Text,
    Picker,
    Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { supabase } from "../client";
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen({ navigation }) {
    const [image, setImagePath] = useState(null);
    const [img, setImageUrl] = useState("https://cjpffrmyafbesnptyfdj.supabase.in/storage/v1/object/public/image-bucket/dbff1d1c-fb21-49cf-ad79-ee8644748366.jpg");
    const [filename, setFilename] = useState("");
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);
    const [showCamera, setShowCamera] = useState(true);
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
    const [prix, setPrix] = useState("");
    const [km, setKm] = useState("");
    const [annee, setAnnee] = useState("");
    const [puissance, setPuissance] = useState("");
    const [allMakes, SetAllMakes] = useState([]);
    const [allModels, SetAllModels] = useState([]);
    const { fabricant, modele, carburant, boite } = post
    const { verif, setVerif } = useState(true);

    useEffect(() => {
        fetch('https://listing-creation.api.autoscout24.com/makes')
            .then((response) => response.json())
            .then((json) => SetAllMakes(json.makes.slice(800, 900)))
            .catch((error) => console.error(error))
    }, []);


    async function verifPost() {
        if (fabricant != "" && modele != "" && annee != "") {
            createPost()
        } else { alert("Tous les champs sont obligatoire") }
    }

    async function createPost() {


        console.log(post)

        console.log(typeof (prix))
        console.log("j'affiche prix : " + prix)
        const { data, error } = await supabase.from('posts').insert([{
            fabricant,
            modele,
            carburant,
            km,
            prix,
            annee,
            puissance,
            img,
            boite
        }], { returning: 'minimal' })
        setPost({
            fabricant: "",
            modele: "",
            carburant: "",
            km: "",
            prix: "",
            annee: "",
            puissance: "",
            image: "",
            boite: ""
        })
        setImageUrl("")
        navigation.navigate('List')
    }


    async function selectCarModels(make, id) {
        SetAllModels(allMakes[id].models)
    }
    async function selectCarModelss(make) {

        console.log("j'affiche" + make)
    }



    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    const listLoad = async (filename) => {
        console.log("filename", filename);
        const res = supabase
            .storage
            .from('image-bucket')
            .getPublicUrl(filename);

        setImageUrl(res.data.publicURL);
        console.log("PUBLICURL", res.data.publicURL)
    }



    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const uploadImage = async (image) => {
        const ext = image.uri.substring(image.uri.lastIndexOf(".") + 1);

        const filename = image.uri.replace(/^.*[\\\/]/, "");

        var formData = new FormData();
        formData.append("files", {
            uri: image.uri,
            name: filename,
            type: image.type ? `image/${ext}` : `image/${ext}`,
        })

        const { data, error } = await supabase
            .storage
            .from('image-bucket')
            .upload(filename, formData);

        if (error) alert(error.message);

        listLoad(filename);
    }

    const takePicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("RES", result);

        if (!result.cancelled) {
            uploadImage(result);
            setImagePath(result.uri);
            setShowCamera(true);
        }
    };

    const takePhoto = async () => {
        if (cameraRef) {
            console.log('in take picture');
            try {
                let photo = await cameraRef.current.takePictureAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                return photo;
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <>
            {showCamera ? (
                <ScrollView>

                    <View>
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
                                        <Picker.Item key={i} label={u.name} value={u.name} />
                                    )
                                })
                            }


                        </Picker>
                        <Picker
                            style={styles.input}
                            onValueChange={(itemValue) => setPost({ ...post, modele: itemValue })}>

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
                            //value={prix.toString()}
                            onChangeText={(v) => setPrix(v)}
                            keyboardType="numeric"
                        // onChange={e => setPost({ ...post, prix: e.target.value })}
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
                            onValueChange={(itemValue) => setPost({ ...post, carburant: itemValue })}
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
                            onValueChange={(itemValue) => setPost({ ...post, boite: itemValue })}
                        >
                            <Picker.Item label="Boite de vitesse" value="" />
                            <Picker.Item label="Manuelle" value="Manuelle" />
                            <Picker.Item label="Automatique" value="Automatique" />
                        </Picker>
                        <View style={styles.check}>
                            <Button

                                /*onPress={() =>
                                    navigation.navigate('Localisation')
                                }*/
                                onPress={() => {
                                    setShowCamera(false);
                                }
                                }
                                title="Ajouter photo"
                                type="solid"
                            />
                            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                            <View style={{ height: 10 }} />
                            <Button

                                /*onPress={() =>
                                    
                                }*/
                                onPress={() => {
                                    verifPost()
                                }
                                }
                                title="Insertion"
                                type="solid"
                            />

                        </View>
                    </View>
                </ScrollView>
            ) : (

                <Camera style={styles.camera} type={type} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={styles.text}> Flip </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={async () => {
                                const r = await takePhoto();
                                if (!r.cancelled) {
                                    setImagePath(r.uri);
                                    uploadImage(r);

                                }
                                setShowCamera(true);

                            }}>
                            <Text style={styles.text}> Take </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={takePicture}>
                            <Text style={styles.text}> Photos </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={async () => {
                                setShowCamera(true);
                            }}>
                            <Text style={styles.text}> Cancel </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>


            )}


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
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: 'black',
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



