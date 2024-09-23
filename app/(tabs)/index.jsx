import { Image, StyleSheet, Platform, View, Text} from 'react-native';
import MapView from 'react-native-maps';
import GetLocation from 'react-native-get-location'
import {Marker} from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';



export default function HomeScreen() {
  const [location, setLocation] = useState({
    coords:{longitude: 24.9172,
    latitude: 67.0924,
    latitudeDelta: 0,
    longitudeDelta: 0,}
  });
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const currentlocation = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: location.coords.latitudeDelta,
    longitudeDelta: location.coords.longitudeDelta,
    Accuracy: location.coords.Accuracy,
    Altitude: location.coords.Altitude,
    Heading: location.coords.Heading,
    Speed: location.coords.Speed,
    url: "https://avatars.githubusercontent.com/u/3717923?s=280&v=4"
  }
//   GetLocation.getCurrentPosition({
//     enableHighAccuracy: true,
//     timeout: 60000,
// })
// .then(location => {
//     console.log(location);
// })
// .catch(error => {
//     const { code, message } = error;
//     console.warn(code, message);
// })
  
  return (
<MapView style={styles.map}
  initialRegion={currentlocation}
>
        <Marker coordinate={currentlocation}  image={{uri: currentlocation.url}}/>
      </MapView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });
