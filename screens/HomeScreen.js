import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../themes';
import {SafeAreaView} from 'react-native-safe-area-context';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth, tripsRef} from '../config/firebase';
import {useSelector} from 'react-redux';
import {getDocs, query, where} from 'firebase/firestore';
import {useEffect, useState} from 'react';

export default function HomeScreen() {
  const {user} = useSelector(state => state.user);
  const [trips, setTrips] = useState([]);

  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const q = query(tripsRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      data.push({...doc.data(), id: doc.id});
    });
    setTrips(data);
  };

  useEffect(() => {
    if (isFocused) fetchTrips();
  }, [isFocused]);

  const navigation = useNavigation();
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between p-4">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>
          Expensify
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="p-2 px-3 bg-white border border-gray-200 rounded-full">
          <Text className={colors.heading}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center justify-center mx-4 mb-4 bg-blue-200 rounded-xl">
        <Image
          source={require('../assets/images/banner.png')}
          className="w-60 h-60"
        />
      </View>
      <View className="px-4 space-y-4">
        <View className="flex-row items-center justify-between">
          <Text className={`${colors.heading} font-bold text-xl`}>
            Recent Trips
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTrip')}
            className="p-2 px-3 bg-white border border-gray-200 rounded-full">
            <Text>Add trip</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 430}}>
          <FlatList
            data={trips}
            key={'_'}
            keyExtractor={item => '_' + item.id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            ListEmptyComponent={
              <EmptyList message="You haven't recorded any trips yet" />
            }
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            className="mx-1"
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('TripExpense', {...item})}
                  className="p-3 mb-3 bg-white shadow-sm rounded-2xl">
                  <View>
                    <Image source={randomImage()} className="w-32 h-32 mb-2" />
                    <Text className={`${colors.heading} font-bold`}>
                      {item.place}
                    </Text>
                    <Text className={`${colors.heading} font-bold text-xs`}>
                      {item.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
