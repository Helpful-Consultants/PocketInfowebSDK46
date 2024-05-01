import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { getPushDataObject } from 'native-notify';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, Platform, useWindowDimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import TabBarIcon from '../components/TabBarIcon';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
// import BadgedTabBarText from '../components/BadgedTabBarText';
import { AppSections } from '../constants/AppParts';
import Colors from '../constants/Colors';
import getBaseStyles from '../helpers/getBaseStyles';
import getNavTargetObj from '../helpers/getNavTargetObj';
import BookedOutToolsScreen from '../screens/BookedOutToolsScreen';
import FindToolsScreen from '../screens/FindToolsScreen';
import JobsScreen from '../screens/JobsScreen';
import LtpListScreen from '../screens/LtpListScreen';
// import { setNotificationTarget } from '../actions/user';
// import { resetNotificationTarget } from '../actions/user';

const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);
const baseFontSize = 12;
const navBarFontSize =
  screenWidth > 1023
    ? baseFontSize * 1.3
    : screenWidth > 767
      ? baseFontSize * 1.2
      : screenWidth > 413
        ? baseFontSize * 1.1
        : screenWidth > 374
          ? baseFontSize * 1
          : baseFontSize * 1;

// const headerHeight =
//   screenWidth > 1023 ? 90 : screenWidth > 767 ? 80 : screenWidth > 413 ? 70 : screenWidth > 374 ? 60 : 60;
// console.log('screenHeight', screenHeight);
// console.log('screenWidth', screenWidth, 'navBarFontSize', navBarFontSize);

// Start tab navigator

const WipTabs = createBottomTabNavigator();

