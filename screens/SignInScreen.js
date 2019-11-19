import React, { useReducer } from 'react';
import { Platform, SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Icon, Image, Text } from 'react-native-elements';
import AppNameWithLogo from '../components/AppNameWithLogo';
import { getUserRequest } from '../actions/user';
// import validation from 'validate';

import Types from '../constants/Types';

const SignInScreen = props => {
  //   const [enteredEmail, setEnteredEmail] = useState('name@business.co.uk');
  //   const [enteredPin, setEnteredPin] = useState('123456');
  //   const [emailIsValid] = useState(false);
  //   const [pinIsValid] = useState(false);
  //   const emailChangeHandler = text => {};

  const { userIsSignedIn, userData } = props;
  //   console.log(props);
  console.log('userIsSignedIn', userIsSignedIn);
  console.log('userData', userData && userData);

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
  //   const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: { email: 'bobbie', pin: '123' },
    inputValidities: {
      email: false,
      pin: false
      //    email: enteredEmail ? true : false,
      //   pin: enteredPin ? true : false
    },
    formIsValid: false
  });
  //   const emailInputHandler = enteredEmail => {
  //     setEnteredEmail(enteredEmail);
  //   };
  //   const pinInputHandler = enteredPin => {
  //     setEnteredPin(enteredPin);
  //   };

  const inputChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: Types.FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      inputId: inputIdentifier
    });
  };
  const submitHandler = () => {
    // console.log(formState);
    if (!formState.formIsValid) {
      Alert.alert('Signing in problem', 'Please check the form', [
        { text: 'OK' }
      ]);
      return;
    }
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
      props.getUserRequest(signInData);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}
      >
        <AppNameWithLogo />
        <Text
          style={{
            margin: 20,
            textAlign: 'center'
          }}
        >
          Pocket Infoweb is only available to registered users of Tools Infoweb.
        </Text>
        <Text>{`Signed in ${userIsSignedIn}`}</Text>
        <Input
          value={formState.inputValues.email}
          textContentType='username'
          onChangeText={inputChangeHandler.bind(this, 'email')}
          style={{
            marginTop: 20
          }}
          label='Your corporate email address'
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
          errorStyle={{ color: 'red' }}
        />
        <Input
          value={formState.inputValues.pin}
          textContentType='password'
          onChangeText={inputChangeHandler.bind(this, 'pin')}
          style={{
            marginTop: 20
          }}
          label='Your Pocket Infoweb access PIN'
          placeholder='12345'
          leftIcon={{
            type: 'ionicon',
            name: Platform.OS === 'ios' ? 'ios-key' : 'md-key',
            color: 'gray'
          }}
          keyboardType='decimal-pad'
          returnKeyType='done'
          onSubmitEditing={text => console.log(text)}
          errorStyle={{ color: 'red' }}
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
              textAlign: 'center'
            }}
          >
            To activate Pocket Infoweb you will need to generate an access PIN
            for your userId.
          </Text>
          <Text
            style={{
              margin: 5,
              textAlign: 'center'
            }}
          >
            Log in to the Tools Infoweb website.
          </Text>
          <Text
            style={{
              margin: 5,
              textAlign: 'center'
            }}
          >
            Go to FAQ | About. Click on the Generate App PIN button.
          </Text>
        </View>

        <View>
          <Button
            title='Sign in'
            onPress={submitHandler}
            style={{
              margin: 40
            }}
            leftIcon={
              <Icon
                name={Platform.OS === 'ios' ? 'ios-log-in' : 'md-log-in'}
                type='ionicon'
                size={20}
              />
            }
          />

          <Button
            title='Forgotten sign-in details?'
            type='clear'
            onPress={() => {
              props.navigation.navigate('ForgottenPassword');
            }}
            style={{
              marginTop: 20
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

SignInScreen.navigationOptions = () => ({
  header: null
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
const mapStateToProps = state => {
  console.log('in SignInScreen mapStateToProps');
  //   console.log(state);
  //   const { friends } = state;
  console.log(state.user.userData && state.user.userData.length);
  console.log(state.user.userIsSignedIn && state.user.userIsSignedIn);
  console.log('SignInScreen mapStateToProps - end');

  //   console.log('end mapStateToProps');
  return {
    userIsSignedIn: state.user.userIsSignedIn && state.user.userIsSignedIn,
    userData: (state.user.userData && state.user.userData) || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserRequest: signInData => dispatch(getUserRequest(signInData))
  };
};

// export default SignInScreen;
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
