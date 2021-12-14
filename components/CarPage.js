import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, ScrollView, Text } from 'react-native';
import { supabase } from '../client';
import { Divider } from 'react-native-elements';
import MapView, {Marker} from "react-native-maps";

export default function CarPage({ route, navigation }) {
    const { idAnnonce } = route.params;
    const [post, setPost] = useState([])
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [latitudeD, setLatitudeD] = useState();
    const [longitudeD, setLongitudeD] = useState();
    const [x,setX]= useState(51.053829);
    const [y,setY]= useState(3.725012);
    useEffect(() => {
        fetchPosts()
        getLocation(post.location)
    }, [])


    async function fetchPosts() {
        const { data } = await supabase
            .from('posts')
            .select()
            .eq('id', idAnnonce);

        setPost(data[0]);
    }

    async function getLocation(location){
        let url='http://open.mapquestapi.com/geocoding/v1/address?key=MM0QCZCk9JEAMjHj3mDc7AyxUvunobQ4&location='+location
        await fetch(url)
            .then((response) => response.json())
            .then((json) => {

                setLatitude(json.results[0].locations[0].latLng.lat)
                setLongitude(json.results[0].locations[0].latLng.lng)
                setLongitudeD(json.results[0].locations[0].displayLatLng.lng)
                setLatitudeD(json.results[0].locations[0].displayLatLng.lat)
                console.log(json.results[0].locations[0].latLng.lat+" ////"+json.results[0].locations[0].latLng.lng)
            })
            .catch((error) => console.error(error))
        console.log(typeof(latitude)+"///"+typeof(longitude))
    }

if(longitude!=undefined&&longitude!=undefined&&latitudeD!=undefined&&longitudeD!=undefined){
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


            <View>

            <MapView
                style={{flex:1, height:300,width:500}}
                provider={"google"}
                showsUserLocation={true}
                initialRegion={{
                    latitude:  50.844041,
                    longitude: 4.367202,
                    latitudeDelta: 0.50,
                    longitudeDelta: 1.5,

                }}
                zoomControlEnable={true}
                showsMyLocationButton={true}>
                <Marker draggable
                    //coordinate={x}
                        coordinate={{ latitude : latitude , longitude : longitude }}

                />
            </MapView>
            </View>
        </ScrollView>
    );}
else{
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
}
