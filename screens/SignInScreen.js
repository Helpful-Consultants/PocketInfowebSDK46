import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, Input, Icon, Image, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';
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
  //   const [enteredEmail, setEnteredEmail] = useState('name@business.co.uk');
  //   const [enteredPin, setEnteredPin] = useState('123456');
  //   const [emailIsValid] = useState(false);
  //   const [pinIsValid] = useState(false);
  //   const emailChangeHandler = text => {};

  //   const { userIsSignedIn, userDataObj } = props;
  //   console.log(props);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userDataObj = useSelector(state => state.user.userData[0]);
  const userError = useSelector(state => state.user.error);
  const state = useSelector(state => state);

  console.log('in sign in, userIsSignedIn', userIsSignedIn ? 'Yes' : 'No');
  console.log('in sign in, userError', userError ? 'Yes' : 'No');
  //   console.log('in sign in, state', state);

  if (userIsSignedIn) {
    props.navigation.navigate('Main');
  }

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
    console.log(
      'in useEffect userIsSignedIn ',
      userIsSignedIn,
      'userError',
      userError
    );
    if (userIsSignedIn || userError) {
      console.log('useEffect applied');
      setIsLoading(false);
    }
  }, [userIsSignedIn, userError]);

  //   useEffect(() => {
  //     if (userError) {
  //       Alert.alert('Damn', userError, [{ text: 'ok' }]);
  //     }
  //   }, [userError]);

  //   console.log('userIsSignedIn, userIsSignedInis ', userIsSignedIn);
  //   console.log('userDataObj', userDataObj && userDataObj);

  //   const signInToServer = useCallback(() => dispatch(getUserRequest()), [
  //     userIsSignedIn
  //   ]);

  //   useEffect(userIsSignedIn => {
  //     console.log('user is logged in!!!!!', userIsSignedIn);
  //     if (userIsSignedIn) {
  //       console.log('user is indeed logged in!!!!!');
  //       props.navigation.navigate('Main');
  //     }
  //   }, []);
  //   const dispatch = useDispatch();

  //   const emailInputHandler = enteredEmail => {
  //     setEnteredEmail(enteredEmail);
  //   };
  //   const pinInputHandler = enteredPin => {
  //     setEnteredPin(enteredPin);
  //   };

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
    // console.log(formState);
    // if (!formState.formIsValid) {
    //   Alert.alert('Signing in problem', 'Please check the form', [
    //     { text: 'OK' }
    //   ]);
    //   return;
    // }
    // if (formState.formIsValid) {
    //   Alert.alert('Great', 'We can sign you in', [{ text: 'OK' }]);
    //   return;
    // }

    if (formState.formIsValid) {
      console.log(
        'dispatching get user',
        formState.inputValues.email,
        formState.inputValues.pin
      );
      const signInData = {
        email: formState.inputValues.email,
        pin: formState.inputValues.pin
      };
      //   const signInToServer = useCallback(
      //     signInData => dispatch(getUserRequest(signInData)),
      //     [userIsSignedIn]
      //   )
      setError(null);
      setIsLoading(true);

      console.log('calling dispatch');

      dispatch(getUserRequest(signInData));

      //   setIsLoading(false);
      //   signInToServer(signInData);
      //   props.getUserRequest(signInData);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <AppNameWithLogo />
        <Text
          style={{
            marginHorizontal: 30,
            marginVertical: 10,
            textAlign: 'center',
            fontSize: RFPercentage(2)
          }}
        >
          {userIsSignedIn
            ? `Signed in as ${userDataObj.userName}`
            : 'Pocket Infoweb is only available to registered users of Tools Infoweb.'}
        </Text>
        <KeyboardAvoidingView
          style={styles.container}
          behavior='padding'
          keyboardVerticalOffset={50}
        >
          <Input
            autoFocus
            value={formState.inputValues.email}
            onChangeText={inputChangeHandler.bind(this, 'email')}
            style={styles.inputLabeText}
            label='Your toolsinfoweb.co.uk email address'
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputStyle}
            labelStyle={styles.inputLabelText}
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
            label='Your Pocket Infoweb access PIN'
            labelStyle={styles.inputLabelText}
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputStyle}
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
                title='Trouble signing in?'
                type='clear'
                onPress={() => {
                  props.navigation.navigate('ForgottenPassword');
                }}
                buttonStyle={{
                  marginTop: 10
                }}
                titleStyle={{
                  color: Colors.vwgIosLink
                }}
              />
              <Text
                style={{
                  margin: 5,
                  textAlign: 'center',
                  fontSize: 12
                }}
              >
                To activate Pocket Infoweb you will need to generate an access
                PIN for your userId.
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

SignInScreen.navigationOptions = () => ({
  header: null
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  container: {
    backgroundColor: '#fff'
  },
  appName: {
    color: '#0096da',
    color: '#000',
    fontSize: 18,
    textTransform: 'uppercase'
  },
  announcementText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  signInButton: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.vwgIosLink
  },
  errorText: {
    marginTop: 10,
    marginBottom: 3,
    color: Colors.vwgWarmRed,
    fontSize: RFPercentage(2.3),
    lineHeight: 19,
    textAlign: 'center'
  },
  inputLabelText: {
    marginTop: 10,
    marginBottom: 3,
    color: Colors.vwgDarkSkyBlue,
    fontSize: RFPercentage(2.3),
    lineHeight: 19,
    textAlign: 'center'
  },
  inputStyle: {
    marginTop: 3,
    marginBottom: 3,
    color: Colors.vwgWarmMidBlue,
    fontSize: RFPercentage(2.2),
    lineHeight: 19,
    textAlign: 'left'
  },
  inputContainer: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  }
});
