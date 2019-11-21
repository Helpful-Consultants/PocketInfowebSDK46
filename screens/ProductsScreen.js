import React, { Component } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import TitleWithAppLogo from '../components/TitleWithAppLogo';
import HeaderButton from '../components/HeaderButton';
import { getProductsRequest } from '../actions/products';

import ProductsLinks from './ProductsLinks';
import productsDummyData from '../dummyData/productsDummyData.js';

class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    // console.log('in ProductsScreen constructor', this.props);
    // this.props.getProductsRequest();

    // console.log(this.props.getProductsRequest);
  }
  render() {
    // const { products } = this.props;
    // console.log('in ProductsScreen, products ', this.props.productsItems);
    // const items = this.props.productsItems || [];
    const items = productsDummyData;
    // console.log('in ProductsScreen, products ', products && products.items);
    // console.log('in ProductsScreen, products ', products && products);
    // console.log('in ProductsScreen, products', products && products);
    return (
      <View>
        <ScrollView>
          <ProductsLinks items={items} />
        </ScrollView>
      </View>
    );
  }
}

ProductsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <TitleWithAppLogo title='Products' />,
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
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  titleRowWithImage: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  //   const { friends } = state;
  //   console.log('in mapStateToProps');
  //   console.log(state);
  //   console.log('end mapStateToProps');
  return state.products;
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsRequest: () => dispatch(getProductsRequest())
  };
};

// export default connect(mapStateToProps)(ProductsScreen);
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
)(ProductsScreen);
