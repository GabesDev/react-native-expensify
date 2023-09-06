import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ScreenWrapper({children}) {
  return <SafeAreaView>{children}</SafeAreaView >;
}
