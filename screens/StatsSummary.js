import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '@rneui/themed';
import { useDimensions } from '../helpers/dimensions';
import getBaseStyles from '../helpers/getBaseStyles';

// import statsGrab from '../assets/images/stats.jpg';

export default function StatsSummary(props) {
  //   console.log('props.statsItems');
  //   console.log(props.statsItems);
  //   console.log('props.statsItems');
  //   const items = props.items[0].brandVersions || [];
  //   console.log(props);
  const windowDim = useDimensions();
  const baseStyles = useMemo(
    () => windowDim && getBaseStyles(windowDim),
    [windowDim]
  );
  const {
    statsObj,
    userDataObj,
    activeJobsCount,
    dealerToolsCount,
    effectiveness,
  } = props;

  //   console.log('StatSummary Props', props);

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
    'Calculating...';
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
    'Calculating...';
  //   console.log('loggedToolsFormatted', loggedToolsFormatted);

  // console.log('start statsDummyData');
  // console.log(statsDummyData);
  //   console.log('statsData', items);
  //   console.log(logoChooser);
  //   console.log('statsDummyData', statsDummyData);
  return (
    <ScrollView>
      {userDataObj && statsObj && userDataCount > 0 && statsDataCount > 0 ? (
        <View>
          <View style={{ marginHorizontal: 30 }}>
            <Text style={baseStyles.textStatsTitle}>App user</Text>
            <Text style={baseStyles.textStats}>
              {(userDataObj && userDataObj.userName) || null}
            </Text>
            <Text style={baseStyles.textStats}>
              {(userDataObj && userDataObj.dealerName) || null}
            </Text>
            <Text style={baseStyles.textStats}>
              {(userDataObj && userDataObj.dealerId) || null}
            </Text>
          </View>
          <View>
            <Text style={baseStyles.textStatsTitle}>Mandatory tools</Text>
            <Text style={baseStyles.textStats}>
              {`${dealerToolsCountFormatted} mandatory; ${loggedToolsFormatted} logged;`}
            </Text>
            <Text style={baseStyles.textStats}>
              {`Effectiveness: ${effectiveness} of tool locations recorded`}
            </Text>
          </View>
          <View>
            <Text style={baseStyles.textStatsTitle}>Loan tool usage</Text>
            <Text style={baseStyles.textStats}>
              {`${statsObj.ltpUse} used; ${statsObj.ltpCurrent} current`}
            </Text>
          </View>
          <View>
            <Text style={baseStyles.textStatsTitle}>Support tickets</Text>
            <Text style={baseStyles.textStats}>
              {`${statsObj.tiwTicketsRaised} raised; ${statsObj.tiwTicketsClosed} closed`}
            </Text>
          </View>
          <View>
            <Text style={baseStyles.textStatsTitle}>
              Active jobs with tools booked out
            </Text>
            <Text
              style={baseStyles.textStats}
            >{`${activeJobsCount} jobs`}</Text>
          </View>
          <View>
            <Text style={baseStyles.textStatsTitle}>Service measures</Text>
            <Text style={baseStyles.textStats}>
              {`${statsObj.activeServiceMeasures} active; ${statsObj.completedServiceMeasures} completed`}
            </Text>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}
