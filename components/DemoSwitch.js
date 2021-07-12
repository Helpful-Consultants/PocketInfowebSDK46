import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Switch, Text } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import { setUserRequestedDemo } from '../actions/user';

export default AppInfo = (props) => {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
  const userDataObj = useSelector((state) => state.user.userData[0]);
  const userRequestedDemo = useSelector((state) => state.user.requestedDemo);
  const dispatch = useDispatch();

  const switchedOffText =
    'Turn on to show demo data for LTP bookings, service measures & notifications';
  const switchedOnText =
    'Turn off to show live data for LTP bookings, service measures & notifications';

  //   console.log(
  //     'in switch reducer switchStatus',
  //     userRequestedDemo,
  //     'for ',
  //     userDataObj.userName.toLowerCase()
  //   );
  const toggleSwitch = () => {
    let switchStatus = userRequestedDemo;
    if (userRequestedDemo && userRequestedDemo === true) {
      console.log('in switch switchStatus true', userRequestedDemo);
    } else if (userRequestedDemo && userRequestedDemo === false) {
      console.log('in switch switchStatus true', userRequestedDemo);
    }
    console.log('in toggle switch switchStatus', switchStatus);
    dispatch(setUserRequestedDemo({ requestedDemo: !switchStatus }));
    // setuserRequestedDemo((previousState) => !demoSwitch);
  };

  return userDataObj &&
    userDataObj.userName &&
    (userDataObj.userName.toLowerCase().indexOf('lyndon') > -1 ||
      userDataObj.userName.toLowerCase().indexOf('upstone') > -1 ||
      userDataObj.userName.toLowerCase().indexOf('groves') > -1) ? (
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
          value={userRequestedDemo}
          trackColor={{ false: 'gray', true: 'green' }}
          onValueChange={toggleSwitch}
        />
        <Text style={baseStyles.panelTextAppInfo}>{` Use demo data?`}</Text>
      </View>
      <View>
        <Text style={baseStyles.panelTextAppInfo}>
          {userRequestedDemo ? switchedOnText : switchedOffText}
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
