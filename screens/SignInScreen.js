import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
// import SafeAreaView from 'react-native-safe-area-view';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
// import baseStyles from '../constants/baseStyles';
import AppNameWithLogo from '../components/AppNameWithLogo';
import { checkUserCredentialsRequest } from '../actions/user';
import getBaseStyles from '../helpers/getBaseStyles';
// import validation from 'validate';

import Types from '../constants/Types';

const formReducer = (state, action) => {
  if (action.type === Types.FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputId]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputId]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

export default SignInScreen = (props) => {
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userIsSignedIn = useSelector((state) => state.user.userIsSignedIn);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const userError = useSelector((state) => state.user.error);
  const state = useSelector((state) => state);

  //   console.log('windowDim', windowDim && windowDim);
  //   console.log('in sign in, windowDim:', windowDim);
  const baseStyles = windowDim && getBaseStyles(windowDim);
  //   console.log('in sign in, baseStyles:', baseStyles);

  //   console.log('in sign in, userIsSignedIn', userIsSignedIn);
  //   console.log('in sign in, userIsValidated', userIsValidated);
  //   console.log('in sign in, userError', userError ? 'Yes' : 'No');
  //   console.log('in sign in, state', state);

  //   const { navigation } = props;
  const insets = useSafeArea();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: { email: '', pin: '' },
    inputValidities: {
      email: false,
      pin: false,
      //    email: enteredEmail ? true : false,
      //   pin: enteredPin ? true : false
    },
    formIsValid: false,
  });

  useEffect(() => {
    console.log(
      'in sign in, here a1, userIsValidated ',
      userIsValidated,
      'userError',
      userError
    );
    if (userIsValidated || userError) {
      console.log('useEffect applied', userIsValidated, 'userError', userError);
      setIsLoading(false);
    }
    if (userIsValidated) {
      console.log('userIsValidated: ', userIsValidated && userIsValidated);
      //   navigation.navigate('Main');
    }
  }, [userIsValidated, userError]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, text) => {
      let isValid = false;
      if (inputIdentifier === 'pin') {
        if (text.trim().length === 6) {
          isValid = true;
        }
      } else if (text.trim().length > 0) {
        isValid = true;
      }
      dispatchFormState({
        type: Types.FORM_INPUT_UPDATE,
        value: inputIdentifier === 'email' ? text.toLowerCase() : text,
        isValid: isValid,
        inputId: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const submitHandler = async () => {
    if (formState.formIsValid) {
      const signInData = {
        email: formState.inputValues.email,
        pin: formState.inputValues.pin,
      };
      setError(null);
      setIsLoading(true);
      //   console.log('dispatch(checkUserCredentialsRequest', signInData);
      dispatch(checkUserCredentialsRequest(signInData));
    }
  };

  return (
    <View style={{ paddingTop: insets.top }}>
      <ScrollView>
        <AppNameWithLogo />
        <Text style={baseStyles.textInstructions}>
          {userIsValidated
            ? `Signed in`
            : 'Pocket Infoweb is only available to registered users of Tools Infoweb'}
        </Text>
        <View>
          {userError ? (
            <Text style={baseStyles.textError}>{userError}</Text>
          ) : userIsSignedIn ? (
            <Text style={baseStyles.textSecurityCheck}>
              Please sign in again to renew your access
            </Text>
          ) : null}
        </View>
        <KeyboardAvoidingView
          style={baseStyles.containerSignIn}
          behavior='padding'
          keyboardVerticalOffset={50}
        >
          <Input
            autoFocus
            value={formState.inputValues.email}
            onChangeText={inputChangeHandler.bind(this, 'email')}
            label='User ID - your toolsinfoweb.co.uk email address'
            containerStyle={baseStyles.viewInputContainerSignIn}
            textInputStyle={baseStyles.textInputStyleSignIn}
            labelStyle={baseStyles.textInputLabelSignIn}
            required
            email
            autoCapitalize='none'
            placeholder='e.g. janedoe@dtauto.co.uk'
            leftIcon={{
              type: 'ionicon',
              name: Platform.OS === 'ios' ? 'mail' : 'mail',
              color: Colors.vwgDarkSkyBlue,
              paddingRight: 10,
              paddingTop: 4,
            }}
            keyboardType='email-address'
            autoCorrect={false}
            returnKeyType='next'
            onSubmitEditing={(text) => console.log(text)}
            errorStyle={{ color: Colors.errorText }}
            errorText='The email you sign in to toolsinfoweb.co.uk with'
          />

          <Input
            value={formState.inputValues.pin}
            onChangeText={inputChangeHandler.bind(this, 'pin')}
            label='Your Pocket Infoweb access PIN*'
            labelStyle={baseStyles.textInputLabelSignIn}
            containerStyle={baseStyles.viewInputContainerSignIn}
            textInputStyle={baseStyles.textInputStyleSignIn}
            required
            maxLength={6}
            placeholder='Six digits, e.g. 123456'
            leftIcon={{
              type: 'ionicon',
              name: Platform.OS === 'ios' ? 'key' : 'key',
              color: Colors.vwgDarkSkyBlue,
              paddingRight: 10,
            }}
            keyboardType='numeric'
            secureTextEntry
            returnKeyType='done'
            onSubmitEditing={(text) => console.log(text)}
            errorText='Use the 6 digit PIN you got from toolsinfoweb.co.uk'
            errorStyle={{ color: 'red' }}
          />
          <View>
            {isLoading ? (
              <ActivityIndicator size='small' color={Colors.vwgNiceBlue} />
            ) : (
              <Button
                title='Sign in'
                disabled={formState.formIsValid ? false : true}
                onPress={submitHandler}
                buttonStyle={baseStyles.buttonSignIn}
                titleStyle={baseStyles.buttonTextSignIn}
                icon={
                  <Ionicon
                    name={Platform.OS === 'ios' ? 'log-in' : 'log-in'}
                    color={Colors.vwgWhite}
                    size={20}
                    paddingTop={4}
                    paddingRight={10}
                  />
                }
              />
            )}
          </View>

          <View>
            <View>
              <Text style={baseStyles.textInstructions}>
                * To activate Pocket Infoweb you will need to generate an access
                PIN for your User ID.
              </Text>

              <Button
                title='Trouble signing in? Need a PIN?'
                type='clear'
                onPress={() => {
                  props.navigation.navigate('ForgottenPassword');
                }}
                buttonStyle={{
                  marginTop: 0,
                }}
                titleStyle={[{ ...baseStyles.textLink }]}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    title: 'Sign In',
    headerShown: false,
  };
};
