import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

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
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const {
    statsObj,
    userDataObj,
    activeJobsCount,
    dealerToolsCount,
    effectiveness,
  } = props;

  console.log('StatSummary Props', props);

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
    (statsObj &&
      statsObj.loggedTools &&
      statsObj.loggedTools.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) ||
    '';
  //   console.log('loggedToolsFormatted', loggedToolsFormatted);

  // console.log('start statsDummyData');
  // console.log(statsDummyData);
  //   console.log('statsData', items);
  //   console.log(logoChooser);
  //   console.log('statsDummyData', statsDummyData);
  return (
    <View>
      {userDataObj && statsObj && userDataCount > 0 && statsDataCount > 0 ? (
        <View>
          <View style={{ marginHorizontal: 30 }}>
            <Text style={baseStyles.statsTitle}>App user</Text>
            <Text style={baseStyles.statsText}>{userDataObj.userName}</Text>
            <Text style={baseStyles.statsText}>{userDataObj.dealerName}</Text>
            <Text style={baseStyles.statsText}>{userDataObj.dealerId}</Text>
          </View>
          <View>
            <Text style={baseStyles.statsTitle}>Mandatory tools</Text>
            <Text style={baseStyles.statsText}>
              {`${dealerToolsCountFormatted} mandatory; ${loggedToolsFormatted} logged;`}
            </Text>
            <Text style={baseStyles.statsText}>
              {`Effectiveness: ${effectiveness} of tool locations recorded`}
            </Text>
          </View>
          <View>
            <Text style={baseStyles.statsTitle}>Loan tool usage</Text>
            <Text style={baseStyles.statsText}>
              {`${statsObj.ltpUse} used; ${statsObj.ltpCurrent} current`}
            </Text>
          </View>
          <View>
            <Text style={baseStyles.statsTitle}>Support tickets</Text>
            <Text style={baseStyles.statsText}>
              {`${statsObj.tiwTicketsRaised} raised; ${statsObj.tiwTicketsClosed} closed`}
            </Text>
          </View>
          <View>
            <Text style={baseStyles.statsTitle}>
              Active jobs with tools booked out
            </Text>
            <Text
              style={baseStyles.statsText}
            >{`${activeJobsCount} jobs`}</Text>
          </View>
          <View>
            <Text style={baseStyles.statsTitle}>Service measures</Text>
            <Text style={baseStyles.statsText}>
              {`${statsObj.activeServiceMeasures} active; ${statsObj.completedServiceMeasures} completed`}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}
