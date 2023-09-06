import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../themes';
import BackButton from '../components/backButton';
import {useNavigation} from '@react-navigation/native';
import {categories} from '../constants';
import Snackbar from 'react-native-snackbar';
import {addDoc} from 'firebase/firestore';
import {expensesRef} from '../config/firebase';
import Loading from '../components/loading';

export default function AddExpenseScreen(props) {
  let {id} = props.route.params;
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleAddExpense = async () => {
    if (title && amount && category) {
      setLoading(true);
      let doc = await addDoc(expensesRef, {
        title,
        amount,
        category,
        tripId: id,
      });
      setLoading(false);

      if (doc && doc.id) navigation.goBack();
    } else {
      Snackbar.show({
        text: 'Please, fill all the fields',
        backgroundColor: 'red',
      });
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex justify-between h-full mx-4">
          <View>
            <View className="relative mt-5">
              <View className="absolute top-0 left-0">
                <BackButton />
              </View>
              <Text
                className={`${colors.heading} text-xl font-bold text-center`}>
                Add Expense
              </Text>
            </View>
            <View className="flex-row justify-center my-3 mt-5">
              <Image
                source={require('../assets/images/expenseBanner.png')}
                className="h-72 w-72"
              />
            </View>
            <View className="mx-2 space-y-2">
              <Text className={`${colors.heading} text-lg font-bold`}>
                For what?
              </Text>
              <TextInput
                value={title}
                onChangeText={x => setTitle(x)}
                className="p-4 mb-3 bg-white rounded-full"
              />
              <Text className={`${colors.heading} text-lg font-bold`}>
                How much?
              </Text>
              <TextInput
                value={amount}
                onChangeText={x => setAmount(x)}
                className="p-4 mb-3 bg-white rounded-full"
              />
            </View>
            <View className="mx-2 space-x-2">
              <Text className="text-lg font-bold">Category</Text>
              <View className="flex-row flex-wrap items-center">
                {categories.map(cat => {
                  let bgColor =
                    cat.value == category ? 'bg-green-200' : 'bg-white';
                  return (
                    <TouchableOpacity
                      key={cat.value}
                      onPress={() => setCategory(cat.value)}
                      className={`rounded-full px-4 p-3 mb-2 mr-2 ${bgColor}`}>
                      <Text>{cat.title}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          <View>
            {loading ? (
              <Loading />
            ) : (
              <TouchableOpacity
                onPress={handleAddExpense}
                style={{backgroundColor: colors.button}}
                className="p-3 my-6 rounded-full shadow-sm">
                <Text className="text-lg font-bold text-center text-white">
                  Add Expense
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
