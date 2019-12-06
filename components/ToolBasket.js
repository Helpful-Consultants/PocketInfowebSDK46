import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Image, ListItem, Text } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';

export default ToolBasket = props => {
  //   const { mode, props.toolBasket, wipNumber } = props;
  //   const [isBasketExpanded, setIsBasketExpanded] = useState(false);
  console.log('props', props.toolBasket.length);
  console.log('props MODEEEEEEE ', props.mode);

  //   const [toolBasket, setToolBasket] = useState(props.toolBasket);
  //   // This will launch only if propName value has chaged.
  //   useEffect(() => {
  //     setToolBasket(toolBasket);
  //     console.log('In EFFECT !!!!!!!!!!!!!!!!')
  //   }, [props.toolBasket]);

  //   let bum = 'arse';
  //   useEffect(() => {
  //     bum = 'head';
  //   }, [props.toolBasket]);

  //   console.log(bum);
  //   const [mode, setMode] = useState('list');
  //   const [props.toolBasket, setprops.ToolBasket] = useState([]);

  let basketHeader = null;

  if (props.toolBasket && props.toolBasket.length > 0) {
    basketHeader = (
      <View>
        <View style={styles.basketHeader}>
          <TouchableOpacity
            onPress={() => props.toggleExpandBasketHandler()}
            style={{ flexDirection: 'row' }}
          >
            <View>
              <Text style={styles.basketText}>
                {`${props.toolBasket.length} ${
                  props.toolBasket.length === 1 ? `tool` : `tools`
                } in job basket.`}
              </Text>
              {props.isBasketExpanded ? (
                <View style={styles.bookButton}>
                  <Icon
                    name={
                      Platform.OS === 'ios' ? 'ios-arrow-up' : 'md-arrow-up'
                    }
                    type='ionicon'
                    size={15}
                    color={Colors.vwgDeepBlue}
                  />
                  <Text style={styles.basketText}>{` Hide job tools`}</Text>
                </View>
              ) : (
                <View style={styles.bookButton}>
                  <Icon
                    name={
                      Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'
                    }
                    type='ionicon'
                    size={15}
                    color={Colors.vwgDeepBlue}
                  />
                  <Text style={styles.basketText}>{` Show job tools`}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {props.mode === 'list' ? (
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => setMode('book')}
            >
              <Icon
                name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-today'}
                type='ionicon'
                size={15}
                color={Colors.vwgDeepBlue}
              />
              <Text style={styles.basketText}>{` Book to job`}</Text>
            </TouchableOpacity>
          ) : null}

          {props.mode === 'confirm' ? (
            <Text style={styles.basketText}>{`Saved to ${wipNumber}`}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => props.removeBasketHandler()}
          >
            <Text style={styles.basketText}>{`Clear `}</Text>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
              type='ionicon'
              size={15}
              color={Colors.vwgDeepBlue}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  let basketContents = null;

  if (props.toolBasket && props.toolBasket.length > 0) {
    basketContents = (
      <View style={styles.basketContents}>
        {props.toolBasket.map((item, i) => (
          <ListItem
            key={i}
            bottomDivider
            subtitle={
              <View>
                <View style={styles.basketItem}>
                  <View style={styles.basketItemNumbers}>
                    <Text
                      style={styles.basketItemText}
                    >{`Part ${item.partNumber}`}</Text>
                    <Text
                      style={styles.basketItemText}
                    >{`Tool ${item.toolNumber}`}</Text>
                  </View>
                  <View style={styles.basketItemDesc}>
                    <Text
                      style={styles.basketItemText}
                    >{`${item.partDescription}`}</Text>
                  </View>
                  <View
                    style={{
                      height: 40,
                      width: 80,
                      borderColor: 'white',
                      borderType: 'solid',
                      borderWidth: 1
                    }}
                  >
                    <Image
                      source={{ uri: '../assets/images/icon.png' }}
                      size={{ height: 40, width: 40 }}
                      height={40}
                      width={40}
                    />
                  </View>
                </View>
                <View>
                  <View style={styles.basketItemFooterRow}>
                    <View style={styles.basketItemLocation}>
                      <Text style={styles.basketItemText}>
                        {item.location
                          ? `Location: ${item.location}`
                          : `Location not recorded`}
                      </Text>
                      {item.lastWIP ? (
                        <Text
                          style={styles.basketItemText}
                        >{`Also booked to job ${item.lastWIP}`}</Text>
                      ) : null}
                    </View>
                    <TouchableOpacity
                      style={styles.bookButton}
                      onPress={() => props.removeBasketItemHandler(item.id)}
                    >
                      <Text style={styles.basketText}>{`Clear tool `}</Text>
                      <Icon
                        name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                        type='ionicon'
                        size={20}
                        color={Colors.vwgDeepBlue}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            }
          ></ListItem>
        ))}

        <Text style={{ ...styles.basketText, textAlign: 'right' }}>
          Tool pictures coming soon.
        </Text>
      </View>
    );
  }

  //   return props.toolBasket && props.toolBasket.length > 0 ? (
  return (
    <View style={styles.basket}>
      {props.toolBasket && props.toolBasket.length > 0 ? (
        <View>
          <View>{basketHeader}</View>
          {props.isBasketExpanded ? basketContents : null}
        </View>
      ) : (
        <View style={styles.basketHeader}>
          <Text style={styles.basketText}>No tools in job basket.</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,

    backgroundColor: '#fff'
  },
  confirmButton: { width: '10%' },
  basket: {
    color: Colors.vwgDeepBlue,
    borderColor: Colors.vwgMintGreen,
    backgroundColor: Colors.vwgWhite,
    borderColor: Colors.vwgDarkSkyBlue,
    borderType: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5
  },
  basketText: {
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2)
  },
  basketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  basketItem: {
    color: Colors.wgDarkSkyBlue,
    flexDirection: 'row'
  },
  basketItemText: {
    color: Colors.vwgDeepBlue,
    fontSize: RFPercentage(2)
  },
  basketItemNumbers: { flexDirection: 'column', width: '50%' },
  basketItemDesc: { flexDirection: 'column', width: '32%' },
  basketItemImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  basketItemFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  basketItemLocation: { flexDirection: 'column' },
  searchBarRow: {
    flexDirection: 'row',
    backgroundColor: Colors.vwgSearchBarContainer
  },
  bookButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  searchBarRowRefreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'center',
    backgroundColor: Colors.vwgSearchBarContainer,
    padding: 10
  },
  searchBarInputContainer: {
    backgroundColor: Colors.vwgSearchBarInputContainer
  },
  searchBarContainer: { backgroundColor: Colors.vwgSearchBarContainer },

  searchBarRowSearchInput: { width: '85%' },
  searchFoundPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgMintGreen
  },
  searchFoundPromptText: {
    textAlign: 'center',

    color: Colors.vwgWhite
  },
  noneFoundPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgWarmRed
  },
  noneFoundPromptText: {
    textAlign: 'center',
    color: Colors.vwgWhite
  },
  inputLabelText: {
    marginBottom: 20,
    color: 'black',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '60%'
  },
  buttonView: {
    // width: 200,
    fontSize: 12
  }
});
