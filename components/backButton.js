import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {colors} from '../themes';
import {useNavigation} from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={navigation.goBack}
      className="my-6 rounded-full p-3 shadow-sm bg-white">
      <ChevronLeftIcon size="30" color={colors.button} />
    </TouchableOpacity>
  );
}
