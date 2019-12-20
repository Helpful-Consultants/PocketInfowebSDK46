import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform, StyleSheet, ScrollView, View } from 'react-native';

import { Card, Image, Text } from 'react-native-elements';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Colors from '../constants/Colors';

// import statsGrab from '../assets/images/content/stats.jpg';

export default function StatsSummary(props) {
  //   console.log('props.statsItems');
  //   console.log(props.statsItems);
  //   console.log('props.statsItems');
  //   const items = props.items[0].brandVersions || [];
  //   console.log(props);
  const {
    statsObj,
    userDataObj,
    activeJobsCount,
    dealerToolsCount,
    effectiveness
  } = props;

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
              {`${dealerToolsCount} mandatory; ${statsObj.loggedTools} logged;`}
            </Text>
            <Text style={styles.statsText}>
              {`${effectiveness} effectiveness`}
            </Text>
          </View>
          <View>
            <Text style={styles.statsTitle}>Loan Tool Usage</Text>
            <Text style={styles.statsText}>
              {`${statsObj.ltpUse} used; ${statsObj.ltpCurrent} current`}
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
            <Text style={styles.statsText}>{`${activeJobsCount} active;`}</Text>
          </View>
          <View>
            <Text style={styles.statsTitle}>Service Measures</Text>
            <Text style={styles.statsText}>
              {`${statsObj.activeServiceMeasures} active; ${statsObj.completedServiceMeasures} completed`}
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
    paddingLeft: 10,
    paddingRight: 10
    // backgroundColor: '#00889d'
  },
  statsTitle: {
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2.2),
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 0,
    fontWeight: '600'
  },
  statsText: {
    color: Colors.vwgVeryDarkGray,
    fontSize: RFPercentage(2)
    // marginBottom: 5
  },
  appData: {
    color: Colors.vwgDarkGray,
    fontSize: RFPercentage(2),
    marginTop: 25
    // marginBottom: 15
  }
});
