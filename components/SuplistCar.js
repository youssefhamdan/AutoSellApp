import { supabase } from '../client';
import React, { useState, useEffect } from 'react';
import { Button, Card, Title } from 'react-native-paper';
import {ScrollView, TextInput} from 'react-native';
import 'react-native-url-polyfill/auto';

export default function SuplistCar({route,navigation}) {
    const [posts, setPosts] = useState([]);
    const {searchData} = route.params;
    
    useEffect(() => { 
       fetchPosts()
    }, [])

    

    async function fetchPosts() {
        console.log("QUERY "+searchData);
        fetch(searchData, {
            method: 'GET',
            headers: {
              'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODE3ODU1OSwiZXhwIjoxOTUzNzU0NTU5fQ.POaMQPFZdcjRpLsmZFgwZ4-Iiw3i5hN9EtTG6yzu21I'
            }})
            .then((response) => response.json())
            .then((json) => setPosts(json))
            .catch((error) => console.error(error))  
    }


    

    
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

