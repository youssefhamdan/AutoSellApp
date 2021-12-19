import { supabase } from '../client';
import React, {useState, useEffect, useCallback} from 'react';
import { Button, Card, Title } from 'react-native-paper';
import {ScrollView, TextInput} from 'react-native';
import 'react-native-url-polyfill/auto';
import { RefreshControl, SafeAreaView, StyleSheet, Text } from 'react-native';
import {useTranslation} from "react-i18next";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Favorite({navigation}) {
    const {t} = useTranslation();
    const [posts, setPosts] = useState([]);
    const [fav, setFav] = useState([]);
    const [postsInFav, setPostsInFav] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchFav()
        wait(2000).then(() => setRefreshing(false));
    }, []);


    useEffect(() => {
        fetchFav()
    }, [])
    useEffect(() => {
        fetchPosts()
    }, [fav])
    useEffect(() => {
        assignPostsInFav()

    }, [posts])






    async function fetchFav() {
        const {data, error} = await supabase
            .from('favoritePost')
            .select()

            .eq('idUser', supabase.auth.user().id);
        //.eq('id', idAnnonce);
        setFav(data)

    }

    async function fetchPosts() {
        const {data, error} = await supabase
            .from('posts')
            .select()
        setPosts(data)
    }

    function assignPostsInFav(){
        const data=[]
        fav.map((favorite, i) => {

            posts.map((post, i) => {
                    if(post.id==favorite.idPost){
                        data.push(post)
                    }
            })
        })
        setPostsInFav(data)
    }


        return (
            <>
                <ScrollView
                    //contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    
                    {
                        postsInFav.map((post,i) => {
                            return (
                                <Card key={i}>
                                    <Card.Content>
                                        <Title  >{ post.fabricant + " "+ post.modele + " " +post.annee}</Title>
                                    </Card.Content>
                                    <Card.Cover  source={{ uri: post.img }} />
                                    <Card.Actions style={{justifyContent: 'center',backgroundColor: '#C9CCD5',marginTop:7,marginHorizontal:4,borderRadius: 10,}}>
                                        <Button  onPress={() =>
                                            navigation.navigate('CarPage',{ idAnnonce:post.id })
                                        } color={"black" } >{t('buttonvisualiser')}</Button>
                                    </Card.Actions>
                                </Card>
                            )
                        })
                    }
                </ScrollView>
            </>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
});