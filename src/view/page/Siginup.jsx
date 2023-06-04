import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';

export default function Signup({navigation}) {
  const [forcusEmail, setForcusEmail] = useState(false);
  const [forcusPass, setForcusPass] = useState(false);
  const [forcusComfirm, setForcusConfirm] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isvalidEmail, setIsValidEmail] = useState(true);
  const [isvalidPassword, setIsValidPassword] = useState(true);
  const [isvalidConfirmPassword, setIsValidConfirmPassword] = useState(true);

  const [showpass, setShowpass] = useState(false);
  const [showconf, setShowconf] = useState(false);

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

  const verifyConfirmPassword = confirmPassword => {
    if (confirmPassword == Password) return true;
    return false;
  };

  const handleSignUp = async () => {
    var check = true;
    if (Email == '' || Password == '' || confirmPassword == '') {
      check = false;
      Alert.alert('Error', 'Email or Password is required', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }

    if (!isvalidEmail || !isvalidPassword || !isvalidConfirmPassword) {
      check = false;
      Alert.alert('Error', 'Email or Password is valid', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }

    if (check) {
      auth()
        .createUserWithEmailAndPassword(Email, Password)
        .then(data => {
          Toast.show({
            type: 'success',
            text1: 'Sgin up Successfull  👋',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
          });
          console.log(data);
        })
        .catch(error => {
          Alert.alert('Error', `${error.message}`, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        });
    }
  };
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: '#111bb8',
          textAlign: 'center',
          padding: 10,
          marginTop: 36,
        }}>
        Create account
      </Text>
      <Text
        style={{
          fontSize: 17,
          textAlign: 'center',
          marginHorizontal: 60,
          marginTop: 24,
          color: 'black',
        }}>
        {' '}
        Create an account so you can explore all the existing jobs
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
            secureTextEntry={!showpass}
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
            placeholder="Password"
          />
          {showpass ? (
            <TouchableOpacity
              style={{position: 'absolute', right: 20, top: '32%'}}
              onPress={() => setShowpass(!showpass)}>
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
              onPress={() => setShowpass(!showpass)}>
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
        <View>
          <TextInput
            onFocus={() => setForcusConfirm(true)}
            onBlur={() => setForcusConfirm(false)}
            secureTextEntry={!showconf}
            style={[
              {
                backgroundColor: '#e0e2ff',
                borderRadius: 6,
                paddingHorizontal: 12,
                paddingVertical: 14,
                marginVertical: 10,
                fontSize: 18,
              },
              forcusComfirm && {borderWidth: 2, borderColor: '#111bb8'},
            ]}
            onChangeText={text => {
              setConfirmPassword(text);
              const isvalid = verifyConfirmPassword(text);
              isvalid
                ? setIsValidConfirmPassword(true)
                : setIsValidConfirmPassword(false);
            }}
            value={confirmPassword}
            placeholder="Confirm Password"
          />
          {showconf ? (
            <TouchableOpacity
              style={{position: 'absolute', right: 20, top: '32%'}}
              onPress={() => setShowconf(!showconf)}>
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
              onPress={() => setShowconf(!showconf)}>
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
        {!isvalidConfirmPassword && (
          <Text
            style={{
              fontSize: 20,
              color: 'red',
            }}>
            Confirm Password is valid
          </Text>
        )}
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
        }}
        onPress={handleSignUp}>
        <Text
          style={{
            color: 'white',
            paddingVertical: 12,
            fontSize: 22,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Sign up
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginHorizontal: 20,
          marginTop: 20,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            paddingVertical: 12,
            fontSize: 18,
            textAlign: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          Already have an account
        </Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
}
