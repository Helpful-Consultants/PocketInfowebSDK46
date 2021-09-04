import React, { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Switch, Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { setUserRequestedDemoData } from '../actions/user';

export default DemoDataSwitch = (props) => {
  const showingDemoApp = useSelector((state) => state.user.showingDemoApp);
  const requestedDemoData = useSelector(
    (state) => state.user.requestedDemoData
  );
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const dispatch = useDispatch();
  const [switchStatus, setSwitchStatus] = useState(false);
  const switchedOffText =
    'Turn ON to show demo data for LTP bookings, service measures & notifications';
  const switchedOnText =
    'Turn OFF to show live data for LTP bookings, service measures & notifications';

  //   console.log(
  //     'in switch reducer switchStatus',
  //     requestedDemoData,
  //     'for ',
  //     userDataObj.userName.toLowerCase()
  //   );
  const toggleSwitch = () => {
    let tempSwitchStatus =
      requestedDemoData && requestedDemoData === true ? true : false;

    // console.log('in toggle switch switchStatus', switchStatus);
    dispatch(
      setUserRequestedDemoData({ requestedDemoData: !tempSwitchStatus })
    );
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

  return showingDemoApp &&
    userDataObj &&
    userDataObj.userName &&
    (userDataObj.userName.toLowerCase().indexOf('lyndon') > -1 ||
      userDataObj.userName.toLowerCase().indexOf('upstone') > -1 ||
      (userDataObj.userName.toLowerCase().indexOf('simon') > -1 &&
        userDataObj.userName.toLowerCase().indexOf('groves') > -1)) ? (
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
  ) : null;
};
