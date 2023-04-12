import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

export default function Login({navigation}) {
  const [forcusEmail, setForcusEmail] = useState(false);
  const [forcusPass, setForcusPass] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [isvalidEmail, setIsValidEmail] = useState(true);
  const [isvalidPassword, setIsValidPassword] = useState(true);
  const [show, setShow] = useState(false);

  const verifyEmail = email => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regex)) return true;
    return false;
  };

  const verifyPassword = password => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (password.match(regex)) return true;
    return false;
  };

  useEffect(() => {
    GoogleSignin.configure();
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.email);
        navigation.navigate('HomeDrawer');
      }
    });
  }, []);

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      Toast.show({
        type: 'success',
        text1: 'Login Successfull  👋',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleLogin = () => {
    var check = true;
    if (Email == '' || Password == '') {
      check = false;
      Alert.alert('Error', 'Email or Password is required', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }

    if (!isvalidEmail || !isvalidPassword) {
      check = false;
      Alert.alert('Error', 'Email or Password is valid', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }

    if (check) {
      auth()
        .signInWithEmailAndPassword(Email, Password)
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          Alert.alert('Error', `${error.message}`, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        });

      Toast.show({
        type: 'success',
        text1: 'Login Successfull  👋',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
      });
    }
  };

  return (
    <View style={{backgroundColor: 'white', height: '100%', zIndex: 10}}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: '#111bb8',
          textAlign: 'center',
          padding: 10,
          marginTop: 36,
        }}>
        Login here
      </Text>
      <Text
        style={{
          fontSize: 24,
          textAlign: 'center',
          marginHorizontal: 60,
          marginTop: 24,
          color: 'black',
          fontWeight: 'bold',
        }}>
        Wellcome back you've been missed!
      </Text>
      <View style={{marginHorizontal: 20, marginTop: 36}}>
        <TextInput
          onFocus={() => setForcusEmail(true)}
          onBlur={() => setForcusEmail(false)}
          style={[
            {
              backgroundColor: '#e0e2ff',
              borderRadius: 6,
              paddingHorizontal: 12,
              paddingVertical: 14,
              marginVertical: 10,
              fontSize: 20,
            },
            forcusEmail && {borderWidth: 2, borderColor: '#111bb8'},
          ]}
          onChangeText={text => {
            setEmail(text);
            const isvalid = verifyEmail(text);
            isvalid ? setIsValidEmail(true) : setIsValidEmail(false);
          }}
          value={Email}
          placeholder="Email"
        />

        {!isvalidEmail && (
          <Text
            style={{
              fontSize: 20,
              color: 'red',
            }}>
            Email is valid
          </Text>
        )}

        <View>
          <TextInput
            onFocus={() => setForcusPass(true)}
            onBlur={() => setForcusPass(false)}
            style={[
              {
                backgroundColor: '#e0e2ff',
                borderRadius: 6,
                paddingHorizontal: 12,
                paddingVertical: 14,
                marginVertical: 10,
                fontSize: 18,
              },
              forcusPass && {borderWidth: 2, borderColor: '#111bb8'},
            ]}
            onChangeText={text => {
              setPassword(text);
              const isvalid = verifyPassword(text);
              isvalid ? setIsValidPassword(true) : setIsValidPassword(false);
            }}
            value={Password}
            secureTextEntry={!show}
            placeholder="Password"
          />
          {show ? (
            <TouchableOpacity
              style={{position: 'absolute', right: 20, top: '32%'}}
              onPress={() => setShow(!show)}>
              <Entypo
                name="eye"
                style={{
                  color: 'black',
                  fontSize: 24,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{position: 'absolute', right: 20, top: '32%'}}
              onPress={() => setShow(!show)}>
              <Entypo
                name="eye-with-line"
                style={{
                  color: 'black',
                  fontSize: 24,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        {!isvalidPassword && (
          <Text
            style={{
              fontSize: 20,
              color: 'red',
            }}>
            Password is valid
          </Text>
        )}
      </View>

      <View>
        <Text
          style={{
            marginHorizontal: 20,
            alignSelf: 'flex-end',
            fontSize: 17,
            color: '#111bb8',
            marginTop: 14,
          }}>
          Forgot your password?
        </Text>
      </View>

      <TouchableOpacity
        style={{
          marginHorizontal: 20,
          backgroundColor: '#111bb8',
          marginTop: 24,
          borderRadius: 6,
          shadowColor: '#111bb8',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,

          elevation: 8,
        }}>
        <Text
          style={{
            color: 'white',
            paddingVertical: 12,
            fontSize: 22,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
          onPress={handleLogin}>
          Sign in
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginHorizontal: 20,
          marginTop: 20,
        }}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            paddingVertical: 12,
            fontSize: 18,
            textAlign: 'center',
          }}>
          Create new account
        </Text>
      </TouchableOpacity>

      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <Text style={{textAlign: 'center', fontSize: 18, color: 'black'}}>
          Or
        </Text>

        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <GoogleSigninButton
            style={{width: 240, height: 58, fontSize: 40}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
          {/* <TouchableOpacity
            onPress={() => {
              signIn();
            }}>
            <Image
              style={{height: 50, width: 50, marginRight: 20}}
              source={require('../../imgae/logo-google.png')}
            />
            
          </TouchableOpacity> */}
        </View>
      </View>
      <Toast />
    </View>
  );
}
