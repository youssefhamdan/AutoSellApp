import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { View, Text, Picker, } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera, CameraResultType } from '@capacitor/camera';

export default function AddCar({ navigation }) {
    const [allMakes, SetAllMakes] = useState([]);
    const [imagePath, setImagePath] = useState("");


    useEffect(() => {
        fetch('https://listing-creation.api.autoscout24.com/makes')
            .then((response) => response.json())
            .then((json) => SetAllMakes(json.makes))
            .catch((error) => console.error(error))
    }, []);

    const takePicture = async () => {
        try {
            const cameraResult = await Camera.getPhoto({
                quality: 90,
                //allowEditing: true,
                resultType: CameraResultType.Uri,
            });

            const path = cameraResult?.path || cameraResult?.webPath;

            setImagePath(path);

            console.log(imagePath);

            return true;
        } catch (e) {
            console.log(e)
        }
    }
    //console.log(allMakes)

    return (
        <>

            <SafeAreaView>

                <Picker
                    style={styles.input}
                >

                    {

                        allMakes.map((u, i) => {
                            return (
                                <Picker.Item key={i} label={u.name} value={u.name} />
                            )
                        })
                    }


                </Picker>

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
                </View>

                <View style={styles.check}>
                    <Button
                        onPress={() =>
                            navigation.navigate('carPage')
                        }
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
