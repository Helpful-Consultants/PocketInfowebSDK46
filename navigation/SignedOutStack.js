import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import ForgottenPasswordScreen from '../screens/ForgottenPasswordScreen';

const defaultStackNavOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'white' },
};

const Stack = createStackNavigator();

export default SignedOutStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
      <Stack.Screen
        name={'SignIn'}
        component={SignInScreen}
        options={{ title: 'Sign in', headerShown: false }}
      />
      <Stack.Screen
        name={'ForgottenPassword'}
        component={ForgottenPasswordScreen}
        options={{ title: 'Need your PIN?', headerShown: true }}
      />
    </Stack.Navigator>
  );
};
