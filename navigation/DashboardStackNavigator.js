import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import TitleWithAppLogo from '../components/TitleWithAppLogo';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import ProductsScreen from '../screens/ProductsScreen';
import LtpScreen from '../screens/LtpScreen';
import FindToolsScreen from '../screens/FindTools';
import JobsScreen from '../screens/JobsScreen';
import OdisScreen from '../screens/OdisScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ReturnToolsScreen from '../screens/ReturnToolsScreen';
import UsersScreen from '../screens/UsersScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

// Home screen

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  )
};

HomeStack.path = '';

// End Home screen
// Tools screen

const FindToolsStack = createStackNavigator(
  {
    Tools: FindToolsScreen
  },
  config
);

FindToolsStack.navigationOptions = {
  tabBarLabel: 'Find tools',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-build' : 'md-build'}
    />
  )
};

FindToolsStack.path = '';

// End Tools screen
// Jobs screen

const JobsStack = createStackNavigator(
  {
    Jobs: JobsScreen
  },
  config
);

JobsStack.navigationOptions = {
  tabBarLabel: 'Jobs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-today'}
    />
  )
};

JobsStack.path = '';

// End Jobs screen
// Return screen

const ReturnToolsStack = createStackNavigator(
  {
    ReturnTools: ReturnToolsScreen
  },
  config
);

ReturnToolsStack.navigationOptions = {
  tabBarLabel: 'Return',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-return-left' : 'md-return-left'}
    />
  )
};

ReturnToolsStack.path = '';

// End Return screen
// News screen

const NewsStack = createStackNavigator(
  {
    News: NewsScreen
  },
  config
);

NewsStack.navigationOptions = {
  tabBarLabel: 'News',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

NewsStack.path = '';

// End News screen
// ODIS screen

const OdisStack = createStackNavigator(
  {
    Odis: OdisScreen
  },
  config
);

OdisStack.navigationOptions = {
  tabBarLabel: 'ODIS',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-tv' : 'md-tv'}
    />
  )
};

OdisStack.path = '';

// End News screen
// Products screen

const ProductsStack = createStackNavigator(
  {
    Products: ProductsScreen
  },
  config
);

ProductsStack.navigationOptions = {
  tabBarLabel: 'Products',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
    />
  )
};

ProductsStack.path = '';

// End Products screen
// LTP screen

const LtpStack = createStackNavigator(
  {
    LTP: LtpScreen
  },
  config
);

LtpStack.navigationOptions = {
  tabBarLabel: 'Loan tools',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-swap' : 'md-swap'}
    />
  )
};

LtpStack.path = '';

// End LTP screen
// Users screen

const UsersStack = createStackNavigator(
  {
    Users: UsersScreen
  },
  config
);

UsersStack.navigationOptions = {
  tabBarLabel: 'Users',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  )
};

UsersStack.path = '';

// End Users screen
// Settings screen

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
};

SettingsStack.path = '';

// End Settings screen
// Options screen

const OptionsStack = createStackNavigator(
  {
    Options: SettingsScreen
  },
  config
);

OptionsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-options'}
    />
  )
};

OptionsStack.path = '';

// End Options screen

// Panel at bottom

const DashboardDrawerNavigator = createBottomTabNavigator(
  {
    'Find Tools': FindToolsStack,
    'My Jobs': JobsStack,
    'Return Tools': ReturnToolsStack,
    'LoanTool Programme': LtpStack
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: <TitleWithAppLogo title={routeName} />
      };
    }
  }
);

// DashboardDrawerNavigator.navigationOptions = {
//     tabBarLabel: 'Settings',
//     tabBarIcon: ({ focused }) => (
//         <TabBarIcon
//             focused={focused}
//             name={Platform.OS === 'ios' ? 'ios-settings' : 'md-options'}
//         />
//     )
// };

DashboardDrawerNavigator.path = '';

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardDrawerNavigator: DashboardDrawerNavigator,
    Odis: OdisScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
            size={22}
            style={{ paddingLeft: 20 }}
            type='ionicon'
            onPress={() => navigation.navigate('Home')}
          />
        ),
        headerRight: (
          <Icon
            name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
            size={22}
            type='ionicon'
            style={{ paddingRight: 30 }}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
);

export default DashboardStackNavigator;
