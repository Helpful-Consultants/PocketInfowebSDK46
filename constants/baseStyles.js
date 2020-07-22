import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from './Colors';

export default baseStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.vwgWhite,
  },
  inputContainer: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    fontFamily: 'the-sans',
    marginTop: 3,
    marginBottom: 3,
    color: Colors.vwgWarmMidBlue,
    fontSize: RFPercentage(2.2),
    lineHeight: 19,
    textAlign: 'left',
  },
  inputLabelText: {
    fontFamily: 'the-sans',
    marginTop: 10,
    marginBottom: 3,
    color: Colors.vwgDarkSkyBlue,
    fontSize: RFPercentage(2.3),
    lineHeight: 19,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2),
  },
  textBold: {
    fontFamily: 'the-sans-bold',
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2),
  },
  linkText: {
    fontFamily: 'the-sans',
    color: Colors.vwgLink,
    fontSize: RFPercentage(2),
  },
  linkTextBold: {
    fontFamily: 'the-sans-bold',
    color: Colors.vwgLink,
    fontSize: RFPercentage(2),
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.vwgWhite,
  },
});
