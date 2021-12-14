import React from "react";
import { View, Image, StyleSheet, ScrollView ,Text} from 'react-native';
import { Divider } from 'react-native-elements';

export default function CarPage({route,navigation}) {
   const {idAnnonce} = route.params;
   console.log("qdq",idAnnonce);
    return (
      
        <ScrollView>
            <View>
                <View style={{ margin: 25 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}> BMW M3 F80 </Text>
                </View>
                <Image source={{ uri: 'https://www.tuningblog.eu/wp-content/uploads/2018/05/BMW-M3-F80-GTS-FF-Retrofittings-Tuning-2018-16.jpg' }} style={{ width: '100%', height: 400 }} />
                <View style={{ margin : 25 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', fontWeight: 'bold' }}> 57.000 € </Text>
                </View>
                <View style = {{ height : 1,backgroundColor : "#d3d3d3"}}/>
                <View style={{ margin: 25 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', fontWeight: 'bold' }}> Détails </Text>
                    <View style={{ marginTop: 25 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> Marque <Text style={{ color: '#333', marginLeft: 15 }}> BMW </Text></Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> Modèle <Text style={{ color: '#333', marginLeft: 15 }}> M3 </Text></Text> 
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> Année <Text style={{ color: '#333', marginLeft: 15 }}> 2017 </Text></Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> Carburant <Text style={{ color: '#333', marginLeft: 15 }}> Essence </Text></Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> Kilométrage <Text style={{ color: '#333', marginLeft: 15 }}> 37.000 Km</Text></Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> Puissance <Text style={{ color: '#333', marginLeft: 15 }}> 450 Ch </Text></Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494' }}> Boîte <Text style={{ color: '#333', marginLeft: 15 }}> Automatique </Text></Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
