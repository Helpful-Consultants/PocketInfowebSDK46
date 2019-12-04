import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dimensions,
  SafeAreaView,
  //   PixelRatio,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Image, Text } from 'react-native-elements';
// import AppNavigator from '../navigation/AppNavigator';
import Touchable from 'react-native-platform-touchable';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import AppLogoWithHeader from '../components/AppLogoWithHeader';
import AppNameWithLogo from '../components/AppNameWithLogo';
import Colors from '../constants/Colors';

import { signOutUserRequest } from '../actions/user';
import { emptyDealerToolsRequest } from '../actions/dealerTools';
import { emptyDealerWipsRequest } from '../actions/dealerWips';

const buttonColor = Colors.vwgDeepBlue;
const buttonTextColor = Colors.vwgWhite;
const disabledButtonTextColor = Colors.vwgDarkGay;
const actionTextColor = Colors.vwgDeepBlue;
const disabledButtonColor = Colors.vwgMidGray;

// var gridCellHeight = PixelRatio.getPixelSizeForLayoutSize(200);
// var gridCellWidth = PixelRatio.getPixelSizeForLayoutSize(200);

var { screenHeight, screenWidth } = Dimensions.get('window');
var gridHeight = screenHeight * 0.18;
var gridWidth = screenWidth * 0.3;
console.log(screenHeight, screenWidth);
var iconSize = RFPercentage(5);
var iconSizeSmall = RFPercentage(3.5);

