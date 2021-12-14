import { supabase } from '../client';
import React, { useState, useEffect } from 'react';
import { Button, Card, Title } from 'react-native-paper';
import {ScrollView, TextInput} from 'react-native';
import 'react-native-url-polyfill/auto';

export default function SuplistCar({navigation}) {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState({ title: "", url: "" })
    const { title, url } = post

    useEffect(() => { 
       fetchPosts()
    }, [])

    async function fetchPosts() {
        const { data } = await supabase
            .from('posts')
            .select();
            setPosts(data);
        //console.log("data:", data)
    }


    

    console.log("qqdq",posts);
    
    return (
        <>
            <ScrollView>


                {
                    posts.map((post,i) => {
                        
                        return (
                            <Card>

                                <Card.Content>
                                    <Title key={i} >{ post.fabricant + " "+ post.modele + " " +post.annee}</Title>
                                </Card.Content>
                                <Card.Cover source={{ uri: post.img }} />
                                <Card.Actions>
                                    <Button onPress={() =>
                            navigation.navigate('CarPage',{ idAnnonce:post.id })
                        }>ENTER</Button>
                                </Card.Actions>

                            </Card>
                        )
                    })
                }
            </ScrollView>
        </>
    );
}

