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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPushDataObject();
        if (data && typeof data === 'object') {
          if (
            data.hasOwnProperty('targetScreen') ||
            data.hasOwnProperty('dataError')
          ) {
            setPushDataObj(data);
          } else {
            console.log('No relevant data:', JSON.stringify(data));
          }
        } else {
          console.log('Data is undefined or not an object');
        }
      } catch (err) {
        console.log('Wip Nav - Error fetching push data:', err);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once on mount

  useEffect(() => {
    if (pushDataObj && typeof pushDataObj === 'object') {
      if (pushDataObj?.dataError) {
        navigation.navigate('NewsTabs', { screen: 'News' });
      } else if (pushDataObj?.targetScreen) {
        const targetObj = getNavTargetObj(pushDataObj.targetScreen);
        if (targetObj && targetObj.targetScreen && targetObj.targetSection) {
          const targetSection = tempNotificationTarget?.targetSection;
          const constantFromTargetSection =
            typeof targetSection === 'string'
              ? targetSection.replace(/\s/g, '').toUpperCase()
              : '';
          if (constantFromTargetSection === AppSections.HOME) {
            navigation.navigate('Home');
          } else {
            navigation.navigate(targetObj.targetSection, {
              screen: targetObj.targetScreen,
            });
          }
        }
      }
    }
  }, [pushDataObj, navigation]); // stops it looping

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? 'white' : '#3689b1',
      },
      headerLeftContainerStyle: { ...baseStyles.paddingLeft },
      headerTitle: () => (
        <TitleWithAppLogo title={getFocusedRouteNameFromRoute(route)} />
      ),
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
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name="build" size={size} />
          ),
        }}
      />
      <WipTabs.Screen
        name="Booked Tools"
        component={BookedOutToolsScreen}
        options={{
          lazy: true,
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name="return-down-back" size={size} />
          ),
        }}
      />
      <WipTabs.Screen
        name="My Jobs"
        component={JobsScreen}
        options={{
          lazy: true,
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name="clipboard" size={size} />
          ),
        }}
      />
      <WipTabs.Screen
        name="Loan Tools"
        component={LtpListScreen}
        options={{
          lazy: true,
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon focused={focused} name="swap-horizontal" size={size} />
          ),
        }}
      />
    </WipTabs.Navigator>
  );
};
// End Tab navigator
export default WipTabNavigator;
