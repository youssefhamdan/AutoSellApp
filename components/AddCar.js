import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../client';
import { Camera } from 'expo-camera';


export default function AddCar({ navigation }) {
    const [allMakes, SetAllMakes] = useState([]);
    const [image, setImagePath] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);


    /*useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);*/


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

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
            type: image.type ? `image/${ext}` : `video/${ext}`,
        })
        /*const response = await fetch(path);
        const blob = await (response.blob())
        const filename = path.substr(path.lastIndexOf("/") + 1)*/
        const { data, error } = await supabase
            .storage
            .from('image-bucket')
            .upload(filename, formData);

        if (error) alert(error.message);

        console.log(data);
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
            setImagePath(result.uri);
            uploadImage(result);
        }
    };



    return (
        <>
            <View style={styles.container}>
                <Camera style={styles.camera} type={type}>
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
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}> Photo </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>


            <View style={styles.check}>
                <Button
                    onPress={takePicture}
                    title="ADD PHOTO"
                    type="solid"
                />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

            </View>

            <View style={styles.check}>
                <Button

                    title="Insert the car"
                    type="solid"
                />
            </View>

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
    inputDes: {
        height: 200,
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
    },
});
