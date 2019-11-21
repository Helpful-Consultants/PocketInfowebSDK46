import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import AppNameWithLogo from '../components/AppNameWithLogo';
export default function Loading() {
  return (
    <SafeAreaView>
      <View style={{ flex: 1 }}>
        <AppNameWithLogo />
        <Text>Loading...</Text>
      </View>
    </SafeAreaView>
  );
}
