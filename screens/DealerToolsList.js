import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';
import { Icon, ListItem } from '@rneui/themed';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';
// import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';
// import ltpDummyData from '../dummyData/ltpDummyData.js';

export default function DealerToolsList(props) {
  const windowDim = useWindowDimensions();
  const baseStyles = windowDim && getBaseStyles(windowDim);
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
    searchInput,
    showPrompt,
    userIntId,
    toggleBaskethandler,
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
  toolBasket && toolBasket.forEach((tool) => toolBasketList.push(tool.id));
  //   useEffect(() => {
  //     let list = [];

  //     toolBasket && toolBasket.forEach(tool => list.push(tool.id));

  //     // console.log(bookedToolsList && bookedToolsList);
  //     setToolBasketList(list);
  //   }, [toolBasket]);

  const findLastBookedOutByFromTool = (item) => {
    // console.log('findLastBookedOutByFromTool', item);
    let lastWIP = (item && item.lastWIP && item.lastWIP.toString()) || '';

    if (lastWIP.length > 0) {
      //   console.log('lastWIP ', lastWIP);
      const matchingJobs = dealerWipsItems.filter(
        (item) => item.wipNumber.toString() === lastWIP.toString()
      );

      if (matchingJobs.length > 0) {
        const personObj = {
          intId:
            matchingJobs[0].createdBy && matchingJobs[0].userIntId.toString(),
          name: matchingJobs[0].createdBy && matchingJobs[0].createdBy,
        };

        return personObj;
      } else {
        return {
          intId: null,
          name: '',
        };
      }
    } else {
      return {
        intId: null,
        name: '',
      };
    }
  };

  const findWipforTool = (toolId) => {
    // console.log('findWipforTool', toolId);
    // let lastWIP = (item && item.lastWIP && item.lastWIP.toString()) || '';
    let matchingJobs = [];

    toolId &&
      dealerWipsItems &&
      dealerWipsItems.forEach((wip) => {
        if (wip.tools && wip.tools.length > 0) {
          wip.tools.forEach(
            (tool) => tool.tools_id === toolId && matchingJobs.push(wip)
          );
        }
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

  const CustomListItem = (props) => {
    const { item, lastJobDetails, booked, inToolBasket } = props;
    let personObj = {};
    let personName = '';
    let personIntId = '';
    if (item.lastWIP && item.lastWIP.length > 0) {
      personObj = findLastBookedOutByFromTool(item);
      personName = personObj.name;
      personIntId = personObj.intId;
      //   console.log('personIntId ', personIntId);
    }
    // console.log(' CustomListItem - bookedByUser ', bookedByUser);
    return (
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: item.loanToolNo
            ? Colors.vwgVeryVeryVeryLightGray
            : (booked && booked === true) ||
              (inToolBasket && inToolBasket === true)
            ? Colors.vwgVeryVeryLightGray
            : Colors.vwgWhite,
        }}
      >
        <ListItem.Content>
          <ListItem.Title
            style={{
              ...baseStyles.textLinkBoldLarge,
              color: item.loanToolNo
                ? Colors.vwgVeryDarkGray
                : (booked && booked === true) ||
                  (inToolBasket && inToolBasket === true)
                ? Colors.vwgVeryDarkGray
                : Colors.vwgLink,
            }}
          >
            {item.partNumber
              ? `${item.partNumber} ${
                  (item.toolNumber && !item.partNumber) ||
                  (item.toolNumber && item.toolNumber !== item.partNumber)
                    ? `(${item.toolNumber})`
                    : ``
                }`
              : `${item.loanToolNo}${
                  (item.supplierPartNo && !item.orderPartNo) ||
                  (item.supplierPartNo &&
                    item.supplierPartNo !== item.orderPartNo)
                    ? ` - ${item.supplierPartNo}`
                    : ``
                }`}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              backgroundColor: item.loanToolNo
                ? Colors.vwgVeryVeryVeryLightGray
                : (booked && booked === true) ||
                  (inToolBasket && inToolBasket === true)
                ? Colors.vwgVeryVeryLightGray
                : Colors.vwgWhite,
              marginTop: 3,
            }}
          >
            {
              <View>
                <Text style={{ ...baseStyles.textSmall }}>
                  {item.partDescription
                    ? item.partDescription
                    : item.toolDescription}
                </Text>
                {item.loanToolNo ? (
                  <View>
                    {item.orderPartNo ? (
                      <Text style={{ ...baseStyles.text }}>
                        {item.orderPartNo}
                      </Text>
                    ) : null}
                    <Text style={{ ...baseStyles.textSmall }}>
                      Available through the Loan Tool Programme
                    </Text>
                  </View>
                ) : item.location ? (
                  <Text
                    style={{ ...baseStyles.textSmall }}
                  >{`Storage location: ${item.location}`}</Text>
                ) : (
                  <Text style={{ ...baseStyles.text }}>
                    Storage location not recorded
                  </Text>
                )}

                {lastJobDetails}
              </View>
            }
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  const FlatListItem = (props) => {
    const { item, selectItemHandler } = props;
    // console.log(props);

    let personName = '';
    let personIntId = '';
    let bookedByUser = false;
    let bookedByWip = '';
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
        bookedByWip = (wipObj && wipObj.wipNumber) || '';
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
                ...baseStyles.text,
                color: Colors.vwgWarmRed,
              }}
            >
              <Text
                style={{
                  ...baseStyles.text,
                  color: Colors.vwgWarmRed,
                }}
              >{`Already booked out to you`}</Text>
              {`, on job '${bookedByWip}'`}
            </Text>
          );
        } else {
          //   console.log('Matchhhhhhhhh', bookedByUser);
          lastJobDetails = (
            <Text
              style={{
                ...baseStyles.textSmall,
                color: Colors.vwgWarmRed,
              }}
            >{`Booked out to ${personName}, on job '${bookedByWip}'`}</Text>
          );
        }
      } else if (toolBasketList && toolBasketList.length > 0) {
        if (toolBasketList.includes(item.id)) {
          inToolBasket = true;
          lastJobDetails = (
            <Touchable
              style={baseStyles.touchableNoMargin}
              onPress={() => toggleBaskethandler(true)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    ...baseStyles.text,
                  }}
                >
                  {`Already in your `}
                </Text>
                <Ionicons
                  name={Platform.OS === 'ios' ? 'basket' : 'basket'}
                  size={13}
                  color={Colors.vwgLink}
                  iconStyle={{ marginTop: Platform.OS === 'ios' ? 2 : -1 }}
                />
                <Text
                  style={{
                    ...baseStyles.textLinkBold,
                  }}
                >
                  {` tool basket.`}
                </Text>
              </View>
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
      //           color: Colors.vwgWarmRed
      //         }}
      //       >
      //         <Text
      //           style={{
      //             fontFamily: 'the-sans-bold',
      //             fontSize: RFPercentage(2.0),
      //             color: Colors.vwgWarmRed
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
      //           color: Colors.vwgWarmRed
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
        style={baseStyles.touchableNoMargin}
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
      <View style={baseStyles.viewPromptRibbon}>
        <Text style={baseStyles.textPromptRibbon}>
          {searchInput && searchInput.length > 1
            ? `Press a tool to book it out.`
            : `Search for a tool then press to book it out.`}
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
        renderItem={(itemData) => (
          <FlatListItem
            item={itemData.item}
            selectItemHandler={selectItemHandler}
          />
        )}
        keyExtractor={(item) => item.loanToolNo || item.id}
        ListHeaderComponent={getHeader}
      />
    );
    // console.log(newList);
    setListView(newList);
  }, [items, toolBasket]);

  //   console.log('about to render tools list');
  return listView || null;
}
