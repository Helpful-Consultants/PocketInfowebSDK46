import React, { Component } from 'react';
import {
  SafeAreaView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Image, Text } from 'react-native-elements';
// import AppNavigator from '../navigation/AppNavigator';
import Touchable from 'react-native-platform-touchable';
import AppLogoWithHeader from '../components/AppLogoWithHeader';
import Colors from '../constants/Colors';

class HomeScreen extends Component {
  render() {
    // console.log(this.props);
    const { userIsSignedIn, userData } = this.props;
    const buttonColor = Colors.vwgDeepBlue;
    const buttonTextColor = Colors.vwgWhite;
    const disabledButtonTextColor = Colors.vwgDarkGay;
    const actionTextColor = Colors.vwgDeepBlue;
    const disabledButtonColor = Colors.vwgMidGray;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <AppLogoWithHeader />

          <View style={styles.gridRow}>
            <Touchable
              style={styles.gridCell}
              onPress={() => this.props.navigation.navigate('Tools')}
            >
              <View>
                <Icon
                  name={Platform.OS === 'ios' ? 'ios-build' : 'md-build'}
                  type='ionicon'
                  color={buttonTextColor}
                />

                <Text style={styles.gridCellText}>Find tools</Text>
              </View>
            </Touchable>
            <Touchable
              style={styles.gridCell}
              onPress={() => this.props.navigation.navigate('Jobs')}
            >
              <View>
                <Icon
                  name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-today'}
                  type='ionicon'
                  color={buttonTextColor}
                />

                <Text style={styles.gridCellText}>Jobs</Text>
              </View>
            </Touchable>
          </View>
          <View style={styles.gridRow}>
            <Touchable
              disabled
              style={styles.gridCellDisabled}
              onPress={() => this.props.navigation.navigate('ReturnTools')}
            >
              <View>
                <Icon
                  name={
                    Platform.OS === 'ios' ? 'ios-return-left' : 'md-return-left'
                  }
                  type='ionicon'
                  color={disabledButtonTextColor}
                />

                <Text style={styles.gridCellTextDisabled}>Return tools</Text>
                <Text style={styles.gridCellTextDisabledSmall}>
                  Coming soon..
                </Text>
              </View>
            </Touchable>
            <Touchable
              style={styles.gridCell}
              onPress={() => this.props.navigation.navigate('Ltp')}
            >
              <View>
                <Icon
                  name={Platform.OS === 'ios' ? 'ios-swap' : 'md-swap'}
                  type='ionicon'
                  color={buttonTextColor}
                />

                <Text style={styles.gridCellText}>LTP</Text>
              </View>
            </Touchable>
          </View>
          <View style={styles.gridRow}>
            <Touchable
              style={styles.gridCell}
              onPress={() => this.props.navigation.navigate('Products')}
            >
              <View>
                <Icon
                  name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
                  type='ionicon'
                  color={buttonTextColor}
                />
                <Text style={styles.gridCellText}>Products</Text>
              </View>
            </Touchable>
            <Touchable
              style={styles.gridCell}
              onPress={() => this.props.navigation.navigate('News')}
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
                />

                <Text style={styles.gridCellText}>News</Text>
              </View>
            </Touchable>
          </View>
          <Touchable onPress={() => this.props.navigation.navigate('Odis')}>
            <View style={styles.odisRow}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-tv' : 'md-tv'}
                type='ionicon'
                size={20}
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
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontStyle: 'italic'
              }}
            >
              {userIsSignedIn
                ? `Signed in as ${userData.userName}`
                : 'Pocket Infoweb is only available to registered users of Tools Infoweb.'}
            </Text>
            <Text
              style={{
                marginTop: 5,
                textAlign: 'center',
                fontSize: 12,
                fontStyle: 'italic'
              }}
            >
              {userIsSignedIn ? `${userData.dealerName}` : null}
            </Text>
          </View>
          <Touchable
            style={{ marginTop: 0 }}
            onPress={() => this.props.navigation.navigate('SignIn')}
          >
            <View style={styles.odisRow}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                type='ionicon'
                size={20}
                color={actionTextColor}
              />
              <Text style={styles.odisCellText}> </Text>
              <Text style={styles.odisCellText}>Sign out</Text>
            </View>
          </Touchable>

          {/* <View style={styles.gridRow}>
            <Touchable
              style={styles.doubleGridCell}
              onPress={() => this.props.navigation.navigate('Odis')}
            >
              <View>
                <Text style={styles.gridCellText}>Products</Text>
              </View>
            </Touchable>
          </View> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
  tabBarVisible: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
    marginTop: 10
  },
  contentContainer: {
    paddingTop: 0
  },
  appName: {
    color: '#0096da',
    fontSize: 18
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
    width: '45%',
    borderColor: Colors.vwgDeepBlue,
    borderStyle: 'solid',
    borderWidth: 1,
    color: Colors.vwgDeepBlue,
    backgroundColor: Colors.vwgDeepBlue,
    margin: 5,
    borderRadius: 10,
    height: 70
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
    fontSize: 14,

    textAlign: 'center'
  },
  gridCellTextDisabledSmall: {
    color: Colors.disabledButtonTextColor,
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
    fontSize: 14,

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
    userData: (state.user.userData && state.user.userData[0]) || {}
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getUserRequest: signInData => dispatch(getUserRequest(signInData))
//   };
// };

// export default SignInScreen;
export default connect(mapStateToProps)(HomeScreen);
