import {GoogleSignIn} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const _SignInWithGoogle = async () => {
  try {
    GoogleSignIn.configure({
      offlineAccess: false,
      webClientID:
        '558330610947-ac0a4qfdmfmoms31cgm7jinc60rnk3j8.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    await GoogleSignIn.hasPlayServices();
    const userInfo = await GoogleSignIn.signIn();

    const {idToken} = await GoogleSignIn.signIn();
    const googleCredentials = await GoogleAuthProvider.credential(idToken);
    auth().signInWithGoogleCredentials(googleCredentials);
    return userInfo;
  } catch {
    console.log('eee');
    return null;
  }
};

export default _SignInWithGoogle;
