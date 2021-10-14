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
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
// import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
import { getCalibrationExpiryRequest } from '../actions/calibrationExpiry';
import { getServiceMeasuresRequest } from '../actions/serviceMeasures';
import { getLtpLoansRequest } from '../actions/ltpLoans';
import { getLtpLoanStatus } from '../helpers/ltpLoanStatus';
import CalibrationExpiryList from './CalibrationExpiryList';
import ServiceMeasuresList from './ServiceMeasuresList';

const nowDateObj = new Date();

const getCalibrationExpiryCount = (calibrationExpiryItemsToShow) => {
  let retSum = 0;

  calibrationExpiryItemsToShow.map((item) => {
    if (!isNaN(parseInt(item.howMany))) {
      //   console.log('Not NaN', item.howMany);
      retSum = retSum + parseInt(item.howMany);
    } else {
      //   console.log('NaN', item.howMany);
    }
  });
  //   console.log('retSum', retSum);
  return retSum;
};

export default NotificationsScreen = (props) => {
  const { navigation } = props;
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const odisViewCount = useSelector((state) => state.odis.viewCount);
  const calibrationExpiryItems = useSelector(
    (state) => state.calibrationExpiry.calibrationExpiryItems
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
  const [isOpenCalibrationExpiry, setIsOpenCalibrationExpiry] = useState(false);
  const [isOpenLtpLoans, setIsOpenLtpLoans] = useState(false);
  const [isOpenServiceMeasures, setIsOpenServiceMeasures] = useState(false);
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
  //   console.log('userApiFetchParamsObj is set to ', userApiFetchParamsObj);

  //   const getUserData = useCallback(() => dispatch(getUserRequest()), [
  //     userApiFetchParamsObj
  //   ]);

  //   console.log('getAlertsData', getAlertsData);

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
    //   'rendering ServiceMeasures screen, userApiFetchParamsObj:',
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

  const filterCalibrationExpiryItems = (calibrationExpiryItems) => {
    let calibrationExpiryItemsFiltered = [];
    if (calibrationExpiryItems && calibrationExpiryItems.length > 0) {
      calibrationExpiryItemsFiltered = calibrationExpiryItems.filter(
        (item) =>
          (item.expiry && item.expiry.indexOf('1.') !== -1) ||
          item.expiry.indexOf('2.') !== -1 ||
          item.expiry.indexOf('3.') !== -1
      );
    }

    // console.log(
    //   'calibrationExpiryItemsFiltered',
    //   calibrationExpiryItemsFiltered
    // );
    return calibrationExpiryItemsFiltered;
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

  //   let calibrationExpiryItemsToShow = !isLoadingCalibrationExpiry ? filterCalibrationExpiryItems(calibrationExpiryItems) : [];
  let calibrationExpiryItemsToShow =
    !isLoadingCalibrationExpiry && !dataErrorCalibrationExpiry
      ? filterCalibrationExpiryItems(calibrationExpiryItems)
      : [];

  let ltpLoansItemsToShow =
    !isLoadingLtpLoans && !dataErrorLtpLoans
      ? filterLtpLoansItems(ltpLoansItems)
      : [];

  let calibrationExpiryCount = getCalibrationExpiryCount(
    calibrationExpiryItemsToShow
  );

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
                <View style={baseStyles.viewSectionRibbon}>
                  <Ionicons
                    name='checkbox'
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
                      {serviceMeasuresItems.length > 1
                        ? `${serviceMeasuresItems.length} Outstanding Service Measures `
                        : serviceMeasuresItems.length > 0
                        ? `Outstanding Service Measure `
                        : ' No Outstanding Service Measures'}
                    </Text>
                  </Text>
                  <Ionicons name='open-outline' size={20} />
                </View>
              </TouchableOpacity>
            ) : (
              <View style={baseStyles.viewSectionRibbon}>
                <Ionicons name='checkbox' size={20} color={Colors.vwgBlack} />
                <Text style={baseStyles.textSectionRibbon}>
                  {` No Outstanding Service Measures`}
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
            <TouchableOpacity
              onPress={() => {
                setIsOpenCalibrationExpiry(!isOpenCalibrationExpiry);
                setIsOpenLtpLoans(false);
                setIsOpenServiceMeasures(false);
              }}
            >
              <View style={baseStyles.viewSectionRibbon}>
                <Ionicons
                  name={isOpenCalibrationExpiry ? 'caret-up' : 'caret-down'}
                  size={20}
                  color={Colors.vwgVeryDarkGray}
                />

                <Text style={baseStyles.textSectionRibbon}> </Text>
                <Text style={baseStyles.textSectionRibbon}>
                  {calibrationExpiryCount > 1
                    ? ` ${calibrationExpiryCount} Calibration Expiry Actions`
                    : calibrationExpiryCount > 0
                    ? ` ${calibrationExpiryCount} Calibration Expiry Actions`
                    : ' No Calibration Expiry Actions'}
                </Text>
              </View>
            </TouchableOpacity>
            {isOpenCalibrationExpiry ? (
              calibrationExpiryItemsToShow.length > 0 ? (
                <CalibrationExpiryList items={calibrationExpiryItemsToShow} />
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
