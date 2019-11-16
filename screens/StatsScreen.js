import React, { Component } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Image, Text } from 'react-native-elements';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import { getUserRequest } from '../actions/user';
import { getStatsRequest } from '../actions/stats';
import { getUserWipsRequest } from '../actions/userWips';

import StatsSummary from './StatsSummary';
import userDummyData from '../dummyData/userDummyData.js';
import statsDummyData from '../dummyData/statsDummyData.js';
// import statsGrab from '../assets/images/content/stats.jpg';

class StatsScreen extends Component {
  constructor(props) {
    super(props);
    // console.log('in StatsScreen constructor', this.props);
    this.props.getUserRequest();
    this.props.getStatsRequest();
    this.props.getUserWipsRequest();
    // console.log(this.props.getStatsRequest);
  }
  render() {
    // const { stats } = this.props;
    // console.log('in StatsScreen, stats ', statsDummyData);
    // const statsItems = this.props.statsItems || [];
    const userData = userDummyData;
    const statsItems = statsDummyData;
    // const statsItems = this.props.statsItems && this.props.statsItems;
    // console.log('in StatsScreen, statsItems', statsItems && statsItems);
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <Text>Stats, count is {items && items.length}</Text> */}
          {/* <Text style={styles.tipText}>
            Offboard Diagnostic Information System
          </Text> */}
          {/* <View style={styles.rowWithImage}>
                        <Image source={statsGrab} style={styles.contentImage} />
                    </View> */}
          <StatsSummary statsItems={statsItems} userData={userData} />
        </ScrollView>
      </View>
    );
  }
}

StatsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='Stats' />,
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='ODIS versions'
        iconName={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
        onPress={() => {
          {
            /* console.log('pressed homescreen icon'); */
          }
          navigation.navigate('Home');
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
          {
            /* console.log('pressed menu icon'); */
          }
          navigation.openDrawer();
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

const mapStateToProps = state => {
  //   const { friends } = state;
  //   console.log('in mapStateToProps');
  //   console.log(state);
  //   console.log('end mapStateToProps');
  return { statsItems: state.statsItems, userData: state.userData };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserRequest: () => dispatch(getUserRequest()),
    getStatsRequest: () => dispatch(getStatsRequest()),
    getUserWipsRequest: () => dispatch(getUserWipsRequest())
  };
};

// export default connect(mapStateToProps)(OdisScreen);
export default connect(
  mapStateToProps,
  mapDispatchToProps
  //   ({ news }) => ({ news }),
  //   {
  //     getNewsRequest,
  //     createUserRequest,
  //     deleteUserRequest,
  //     newsError
  //   }
)(StatsScreen);
