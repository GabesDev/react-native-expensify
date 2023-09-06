import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../themes';
import BackButton from '../components/backButton';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Snackbar from 'react-native-snackbar';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import Loading from '../components/loading';
import {useDispatch, useSelector} from 'react-redux';
import {setUserLoading} from '../redux/slices/user';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {userLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (error) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: error.message,
          backgroundColor: 'red',
        });
      }
    } else {
      // show error
      Snackbar.show({
        text: 'Email and Password are required!',
        backgroundColor: 'red',
      });
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex justify-between h-full mx-4">
          <View>
            <View className="relative">
              <View className="absolute top-0 left-0 z-10">
                <BackButton />
              </View>

              <Text
                className={`${colors.heading} text-xl font-bold text-center`}>
                Sign In
              </Text>
            </View>

            <View className="flex-row justify-center my-3 mt-5">
              <Image
                className="h-80 w-80"
                source={require('../assets/images/login.png')}
              />
            </View>
            <View className="mx-2 space-y-2">
              <Text className={`${colors.heading} text-lg font-bold`}>
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={value => setEmail(value)}
                className="p-4 mb-3 bg-white rounded-full"
              />
              <Text className={`${colors.heading} text-lg font-bold`}>
                Password
              </Text>
              <TextInput
                value={password}
                secureTextEntry
                onChangeText={value => setPassword(value)}
                className="p-4 mb-3 bg-white rounded-full"
              />
              <TouchableOpacity className="flex-row justify-end">
                <Text>Forget Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            {userLoading ? (
              <Loading />
            ) : (
              <TouchableOpacity
                onPress={handleSubmit}
                style={{backgroundColor: colors.button}}
                className="p-3 mx-2 my-6 rounded-full shadow-sm">
                <Text className="text-lg font-bold text-center text-white">
                  Sign In
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
