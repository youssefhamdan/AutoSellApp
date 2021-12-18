import { supabase } from '../client';
import React, { useState, useEffect } from 'react';
import { Button, Card, Title } from 'react-native-paper';
import {ScrollView, TextInput} from 'react-native';
import 'react-native-url-polyfill/auto';

export default function Favorite({navigation}) {
    const [posts, setPosts] = useState([]);
    const [fav, setFav] = useState([]);
    const [postsInFav, setPostsInFav] = useState([]);


    useEffect(() => {
        fetchFav()
        fetchPosts()
        assignPostsInFav()

    }, [])


    async function fetchFav() {
        console.log("id user : " + supabase.auth.user().id)
        const {data, error} = await supabase
            .from('favoritePost')
            .select()
        //.eq('id', idAnnonce);
        setFav(data)
        //console.log("posts : " + fav[0].idPost)
        console.log("posts : " + data)

    }

    async function fetchPosts() {
        console.log("table post : ")
        const {data, error} = await supabase
            .from('posts')
            .select()
        //.eq('id', idAnnonce);
        setPosts(data)
        //console.log("test: " + posts[0].fabricant)
        console.log("posts : " + data)

    }

    function assignPostsInFav(){
        const data=[]
        fav.map((favorite, i) => {
            if(favorite.idUser==supabase.auth.user().id){
            posts.map((post, i) => {
                    if(post.id==favorite.idPost){
                        data.push(post)
                    }
            })}
        })
        setPostsInFav(data)
        console.log("mes favoris  : "+data)
    }


        return (
            <>
                <ScrollView>


                    {
                        postsInFav.map((post,i) => {

                            return (
                                <Card>

                                    <Card.Content>
                                        <Title key={i} >{ post.fabricant + " "+ post.modele + " " +post.annee}</Title>
                                    </Card.Content>
                                    <Card.Cover key={i} source={{ uri: post.img }} />
                                    <Card.Actions>
                                        <Button key={i} onPress={() =>
                                            navigation.navigate('CarPage',{ idAnnonce:post.id })
                                        }>ENTER</Button>
                                    </Card.Actions>

                                </Card>
                            )
                        })
                    }


                    {/*{*/}
                    {/*    fav.map((favorites, i) => {*/}

                    {/*        return (*/}
                    {/*            <Card>*/}

                    {/*                <Card.Content>*/}
                    {/*                    <Title key={i}>{favorites.idUser + "/" + favorites.idPost}DSQDSQDSQ</Title>*/}
                    {/*                </Card.Content>*/}
                    {/*                <Card.Cover key={i}/>*/}
                    {/*                <Card.Actions>*/}
                    {/*                    <Button key={i}*/}
                    {/*                    >ENTER</Button>*/}
                    {/*                </Card.Actions>*/}

                    {/*            </Card>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}
                </ScrollView>
            </>
        );
}