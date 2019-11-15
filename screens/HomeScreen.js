import React, { Component } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Icon, Image, Text } from 'react-native-elements';
// import AppNavigator from '../navigation/AppNavigator';
import Touchable from 'react-native-platform-touchable';
import AppNameWithLogo from '../components/AppNameWithLogo';

export default class HomeScreen extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {/* <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View> */}

          <AppNameWithLogo />
          {/* <View style={styles.getStartedContainer}>
            <Text style={styles.announcementText}>QUICK LINKS</Text>
          </View> */}

          <View style={styles.gridRow}>
            <Touchable
              style={styles.gridCell}
              onPress={() => this.props.navigation.navigate('FindTools')}
            >
              <View>
                <Icon
                  name={Platform.OS === 'ios' ? 'ios-build' : 'md-build'}
                  type='ionicon'
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
                />

                <Text style={styles.gridCellText}>My jobs</Text>
              </View>
            </Touchable>
          </View>
          <View style={styles.gridRow}>
            <Touchable
              style={styles.gridCell}
              onPress={() => this.props.navigation.navigate('ReturnTools')}
            >
              <View>
                <Icon
                  name={
                    Platform.OS === 'ios' ? 'ios-return-left' : 'md-return-left'
                  }
                  type='ionicon'
                />

                <Text style={styles.gridCellText}>Return tools</Text>
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
              />
              <Text style={styles.odisCellText}> </Text>
              <Text style={styles.odisCellText}>See latest ODIS versions</Text>
            </View>
          </Touchable>
          <Touchable
            style={{ marginTop: 60 }}
            onPress={() => this.props.navigation.navigate('SignIn')}
          >
            <View style={styles.odisRow}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                type='ionicon'
                size={20}
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
      </View>
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
    backgroundColor: '#fff'
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
    marginTop: 20

    // backgroundColor: 'red'
  },
  gridCell: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    borderColor: '#aaa',
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#333',
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    height: 80
    // padding: 5
  },
  doubleGridCell: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '93%',
    height: 50,
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
    color: '#333',
    fontSize: 14,

    textAlign: 'center'
  },
  odisCellText: {
    color: '#333',
    fontSize: 12,

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
