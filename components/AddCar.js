import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../client';


export default function AddCar({ navigation }) {
    const [allMakes, SetAllMakes] = useState([]);
    const [image, setImagePath] = useState(null);


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

    const uploadImage = async (path) => {
        const response = await fetch(path);
        const blob = await (response.blob())
        const filename = path.substr(path.lastIndexOf("/") + 1)
        const { data, error } = await supabase
            .storage
            .from('image-bucket')
            .upload(`public/${filename}`, blob, {
                cacheControl: '3600',
                upsert: false
            });

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

        console.log("RES",result);

        if (!result.cancelled) {
            setImagePath(result.uri);
            uploadImage(result.uri);
        }
    };



    return (
        <>

            <SafeAreaView>


                <TextInput
                    style={styles.input}
                    placeholder="Modele"
                />
                <TextInput
                    style={styles.inputDes}
                    multiline
                    numberOfLines={4}
                    placeholder="Description"
                    onChangeText={text => onChangeText(text)}
                />

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
    }
});
