import React from "react";
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';

export default function CarPage() {
    return (
        <ScrollView>
            <View>
                <View style={{ margin: 25 }}>
                    <text style={{ fontSize: 25, fontFamily: "Helvetica" }}> BMW M3 F80 </text>
                </View>
                <Image source={{ uri: 'https://www.tuningblog.eu/wp-content/uploads/2018/05/BMW-M3-F80-GTS-FF-Retrofittings-Tuning-2018-16.jpg' }} style={{ width: '100%', height: 400 }} />
                <View style={{ margin : 25 }}>
                    <text style={{ fontSize: 20, fontFamily: "Helvetica", fontWeight: 'bold' }}> 57.000 € </text>
                </View>
                <View style = {{ height : 1,backgroundColor : "#d3d3d3"}}/>
                <View style={{ margin: 25 }}>
                    <text style={{ fontSize: 20, fontFamily: "Helvetica", fontWeight: 'bold' }}> Détails </text>
                    <View style={{ marginTop: 25 }}>
                        <text style={{ fontSize: 15, fontFamily: "Helvetica", color: '#949494', marginBottom: 10 }}> Marque <text style={{ color: '#333', marginLeft: 15 }}> BMW </text></text>
                        <text style={{ fontSize: 15, fontFamily: "Helvetica", color: '#949494', marginBottom: 10 }}> Modèle <text style={{ color: '#333', marginLeft: 15 }}> M3 </text></text> 
                        <text style={{ fontSize: 15, fontFamily: "Helvetica", color: '#949494', marginBottom: 10 }}> Année <text style={{ color: '#333', marginLeft: 15 }}> 2017 </text></text>
                        <text style={{ fontSize: 15, fontFamily: "Helvetica", color: '#949494', marginBottom: 10 }}> Carburant <text style={{ color: '#333', marginLeft: 15 }}> Essence </text></text>
                        <text style={{ fontSize: 15, fontFamily: "Helvetica", color: '#949494', marginBottom: 10 }}> Kilométrage <text style={{ color: '#333', marginLeft: 15 }}> 37.000 Km</text></text>
                        <text style={{ fontSize: 15, fontFamily: "Helvetica", color: '#949494', marginBottom: 10 }}> Puissance <text style={{ color: '#333', marginLeft: 15 }}> 450 Ch </text></text>
                        <text style={{ fontSize: 15, fontFamily: "Helvetica", color: '#949494' }}> Boîte <text style={{ color: '#333', marginLeft: 15 }}> Automatique </text></text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
