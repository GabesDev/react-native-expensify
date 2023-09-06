import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../themes';
import BackButton from '../components/backButton';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';
import Snackbar from 'react-native-snackbar';
import {addDoc} from 'firebase/firestore';
import {tripsRef} from '../config/firebase';
import {useSelector} from 'react-redux';

export default function AddTripScreen() {
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state => state.user);

  const navigation = useNavigation();

  const handleAddTrip = async () => {
    if (place && country) {
      setLoading(true);
      let doc = await addDoc(tripsRef, {place, country, userId: user.uid});
      setLoading(false);
      if (doc && doc.id) navigation.goBack();
    } else {
      // show error
      Snackbar.show({
        text: 'Place and country are required',
        backgroundColor: 'red',
      });
    }
  };
  return (
    <SafeAreaView>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0">
              <BackButton />
            </View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              Add Trip
            </Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image
              source={require('../assets/images/4.png')}
              className="h-72 w-72"
            />
          </View>
          <View className="mx-2 space-y-2">
            <Text className={`${colors.heading} text-lg font-bold`}>
              Where on Earth?
            </Text>
            <TextInput
              value={place}
              onChangeText={x => setPlace(x)}
              className="p-4 mb-3 bg-white rounded-full"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              Which Country?
            </Text>
            <TextInput
              value={country}
              onChangeText={x => setCountry(x)}
              className="p-4 mb-3 bg-white rounded-full"
            />
          </View>
        </View>

        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleAddTrip}
              style={{backgroundColor: colors.button}}
              className="p-3 my-6 rounded-full shadow-sm">
              <Text className="text-lg font-bold text-center text-white">
                Add Trip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
