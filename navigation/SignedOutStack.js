import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen, {
  screenOptions as SignInScreenOptions,
} from '../screens/SignInScreen';
import ForgottenPasswordScreen, {
  screenOptions as ForgottenPasswordScreenOptions,
} from '../screens/ForgottenPasswordScreen';

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
        options={SignInScreenOptions}
      />
      <Stack.Screen
        name={'ForgottenPassword'}
        component={ForgottenPasswordScreen}
      />
    </Stack.Navigator>
  );
};
