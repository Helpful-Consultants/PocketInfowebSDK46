import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import AppNameWithLogo from '../components/AppNameWithLogo';
import Colors from '../constants/Colors';

export default Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AppNameWithLogo />
        <View style={styles.loadingMessage}>
          <Text style={styles.loadingText}>LOADING DATA</Text>
          <ActivityIndicator size='large' color={Colors.vwgDeepBlue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  loadingMessage: {
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  loadingText: {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2.5),

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 50
  }
});
