import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, ScrollView, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';
// import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';
// import ltpDummyData from '../dummyData/ltpDummyData.js';

export default function DealerToolsList(props) {
  //   const limit = 10;
  //   const allItems = props.items || [];
  //   //   const allItems = dealerToolsDummyData && dealerToolsDummyData;
  //   const items = allItems && allItems.slice(0, limit);

  //   const items = props.items || [];
  const {
    items,
    dealerWipsItems,
    bookedToolsList,
    toolBasket,
    selectItemHandler,
    showPrompt,
    userIntId,
    toggleBaskethandler
  } = props;

  //   const { selectItemHandler, showPrompt } = props;
  //   const items = dealerToolsDummyData.slice(0, limit);
  //   const items = ltpDummyData.slice(0, limit);
  //   console.log('userIntId ', userIntId);
  //   console.log('bookedToolsList', bookedToolsList);

  const [listView, setListView] = useState();
  //   const [toolBasketList, setToolBasketList] = useState();

  //   console.log('toolBasket', toolBasket && toolBasket);

  let toolBasketList = [];
  toolBasket && toolBasket.forEach(tool => toolBasketList.push(tool.id));
  //   useEffect(() => {
  //     let list = [];

  //     toolBasket && toolBasket.forEach(tool => list.push(tool.id));

  //     // console.log(bookedToolsList && bookedToolsList);
  //     setToolBasketList(list);
  //   }, [toolBasket]);

  const findLastBookedOutByFromTool = item => {
    // console.log('findLastBookedOutByFromTool', item);
    let lastWIP = (item && item.lastWIP && item.lastWIP.toString()) || '';

    if (lastWIP.length > 0) {
      //   console.log('lastWIP ', lastWIP);
      const matchingJobs = dealerWipsItems.filter(
        item => item.wipNumber.toString() === lastWIP.toString()
      );

      if (matchingJobs.length > 0) {
        const personObj = {
          intId:
            matchingJobs[0].createdBy && matchingJobs[0].userIntId.toString(),
          name: matchingJobs[0].createdBy && matchingJobs[0].createdBy
        };

        return personObj;
      } else {
        return {
          intId: null,
          name: ''
        };
      }
    } else {
      return {
        intId: null,
        name: ''
      };
    }
  };

  const findWipforTool = toolId => {
    // console.log('findWipforTool', toolId);
    // let lastWIP = (item && item.lastWIP && item.lastWIP.toString()) || '';
    let matchingJobs = [];

    toolId &&
      dealerWipsItems &&
      dealerWipsItems.forEach(wip => {
        wip.tools.forEach(
          tool => tool.tools_id === toolId && matchingJobs.push(wip)
        );
      });

    // console.log('bookedToolsWipList', matchingJobs);

    if (matchingJobs.length > 0) {
      return matchingJobs[0];
    } else {
      return null;
    }
  };

  //   const selectItemHandler = item => {
  //     return alert(
  //       `the user selected tool ${item.id} for job 999? ; OK; change job; cancel`
  //     );
  //   };

  const CustomListItem = props => {
    const { item, lastJobDetails, booked, inToolBasket } = props;
    let personObj = {};
    // let personName = '';
    // let personIntId = '';
    if (item.lastWIP && item.lastWIP.length > 0) {
      personObj = findLastBookedOutByFromTool(item);
      personName = personObj.name;
      personIntId = personObj.intId;
      //   console.log('personIntId ', personIntId);
    }
    // console.log(' CustomListItem - bookedByUser ', bookedByUser);
    return (
      <ListItem
        title={
          item.partNumber
            ? `${item.partNumber} ${
                item.toolNumber ? `(${item.toolNumber})` : ``
              }`
            : `${item.loanToolNo} ${
                item.supplierPartNo ? `(${item.supplierPartNo})` : ``
              }`
        }
        titleStyle={{
          color: item.loanToolNo
            ? Colors.vwgVeryDarkGray
            : (booked && booked === true) ||
              (inToolBasket && inToolBasket === true)
            ? Colors.vwgVeryDarkGray
            : Colors.vwgLinkColor,
          fontFamily: 'the-sans',
          fontSize: RFPercentage(2.1),
          fontWeight: '600'
        }}
        containerStyle={{
          backgroundColor: item.loanToolNo
            ? Colors.vwgVeryVeryLightGray
            : (booked && booked === true) ||
              (inToolBasket && inToolBasket === true)
            ? Colors.vwgVeryLightGray
            : Colors.vwgWhite
        }}
        subtitle={
          <View>
            <Text
              style={{ fontFamily: 'the-sans', fontSize: RFPercentage(2.0) }}
            >
              {item.partDescription
                ? item.partDescription
                : item.toolDescription}
            </Text>
            {item.loanToolNo ? (
              <Text
                style={{ fontFamily: 'the-sans', fontSize: RFPercentage(2.0) }}
              >{`Available through the Loan Tool Programme`}</Text>
            ) : item.location ? (
              <Text
                style={{ fontFamily: 'the-sans', fontSize: RFPercentage(2.0) }}
              >{`Storage location: ${item.location}`}</Text>
            ) : (
              <Text
                style={{ fontFamily: 'the-sans', fontSize: RFPercentage(2.0) }}
              >
                Storage location not recorded
              </Text>
            )}

            {lastJobDetails}
          </View>
        }
        bottomDivider
      />
    );
  };

  const FlatListItem = props => {
    const { item, selectItemHandler } = props;
    // console.log(props);

    let personName = '';
    let personIntId = '';
    let bookedByUser = false;
    let inToolBasket = false;
    let booked = false;
    let lastJobDetails = null;

    if (item.id && bookedToolsList && bookedToolsList.length > 0) {
      if (bookedToolsList.includes(item.id)) {
        // console.log('tool in the list', item);
        const wipObj = findWipforTool(item.id);
        // console.log('wipObj', wipObj);
        personName = wipObj && wipObj.createdBy;
        personIntId = wipObj && wipObj.userIntId.toString();
        // console.log('userIntId', userIntId);
        // console.log('personName', personName);
        // console.log('personIntId', personIntId);

        booked = true;

        if (personIntId === userIntId) {
          bookedByUser = true;
          //   console.log('Matchhhhhhhhh', bookedByUser);
          lastJobDetails = (
            <Text
              style={{
                fontFamily: 'the-sans',
                fontSize: RFPercentage(2.0),
                color: Colors.vwgWarmRed,
                fontWeight: '500'
              }}
            >
              <Text
                style={{
                  fontFamily: 'the-sans-bold',
                  fontSize: RFPercentage(2.0),
                  color: Colors.vwgWarmRed,
                  fontWeight: '600'
                }}
              >{`Already booked out to you`}</Text>
              {`, on job '${wipObj.wipNumber}'`}
            </Text>
          );
        } else {
          //   console.log('Matchhhhhhhhh', bookedByUser);
          lastJobDetails = (
            <Text
              style={{
                fontFamily: 'the-sans',
                fontSize: RFPercentage(2.0),
                color: Colors.vwgWarmRed,
                fontWeight: '500'
              }}
            >{`Booked out to ${personName}, on job '${wipObj.wipNumber}'`}</Text>
          );
        }
      } else if (toolBasketList && toolBasketList.length > 0) {
        if (toolBasketList.includes(item.id)) {
          inToolBasket = true;
          lastJobDetails = (
            <Touchable
              style={styles.toolItem}
              onPress={() => toggleBaskethandler(true)}
            >
              <Text
                style={{
                  fontFamily: 'the-sans',
                  fontSize: RFPercentage(2.0),

                  fontWeight: '500'
                }}
              >
                {`Already in your `}
                <Text
                  style={{
                    fontFamily: 'the-sans-bold',
                    fontSize: RFPercentage(2.0),
                    color: Colors.vwgLinkColor,
                    fontWeight: '600'
                  }}
                >
                  tool basket
                </Text>
              </Text>
            </Touchable>
          );
        }
      }

      // } else if (item.lastWIP && item.lastWIP.length > 0) {
      //   //   console.log('item with last wip', item);
      //   personObj = findLastBookedOutByFromTool(item);
      //   personName = personObj.name;
      //   personIntId = personObj.intId;
      //   booked = true;

      //   if (personIntId === userIntId) {
      //     bookedByUser = true;
      //     // console.log('Matchhhhhhhhh', bookedByUser);
      //     lastJobDetails = (
      //       <Text
      //         style={{
      //           fontFamily: 'the-sans',
      //           fontSize: RFPercentage(2.0),
      //           color: Colors.vwgWarmRed,
      //           fontWeight: '500'
      //         }}
      //       >
      //         <Text
      //           style={{
      //             fontFamily: 'the-sans-bold',
      //             fontSize: RFPercentage(2.0),
      //             color: Colors.vwgWarmRed,
      //             fontWeight: '600'
      //           }}
      //         >{`Already booked out to you`}</Text>
      //         {`, on job '${item.lastWIP}'`}
      //       </Text>
      //     );
      //   } else {
      //     lastJobDetails = (
      //       <Text
      //         style={{
      //           fontFamily: 'the-sans',
      //           fontSize: RFPercentage(2.0),
      //           color: Colors.vwgWarmRed,
      //           fontWeight: '500'
      //         }}
      //       >{`Booked out to ${personName}, on job '${item.lastWIP}'`}</Text>
      //     );
      //   }
    }

    return item.loanToolNo ? (
      <CustomListItem
        item={item}
        booked={booked}
        lastJobDetails={lastJobDetails}
        bookedByUser={bookedByUser}
      ></CustomListItem>
    ) : // ) : bookedByUser === true ? (
    booked && booked === true ? (
      <CustomListItem
        item={item}
        booked={booked}
        lastJobDetails={lastJobDetails}
        bookedByUser={bookedByUser}
        inToolBasket={inToolBasket}
      ></CustomListItem>
    ) : inToolBasket && inToolBasket === true ? (
      <CustomListItem
        item={item}
        booked={booked}
        lastJobDetails={lastJobDetails}
        bookedByUser={bookedByUser}
        inToolBasket={inToolBasket}
      ></CustomListItem>
    ) : (
      <Touchable
        style={styles.toolItem}
        onPress={() => selectItemHandler(item, personName)}
      >
        <CustomListItem
          item={item}
          booked={booked}
          lastJobDetails={lastJobDetails}
          bookedByUser={bookedByUser}
          inToolBasket={inToolBasket}
        ></CustomListItem>
      </Touchable>
    );
  };
  const getHeader = () => {
    return showPrompt === true ? (
      <View style={styles.searchPrompt}>
        <Text style={styles.searchPromptText}>
          {`Search for a tool then press to book it out.`}
        </Text>
      </View>
    ) : null;
  };

  useEffect(() => {
    // console.log('in use effect');
    // console.log(items[0]);
    let newList = (
      <FlatList
        data={items && items}
        renderItem={itemData => (
          <FlatListItem
            item={itemData.item}
            selectItemHandler={selectItemHandler}
          />
        )}
        keyExtractor={item => item.loanToolNo || item.id}
        ListHeaderComponent={getHeader}
      />
    );
    // console.log(newList);
    setListView(newList);
  }, [items, toolBasket]);

  //   console.log('about to render tools list');
  return listView || null;
}

const styles = StyleSheet.create({
  searchPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgDarkSkyBlue
  },
  searchPromptText: {
    textAlign: 'center',
    fontFamily: 'the-sans',
    fontSize: RFPercentage(1.8),
    color: Colors.vwgWhite
  },

  toolItem: {
    margin: 0
  }
});
