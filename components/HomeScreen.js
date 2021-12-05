import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import {
    View,
    Text,
    Picker,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
function HomeScreen() {
    const [allMakes, SetAllMakes] = useState([]);

    
    /*useEffect(() => {
        async function fetchData() {
            const request = await fetch('https://listing-creation.api.autoscout24.com/makes');
            let respJson = await request.json()
            //console.warn(respJson.makes)
            SetAllMakes(respJson.makes)
        }
        fetchData()
    })*/

    useEffect(() => {
        fetch('https://listing-creation.api.autoscout24.com/makes')
          .then((response) => response.json())
          .then((json) => SetAllMakes(json.makes))
          .catch((error) => console.error(error))
      }, []);
  
   
    console.log(allMakes)
    
    return (
        <>
            <View style={styles.container}>
                <Picker 
                    style={{ height: 50, width: 150 }}
                >
                    
                    {
                       
                        allMakes.map((u, i) => {
                            return (
                                <Picker.Item label={u.name} value={u.name} />
                            )
                        })
                    }


                </Picker>
            </View>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    placeholder="Marque"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Modele"
                />
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
    },
    check: {
        padding: 10,
        color: "#f5f200"
    }
});



export default HomeScreen;