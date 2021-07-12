import React, { useCallback, useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  SectionList,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
// import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import ErrorDetails from '../components/ErrorDetails';
// import HeaderButton from '../components/HeaderButton';
// import BadgedTabBarText from '../components/BadgedTabBarText';
import { revalidateUserCredentials } from '../actions/user';
import { getCalibrationExpiryRequest } from '../actions/calibrationExpiry';
import { getServiceMeasuresRequest } from '../actions/serviceMeasures';
import { getLtpLoansRequest } from '../actions/ltpLoans';
import CalibrationExpiryList from './CalibrationExpiryList';
import calibrationExpiryDummyData from '../dummyData/calibrationExpiryDummyData.js';
import LtpLoansList from './LtpLoansList';
import ltpLoansDummyData from '../dummyData/ltpLoansDummyData.js';
import ServiceMeasuresList from './ServiceMeasuresList';
import serviceMeasuresDummyData from '../dummyData/serviceMeasuresDummyData.js';

const now = moment();

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
  const windowDim = useWindowDimensions();
  const dispatch = useDispatch();
  const calibrationExpiryItems = useSelector(
    (state) => state.calibrationExpiry.calibrationExpiryItems
  );
  const ltpLoansItems = useSelector((state) => state.ltpLoans.ltpLoansItems);
  const serviceMeasuresItems = useSelector(
    (state) => state.serviceMeasures.serviceMeasuresItems
  );
  const userIsValidated = useSelector((state) => state.user.userIsValidated);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const userRequestedDemo = useSelector((state) => state.user.requestedDemo);
  const dealerId = userDataObj && userDataObj.dealerId;
  const userIntId = userDataObj && userDataObj.intId.toString();
  const [isLoadingAny, setIsLoadingAny] = useState(false);
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

  const getLtpLoanStatus = (item) => {
    // console.log(
    //   'tool',
    //   item.toolNr,
    //   'now',
    //   now,
    //   'startDate',
    //   item.startDate,
    //   'expiryDate',
    //   item.endDateDue
    // );
    let theFromDate = null;
    let theToDate = null;
    let ageOfExpiry = 0;
    let ageOfStart = 0;

    if (item.collectedDate && item.collectionNumber) {
      return false;
    }

    if (item.endDateDue && item.endDateDue.length > 0) {
      theToDate = moment(item.endDateDue, 'DD/MM/YYYY HH:mm:ss');
      ageOfExpiry = (now && now.diff(moment(theToDate), 'days')) || 0;
    }
    // console.log('ageOfExpiry', ageOfExpiry);

    if (ageOfExpiry >= -2) {
      return false;
    } else {
      if (item.startDate && item.startDate.length > 0) {
        theFromDate = moment(item.startDate, 'DD/MM/YYYY HH:mm:ss');
        ageOfStart = (now && now.diff(moment(theFromDate), 'days')) || 0;
        // console.log('ageOfStart', ageOfStart, moment(theFromDate));
      }

      if (ageOfStart >= -3) {
        return true;
      }
    }
    return false;
  };

  const getServiceMeasureStatus = (item) => {
    // console.log(
    //   'menuText',
    //   item.menuText,
    //   'now',
    //   now,
    //   'startDate',
    //   item.startDate,
    //   'expiryDate',
    //   item.expiryDate
    // );
    let theFromDate = null;
    let theToDate = null;
    let ageOfExpiry = 0;
    let ageOfStart = 0;

    if (item.expiryDate && item.expiryDate.length > 0) {
      theToDate = moment(item.expiryDate, 'DD/MM/YYYY HH:mm:ss');
      ageOfExpiry = (now && now.diff(moment(theToDate), 'days')) || 0;
    }
    // console.log('ageOfExpiry', ageOfExpiry);

    if (ageOfExpiry >= 0) {
      return false;
    } else {
      if (item.startDate && item.startDate.length > 0) {
        theFromDate = moment(item.startDate, 'DD/MM/YYYY HH:mm:ss');
        ageOfStart = (now && now.diff(moment(theFromDate), 'days')) || 0;
        // console.log('ageOfStart', ageOfStart, moment(theFromDate));
      }

      if (ageOfStart >= 0) {
        return true;
      }
    }
    return false;
  };

  const filterServiceMeasuresItems = (serviceMeasuresItems) => {
    let serviceMeasuresItemsFiltered = [];
    if (serviceMeasuresItems && serviceMeasuresItems.length > 0) {
      serviceMeasuresItemsFiltered = serviceMeasuresItems.filter(
        (item) =>
          item.startDate && item.expiryDate && getServiceMeasureStatus(item)
      );
    }
    // console.log('serviceMeasuresItemsFiltered', serviceMeasuresItemsFiltered);
    return serviceMeasuresItemsFiltered;
  };

  const filterLtpLoansItems = (ltpLoansItems) => {
    let ltpLoansItemsFiltered = [];
    if (ltpLoansItems && ltpLoansItems.length > 0) {
      ltpLoansItemsFiltered = ltpLoansItems.filter(
        (item) => item.startDate && item.endDateDue && getLtpLoanStatus(item)
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
      console.log('in Notifications focusEffect ');
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
      ? userRequestedDemo
        ? filterCalibrationExpiryItems(calibrationExpiryDummyData)
        : filterCalibrationExpiryItems(calibrationExpiryItems)
      : [];

  let ltpLoansItemsToShow =
    !isLoadingLtpLoans && !dataErrorLtpLoans
      ? userRequestedDemo
        ? filterLtpLoansItems(ltpLoansDummyData)
        : filterLtpLoansItems(ltpLoansItems)
      : [];

  let serviceMeasuresItemsToShow =
    !isLoadingServiceMeasures && !dataErrorServiceMeasures
      ? userRequestedDemo
        ? filterServiceMeasuresItems(serviceMeasuresDummyData)
        : filterServiceMeasuresItems(serviceMeasuresItems)
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
      {userRequestedDemo && userRequestedDemo === true ? (
        <View style={baseStyles.viewPromptRibbonNoneFound}>
          <Text style={baseStyles.textPromptRibbon}>
            Showing sample data - change in menu.
          </Text>
        </View>
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
            <View style={baseStyles.viewSectionRibbon}>
              <Text style={baseStyles.textSectionRibbon}>
                {calibrationExpiryCount > 1
                  ? `${calibrationExpiryCount} Calibration Expiry Actions`
                  : calibrationExpiryCount > 0
                  ? `${calibrationExpiryCount} Calibration Expiry Actions`
                  : 'No Calibration Expiry Actions'}
              </Text>
            </View>
            {calibrationExpiryItemsToShow.length > 0 ? (
              <CalibrationExpiryList items={calibrationExpiryItemsToShow} />
            ) : (
              <View style={baseStyles.viewDataList}>
                <View style={baseStyles.textDataListItem}>
                  <Text style={baseStyles.textLeftAligned}>
                    No calibration expirations to show.
                  </Text>
                </View>
              </View>
            )}
          </View>
        )
      ) : null}
      {!isLoadingLtpLoans ? (
        dataErrorLtpLoans ? (
          <ErrorDetails
            errorSummary={'Error syncing LTP loans'}
            dataStatusCode={dataStatusCodeLtpLoans}
            errorHtml={dataErrorLtpLoans}
            dataErrorUrl={dataErrorUrlLtpLoans}
          />
        ) : (
          <View>
            <View style={baseStyles.viewSectionRibbon}>
              <Text style={baseStyles.textSectionRibbon}>
                {ltpLoansItemsToShow.length > 1
                  ? `${ltpLoansItemsToShow.length} LTP Actions`
                  : ltpLoansItemsToShow.length > 0
                  ? `${ltpLoansItemsToShow.length} LTP Action`
                  : 'No LTP Actions'}
              </Text>
            </View>
            {ltpLoansItemsToShow.length > 0 ? (
              <LtpLoansList
                items={ltpLoansItemsToShow}
                showFullDetails={false}
              />
            ) : (
              <View style={baseStyles.viewDataList}>
                <View style={baseStyles.textDataListItem}>
                  <Text style={baseStyles.textLeftAligned}>
                    No LTP loans to show.
                  </Text>
                </View>
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
            <View style={baseStyles.viewSectionRibbon}>
              <Text style={baseStyles.textSectionRibbon}>
                {serviceMeasuresItemsToShow.length > 1
                  ? `${serviceMeasuresItemsToShow.length} Outstanding Service Measures`
                  : serviceMeasuresItemsToShow.length > 0
                  ? `${serviceMeasuresItemsToShow.length} Outstanding Service Measure`
                  : 'No Outstanding Service Measures'}
              </Text>
            </View>
            {serviceMeasuresItemsToShow.length > 0 ? (
              <ServiceMeasuresList
                items={serviceMeasuresItemsToShow}
                showFullDetails={false}
              />
            ) : (
              <View style={baseStyles.viewDataList}>
                <View style={baseStyles.textDataListItem}>
                  <Text style={baseStyles.textLeftAligned}>
                    No Service Measures to show.
                  </Text>
                </View>
              </View>
            )}
          </View>
        )
      ) : null}
    </ScrollView>
  );
};
const titleString = 'Notifications';
// const tabBarLabelFunction = ({ focused }) => (
//   <BadgedTabBarText
//     showBadge={false}
//     text={titleString}
//     focused={focused}
//     value={0}
//   />
// );
export const screenOptions = (navData) => {
  return {
    headerTitle: () => <TitleWithAppLogo title={titleString} />,
    // tabBarLabel: Platform.OS === 'ios' ? tabBarLabelFunction : titleString,
    tabBarLabel: titleString,
    tabBarIcon: ({ focused, size }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'alert-circle' : 'alert-circle'}
        size={size}
      />
    ),
  };
};
