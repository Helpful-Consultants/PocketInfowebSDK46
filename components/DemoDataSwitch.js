import React, { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Switch, Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { setUserRequestedDemoData } from '../actions/user';
import { getServiceMeasuresRequest } from '../actions/serviceMeasures';
import { getLtpLoansRequest } from '../actions/ltpLoans';
import { getNewsRequest } from '../actions/news';
import { getOdisRequest } from '../actions/odis';
import { getCalibrationExpiryRequest } from '../actions/calibrationExpiry';
import { selectFetchParamsObj } from '../reducers/user';

export default DemoDataSwitch = (props) => {
  // const showingFullApp = useSelector((state) => state.user.showingFullApp);
  const showingFullApp = true;
  const requestedDemoData = useSelector(
    (state) => state.user.requestedDemoData
  );
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const userBrand = useSelector((state) => state.user.userBrand);
  const dispatch = useDispatch();
  const [switchStatus, setSwitchStatus] = useState(false);
  const switchedOffText =
    'Turn ON to show demo data for LTP bookings, service measures & notifications';
  const switchedOnText =
    'Turn OFF to show live data for LTP bookings, service measures & notifications';
  const fetchParamsObj = useSelector(selectFetchParamsObj);
  //   console.log(
  //     'in switch reducer switchStatus',
  //     requestedDemoData,
  //     'for ',
  //     userDataObj.userName.toLowerCase()
  //   );
  const toggleSwitch = () => {
    let tempSwitchStatus =
      requestedDemoData && requestedDemoData === true ? true : false;

    // console.log(
    //   '@@@@@@@@in toggle switch switchStatus',
    //   switchStatus,
    //   'changing to ',
    //   !switchStatus
    // );
    dispatch(
      setUserRequestedDemoData({ requestedDemoData: !tempSwitchStatus })
    );
    // Update state to hold the dummy data or live data
    if (fetchParamsObj && fetchParamsObj.userIntId && fetchParamsObj.dealerId) {
      //   console.log('@@@@@@@@in toggle switch switchStatus calling apis');
      dispatch(getServiceMeasuresRequest(fetchParamsObj));
      dispatch(getNewsRequest(fetchParamsObj));
      dispatch(getLtpLoansRequest(fetchParamsObj));
      dispatch(getOdisRequest(fetchParamsObj));
      dispatch(getCalibrationExpiryRequest(fetchParamsObj));
    }

    setSwitchStatus(!tempSwitchStatus);
    // setRequestedDemoData((previousState) => !DemoDataSwitch);
  };

  useEffect(() => {
    // console.log(
    //   '@@@@ in demo data switch useEffect. requestedDemoData is ',
    //   requestedDemoData
    // );
    setSwitchStatus(
      requestedDemoData && requestedDemoData === true ? true : false
    );
  }, [requestedDemoData]);

  return 1 == 2 && showingFullApp && userDataObj && userDataObj.userName ? (
    userDataObj.userName.toLowerCase().indexOf('zzzlyndon') > -1 ||
    userDataObj.userName.toLowerCase().indexOf('zzzupstone') > -1 ||
    (userDataObj.userName.toLowerCase().indexOf('zzzsimon') > -1 &&
      userDataObj.userName.toLowerCase().indexOf('zzzgroves') > -1) ? (
      <View
        style={{
          ...baseStyles.container,
          marginTop: 'auto',
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            ...baseStyles.viewRowFlex,
            marginTop: 'auto',
          }}
        >
          <Switch
            value={requestedDemoData}
            trackColor={{ false: 'gray', true: 'green' }}
            onValueChange={toggleSwitch}
          />
          <Text style={baseStyles.panelTextAppInfo}>{` Use demo data?`}</Text>
        </View>
        <View>
          <Text style={baseStyles.panelTextAppInfo}>
            {requestedDemoData ? switchedOnText : switchedOffText}
          </Text>
          <Text style={baseStyles.panelTextAppInfo}>
            {'(Special feature for '}
            {userDataObj.userName && userDataObj.userName}
            {')'}
          </Text>
        </View>
      </View>
    ) : userDataObj.userName.toLowerCase().indexOf('zzzupstone') > -1 ? (
      <View
        style={{
          ...baseStyles.container,
          marginTop: 5,
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            ...baseStyles.viewRowFlex,
            marginTop: 'auto',
          }}
        >
          <Switch
            value={requestedDemoData}
            trackColor={{ false: 'gray', true: 'green' }}
            onValueChange={toggleSwitch}
          />

          <Text style={baseStyles.panelTextAppInfo}>
            {switchStatus ? ` Demo data` : ` Demo data?`}
          </Text>
        </View>
      </View>
    ) : null
  ) : null;
};
