import React from 'react';
import { Dimensions, Platform } from 'react-native';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

// import BadgedTabBarText from '../components/BadgedTabBarText';
// import HomeScreen, {
//   screenOptions as HomeScreenOptions
// } from '../screens/HomeScreen';
import NewsScreen, {
  screenOptions as NewsScreenOptions,
} from '../screens/NewsScreen';
// import ProductsScreen, {
//   screenOptions as ProductsScreenOptions,
// } from '../screens/ProductsScreen';
import StatsScreen, {
  screenOptions as StatsScreenOptions,
} from '../screens/StatsScreen';
import CatalogueScreen, {
  screenOptions as CatalogueScreenOptions,
} from '../screens/CatalogueScreen';

import Colors from '../constants/Colors';
const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);
const baseFontSize = 12;
let navBarFontSize =
  screenWidth > 1023
    ? baseFontSize * 1.3
    : screenWidth > 767
    ? baseFontSize * 1.2
    : screenWidth > 413
    ? baseFontSize * 1.1
    : screenWidth > 374
    ? baseFontSize * 1
    : baseFontSize * 1;

let headerHeight =
  screenWidth > 1023
    ? 90
    : screenWidth > 767
    ? 80
    : screenWidth > 413
    ? 70
    : screenWidth > 374
    ? 60
    : 60;
// console.log('screenHeight', screenHeight);
// console.log('screenWidth', screenWidth, 'navBarFontSize', navBarFontSize);

const defaultStackNavOptions = () => {
  //   const windowDim = useWindowDimensions();
  //   const baseStyles = windowDim && getBaseStyles(windowDim);
  const navigation = useNavigation();
  return {
    headerStyle: {
      backgroundColor: Colors.vwgHeader,
      height: headerHeight,
    },
    cardStyle: { backgroundColor: 'white' },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='home'
          iconName={Platform.OS === 'ios' ? 'home' : 'home'}
          onPress={() => {
            {
              /* console.log('pressed homescreen icon'); */
            }
            navigation.navigate('Home');
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='menu'
          iconName={Platform.OS === 'ios' ? 'menu' : 'menu'}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

// const HomeStack = createStackNavigator();
// <HomeStack.Navigator screenOptions={defaultStackNavOptions}>
//   <HomeStack.Screen
//     name={Home}
//     component={HomeScreen}
//     options={HomeScreenOptions}
//   />
// </HomeStack.Navigator>;

const News = createStackNavigator();

const NewsStack = () => {
  return (
    <News.Navigator screenOptions={defaultStackNavOptions}>
      <News.Screen
        name={'NewsScreen'}
        component={NewsScreen}
        options={NewsScreenOptions}
      />
    </News.Navigator>
  );
};

// const Products = createStackNavigator();
// const ProductsStack = () => {
//   return (
//     <Products.Navigator screenOptions={defaultStackNavOptions}>
//       <Products.Screen
//         name={'ProductsScreen'}
//         component={ProductsScreen}
//         options={ProductsScreenOptions}
//       />
//     </Products.Navigator>
//   );
// };

const Stats = createStackNavigator();
const StatsStack = () => {
  return (
    <Stats.Navigator screenOptions={defaultStackNavOptions}>
      <Stats.Screen
        name={'StatsScreen'}
        component={StatsScreen}
        options={StatsScreenOptions}
      />
    </Stats.Navigator>
  );
};

const Catalogue = createStackNavigator();
const CatalogueStack = () => {
  return (
    <Catalogue.Navigator screenOptions={defaultStackNavOptions}>
      <Catalogue.Screen
        name={'CatalogueScreen'}
        component={CatalogueScreen}
        options={CatalogueScreenOptions}
      />
    </Catalogue.Navigator>
  );
};

// Tab navigator

const NewsTabs =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

export default NewsTabNavigator = () => {
  return Platform.OS === 'ios' ? (
    <NewsTabs.Navigator //iOS
      lazy={true}
      tabBarOptions={{
        showLabel: true,
        labelPosition: 'below-icon', // Otherwise weird for landscape
        labelStyle: {
          fontSize: navBarFontSize,
        },
        activeTintColor: Colors.vwgActiveLink,
        inactiveTintColor: Colors.vwgInactiveLink,
        activeBackgroundColor: Colors.vwgWhite,
        inactiveBackgroundColor: Colors.vwgWhite,
        adaptive: false,
      }}
    >
      <NewsTabs.Screen
        name='News'
        component={NewsStack}
        options={NewsScreenOptions}
      />
      <NewsTabs.Screen
        name='Catalogue'
        component={CatalogueStack}
        options={CatalogueScreenOptions}
      />
      <NewsTabs.Screen
        name='Stats'
        component={StatsStack}
        options={StatsScreenOptions}
      />
    </NewsTabs.Navigator>
  ) : (
    <NewsTabs.Navigator // Android
      lazy={true}
      labeled={true}
      title='Default Title'
      shifting={false}
      backBehavior={'history'}
      activeColor={Colors.vwgActiveLink}
      inactiveColor={Colors.vwgInactiveLink}
      tabBarOptions={{
        labelStyle: {
          fontSize: navBarFontSize, // Doesn't seem to work
        },
      }}
      barStyle={{
        labelPosition: 'below-icon',
        backgroundColor: Colors.vwgVeryVeryLightGray,
      }}
    >
      <NewsTabs.Screen
        name='News'
        component={NewsStack}
        options={NewsScreenOptions}
      />
      <NewsTabs.Screen
        name='Catalogue'
        component={CatalogueStack}
        options={CatalogueScreenOptions}
      />
      <NewsTabs.Screen
        name='Stats'
        component={StatsStack}
        options={StatsScreenOptions}
      />
    </NewsTabs.Navigator>
  );
};
// End Tab navigator
