import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import axios from 'react-native-axios';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';

import database from '@react-native-firebase/database';

export default function Homepage({navigation}) {
  const [region, setRegion] = useState({
    latitude: 16.0739,
    longitude: 108.1499,
    latitudeDelta: 0.15,
    longitudeDelta: 0.121,
  });
  const [origin, setOrigin] = useState({
    latitude: 16.0780883,
    longitude: 108.0863317,
  });
  const [destination, setDestination] = useState({
    latitude: 16.07343,
    longitude: 108.14998,
  });
  const [points, setPoints] = useState([]);
  const [address, setAddress] = useState('');
  const [PGranted, setPGranted] = useState();
  const BingMapsAPIKey =
    'Atws9_ZZn1gAz8WqRILVYsK5dWLadMusnQop4P4RxkaaPtGXnWFS9QmnS4QLWTvy';

  async function checkLocationPermissions() {
    let granted = await getLocationPermissions();
    setPGranted(granted);
    if (granted) {
      getCurrentLocation();
    }
  }

  async function getLocationPermissions() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).catch(err => {});
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  async function getCurrentLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setOrigin({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        // console.log(location);
      })
      .catch(error => {});
  }
  useEffect(() => {
    //lấy vị trí hiện tại của điện thoại
    checkLocationPermissions();

    // lấy tọa độ từ firebase
    database()
      .ref('/')
      .on(
        'value',
        snapshot => {
          const data = snapshot.val();
          setDestination({
            latitude: data.Latitude,
            longitude: data.Longitude,
          });
        },
        error => {
          console.log(error);
        },
      );

    //tìm kiếm địa chỉ từ location của đính đến
    const location = `${destination.latitude},${destination.longitude}`;
    const url = `https://dev.virtualearth.net/REST/v1/Locations/${location}?o=json&key=${BingMapsAPIKey}`;
    axios
      .get(url)
      .then(response => {
        const data = response.data;
        if (
          data.resourceSets.length > 0 &&
          data.resourceSets[0].resources.length > 0
        ) {
          const result = data.resourceSets[0].resources[0];
          const address = result.name;
          setAddress(address);
          setRegion({
            ...region,
            latitude: destination.latitude,
            longitude: destination.longitude,
          });
        } else {
          console.log('No results found');
        }
      })
      .catch(error => {});

    // tìm kiếm tuyến đường giữa 2 điểm
    axios
      .get(
        `https://dev.virtualearth.net/REST/v1/Routes/Driving?wp.0=${origin.latitude},${origin.longitude}&wp.1=${destination.latitude},${destination.longitude}&routePathOutput=Points&travelMode=driving&key=${BingMapsAPIKey}`,
      )
      .then(response => {
        const points =
          response.data.resourceSets[0].resources[0].routePath.line.coordinates;
        setPoints(points);
      })
      .catch(error => {});
  }, [destination]);

  return (
    <ScrollView>
      <View
        style={{
          height: 65,
          backgroundColor: '#73bbe7',
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: 16}}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Octicons
            name="three-bars"
            style={{
              fontSize: 44,
              color: 'white',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Entypo
            name="location-pin"
            style={{color: 'red', fontSize: 32, marginRight: 8}}
          />
          <Text style={{fontSize: 23, color: 'white'}}>Location</Text>
        </View>
      </View>

      <View style={{height: 760}}>
        <View
          style={{
            position: 'absolute',
            width: '92%',
            top: 10,
            left: 16,
            padding: 15,
            zIndex: 99,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,
            elevation: 17,
          }}>
          <Text style={{fontSize: 19}}>{address}</Text>
        </View>
        <MapView
          zoomControlEnabled={true}
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          // onPress={e => setDestination(e.nativeEvent.coordinate)}
        >
          <Marker coordinate={destination} />
          <Polyline
            coordinates={points.map(point => {
              return {
                latitude: point[0],
                longitude: point[1],
              };
            })}
            strokeColor="#1994e0"
            strokeWidth={5}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
