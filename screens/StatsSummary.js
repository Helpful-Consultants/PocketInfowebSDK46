import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-elements';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Colors from '../constants/Colors';

// import statsGrab from '../assets/images/stats.jpg';

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

  //   const dealerToolsCountFormatted =
  //     (dealerToolsCount &&
  //       Intl &&
  //       new Intl.NumberFormat('en-GB', {
  //         style: 'decimal'
  //       }).format(dealerToolsCount)) ||
  //     '';
  //   console.log('dealerToolsCount', dealerToolsCount);

  //   const dealerToolsCountNumber =
  //     (dealerToolsCount && parseInt(dealerToolsCount, 10)) || 0;
  //   console.log('dealerToolsCountNumber', dealerToolsCountNumber);
  //   const dealerToolsCountFormatted =
  //     (dealerToolsCountNumber &&
  //       parseFloat(dealerToolsCountNumber).toLocaleString('en')) ||
  //     '';
  //   console.log('dealerToolsCountFormatted', dealerToolsCountFormatted);

  const dealerToolsCountFormatted =
    (dealerToolsCount &&
      dealerToolsCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) ||
    '';
  //   console.log('dealerToolsCountFormatted', dealerToolsCountFormatted);

  //   const loggedToolsFormatted =
  //     (statsObj &&
  //       statsObj.loggedTools &&
  //       Intl &&
  //       new Intl.NumberFormat('en-GB', {
  //         style: 'decimal'
  //       }).format(statsObj.loggedTools)) ||
  //     '';
  //   console.log('statsObj.loggedTools', statsObj.loggedTools);
  //   const loggedToolsNumber =
  //     (statsObj && statsObj.loggedTools && parseInt(statsObj.loggedTools, 10)) ||
  //     0;

  const loggedToolsFormatted =
    (statsObj.loggedTools &&
      statsObj.loggedTools.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) ||
    '';
  //   console.log('loggedToolsFormatted', loggedToolsFormatted);

  // console.log('start statsDummyData');
  // console.log(statsDummyData);
  //   console.log('statsData', items);
  //   console.log(logoChooser);
  //   console.log('statsDummyData', statsDummyData);
  return (
    <View style={styles.container}>
      {userDataCount > 0 && statsDataCount > 0 ? (
        <View>
          <View style={{ marginHorizontal: 30 }}>
            <Text style={styles.statsTitle}>App User</Text>
            <Text style={styles.statsText}>{userDataObj.userName}</Text>
            <Text style={styles.statsText}>{statsObj.userName}</Text>
          </View>
          <View>
            <Text style={styles.statsTitle}>Mandatory Tools</Text>
            <Text style={styles.statsText}>
              {`${dealerToolsCountFormatted} mandatory; ${loggedToolsFormatted} logged;`}
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
    fontFamily: 'the-sans',
    fontSize: RFPercentage(2.2),
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 0,
    fontWeight: '600',
    textAlign: 'center'
  },
  statsText: {
    color: Colors.vwgVeryDarkGray,
    fontFamily: 'the-sans',
    fontSize: RFPercentage(2),
    textAlign: 'center'
    // marginBottom: 5
  }
});
