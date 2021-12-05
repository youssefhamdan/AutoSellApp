import React, { useEffect,useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

function listCar() {


    const posts = [
        {
            titre: 'BMW M3 F80',
            name: 'https://www.tuningblog.eu/wp-content/uploads/2018/05/BMW-M3-F80-GTS-FF-Retrofittings-Tuning-2018-16.jpg'
        },
        {
            titre: 'BMW M5 F90',
            name: 'https://www.tuningblog.eu/wp-content/uploads/2019/02/BMW-M3-Competition-CS-Sportfedern-Tuning-1.jpg'
        },
        {
            titre: 'AUDI RS3 8V',
            name: 'https://maxton-design.fr/fre_pl_Lame-Du-Pare-Chocs-Avant-Splitter-V-2-Audi-RS3-8V-FL-Sedan-7763_1.jpg'
        },
    ]

    return (
        <>
    
         <ScrollView>
        {
            posts.map((u, i) => {
                return (
                    <Card>

                        <Card.Content>
                            <Title>{u.titre}</Title>
                        </Card.Content>
                        <Card.Cover source={{uri:u.name}} />
                        <Card.Actions>
                            <Button>ENTER</Button>
                        </Card.Actions>

                    </Card>
                )
            })
        }
        </ScrollView>
        </>
    );

}

export default listCar;