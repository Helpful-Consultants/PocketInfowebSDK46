import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform, StyleSheet, ScrollView, View } from 'react-native';

import { Card, Image, Text } from 'react-native-elements';
import Constants from 'expo-constants';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Colors from '../constants/Colors';

// import statsGrab from '../assets/images/content/stats.jpg';

export default function StatsSummary(props) {
  //   console.log('props.statsItems');
  //   console.log(props.statsItems);
  //   console.log('props.statsItems');
  //   const items = props.items[0].brandVersions || [];
  //   console.log(props);
  const { statsObj, userDataObj } = props;

  const userDataCount =
    (userDataObj && Object.keys(userDataObj).length > 0) || 0;
  const statsDataCount = (statsObj && Object.keys(statsObj).length > 0) || 0;

  // console.log('start statsDummyData');
  // console.log(statsDummyData);
  //   console.log('statsData', items);
  //   console.log(logoChooser);
  //   console.log('statsDummyData', statsDummyData);
  return (
    <View style={styles.container}>
      {userDataCount > 0 && statsDataCount > 0 ? (
        <View>
          <View>
            <Text style={styles.statsTitle}>App User</Text>
            <Text style={styles.statsText}>{userDataObj.userName}</Text>
          </View>
          <View>
            <Text style={styles.statsTitle}>Dealer</Text>
            <Text style={styles.statsText}>{statsObj.userName}</Text>
          </View>
          <View>
            <Text style={styles.statsTitle}>Mandatory Tools</Text>
            <Text style={styles.statsText}>
              {`2,556 Mandatory (Coming soon); ${statsObj.loggedTools} logged`}
            </Text>
          </View>
          <View>
            <Text style={styles.statsTitle}>Loan Tool Usage</Text>
            <Text style={styles.statsText}>
              {`99 Usage; 99 Current bookings`}
            </Text>
          </View>
          <View>
            <Text style={styles.statsTitle}>Support Tickets</Text>
            <Text style={styles.statsText}>
              {`${statsObj.tiwTicketsRaised} raised; ${statsObj.tiwTicketsClosed} closed`}
            </Text>
          </View>
          <View>
            <Text style={styles.statsTitle}>Active Jobs</Text>
            <Text style={styles.statsText}>
              `XX active; X.XX% Effectiveness (Coming soon)`
            </Text>
          </View>
          <View>
            <Text style={styles.statsTitle}>Service Measures</Text>
            <Text style={styles.statsText}>
              {`${statsObj.completedServiceMeasures} active; ${statsObj.activeServiceMeasures} completed`}
            </Text>
          </View>

          <View style={styles.appData}>
            <Text style={styles.statsText}>
              {`${Constants.manifest.name} Version ${Constants.manifest.version}`}
            </Text>
            <Text style={styles.statsText}>
              {`Builds ${Constants.nativeAppVersion} - ${Constants.nativeBuildVersion}`}
            </Text>
            <Text style={styles.statsText}>
              {`${
                Platform.OS === 'ios'
                  ? Constants.platform.ios.buildNumber
                    ? Constants.platform.ios.buildNumber
                    : ''
                  : Constants.platform.android.versionCode
                  ? Constants.platform.android.versionCode
                  : ''
              }`}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30
    // backgroundColor: '#00889d'
  },
  statsTitle: {
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2.2),
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 5,
    fontWeight: '600'
  },
  statsRow: {
    flexDirection: 'row',
    padding: 5,
    borderColor: '#000',
    fontSize: 12
  },
  statsText: {
    color: Colors.vwgVeryDarkGray,
    fontSize: RFPercentage(2),
    marginBottom: 5
  },
  appData: {
    color: Colors.vwgDarkGray,
    fontSize: RFPercentage(2),
    marginTop: 25
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12
  },
  optionIconContainer: {
    marginRight: 9
  },
  option: {
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 20
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
    color: '#000'
  },
  summaryText: {
    fontSize: 12,
    marginTop: 5,
    color: '#000',
    marginRight: 20
  }
});
