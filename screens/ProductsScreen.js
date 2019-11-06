import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { getProductsRequest } from '../actions/products';

import ProductsLinks from './ProductsLinks';
import productsDummyData from '../dummyData/productsDummyData.js';

class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    // console.log('in ProductsScreen constructor', this.props);
    this.props.getProductsRequest();

    // console.log(this.props.getProductsRequest);
  }
  render() {
    // const { products } = this.props;
    // console.log('in ProductsScreen, products ', this.props.productsItems);
    const items = this.props.productsItems || [];
    // const items = productsDummyData;
    // console.log('in ProductsScreen, products ', products && products.items);
    // console.log('in ProductsScreen, products ', products && products);
    // console.log('in ProductsScreen, products', products && products);
    return (
      <View>
        <ScrollView>
          {/* <Text>Products, count is {items && items.length}</Text> */}
          <ProductsLinks items={items} />
        </ScrollView>
      </View>
    );
  }
}

ProductsScreen.navigationOptions = {
  title: 'Products'
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
