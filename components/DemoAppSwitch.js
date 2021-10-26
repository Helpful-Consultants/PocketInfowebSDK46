import React, { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Switch, Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { setUserRequestedDemoApp } from '../actions/user';
import { setUserRequestedDemoData } from '../actions/user';

export default DemoAppSwitch = (props) => {
  const showingDemoApp = useSelector((state) => state.user.showingDemoApp);
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const dispatch = useDispatch();
  const [switchStatus, setSwitchStatus] = useState(false);
  const switchedOffText = 'Turn ON to show demo app with new features';
  const switchedOnText = 'Turn OFF to show the old app';

  //   console.log(
  //     'in switch reducer switchStatus',
  //     showingDemoApp,
  //     'for ',
  //     userDataObj.userName.toLowerCase()
  //   );
  const toggleSwitch = () => {
    let tempSwitchStatus =
      showingDemoApp && showingDemoApp === true ? true : false;
    // console.log(
    //   'in toggle switch switchStatus',
    //   switchStatus,
    //   'setting to',
    //   !switchStatus
    // );

    if (tempSwitchStatus) {
      dispatch(setUserRequestedDemoData({ requestedDemoData: false }));
    }
    dispatch(setUserRequestedDemoApp({ showDemoApp: !tempSwitchStatus }));
    setSwitchStatus(!tempSwitchStatus);
    // setUserRequestedDemoApp((previousState) => !DemoAppSwitch);
  };

  useEffect(() => {
    //console.log(
    //   '@@@@ in App switch useEffect. showingDemoApp is ',
    //   showingDemoApp
    // );
    setSwitchStatus(showingDemoApp && showingDemoApp === true ? true : false);
  }, [showingDemoApp]);

  return userDataObj &&
    userDataObj.userName &&
    (userDataObj.userName.toLowerCase().indexOf('zzlyndon') > -1 ||
      userDataObj.userName.toLowerCase().indexOf('zzupstone') > -1 ||
      (userDataObj.userName.toLowerCase().indexOf('zzsimon') > -1 &&
        userDataObj.userName.toLowerCase().indexOf('zzgroves') > -1)) ? (
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
          value={switchStatus}
          trackColor={{ false: 'gray', true: 'green' }}
          onValueChange={toggleSwitch}
        />
        <Text style={baseStyles.panelTextAppInfo}>
          {switchStatus ? `  Showing demo app` : `  Show demo app?`}
        </Text>
      </View>
      <View>
        <Text style={baseStyles.panelTextAppInfo}>
          {switchStatus ? switchedOnText : switchedOffText}
        </Text>
        {showingDemoApp ? null : (
          <Text style={baseStyles.panelTextAppInfo}>
            {'(Special option for '}
            {userDataObj.userName && userDataObj.userName}
            {')'}
          </Text>
        )}
      </View>
    </View>
  ) : null;
};
