import React, { useCallback, useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Image, Text } from 'react-native-elements';
import Constants from 'expo-constants';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import DataAlertBarWithRefresh from '../components/DataAlertBarWithRefresh';
import HeaderButton from '../components/HeaderButton';
import { getUserRequest } from '../actions/user';
import { getStatsRequest } from '../actions/stats';
// import { getDealerWipsRequest } from '../actions/dealerWips';

import StatsSummary from './StatsSummary';
// import userDummyData from '../dummyData/userDummyData.js';
// import statsDummyData from '../dummyData/statsDummyData.js';
// import statsGrab from '../assets/images/content/stats.jpg';

export default StatsScreen = ({ ...props }) => {
  // class StatsScreen extends Component {
  //   constructor(props) {
  //     super(props);
  //     // console.log('in StatsScreen constructor', this.props);
  //     this.props.getUserRequest();
  //     this.props.getStatsRequest();
  //     this.props.getDealerWipsRequest();
  //     // console.log(this.props.getStatsRequest);
  //   }

  // const { stats } = this.props;
  // console.log('in StatsScreen, stats ', statsDummyData);
  // const statsObj = this.props.statsObj || [];
  const dispatch = useDispatch();
  const statsObj = useSelector(state => state.stats.statsItems[0]);
  const userIsSignedIn = useSelector(state => state.user.userIsSignedIn);
  const userDataObj = useSelector(state => state.user.userData[0]);
  const isLoading = useSelector(state => state.stats.isLoading);
  const dataError = useSelector(state => state.stats.error);

  const getUserData = useCallback(() => dispatch(getUserRequest()), [
    userDataObj
  ]);

  const dealerId = (userDataObj.dealerId && userDataObj.dealerId) || '';

  const getStatsData = {
    dealerId: dealerId
  };

  console.log('getStatsData', getStatsData);

  const getItems = useCallback(
    getStatsData => dispatch(getStatsRequest(getStatsData)),
    [statsObj]
  );

  useEffect(() => {
    // runs only once
    console.log('in stats use effect');
    const getItemsAsync = async () => {
      getItems(getStatsData);
    };
    getItemsAsync();
  }, [dispatch]);

  const refreshRequestHandler = () => {
    console.log('in refreshRequestHandler', getStatsData);
    getItems(getStatsData);
  };

  if (!userIsSignedIn) {
    props.navigation.navigate('SignIn');
  }
  const userDataCount =
    (userDataObj && Object.keys(userDataObj).length > 0) || 0;
  const statsDataCount = (statsObj && Object.keys(statsObj).length > 0) || 0;

  if (userDataCount > 0) {
    console.log('in stats screen,userDataObj OK');
  } else {
    console.log('in stats screen, no userDataObj');
    getUserData();
  }

  if (statsDataCount > 0) {
    console.log('in stats screen,statsObj OK', statsObj);
  } else {
    console.log('in stats screen, no statsObj');
    // getStats();
  }

  //   console.log('items AREEEEEEEEEE', items);
  console.log('isLoading ', isLoading, 'dataError ', dataError);

  //   const userDataObj = userDummyData;
  //   const statsObj = statsDummyData;

  // console.log('in StatsScreen, statsObj', statsObj && statsObj);
  //   console.log('in stats screen,statsObj', statsObj);
  //   props.getUserRequest();
  //   props.getStatsRequest();
  return (
    <View style={styles.container}>
      <DataAlertBarWithRefresh
        refreshRequestHandler={refreshRequestHandler}
        isLoading={isLoading}
        dataError={dataError}
        dataCount={statsDataCount}
      />
      <ScrollView>
        <StatsSummary statsObj={statsObj} userDataObj={userDataObj} />
        <View style={styles.appData}>
          <Text>
            {`${Constants.manifest.name} Version ${Constants.manifest.version}`}
          </Text>
          <Text>
            {`Builds ${Constants.nativeAppVersion} - ${Constants.nativeBuildVersion}`}
          </Text>
          <Text>
            {`${
              Platform.OS === 'ios'
                ? Constants.platform.ios.buildNumber
                  ? Constants.platform.ios.buildNumber
                  : ''
                : Constants.platform.android.versionCode
                ? Constants.platform.android.versionCode
                : ''
            }`}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

StatsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='Stats' />,
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='home'
        iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        onPress={() => {
          console.log('pressed homescreen icon');
          navigation.navigate('HomeScreen');
        }}
      />
    </HeaderButtons>
  ),
  headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='menu'
        iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        onPress={() => {
          console.log('pressed menu icon');
          navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  appData: {
    alignItems: 'center'
  },
  appName: {
    color: '#0096da',
    color: '#000',
    fontSize: 18,
    textTransform: 'uppercase'
  },
  announcementText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  }
});
