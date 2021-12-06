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
        (async () => {
        const { data } = await supabase
            .from('posts')
            .select();
            setPost(data);
        })();
    }, [])

    async function fetchPosts() {
        
        //console.log("data:", data)
    }


    async function createPost() {
        await supabase.from('posts').insert([{ title, url }], { returning: 'minimal' })
        setPost({ title: "", content: "" })
        fetchPosts()
    }

    console.log("qqdq",posts);
    
    return (
        <>
            <ScrollView>
                <TextInput
                    value={title}
                    onChange={e => setPost({ ...post, title: e.target.value })}
                />
                <TextInput
                    value={url}
                    onChange={e => setPost({ ...post, url: e.target.value })}
                />
                <Button onClick={createPost}> Create Post </Button>
               


                {
                    posts.map(post => {
                        
                        return (
                            <Card>

                                <Card.Content>
                                    <Title>{post.title}</Title>
                                </Card.Content>
                                <Card.Cover source={{ uri: post.url }} />
                                <Card.Actions>
                                    <Button onPress={() =>
                            navigation.navigate('CarPage')
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

