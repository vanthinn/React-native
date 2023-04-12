import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';

export default function Homepage({navigation}) {
  const mapRef = useRef();
  const [market, setMarket] = useState();
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
          <Text style={{fontSize: 19}}>Vị trị cụ thẻ... chờ API từ GPS</Text>
        </View>
        <MapView
          zoomControlEnabled={true}
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 16.073909,
            longitude: 108.149929,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onPress={e => setMarket(e.nativeEvent.coordinate)}>
          {market !== undefined ? <Marker coordinate={market} /> : null}
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
