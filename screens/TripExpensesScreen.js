import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import EmptyList from '../components/emptyList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import BackButton from '../components/backButton';
import ExpenseCard from '../components/expenseCard';
import {colors} from '../themes';
import {getDocs, query, where} from 'firebase/firestore';
import {expensesRef} from '../config/firebase';

export default function TripExpensesScreen(props) {
  const {id, place, country} = props.route.params;
  const navigation = useNavigation();
  const [expense, setExpense] = useState([]);
  const isFocused = useIsFocused();

  const fetchExpenses = async () => {
    const q = query(expensesRef, where('tripId', '==', id));
    const querySnapshot = await getDocs(q);
    let data = [];

    querySnapshot.forEach(doc => {
      data.push({...doc.data(), id: doc.id});
    });
    setExpense(data);
  };

  useEffect(() => {
    if (isFocused) fetchExpenses();
  }, [isFocused]);

  return (
    <ScreenWrapper className="flex-1">
      <View className="px-4">
        <View className="relative mt-5">
          <View className="absolute left-0 z-10 top-2">
            <BackButton />
          </View>
          <View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              {place}
            </Text>
            <Text className={`${colors.heading} text-xs text-center`}>
              {country}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-center mb-4 rounded-xl">
          <Image
            source={require('../assets/images/7.png')}
            className="w-80 h-80"
          />
        </View>
        <View className="space-y-3 ">
          <View className="flex-row items-center justify-between">
            <Text className={`${colors.heading} font-bold text-xl`}>
              Expenses
            </Text>
            <TouchableOpacity
              className="p-2 px-3 bg-white border border-gray-200 rounded-full"
              onPress={() =>
                navigation.navigate('AddExpense', {id, place, country})
              }>
              <Text className={colors.heading}>Add Expense</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 430}}>
            <FlatList
              data={expense}
              ListEmptyComponent={
                <EmptyList message={"You haven't recorded any expenses yet"} />
              }
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              className="mx-1"
              renderItem={({item}) => {
                return <ExpenseCard item={item} />;
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
