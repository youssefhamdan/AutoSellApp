import React, {useState} from "react";
import MapView, {Marker} from 'react-native-maps';

export default function Localisation() {
    const [x,setX]= useState(51.053829);
    const [y,setY]= useState(3.725012);
    return (

        // <MapView style={{flex:1}}
        //     initialRegion={{
        //         latitude: 50.850341,
        //         longitude: 4.351710,
        //         latitudeDelta: 0.015,
        //         longitudeDelta: 0.0121,
        //     }}
        // />

    <MapView
        style={{flex:1}}
        provider={"google"}
        showsUserLocation={true}
        initialRegion={{
        latitude: 51.053829,
        longitude: 3.725012,
        latitudeDelta: 51.053829,
        longitudeDelta: 3.725012,

    }}>
        <Marker draggable
                //coordinate={x}
                coordinate={{ latitude : x , longitude : y }}
                onDragEnd={(e) => {
                    setX(e.nativeEvent.coordinate.latitude )
                    setY(e.nativeEvent.coordinate.longitude)

                }}
        />
    </MapView>

    );
}
