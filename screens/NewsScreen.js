import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { getNewsRequest } from '../actions/news';
// import UserList from '../components/UserList';

// import { NewsLinksView } from '@expo/samples';
import NewsLinks from './NewsLinks';

class NewsScreen extends Component {
  constructor(props) {
    super(props);
    // console.log('in NewsScreen constructor', this.props);
    this.props.getNewsRequest();

    // console.log(this.props.getNewsRequest);
  }
  render() {
    // const { news } = this.props;
    // console.log('in NewsScreen, news ', this.props.newsItems);
    const newsItems = this.props.newsItems;
    // console.log('in NewsScreen, news ', news && news.items);
    // console.log('in NewsScreen, news ', news && news);
    // console.log('in NewsScreen,news', news && news);
    return (
      <View>
        <ScrollView>
          {/* <Text>News, count is {newsItems && newsItems.length}</Text> */}
          <NewsLinks items={newsItems} />
        </ScrollView>
      </View>
    );
    // return (
    //   <View style={styles.container}>
    //     <Text>News Screen...</Text>
    //   </View>
    // );
  }
}

NewsScreen.navigationOptions = {
  title: 'News',
  headerStyle: {
    backgroundColor: '#efefef'
  },
  headerTintColor: '#333',
  headerTitleStyle: {
    fontWeight: 'bold'
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

const mapStateToProps = state => {
  //   const { friends } = state;
  //   console.log('in mapStateToProps');
  //   console.log(state);
  //   console.log('end mapStateToProps');
  return state.news;
};

const mapDispatchToProps = dispatch => {
  return {
    getNewsRequest: () => dispatch(getNewsRequest())
  };
};

// export default connect(mapStateToProps)(NewsScreen);
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
)(NewsScreen);
