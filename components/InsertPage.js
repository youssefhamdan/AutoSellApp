import React, { useEffect, useState, useRef } from "react";
import * as Notifications from 'expo-notifications';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {
    View,
    Text,
    Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements';
import { supabase } from "../client";
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {useTranslation} from "react-i18next";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


export default function InsertPage({ navigation }) {
    const {t} = useTranslation();
    //variables pour récuperer les champs
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
    const [image, setImagePath] = useState(null);
    const [img, setImageUrl] = useState("https://cjpffrmyafbesnptyfdj.supabase.in/storage/v1/object/public/image-bucket/Default-Image.png");
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);
    const [showCamera, setShowCamera] = useState(true);
    const [prix, setPrix] = useState("");
    const [location, setLocation] = useState("");
    const [km, setKm] = useState("");
    const [annee, setAnnee] = useState("");
    const [puissance, setPuissance] = useState("");
    const [allMakes, SetAllMakes] = useState([]);
    const [allModels, SetAllModels] = useState([]);
    const { fabricant, modele, carburant, boite } = post

    //placeholders pour les champs, a ameliorer si le temps avec react hooks
    const [anneePH, setAnneePH] = useState(t('annee'));
    const [prixPH, setPrixPH] = useState(t('prix'));
    const [puissancePH, setPuissancePH] = useState(t('puissance'));
    const [kmPH, setKmPH] = useState(t('kilometrage'));
    const [ColorPH, setColorPH] = useState("black");
    const [locationPH, setLocationPH] = useState(t('location'));
    const [imgText, setImgText] = useState(t('ajouterphoto'));


    //Fetch api pour recuperer les fabricant et leurs modeles
    useEffect(() => {
        fetch('https://listing-creation.api.autoscout24.com/makes')
            .then((response) => response.json())
            .then((json) => SetAllMakes(json.makes.slice(800, 900)))// il y'a plus de 1000 fabricants sur l'api donc on recupere que de 800 a 900 car les meilleurs fabricants sont dans cet invtervalle)
            .catch((error) => console.error(error))
    }, []);


    //notification
    async function schedulePushNotification(title, body) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                data: { data: 'goes here' },
            },
            trigger: { seconds: 1 },
        });
    }


    //verification de la completude des champs
    async function verifPost() {

        if (fabricant != "" && modele != "" && annee != "" && prix != "" && annee != "" && km != "" && puissance != "" && location != "") {
            createPost()
            let stringNotification = t('notifbody')+fabricant+" "+modele+t('notifbodyt');
            schedulePushNotification(t('notiftitle'), stringNotification);
        } else {
            setColorPH("red");
            setPrixPH(t('errorprix'));
            setAnneePH(t('errorannee'));
            setKmPH(t('errorkm'));
            setPuissancePH(t('errorhp'));
            setLocationPH(t('errorlocation'));
            alert(t('errorinput'))
        }
    }


    //creation d'un post
    async function createPost() {
        console.log(img);
        const { data, error } = await supabase.from('posts').insert([{
            fabricant,
            modele,
            carburant,
            km,
            prix,
            annee,
            puissance,
            img,
            boite,
            location,
            idUser:supabase.auth.user().id,
            contact:supabase.auth.user().email
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
        if(error){
            alert(error.message)
        }
        navigation.navigate('Search')

    }

    //triage des modeles en fonction d'un fabricant
    async function selectCarModels(make, id) {
        SetAllModels(allMakes[id - 1].models)
    }



    //demande permission media
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

    //demande permission camera
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    //recuperation lien de l'image dans le bucket de base de donées pour la stocker dans un champ de la table post
    const listLoad = async (filename) => {
        console.log("filename", filename);
        const res = supabase
            .storage
            .from('image-bucket')
            .getPublicUrl(filename);

        setImageUrl(res.data.publicURL);
        console.log("PUBLICURL", res.data.publicURL)
    }

    //affichage page dépendant des droits(utilisateur a accepter camera ou non)
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    //stockage image dans le bucket de la bd
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


    //choisir image du téléphone
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
            setImgText(t('modifierphoto'));
        }
    };

    //prendre image avec appareil photo du telephone
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
                <ScrollView >

                    <View>
                        <Picker
                            style={styles.input}
                            onValueChange={(itemValue, itemIndex) => setPost({
                                ...post,
                                fabricant: itemValue
                            }, selectCarModels(itemValue, itemIndex))}
                            selectedValue={post.fabricant}

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
                            selectedValue={post.modele}
                            onValueChange={(itemValue) => setPost({ ...post, modele: itemValue })}>
                            <Picker.Item label={t('modele')} value="" />
                            {

                                allModels.map((u, i) => {
                                    return (
                                        <Picker.Item key={i} label={u.name} value={u.name} />
                                    )
                                })
                            }


                        </Picker>
                        <TextInput placeholderTextColor={ColorPH}
                            style={styles.input}
                            placeholder={prixPH}
                            //value={prix.toString()}
                            onChangeText={(v) => setPrix(v)}
                            keyboardType="numeric"
                        // onChange={e => setPost({ ...post, prix: e.target.value })}
                        />
                        <TextInput placeholderTextColor={ColorPH}
                            style={styles.input}
                            placeholder={anneePH}
                            keyboardType="numeric"
                            onChangeText={(v) => setAnnee(v)}

                        />
                        <Picker
                            style={styles.input}
                            value={carburant}
                            selectedValue={carburant}
                            onValueChange={(itemValue) => setPost({ ...post, carburant: itemValue })}
                        >

                            <Picker.Item label={t('carburant')} value="" />
                            <Picker.Item label={t('essence')} value="Essence" />
                            <Picker.Item label="Diesel" value="Diesel" />
                            <Picker.Item label="Hybride" value="Hybride" />
                        </Picker>
                        <TextInput placeholderTextColor={ColorPH}
                            style={styles.input}
                            placeholder={kmPH}
                            keyboardType="numeric"
                            onChangeText={(v) => setKm(v)}
                        />
                        <TextInput placeholderTextColor={ColorPH}
                            keyboardType="numeric"
                            style={styles.input}
                            placeholder={puissancePH}

                            onChangeText={(v) => setPuissance(v)}
                        />
                        <Picker
                            style={styles.input}
                            value={boite}
                            selectedValue={boite}
                            onValueChange={(itemValue) => setPost({ ...post, boite: itemValue })}
                        >
                            <Picker.Item label={t('boitedevitesse')} value="" />
                            <Picker.Item label={t('manuelle')} value="Manuelle" />
                            <Picker.Item label={t('automatique')} value="Automatique" />
                        </Picker>

                        <TextInput placeholderTextColor={ColorPH}
                            style={styles.input}
                            placeholder={locationPH}
                            onChangeText={(v) => setLocation(v)}
                        />
                        <View style={styles.check}>
                            <Button

                                onPress={() => {
                                    setShowCamera(false);
                                }
                                }
                                title={imgText}
                                type="solid"
                            />
                            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                            <View style={{ height: 10 }} />



                            <Button style={styles.check}
                                onPress={() => {
                                    verifPost()
                                }
                                }
                                title={t('buttoninserer')}
                                type="solid"
                            />
                        </View></View>
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



