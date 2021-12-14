import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, ScrollView, Text } from 'react-native';
import { supabase } from '../client';
import { Divider } from 'react-native-elements';

export default function CarPage({ route, navigation }) {
    const { idAnnonce } = route.params;
    const [post, setPost] = useState([])

    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts() {
        const { data } = await supabase
            .from('posts')
            .select()
            .eq('id', idAnnonce);

        setPost(data[0]);
    }

    console.log("POST",post);
    return (

        <ScrollView>

            {
                   <View>
                        <View style={{ margin: 25 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}> {post.fabricant + " " + post.modele + " " + post.annee} </Text>
                        </View>
                        <Image source={{ uri: post.img }} style={{ width: '100%', height: 400 }} />
                        <View style={{ margin: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', fontWeight: 'bold' }}> {post.prix} €</Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: "#d3d3d3" }} />
                        <View style={{ margin: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', fontWeight: 'bold' }}> Détails </Text>
                            <View style={{ marginTop: 25 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> Marque <Text style={{ color: '#333', marginLeft: 15 }}> {post.fabricant} </Text></Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> Modèle <Text style={{ color: '#333', marginLeft: 15 }}> {post.modele} </Text></Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> Année <Text style={{ color: '#333', marginLeft: 15 }}> {post.annee} </Text></Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> Carburant <Text style={{ color: '#333', marginLeft: 15 }}> {post.carburant} </Text></Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> Kilométrage <Text style={{ color: '#333', marginLeft: 15 }}> {post.km} Km</Text></Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> Puissance <Text style={{ color: '#333', marginLeft: 15 }}> {post.puissance} Ch </Text></Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494' }}> Boîte <Text style={{ color: '#333', marginLeft: 15 }}> {post.boite} </Text></Text>
                            </View>
                        </View>
                    </View>
                     
            }    
                    
                 
                
        
        </ScrollView>
    );
}
