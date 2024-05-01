import { createStackNavigator } from '@react-navigation/stack';

import ForgottenPasswordScreen from '../screens/ForgottenPasswordScreen';
import SignInScreen from '../screens/SignInScreen';

const defaultStackNavOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'white' },
};

const Stack = createStackNavigator();

const SignedOutStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackNavOptions}>
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign in', headerShown: false }} />
      <Stack.Screen
        name="ForgottenPassword"
        component={ForgottenPasswordScreen}
        options={{ title: 'Need your PIN?', headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default SignedOutStack;
