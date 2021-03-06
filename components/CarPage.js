import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, ScrollView, Text } from 'react-native';
import { supabase } from '../client';
import { Divider } from 'react-native-elements';
import MapView, { Marker } from "react-native-maps";
import { SocialIcon } from "react-native-elements/dist/social/SocialIcon";
import { Button } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/AntDesign';
import { Icon } from 'react-native-elements'
import {useTranslation} from "react-i18next";
import i18n from "../i18n/i18n";


export default function CarPage({ route, navigation }) {
    const { idAnnonce } = route.params;
    const [post, setPost] = useState([])
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [favoris, setFavoris] = useState();
    const [latitudeD, setLatitudeD] = useState();
    const [longitudeD, setLongitudeD] = useState();
    const [x, setX] = useState(51.053829);
    const [y, setY] = useState(3.725012);
    const { t,i18n } = useTranslation();

    useEffect(() => {
        fetchPosts();
    }, [])


    async function fetchPosts() {
        const { data } = await supabase
            .from('posts')
            .select()
            .eq('id', idAnnonce);
        setPost(data[0]);
        getLocation(data[0].location);
        fetchFav(data[0].id);
    }

    async function getLocation(location) {
        let url = 'http://open.mapquestapi.com/geocoding/v1/address?key=MM0QCZCk9JEAMjHj3mDc7AyxUvunobQ4&location=' + location
        await fetch(url)
            .then((response) => response.json())
            .then((json) => {

                setLatitude(json.results[0].locations[0].latLng.lat)
                setLongitude(json.results[0].locations[0].latLng.lng)
                setLongitudeD(json.results[0].locations[0].displayLatLng.lng)
                setLatitudeD(json.results[0].locations[0].displayLatLng.lat)
            })
            .catch((error) => console.error(error))
    }

    async function addFavoris() {
        setFavoris(true);
        const { data, error } = await supabase.from('favoritePost').insert([{
            idUser: supabase.auth.user().id,
            idPost: post.id
        }]);
    }

    async function deleteFavoris() {
        setFavoris(false);
        const { data, error } = await supabase.from('favoritePost')
            .delete()
            .match({ idPost: post.id, idUser: supabase.auth.user().id });
    }

    async function fetchFav(idPost) {
        const { data, error } = await supabase
            .from('favoritePost')
            .select()
            .eq('idPost', idPost)
            .eq('idUser', supabase.auth.user().id);
        if (data != "") {
            setFavoris(true)
        } else {
            setFavoris(false)
        }
    }

    const change = (data) => {
        i18n.changeLanguage(data)
    } 


    return (
        <>
            <ScrollView>

                {
                    <View>
                        <View style={styles.buttonView}>


                            {favoris ? (
                                <Icon
                                    onPress={() => deleteFavoris()}
                                    type='antdesign'
                                    name="star"
                                    size={35}
                                    color="black"
                                />

                            ) : (

                                <Icon
                                    onPress={() => addFavoris()}
                                    type='antdesign'
                                    name="staro"
                                    size={35}
                                    color="black"
                                />


                            )}
                        </View>
                        <View style={{ margin: 25 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}> {post.fabricant + " " + post.modele} </Text>
                        </View>
                        <Image source={{ uri: post.img }} style={{ width: '100%', height: 400 }} />
                        <View style={{ margin: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {post.prix} ???</Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: "#d3d3d3" }} />
                        <View style={{ margin: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {t('details')} </Text>
                            <View style={{ marginTop: 25 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> {t('fabricant')} <Text style={{ color: '#333', marginLeft: 15 }}> {post.fabricant} </Text></Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> {t('modele')} <Text style={{ color: '#333', marginLeft: 15 }}> {post.modele} </Text></Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> {t('annee')} <Text style={{ color: '#333', marginLeft: 15 }}> {post.annee} </Text></Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> {t('carburant')} <Text style={{ color: '#333', marginLeft: 15 }}> {post.carburant} </Text></Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> {t('kilometrage')} <Text style={{ color: '#333', marginLeft: 15 }}> {post.km} Km</Text></Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> {t('puissance')} <Text style={{ color: '#333', marginLeft: 15 }}> {post.puissance} Ch </Text></Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> {t('boitedevitesse')} <Text style={{ color: '#333', marginLeft: 15 }}> {post.boite} </Text></Text>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: "#d3d3d3" }} />
                        <View style={{ margin: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}> Contact </Text>
                            <View style={{ marginTop: 25 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> E-mail  <Text style={{ color: '#333', marginLeft: 15 }}> {post.contact} </Text></Text>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: "#d3d3d3" }} />
                        <View style={{ margin: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}> {t('location')} </Text>
                            <View style={{ marginTop: 25 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#949494', marginBottom: 10 }}> {t('ville')}  <Text style={{ color: '#333', marginLeft: 15 }}> {post.location} </Text></Text>
                            </View>
                        </View>
                    </View>
                    

                }

                <View>
                    {latitude != 0 && longitude != 0 ? (
                        <MapView
                            style={{ flex: 1, height: 300, width: 500 }}
                            provider={"google"}
                            showsUserLocation={true}
                            initialRegion={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.50,
                                longitudeDelta: 1.5,

                            }}
                            zoomControlEnable={true}
                            showsMyLocationButton={true}>
                            <Marker draggable
                                coordinate={{ latitude: latitude, longitude: longitude }}

                            />
                        </MapView>
                    ) : (null)}
                </View>




            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    buttonView: {
        width: 60,
        height: 100,
        position: 'absolute',
        right: 0,
        marginRight: 12,
        marginTop: 12
    },
});
