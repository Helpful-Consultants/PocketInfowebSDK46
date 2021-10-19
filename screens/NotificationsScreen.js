import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import ErrorDetails from '../components/ErrorDetails';
import { getCalibrationExpiryRequest } from '../actions/calibrationExpiry';
import { getServiceMeasuresRequest } from '../actions/serviceMeasures';
import { getLtpLoansRequest } from '../actions/ltpLoans';
import { getLtpLoanStatus } from '../helpers/ltpLoans';
import InlineIcon from '../components/InlineIcon';

const nowDateObj = new Date();

export default NotificationsScreen = (props) => {
  //   console.log('NotificationsScreen props', props);
  const { navigation } = props;
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const odisViewCount = useSelector((state) => state.odis.viewCount);
  const calibrationExpiryItems = useSelector(
    (state) => state.calibrationExpiry.calibrationExpiryItems
  );
  const calibrationExpiryCounts = useSelector(
    (state) => state.calibrationExpiry.calibrationExpiryCounts
  );
  const serviceMeasuresCountsObj = useSelector(
    (state) => state.serviceMeasures.serviceMeasuresCounts
  );
  const ltpLoansItems = useSelector((state) => state.ltpLoans.ltpLoansItems);
  const serviceMeasuresItems = useSelector(
    (state) => state.serviceMeasures.serviceMeasuresItems
  );
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const userRequestedDemoData = useSelector(
    (state) => state.user.requestedDemoData
  );
  const dealerId = userDataObj && userDataObj.dealerId;
  const userIntId = userDataObj && userDataObj.intId.toString();
  const [isLoadingAny, setIsLoadingAny] = useState(false);
  const [isOpenCalibrationExpiry, setIsOpenCalibrationExpiry] = useState(true);
  const [dataNameInPlay, setDataNameInPlay] = useState('');
  const [dataErrorAny, setDataErrorAny] = useState('');
  const [dataStatusCodeAny, setDataStatusCodeAny] = useState('');
  const [dataErrorUrlAny, setDataErrorUrlAny] = useState('');
  const [dataErrorSummary, setDataErrorSummary] = useState('');
  const isLoadingCalibrationExpiry = useSelector(
    (state) => state.calibrationExpiry.isLoading
  );
  const isLoadingLtpLoans = useSelector((state) => state.ltpLoans.isLoading);
  const dataErrorLtpLoans = useSelector((state) => state.ltpLoans.error);
  const dataStatusCodeLtpLoans = useSelector(
    (state) => state.ltpLoans.statusCode
  );
  const dataErrorUrlLtpLoans = useSelector(
    (state) => state.ltpLoans.dataErrorUrl
  );
  const isLoadingServiceMeasures = useSelector(
    (state) => state.serviceMeasures.isLoading
  );
  const dataErrorServiceMeasures = useSelector(
    (state) => state.serviceMeasures.error
  );
  const dataStatusCodeServiceMeasures = useSelector(
    (state) => state.serviceMeasures.statusCode
  );
  const dataErrorUrlServiceMeasures = useSelector(
    (state) => state.serviceMeasures.dataErrorUrl
  );
  const dataErrorCalibrationExpiry = useSelector(
    (state) => state.calibrationExpiry.error
  );
  const dataStatusCodeCalibrationExpiry = useSelector(
    (state) => state.calibrationExpiry.statusCode
  );
  const dataErrorUrlCalibrationExpiry = useSelector(
    (state) => state.calibrationExpiry.dataErrorUrl
  );
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);
  const baseStyles = windowDim && getBaseStyles(windowDim);

  const userApiFetchParamsObj = {
    dealerId: dealerId,
    intId: userIntId,
  };

  //   const { navigation } = props;
  const getItems = useCallback(async (userApiFetchParamsObj) => {
    // console.log(
    //   'in calibrationExpiry getItems userApiFetchParamsObj',
    //   userApiFetchParamsObj
    // );
    dispatch(getLtpLoansRequest(userApiFetchParamsObj)), [];
    dispatch(getServiceMeasuresRequest(userApiFetchParamsObj)), [];
    dispatch(getCalibrationExpiryRequest(userApiFetchParamsObj)), [];
  });

  const getItemsAsync = async () => {
    // console.log(
    //   'rendering Notifications screen, userApiFetchParamsObj:',
    //   userApiFetchParamsObj
    // );

    if (
      userApiFetchParamsObj &&
      userApiFetchParamsObj.intId &&
      userApiFetchParamsObj.dealerId
    ) {
      getItems(userApiFetchParamsObj);
    }
  };

  //   useEffect(() => {
  //     // runs only once
  //     // console.log('in notifications use effect');
  //     const getItemsAsync = async () => {
  //       setIsRefreshNeeded(false);
  //       getItems();
  //     };
  //     if (isRefreshNeeded === true) {
  //       getItemsAsync();
  //     }
  //   }, [isRefreshNeeded]);

  //   const didFocusSubscription = navigation.addListener('didFocus', () => {
  //     didFocusSubscription.remove();
  //     setIsRefreshNeeded(true);
  //   });

  const filterLtpLoansItems = (ltpLoansItems) => {
    let ltpLoansItemsFiltered = [];
    if (ltpLoansItems && ltpLoansItems.length > 0) {
      ltpLoansItemsFiltered = ltpLoansItems.filter(
        (item) =>
          item.startDate &&
          item.endDateDue &&
          getLtpLoanStatus(nowDateObj, item)
      );
    }
    // console.log('LtpLoansItemsFiltered', ltpLoansItemsFiltered);
    return ltpLoansItemsFiltered;
  };

  useEffect(() => {
    if (
      isLoadingCalibrationExpiry ||
      isLoadingLtpLoans ||
      isLoadingServiceMeasures
    ) {
      setIsLoadingAny(true);
    } else {
      setIsLoadingAny(false);
    }
  }, [isLoadingCalibrationExpiry, isLoadingLtpLoans, isLoadingServiceMeasures]);

  useEffect(() => {
    // runs only once
    if (dataErrorLtpLoans) {
      setDataErrorAny(dataErrorLtpLoans);
      setDataStatusCodeAny(dataStatusCodeLtpLoans);
      setDataErrorUrlAny(dataErrorUrlLtpLoans);
      setDataErrorSummary('Error syncing LTP Bookings');
      setDataNameInPlay('LTP loans');
    } else if (dataErrorServiceMeasures) {
      setDataErrorAny(dataErrorServiceMeasures);
      setDataStatusCodeAny(dataStatusCodeServiceMeasures);
      setDataErrorUrlAny(dataErrorUrlServiceMeasures);
      setDataErrorSummary('Error syncing Service Measures');
      setDataNameInPlay('Service Measures');
    } else if (dataErrorCalibrationExpiry) {
      setDataErrorAny(dataErrorCalibrationExpiry);
      setDataStatusCodeAny(dataStatusCodeCalibrationExpiry);
      setDataErrorUrlAny(dataErrorUrlCalibrationExpiry);
      setDataErrorSummary('Error syncing calibration expiry');
      setDataNameInPlay('calibration expiry');
    } else {
      setDataErrorAny('');
      setDataStatusCodeAny('');
      setDataErrorUrlAny('');
      setDataErrorSummary('');
      setDataNameInPlay('');
    }
  }, [
    dataErrorLtpLoans,
    dataErrorServiceMeasures,
    dataErrorCalibrationExpiry,
    ltpLoansItems,
    serviceMeasuresItems,
    calibrationExpiryItems,
    isLoadingLtpLoans,
    isLoadingServiceMeasures,
    isLoadingCalibrationExpiry,
  ]);

  useFocusEffect(
    useCallback(() => {
      //   dispatch(revalidateUserCredentials({ calledBy: 'NotificationsScreen' }));
      //   console.log('in Notifications focusEffect ');

      getItemsAsync();

      //   console.log(
      //     'in Notifications focusEffect, calling countCalibrationExpiryItems'
      //   );
    }, [])
  );

  //   if (!userIsValidated) {
  //     navigation && navigation.navigate && navigation.navigate('Auth');
  //   }
  //   const userDataPresent =
  //     (userDataObj && Object.keys(userDataObj).length > 0) || 0;

  //   if (userDataPresent === true) {
  //     // console.log('in notifications screen,userDataObj OK', userDataPresent);
  //   } else {
  //     // console.log('in notifications screen, no userDataObj');
  //     getItems();
  //   }

  //   console.log(
  //     'rendering Notifications screen',
  //     calibrationExpiryItemsToShow,
  //     'isLoadingCalibrationExpiry',
  //     isLoadingCalibrationExpiry,
  //     'dataErrorCalibrationExpiry',
  //     dataErrorCalibrationExpiry
  //   );
  //   console.log(
  //     'rendering Notifications screen',
  //     serviceMeasuresItemsToShow.length,
  //     'isLoadingServiceMeasures',
  //     isLoadingServiceMeasures,
  //     'dataErrorServiceMeasures',
  //     dataErrorServiceMeasures
  //   );

  //   console.log(
  //     'rendering Notifications screen',
  //     ltpLoansItemsToShow.length,
  //     'isLoadingLtpLoans',
  //     isLoadingLtpLoans,
  //     'dataErrorLtpLoansItems',
  //     dataErrorLtpLoans
  //   );

  //   console.log(
  //     'rendering notifications',
  //     calibrationExpiryCounts,
  //     'calibrationExpiryCounts.redCount',
  //     calibrationExpiryCounts.redCount,
  //     'calibrationExpiryCounts.amberCount',
  //     calibrationExpiryCounts.amberCount,
  //     'calibrationExpiryCounts.greenCount',
  //     calibrationExpiryCounts.greenCount
  //   );

  return (
    <ScrollView>
      <View style={baseStyles.viewPromptRibbon}>
        <Text style={baseStyles.textPromptRibbon}>
          Your Important Notifications
        </Text>
      </View>
      {userRequestedDemoData && userRequestedDemoData === true ? (
        <View style={baseStyles.viewDummyDataRibbon}>
          <Text style={baseStyles.textPromptRibbon}>
            Showing sample data - change in menu.
          </Text>
          <Ionicons name='arrow-up' size={20} color={Colors.vwgWhite} />
        </View>
      ) : null}

      {!odisViewCount ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RemindersTabs', { screen: 'ODIS' })
          }
        >
          <View style={baseStyles.viewSectionRibbon}>
            <Ionicons name='tv' size={20} color={Colors.vwgWarmOrange} />
            <Text style={baseStyles.textSectionRibbon}>
              {`  See the `}
              <Text
                style={{
                  ...baseStyles.textSectionRibbon,

                  fontFamily: 'the-sans-bold',
                }}
              >
                {`new ODIS versions  `}
              </Text>
            </Text>
            <Ionicons name='open-outline' size={20} />
          </View>
        </TouchableOpacity>
      ) : null}
      {!isLoadingLtpLoans ? (
        dataErrorLtpLoans ? (
          <ErrorDetails
            errorSummary={'Error syncing LTP Loans'}
            dataStatusCode={dataStatusCodeLtpLoans}
            errorHtml={dataErrorLtpLoans}
            dataErrorUrl={dataErrorUrlLtpLoans}
          />
        ) : (
          <View>
            {ltpLoansItems.length > 0 ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RemindersTabs', {
                    screen: 'All LTP Loans',
                  })
                }
              >
                <View style={baseStyles.viewSectionRibbon}>
                  <Ionicons
                    name='calendar'
                    size={20}
                    color={Colors.vwgWarmOrange}
                  />
                  <Text style={baseStyles.textSectionRibbon}>
                    {`  See your `}
                    <Text
                      style={{
                        ...baseStyles.textSectionRibbon,
                        fontFamily: 'the-sans-bold',
                      }}
                    >
                      {ltpLoansItems.length > 1
                        ? `${ltpLoansItems.length} LTP Loans `
                        : ltpLoansItems.length > 0
                        ? ` LTP Loan `
                        : `  No LTP Loans`}
                    </Text>
                  </Text>
                  <Ionicons name='open-outline' size={20} />
                </View>
              </TouchableOpacity>
            ) : (
              <View style={baseStyles.viewSectionRibbon}>
                <Ionicons name='calendar' size={20} color={Colors.vwgBlack} />
                <Text style={baseStyles.textSectionRibbon}>
                  {`   No LTP Loans`}
                </Text>
              </View>
            )}
          </View>
        )
      ) : null}
      {!isLoadingServiceMeasures ? (
        dataErrorServiceMeasures ? (
          <ErrorDetails
            errorSummary={'Error syncing Service Measures'}
            dataStatusCode={dataStatusCodeServiceMeasures}
            errorHtml={dataErrorServiceMeasures}
            dataErrorUrl={dataErrorUrlServiceMeasures}
          />
        ) : (
          <View>
            {serviceMeasuresItems.length > 0 ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RemindersTabs', {
                    screen: 'Service Measures',
                  })
                }
              >
                {serviceMeasuresCountsObj &&
                serviceMeasuresCountsObj.redCount &&
                serviceMeasuresCountsObj.redCount > 0 ? (
                  <View style={baseStyles.viewSectionRibbon}>
                    <Ionicons
                      name='checkbox'
                      size={20}
                      color={Colors.vwgBadgeSevereAlertColor}
                    />

                    <Text style={baseStyles.textSectionRibbon}>
                      {`  See your`}
                      <Text
                        style={{
                          ...baseStyles.textSectionRibbon,
                          fontFamily: 'the-sans-bold',
                        }}
                      >
                        {` urgent `}

                        {serviceMeasuresCountsObj &&
                        serviceMeasuresCountsObj.redCount &&
                        serviceMeasuresCountsObj.redCount > 1
                          ? `Service Measures  `
                          : `Service Measure  `}
                      </Text>
                    </Text>
                    <Ionicons name='open-outline' size={20} />
                  </View>
                ) : serviceMeasuresCountsObj &&
                  serviceMeasuresCountsObj.amberCount &&
                  serviceMeasuresCountsObj.amberCount > 0 ? (
                  <View style={baseStyles.viewSectionRibbon}>
                    <Ionicons
                      name='checkbox'
                      size={20}
                      color={Colors.vwgBadgeAlertColor}
                    />
                    <Text style={baseStyles.textSectionRibbon}>
                      {`  See your`}
                      <Text
                        style={{
                          ...baseStyles.textSectionRibbon,
                          fontFamily: 'the-sans-bold',
                        }}
                      >
                        {` expiring `}

                        {serviceMeasuresCountsObj &&
                        serviceMeasuresCountsObj.amberCount &&
                        serviceMeasuresCountsObj.amberCount > 1
                          ? `Service Measures  `
                          : `Service Measure `}
                      </Text>
                    </Text>
                    <Ionicons name='open-outline' size={20} />
                  </View>
                ) : (
                  <View style={baseStyles.viewSectionRibbon}>
                    <Ionicons
                      name='checkbox'
                      size={20}
                      color={Colors.vwgBadgeOKColor}
                    />
                    <Text style={baseStyles.textSectionRibbon}>
                      {serviceMeasuresItems.length > 1
                        ? `  See your open Service Measures  `
                        : `  See your open Service Measure `}
                    </Text>
                    <Ionicons name='open-outline' size={20} />
                  </View>
                )}
              </TouchableOpacity>
            ) : (
              <View style={baseStyles.viewSectionRibbon}>
                <Ionicons name='checkbox' size={20} color={Colors.vwgBlack} />
                <Text style={baseStyles.textSectionRibbon}>
                  {` No expiring Service Measures`}
                </Text>
              </View>
            )}
          </View>
        )
      ) : null}
      {!isLoadingCalibrationExpiry ? (
        dataErrorCalibrationExpiry ? (
          <ErrorDetails
            errorSummary={'Error syncing calibration expiry'}
            dataStatusCode={dataStatusCodeCalibrationExpiry}
            errorHtml={dataErrorCalibrationExpiry}
            dataErrorUrl={dataErrorUrlCalibrationExpiry}
          />
        ) : (
          <View>
            {calibrationExpiryCounts.totalCount > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setIsOpenCalibrationExpiry(!isOpenCalibrationExpiry);
                }}
              >
                <View style={baseStyles.viewSectionRibbon}>
                  <Ionicons
                    name='timer'
                    size={20}
                    color={
                      calibrationExpiryCounts.redCount &&
                      calibrationExpiryCounts.redCount > 0
                        ? Colors.vwgBadgeSevereAlertColor
                        : calibrationExpiryCounts.amberCount &&
                          calibrationExpiryCounts.amberCount > 0
                        ? Colors.vwgWarmOrange
                        : Colors.vwgBadgeOKColor
                    }
                  />
                  <Text style={baseStyles.textSectionRibbon}>
                    {calibrationExpiryCounts.totalCount > 1
                      ? ` Active Calibration Expiry Actions  `
                      : calibrationExpiryCounts.totalCount > 0
                      ? ` Active Calibration Expiry Action  `
                      : ' No Calibration Expiry Actions  '}
                  </Text>
                  <Ionicons
                    name={isOpenCalibrationExpiry ? 'caret-up' : 'caret-down'}
                    size={20}
                    color={Colors.vwgVeryDarkGray}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <View style={baseStyles.viewSectionRibbon}>
                <Ionicons name='timer' size={20} color={Colors.vwgBlack} />
                <Text style={baseStyles.textSectionRibbon}>
                  {calibrationExpiryCounts.totalCount > 1
                    ? ` ${calibrationExpiryCounts.totalCount} Calibration Expiry Actions `
                    : calibrationExpiryCounts.totalCount > 0
                    ? ` ${calibrationExpiryCounts.totalCount} Calibration Expiry Action  `
                    : ' No Calibration Expiry Actions  '}
                </Text>
              </View>
            )}
            {isOpenCalibrationExpiry ? (
              calibrationExpiryCounts.totalCount > 0 ? (
                <View>
                  {calibrationExpiryCounts.redCount > 0 ? (
                    <View
                      style={{
                        ...baseStyles.viewRowFlexCentreAligned,
                        marginHorizontal: 33,
                        marginTop: 10,
                      }}
                    >
                      <InlineIcon
                        itemType='font-awesome'
                        iconName={'thumbs-down'}
                        iconSize={RFPercentage(2.4)}
                        iconColor={
                          //item.status && item.status.toLowerCase() === 'c'
                          Colors.vwgBadgeSevereAlertColor
                        }
                      />
                      <Text style={baseStyles.textLeftAligned}>
                        {calibrationExpiryCounts.redCount === 1
                          ? `  ${calibrationExpiryCounts.redCount} item's calibration has expired.`
                          : `  ${calibrationExpiryCounts.redCount} items' calibrations have expired.`}
                      </Text>
                    </View>
                  ) : null}
                  {calibrationExpiryCounts.amberCount > 0 ? (
                    <View
                      style={{
                        ...baseStyles.viewRowFlexCentreAligned,
                        marginHorizontal: 33,
                        marginTop: 10,
                      }}
                    >
                      <InlineIcon
                        itemType='font-awesome'
                        iconName={'thumbs-up'}
                        iconSize={RFPercentage(2.4)}
                        iconColor={
                          //item.status && item.status.toLowerCase() === 'c'
                          Colors.vwgCoolOrange
                        }
                      />
                      <Text style={baseStyles.textLeftAligned}>
                        {calibrationExpiryCounts.amberCount === 1
                          ? `  ${calibrationExpiryCounts.amberCount} item's calibration expires within 30 days.`
                          : `  ${calibrationExpiryCounts.amberCount} items' calibrations expire within 30 days.`}
                      </Text>
                    </View>
                  ) : null}
                  {calibrationExpiryCounts.greenCount > 0 ? (
                    <View
                      style={{
                        ...baseStyles.viewRowFlexCentreAligned,
                        marginHorizontal: 33,
                        marginTop: 10,
                      }}
                    >
                      <InlineIcon
                        itemType='font-awesome'
                        iconName={'thumbs-up'}
                        iconSize={RFPercentage(2.4)}
                        iconColor={
                          //item.status && item.status.toLowerCase() === 'c'
                          Colors.vwgMintGreen
                        }
                      />
                      <Text style={baseStyles.textLeftAligned}>
                        {calibrationExpiryCounts.greenCount === 1
                          ? `  ${calibrationExpiryCounts.greenCount} item's calibration expires within 60 days.`
                          : `  ${calibrationExpiryCounts.greenCount} items' calibrations expire within 60 days.`}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : (
                <View style={baseStyles.viewDataList}>
                  <View style={baseStyles.textDataListItem}>
                    <Text style={baseStyles.textLeftAligned}>
                      No calibration expirations to show.
                    </Text>
                  </View>
                </View>
              )
            ) : null}
          </View>
        )
      ) : null}
    </ScrollView>
  );
};
