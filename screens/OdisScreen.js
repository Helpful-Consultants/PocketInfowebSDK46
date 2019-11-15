import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { connect } from 'react-redux';

import TitleWithAppLogo from '../components/TitleWithAppLogo';
import { getOdisRequest } from '../actions/odis';

import OdisVersions from './OdisVersions';
import odisDummyData from '../dummyData/odisDummyData.js';
import odisGrab from '../assets/images/content/odis.jpg';

class OdisScreen extends Component {
  constructor(props) {
    super(props);
    // console.log('in OdisScreen constructor', this.props);
    this.props.getOdisRequest();

    // console.log(this.props.getOdisRequest);
  }
  render() {
    // const { odis } = this.props;
    // console.log('in OdisScreen, odis ', this.props.odisItems);
    const items = this.props.odisItems || [];
    // const items = odisDummyData;
    // console.log('in OdisScreen, odis ', odis && odis.items);
    // console.log('in OdisScreen, odis ', odis && odis);
    // console.log('in OdisScreen, odis', odis && odis);
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <Text>Odis, count is {items && items.length}</Text> */}
          {/* <Text style={styles.tipText}>
            Offboard Diagnostic Information System
          </Text> */}
          <View style={styles.rowWithImage}>
            <Image source={odisGrab} style={styles.contentImage} />
          </View>
          <OdisVersions items={items} />
        </ScrollView>
      </View>
    );
  }
}

OdisScreen.navigationOptions = {
  //   headerTitle: <TitleWithAppLogo title='ODIS Versions' />
  header: null
};

const styles = StyleSheet.create({
  tipText: {
    fontSize: 12,
    textAlign: 'center',
    paddingTop: 10
  },
  contentImage: {
    // height: 50,
    width: 200,
    height: 60,

    marginTop: 15
    // marginLeft: 'auto',
    // marginRight: 'auto'
    // paddingLeft: 20,
    // paddingRight: 20
  },
  rowWithImage: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0
  }
});

const mapStateToProps = state => {
  //   const { friends } = state;
  //   console.log('in mapStateToProps');
  //   console.log(state);
  //   console.log('end mapStateToProps');
  return state.odis;
};

const mapDispatchToProps = dispatch => {
  return {
    getOdisRequest: () => dispatch(getOdisRequest())
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
)(OdisScreen);