export default HomeScreen = props => {
  // console.log(props);
  const dispatch = useDispatch();

  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userDataObj = useSelector(state => state.user.userData[0]);

  const requestSignOutHandler = useCallback(() => {
    console.log('in requestSignOutHandler');
    console.log('signingOut');
    dispatch(emptyDealerWipsRequest());
    dispatch(emptyDealerToolsRequest());
    // dispatch(signOutUserRequest()), [userIsSignedIn];
    dispatch(signOutUserRequest());
    props.navigation.navigate('AuthLoading');
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <AppNameWithLogo />
        <View style={styles.contentContainer}>
          <View>
            <View style={styles.gridRow}>
              <Touchable
                style={styles.gridCell}
                onPress={() => props.navigation.navigate('FindTools')}
              >
                <View>
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-build' : 'md-build'}
                    type='ionicon'
                    color={buttonTextColor}
                    size={iconSize}
                  />

                  <Text style={styles.gridCellText}>Find tools</Text>
                </View>
              </Touchable>
              <Touchable
                style={styles.gridCell}
                onPress={() => props.navigation.navigate('Jobs')}
              >
                <View>
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-today'}
                    type='ionicon'
                    color={buttonTextColor}
                    size={iconSize}
                  />

                  <Text style={styles.gridCellText}>Jobs</Text>
                </View>
              </Touchable>
            </View>
            <View style={styles.gridRow}>
              <Touchable
                style={styles.gridCell}
                onPress={() => props.navigation.navigate('ReturnTools')}
              >
                <View>
                  <Icon
                    name={
                      Platform.OS === 'ios'
                        ? 'ios-return-left'
                        : 'md-return-left'
                    }
                    type='ionicon'
                    color={buttonTextColor}
                    size={iconSize}
                  />

                  <Text style={styles.gridCellText}>Return tools</Text>
                  <Text style={styles.gridCellTextDisabledSmall}>
                    Coming soon..
                  </Text>
                </View>
              </Touchable>
              <Touchable
                style={styles.gridCell}
                onPress={() => props.navigation.navigate('Ltp')}
              >
                <View>
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-swap' : 'md-swap'}
                    type='ionicon'
                    color={buttonTextColor}
                    size={iconSize}
                  />

                  <Text style={styles.gridCellText}>LTP</Text>
                </View>
              </Touchable>
            </View>
            <View style={styles.gridRow}>
              <Touchable
                style={styles.gridCell}
                onPress={() => props.navigation.navigate('Products')}
              >
                <View>
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
                    type='ionicon'
                    color={buttonTextColor}
                    size={iconSize}
                  />
                  <Text style={styles.gridCellText}>Products</Text>
                </View>
              </Touchable>
              <Touchable
                style={styles.gridCell}
                onPress={() => props.navigation.navigate('News')}
              >
                <View>
                  <Icon
                    name={
                      Platform.OS === 'ios'
                        ? 'ios-information-circle-outline'
                        : 'md-information-circle'
                    }
                    type='ionicon'
                    color={buttonTextColor}
                    size={iconSize}
                  />

                  <Text style={styles.gridCellText}>News</Text>
                </View>
              </Touchable>
            </View>
          </View>
          <Touchable onPress={() => props.navigation.navigate('Odis')}>
            <View style={styles.odisRow}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-tv' : 'md-tv'}
                type='ionicon'
                size={iconSizeSmall}
                color={actionTextColor}
              />

              <Text style={styles.odisCellText}> See latest ODIS versions</Text>
            </View>
          </Touchable>
          <View
            style={{
              marginTop: 15
            }}
          >
            <Text style={styles.instructionsText}>
              {userIsSignedIn
                ? `Signed in as ${userDataObj.userName}`
                : 'Pocket Infoweb is only available to registered users of Tools Infoweb.'}
            </Text>
            <Text style={styles.instructionsTextSmall}>
              {userIsSignedIn ? `${userDataObj.dealerName}` : null}
            </Text>
          </View>
          <Touchable
            style={{ marginTop: 0 }}
            onPress={() => requestSignOutHandler()}
          >
            <View style={styles.odisRow}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                type='ionicon'
                size={20}
                color={Colors.vwgIosLink}
              />
              <Text style={styles.signOutCellText}> </Text>
              <Text style={styles.signOutCellText}>Sign out</Text>
            </View>
          </Touchable>

          {/* <View style={styles.gridRow}>
            <Touchable
              style={styles.doubleGridCell}
              onPress={() => props.navigation.navigate('Odis')}
            >
              <View>
                <Text style={styles.gridCellText}>Products</Text>
              </View>
            </Touchable>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

HomeScreen.navigationOptions = {
  header: null,
  tabBarVisible: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',

    backgroundColor: 'white',
    marginTop: 10
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white'
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

    // backgroundColor: 'red'
  },
  odisRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10

    // backgroundColor: 'red'
  },
  gridCell: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // width: PixelRatio.getPixelSizeForLayoutSize(50),
    height: RFPercentage(14),
    borderColor: Colors.vwgDeepBlue,
    borderStyle: 'solid',
    borderWidth: 1,
    color: Colors.vwgDeepBlue,
    backgroundColor: Colors.vwgDeepBlue,
    margin: 5,
    borderRadius: 5,
    // height: PixelRatio.getPixelSizeForLayoutSize(40),
    width: RFPercentage(25)
    // padding: 5
  },
  gridCellDisabled: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    borderColor: Colors.vwgLightGray,
    borderStyle: 'solid',
    borderWidth: 1,
    color: Colors.vwgLightGray,
    backgroundColor: Colors.vwgLightGray,
    margin: 5,
    borderRadius: 10,
    height: 70
    // padding: 5
  },
  doubleGridCell: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '93%',
    height: 40,
    borderColor: '#aaa',
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#333',

    backgroundColor: '#eee',
    margin: 5,
    padding: 5,
    borderRadius: 5
  },

  gridCellText: {
    color: 'white',
    // fontSize: 14,
    fontSize: RFPercentage(2.5),

    textAlign: 'center'
  },
  gridCellTextDisabledSmall: {
    color: Colors.vwgWhite,
    fontSize: 10,

    textAlign: 'center'
  },
  gridCellTextDisabled: {
    color: Colors.disabledButtonTextColor,
    fontSize: 14,

    textAlign: 'center'
  },
  odisCellText: {
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2.5),

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signOutCellText: {
    color: Colors.vwgIosLink,
    fontSize: RFPercentage(2.5),

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  announcementText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  instructionsText: {
    fontSize: RFPercentage(2.25),
    marginTop: 5,
    textAlign: 'center'
  },
  instructionsTextSmall: {
    fontSize: RFPercentage(2),
    marginTop: 5,
    textAlign: 'center'
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
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
});