const WipTabNavigator = ({ navigation, route }) => {
  //   const dispatch = useDispatch();
  //   const thisSection = AppSections.WIPTABS;
  //   const notificationTarget = useSelector(
  //     (state) => state.user.notificationTarget
  //   );

  const [pushDataObj, setPushDataObj] = useState(null);
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);

  const getPushDataObjFn = useCallback(async () => {
    // console.log('in WpNav in getPushDataObjFn');
    // let data = {};
    try {
      const fetchedData = await getPushDataObject();
      //   console.log('in WpNav getPushDataObjFn finished', data);
      //   if (typeof data == 'object' && Object.hasOwn(data, 'targetScreen')) {
      //     setPushDataTargetScreen(pushDataObj.targetScreen);
      //   }
      return fetchedData;
    } catch (err) {
      console.log('in WpNav getPushDataObjFn err', err);
      return {};
    }
    // console.log('in WpNav end of getPushDataObjFn', data);
  }, []);
  // let data = getPushDataObject();
  const data = useMemo(() => getPushDataObjFn(), [getPushDataObjFn]);

  useEffect(() => {
    if (data && data.hasOwnProperty('targetScreen')) {
      //   console.log(
      //     'in WpNav useEffect 1, storing in state data' + JSON.stringify(data)
      //   );
      setPushDataObj(data);
    } else if (data && data.hasOwnProperty('dataError')) {
      //   console.log('in WpNav useEffect 1 dataError' + JSON.stringify(data));
      setPushDataObj(data);
      // } else {
      //   console.log(
      //     'in WpNav useEffect 1 no data in state data' + JSON.stringify(data)
      //   );
    }
  }, [data]); // must not have any dependency on pushDataObj

  useEffect(() => {
    // console.log('in WpNav useEffect 2 pushDataObj', JSON.stringify(pushDataObj));
    if (pushDataObj?.hasOwnProperty('dataError')) {
      //   console.log(
      //     'in WpNav pushDataObj.hasOwnProperty(dataError)' +
      //       JSON.stringify(pushDataObj)
      //   );
      navigation.navigate('NewsTabs', { screen: 'News' });
    } else if (pushDataObj?.hasOwnProperty('targetScreen')) {
      //   console.log(
      //     'in WpNav pushDataObj.hasOwnProperty(targetScreen)' +
      //       JSON.stringify(pushDataObj)
      //   );
      const targetObj = getNavTargetObj(pushDataObj?.targetScreen);
      //   console.log('in WpNav after getNavTargetObj' + JSON.stringify(targetObj));
      if (
        targetObj?.hasOwnProperty('targetScreen') &&
        targetObj.targetScreen &&
        targetObj?.hasOwnProperty('targetSection') &&
        targetObj.targetSection
      ) {
        //   dispatch(setNotificationTarget(targetObj));
        // console.log('in WpNav end targetObj: ' + JSON.stringify(targetObj));
        const tempNotificationTarget = { ...targetObj };
        //     (pushDataObj && pushDataObj.targetScreen) || null;
        // console.log(
        //   'in WpNav useEffect, tempNotificationTarget',
        //   JSON.stringify(tempNotificationTarget)
        // );
        const constantFromTargetSection =
          tempNotificationTarget?.targetSection.replace?.(/\s/g, '').toUpperCase?.() ?? '';
        // setPushDataObj(null);
        if (constantFromTargetSection === AppSections.HOME) {
          //   console.log('in WpNav useEffect, e');
          navigation.navigate('Home');
        } else {
          //   console.log(
          //     'in WpNav useEffect ready to navigate to' +
          //       JSON.stringify(tempNotificationTarget)
          //   );
          navigation.navigate(tempNotificationTarget.targetSection, {
            screen: tempNotificationTarget.targetScreen,
          });
        }
        // setPushDataObj(data);
        //   } else {
        //     console.log(
        //       'in WpNav Target object is not useable.' + JSON.stringify(targetObj)
        //     );
      }
    }
    // if (pushDataObj != null) {
    //   console.log('in WpNav at zz' + JSON.stringify(pushDataObj));
    // }
  }, [pushDataObj, navigation]); // stops it looping

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? 'white' : '#3689b1',
      },
      headerLeftContainerStyle: { ...baseStyles.paddingLeft },
      headerTitle: () => <TitleWithAppLogo title={getFocusedRouteNameFromRoute(route)} />,
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="home"
            iconName="home"
            onPress={() => {
              //   {
              //     /* console.log('pressed homescreen icon'); */
              //   }
              navigation.navigate('Home');
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="menu"
            iconName="menu"
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, route, baseStyles.paddingLeft]);

  //   useEffect(() => {
  //     if (
  //       notificationTarget &&
  //       notificationTarget.hasOwnProperty('targetScreen')
  //     ) {
  //       const tempNotificationTarget = { ...notificationTarget };
  //       //     (pushDataObject && pushDataObject.targetScreen) || null;
  //       console.log(
  //         'in WipNav useEffect, pushDataObject.targetScreen',
  //         notificationTarget,
  //         tempNotificationTarget
  //       );
  //       dispatch(resetNotificationTarget());
  //       // props.navigation.navigate(pushDataTargetScreen);

  //       const constantFromTargetSection = tempNotificationTarget.targetSection
  //         ? tempNotificationTarget.targetSection.replace(/\s/g, '').toUpperCase()
  //         : '';
  //       if (constantFromTargetSection === AppSections.HOME) {
  //         navigation.navigate('Home');
  //       } else {
  //         navigation.navigate(tempNotificationTarget.targetSection, {
  //           screen: tempNotificationTarget.targetScreen,
  //         });
  //       }
  //     }
  //   }, [notificationTarget]);

  return (
    <WipTabs.Navigator //iOS
      initialRouteName="Find Tools" // ios and android
      backBehavior="history" // ios and android
      // for android - start
      activeColor={Colors.vwgActiveLink} // android
      inactiveColor={Colors.vwgInactiveLink} // android
      shifting={false} //android
      barStyle={{
        // android
        labelPosition: 'below-icon',
        backgroundColor: Colors.vwgVeryLightGray,
      }}
      // for android - end
      // for ios - start
      sceneContainerStyle={{ backgroundColor: 'white' }} // ios
      screenOptions={{
        // android and ios
        lazy: true,
        headerShown: false, //ios
        tabBarActiveTintColor: Colors.vwgActiveLink, //ios
        tabBarInactiveTintColor: Colors.vwgInactiveLink, //ios
        tabBarActiveBackgroundColor: Colors.vwgWhite, //ios
        tabBarInactiveBackgroundColor: Colors.vwgWhite, //ios
        tabBarLabelStyle: {
          //ios
          fontSize: navBarFontSize,
        },
        tabBarLabelPosition: 'below-icon', //io
        sceneContainerStyle: { backgroundColor: 'white' }, // ios
      }}
      // for ios - end
    >
      <WipTabs.Screen
        name="Find Tools"
        component={FindToolsScreen}
        options={{
          lazy: true,
          tabBarIcon: ({ focused, size }) => <TabBarIcon focused={focused} name="build" size={size} />,
        }}
      />
      <WipTabs.Screen
        name="Booked Tools"
        component={BookedOutToolsScreen}
        options={{
          lazy: true,
          tabBarIcon: ({ focused, size }) => <TabBarIcon focused={focused} name="return-down-back" size={size} />,
        }}
      />
      <WipTabs.Screen
        name="My Jobs"
        component={JobsScreen}
        options={{
          lazy: true,
          tabBarIcon: ({ focused, size }) => <TabBarIcon focused={focused} name="clipboard" size={size} />,
        }}
      />
      <WipTabs.Screen
        name="Loan Tools"
        component={LtpListScreen}
        options={{
          lazy: true,
          tabBarIcon: ({ focused, size }) => <TabBarIcon focused={focused} name="swap-horizontal" size={size} />,
        }}
      />
    </WipTabs.Navigator>
  );
};
// End Tab navigator
export default WipTabNavigator;
