import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

export default function Test({navigation}) {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setEmail(user.email);
      }
    });
  }, []);
  return (
    <View style={{height: '100%', backgroundColor: 'white'}}>
      <View
        style={{
          height: 65,
          backgroundColor: '#73bbe7',
          flexDirection: 'row',
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
          <AntDesign
            name="profile"
            style={{color: 'green', fontSize: 32, marginRight: 8}}
          />
          <Text style={{fontSize: 23, color: 'white'}}>Info</Text>
        </View>
      </View>
      <View
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <Text style={{marginVertical: 24, fontSize: 26, fontWeight: 'bold'}}>
          Information
        </Text>
        <View style={{flexDirection: 'column', gap: 12}}>
          <View style={{flexDirection: 'row', gap: 24}}>
            <Text style={{fontSize: 18}}>Tên thiết bị:</Text>
            <Text style={{fontSize: 18}}>Gậy thông minh</Text>
          </View>

          <View style={{flexDirection: 'row', gap: 24}}>
            <Text style={{fontSize: 18}}>Nhà phát triển:</Text>
            <Text style={{fontSize: 18}}>Nhóm 42_PBL5</Text>
          </View>

          <View style={{flexDirection: 'row', gap: 24}}>
            <Text style={{fontSize: 18}}>Hổ trợ:</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>+84923836659</Text>
          </View>

          <View style={{flexDirection: 'row', gap: 24, marginTop: 50}}>
            <Text style={{fontSize: 18}}>Email đăng nhập:</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{email}</Text>
          </View>

          <TouchableOpacity
            style={{
              width: 120,
              backgroundColor: 'red',
              paddingVertical: 6,
              marginLeft: '20%',
              paddingHorizontal: 12,
              marginTop: 12,
            }}
            onPress={async () => {
              await auth().signOut();
              navigation.navigate('Login');
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
