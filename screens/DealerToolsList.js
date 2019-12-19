import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import ScaledImageFinder from '../components/ScaledImageFinder';
import Colors from '../constants/Colors';
import dealerToolsDummyData from '../dummyData/dealerToolsDummyData.js';
import ltpDummyData from '../dummyData/ltpDummyData.js';

export default function DealerToolsList(props) {
  //   console.log('props');
  //   console.log(props);
  //   console.log('props end');

  //   const limit = 10;
  //   const allItems = props.items || [];
  //   //   const allItems = dealerToolsDummyData && dealerToolsDummyData;
  //   const items = allItems && allItems.slice(0, limit);

  //   const items = props.items || [];
  const {
    items,
    dealerWipsItems,
    selectItemHandler,
    showPrompt,
    userIntId
  } = props;
  //   const { selectItemHandler, showPrompt } = props;
  //   const items = dealerToolsDummyData.slice(0, limit);
  //   const items = ltpDummyData.slice(0, limit);
  //   console.log('userIntId ', userIntId);

  const [listView, setListView] = useState();

  const findLastBookedOutBy = item => {
    let lastWIP = (item.lastWIP && item.lastWIP.toString()) || '';
    // console.log('lastWIP ', lastWIP);
    // if (lastWIP === '6') {
    //   console.log(item);
    //   console.log(dealerWipsItems);
    // }

    // if (lastWIP === '6') {
    //   console.log('findLastBookedOutBy, lastWIP is ', lastWIP);
    // }
    if (lastWIP.length > 0) {
      const matchingJobs = dealerWipsItems.filter(
        item => item.wipNumber.toString() === lastWIP.toString()
      );
      //   if (lastWIP === '6') {
      //     console.log('matchingJobs', matchingJobs);
      //   }
      if (matchingJobs.length > 0) {
        const personObj = {
          intId:
            matchingJobs[0].createdBy && matchingJobs[0].userIntId.toString(),
          name: matchingJobs[0].createdBy && matchingJobs[0].createdBy
        };
        // if (lastWIP === '6') {
        //   console.log('person ', person);
        // }
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

  //   const items = dealerToolsDummyData;
  // console.log('start dealerToolsDummyData');
  //   console.log(items);
  // console.log('dealerToolsDummyData');

  //   const selectItemHandler = item => {
  //     return alert(
  //       `the user selected tool ${item.id} for job 999? ; OK; change job; cancel`
  //     );
  //   };

  const CustomListItem = props => {
    const { item, lastJobDetails, bookedByUser } = props;
    let personObj = {};
    let personName = '';
    let personIntId = '';
    if (item.lastWIP && item.lastWIP.length > 0) {
      personObj = findLastBookedOutBy(item);
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
            : `${item.loanToolNo} (${item.supplierPartNo})`
        }
        titleStyle={{
          color: bookedByUser ? Colors.vwgVeryDarkGray : Colors.vwgIosLink,
          fontSize: RFPercentage(2.1),
          fontWeight: '600'
        }}
        containerStyle={{
          backgroundColor: bookedByUser
            ? Colors.vwgVeryLightGray
            : Colors.vwgWhite
        }}
        subtitle={
          <View>
            <Text style={{ fontSize: RFPercentage(2.0) }}>
              {item.partDescription
                ? item.partDescription
                : item.toolDescription}
            </Text>
            {item.loanToolNo ? (
              <Text
                style={{ fontSize: RFPercentage(2.0) }}
              >{`Available through the Loan Tool Programme`}</Text>
            ) : item.location ? (
              <Text
                style={{ fontSize: RFPercentage(2.0) }}
              >{`Storage location: ${item.location}`}</Text>
            ) : (
              <Text style={{ fontSize: RFPercentage(2.0) }}>
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

    let personName = '';
    let personIntId = '';
    let bookedByUser = false;
    let lastJobDetails = null;

    if (item.lastWIP && item.lastWIP.length > 0) {
      personObj = findLastBookedOutBy(item);
      personName = personObj.name;
      personIntId = personObj.intId;

      if (personIntId === userIntId) {
        bookedByUser = true;
        // console.log('Matchhhhhhhhh', bookedByUser);
        lastJobDetails = (
          <Text
            style={{
              fontSize: RFPercentage(2.0),
              color: Colors.vwgWarmRed,
              fontWeight: '500'
            }}
          >{`Already out by you on job ${item.lastWIP}`}</Text>
        );
      } else {
        lastJobDetails = (
          <Text
            style={{
              fontSize: RFPercentage(2.0),
              color: Colors.vwgWarmOrange,
              fontWeight: '500'
            }}
          >{`Last booked out by ${personName}, job ${item.lastWIP}`}</Text>
        );
      }
    }

    return item.loanToolNo ? null : bookedByUser === true ? (
      <View style={styles.unavailableToolItem}>
        <CustomListItem
          item={item}
          lastJobDetails={lastJobDetails}
          bookedByUser={bookedByUser}
        ></CustomListItem>
      </View>
    ) : (
      <Touchable
        style={styles.toolItem}
        onPress={() => selectItemHandler(item, personName)}
      >
        <CustomListItem
          item={item}
          lastJobDetails={lastJobDetails}
          bookedByUser={bookedByUser}
        ></CustomListItem>
      </Touchable>
    );
  };

  useEffect(() => {
    // console.log('in use effect');
    // console.log(items[0]);
    let newList = (
      <ScrollView>
        <View>
          {showPrompt === true ? (
            <View style={styles.searchPrompt}>
              <Text style={styles.searchPromptText}>
                {`Search for a tool then press to book it out.`}
              </Text>
            </View>
          ) : null}
          <FlatList
            data={items && items}
            renderItem={itemData => (
              <FlatListItem
                item={itemData.item}
                selectItemHandler={selectItemHandler}
              />
            )}
            keyExtractor={item => item.loanToolNo || item.id}
          />
        </View>
      </ScrollView>
    );
    // console.log(newList);
    setListView(newList);
  }, [items]);

  //   console.log('about to render tools list');
  return listView || null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  },
  searchPrompt: {
    padding: 10,
    backgroundColor: Colors.vwgDarkSkyBlue
  },
  searchPromptText: {
    textAlign: 'center',
    fontSize: RFPercentage(1.8),
    color: Colors.vwgWhite
  },

  toolItem: {
    margin: 0
  },
  unavailableToolItem: {
    margin: 0,
    backgroundColor: Colors.vwgKhaki
  }
});
