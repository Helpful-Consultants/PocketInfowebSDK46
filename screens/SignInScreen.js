import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
// import SafeAreaView from 'react-native-safe-area-view';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Icon, Image, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';
import baseStyles from '../constants/baseStyles';
import AppNameWithLogo from '../components/AppNameWithLogo';
import { getUserRequest } from '../actions/user';
// import validation from 'validate';

import Types from '../constants/Types';

const formReducer = (state, action) => {
  if (action.type === Types.FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputId]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputId]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities
    };
  }
  return state;
};

export default SignInScreen = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userDataObj = useSelector(state => state.user.userData[0]);
  const userError = useSelector(state => state.user.error);
  const state = useSelector(state => state);

  //   console.log('in sign in, userIsSignedIn', userIsSignedIn ? 'Yes' : 'No');
  //   console.log('in sign in, userError', userError ? 'Yes' : 'No');
  //   console.log('in sign in, state', state);

  const { navigation } = props;
  const insets = useSafeArea();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: { email: '', pin: '' },
    inputValidities: {
      email: false,
      pin: false
      //    email: enteredEmail ? true : false,
      //   pin: enteredPin ? true : false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (userIsSignedIn || userError) {
      //   console.log('useEffect applied');
      setIsLoading(false);
    }
    if (userIsSignedIn) {
      console.log('userIsSignedIn so navigating to main');
      navigation.navigate('Main');
    }
  }, [userIsSignedIn, userError]);

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
        inputId: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const submitHandler = async () => {
    if (formState.formIsValid) {
      const signInData = {
        email: formState.inputValues.email,
        pin: formState.inputValues.pin
      };
      setError(null);
      setIsLoading(true);
      dispatch(getUserRequest(signInData));
    }
  };

  return (
    <View style={{ paddingTop: insets.top }}>
      <ScrollView>
        <AppNameWithLogo />
        <Text style={styles.instructions}>
          {userIsSignedIn
            ? `Signed in as ${userDataObj.userName}`
            : 'Pocket Infoweb is only available to registered users of Tools Infoweb'}
        </Text>
        <KeyboardAvoidingView
          style={baseStyles.container}
          behavior='padding'
          keyboardVerticalOffset={50}
        >
          <Input
            autoFocus
            value={formState.inputValues.email}
            onChangeText={inputChangeHandler.bind(this, 'email')}
            style={baseStyles.inputLabelText}
            label='User ID - your toolsinfoweb.co.uk email address'
            containerStyle={baseStyles.inputContainer}
            inputStyle={baseStyles.inputStyle}
            labelStyle={baseStyles.inputLabelText}
            required
            email
            autoCapitalize='none'
            placeholder='e.g. janedoe@dtmg.co.uk'
            leftIcon={{
              type: 'ionicon',
              name: Platform.OS === 'ios' ? 'ios-mail' : 'md-mail',
              color: Colors.vwgDarkSkyBlue,
              paddingRight: 10,

              paddingTop: 4
            }}
            keyboardType='email-address'
            autoCorrect={false}
            returnKeyType='next'
            onSubmitEditing={text => console.log(text)}
            errorStyle={{ color: Colors.errorText }}
            errorText='The email you sign in to toolsinfoweb.co.uk with'
          />
          <Input
            value={formState.inputValues.pin}
            onChangeText={inputChangeHandler.bind(this, 'pin')}
            style={{
              marginVertical: 20,
              marginHorizontal: 40
            }}
            label='Your Pocket Infoweb access PIN*'
            labelStyle={baseStyles.inputLabelText}
            containerStyle={baseStyles.inputContainer}
            inputStyle={baseStyles.inputStyle}
            required
            maxLength={6}
            placeholder='123456 (six digits)'
            leftIcon={{
              type: 'ionicon',
              name: Platform.OS === 'ios' ? 'ios-key' : 'md-key',
              color: Colors.vwgDarkSkyBlue,
              paddingRight: 10
            }}
            keyboardType='numeric'
            secureTextEntry
            returnKeyType='done'
            onSubmitEditing={text => console.log(text)}
            errorText='Use the 6 digit PIN you got from toolsinfoweb.co.uk'
            errorStyle={{ color: 'red' }}
          />
          <View>
            {userError ? (
              <Text style={styles.errorText}>{userError}</Text>
            ) : null}
          </View>
          <View>
            {isLoading ? (
              <ActivityIndicator size='small' color={Colors.vwgNiceBlue} />
            ) : (
              <Button
                title='Sign in'
                disabled={formState.formIsValid ? false : true}
                onPress={submitHandler}
                buttonStyle={styles.signInButton}
                titleStyle={[
                  { ...baseStyles.text },
                  { fontSize: RFPercentage(2.4), color: Colors.vwgWhite }
                ]}
                icon={
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-log-in' : 'md-log-in'}
                    type='ionicon'
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
            <View
              style={{
                margin: 20,
                textAlign: 'center'
              }}
            >
              <Button
                title='Trouble signing in? Need a PIN?'
                type='clear'
                onPress={() => {
                  props.navigation.navigate('ForgottenPassword');
                }}
                buttonStyle={{
                  marginTop: 10
                }}
                titleStyle={[
                  { ...baseStyles.linkText },
                  { fontSize: RFPercentage(2.6) }
                ]}
              />
              <Text style={styles.instructions}>
                * To activate Pocket Infoweb you will need to generate an access
                PIN for your User ID.
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

SignInScreen.navigationOptions = () => ({
  headerShown: false
});

const styles = StyleSheet.create({
  instructions: {
    ...baseStyles.text,
    marginHorizontal: 30,
    marginVertical: 10,
    textAlign: 'center',
    color: Colors.vwgVeryDarkGray
  },
  signInButton: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.vwgIosLink
  },
  errorText: {
    ...baseStyles.text,
    marginTop: 10,
    marginBottom: 3,
    color: Colors.vwgWarmRed,
    fontSize: RFPercentage(2.3),
    lineHeight: 19,
    textAlign: 'center'
  }
});
