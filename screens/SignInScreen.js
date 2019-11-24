import React, { useCallback, useEffect, useReducer } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, Input, Icon, Image, Text } from 'react-native-elements';
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
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userDataObj = useSelector(state => state.user.userData[0]);

  console.log('in sign in, userIsSignedIn', userIsSignedIn ? 'Yes' : 'No');

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
      if (text.trim().length > 0) {
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

  const submitHandler = () => {
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
      //   );
      dispatch(getUserRequest(signInData));
      //   signInToServer(signInData);
      //   props.getUserRequest(signInData);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
      keyboardVerticalOffset={50}
    >
      <ScrollView style={{ alignItems: 'center', justifyContent: 'center ' }}>
        <AppNameWithLogo />
        <Text
          style={{
            margin: 10,
            textAlign: 'center',
            fontSize: 12
          }}
        >
          {userIsSignedIn
            ? `Signed in as ${userDataObj.userName}`
            : 'Pocket Infoweb is only available to registered users of Tools Infoweb.'}
        </Text>
        <Input
          autoFocus
          value={formState.inputValues.email}
          onChangeText={inputChangeHandler.bind(this, 'email')}
          style={styles.inputLabeText}
          label='Your toolsinfoweb.co.uk email address'
          labelStyle={styles.vwgWarmOrange}
          required
          email
          autoCapitalize='none'
          placeholder='e.g. janedoe@dtmg.co.uk'
          leftIcon={{
            type: 'ionicon',
            name: Platform.OS === 'ios' ? 'ios-mail' : 'md-mail',
            color: 'gray'
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
          required
          maxLength='6'
          placeholder='123456'
          leftIcon={{
            type: 'ionicon',
            name: Platform.OS === 'ios' ? 'ios-key' : 'md-key',
            color: 'gray'
          }}
          keyboardType='numeric'
          secureTextEntry
          returnKeyType='done'
          onSubmitEditing={text => console.log(text)}
          errorText='Use the 6 digit PIN you got from toolsinfoweb.co.uk'
          errorStyle={{ color: 'red' }}
        />
        <View>
          <Button
            title='Sign in'
            onPress={submitHandler}
            style={{
              marginVertical: 20,
              marginHorizontal: 40
            }}
            leftIcon={
              <Icon
                name={Platform.OS === 'ios' ? 'ios-log-in' : 'md-log-in'}
                type='ionicon'
                size={20}
              />
            }
          />
          <View
            style={{
              margin: 20,
              textAlign: 'center'
            }}
          >
            <Text
              style={{
                margin: 5,
                textAlign: 'center',
                fontSize: 12
              }}
            >
              To activate Pocket Infoweb you will need to generate an access PIN
              for your userId.
            </Text>
            <Text
              style={{
                margin: 3,
                textAlign: 'center',
                fontSize: 12
              }}
            >
              Sign in to the Tools Infoweb website.
            </Text>
            <Text
              style={{
                margin: 3,
                textAlign: 'center',
                fontSize: 12
              }}
            >
              Go to FAQ | About. Click on the Generate App PIN button.
            </Text>
          </View>
          <Button
            title='Trouble signing in?'
            type='clear'
            onPress={() => {
              props.navigation.navigate('ForgottenPassword');
            }}
            style={{
              marginTop: 10
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  inputLabelText: {
    marginBottom: 20,
    color: 'black',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
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
