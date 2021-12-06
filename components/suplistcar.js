import { supabase } from '../client';
import React, { useState, useEffect } from 'react';
import { Button, Card, Title } from 'react-native-paper';
import { ScrollView } from 'react-native';

function suplistCar({navigation}) {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState({ title: "", url: "" })
    const { title, url } = post

    useEffect(() => { fetchPosts() }, [])

    async function fetchPosts() {
        const { data } = await supabase
            .from('posts')
            .select()
        setPosts(data)
        console.log("data:", data)
    }

    async function createPost() {
        await supabase.from('posts').insert([{ title, url }], { returning: 'minimal' })
        setPost({ title: "", content: "" })
        fetchPosts()
    }
    return (
        <>
            <ScrollView>
                <input
                    value={title}
                    onChange={e => setPost({ ...post, title: e.target.value })}
                />
                <input
                    value={url}
                    onChange={e => setPost({ ...post, url: e.target.value })}
                />
                <button onClick={createPost}> Create Post </button>
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

export default suplistCar;