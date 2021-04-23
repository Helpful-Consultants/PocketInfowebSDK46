import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import InlineIcon from '../components/InlineIcon';
import Colors from '../constants/Colors';

// import moment from 'moment';
import campaignsDummyData from '../dummyData/campaignsDummyData';

export default function CampaignsList(props) {
  const windowDim = useWindowDimensions();

  const items = props.items || [];

  const FlatListItem = (props) => {
    const { item } = props;
    const baseStyles = windowDim && getBaseStyles(windowDim);
    // const { onSelectItem } = props;

    return (
      <ListItem
        title={`${item.menuText}`}
        titleStyle={baseStyles.textLeftAlignedBold}
        contentContainerStyle={baseStyles.containerNoMargin}
        bottomDivider
        subtitle={
          <View>
            <View
              style={{
                ...baseStyles.viewRowFlexCentreAligned,
                paddingLeft: 2,
                marginTop: 5,
              }}
            >
              <InlineIcon
                itemType='font-awesome'
                iconName={
                  item.status && item.status.toLowerCase() === 'c'
                    ? 'calendar-times'
                    : 'calendar-check'
                }
                iconSize={RFPercentage(2.2)}
                iconColor={
                  item.status && item.status.toLowerCase() === 'c'
                    ? Colors.vwgWarmRed
                    : Colors.vwgKhaki
                }
              />
              <Text
                style={{ ...baseStyles.textLeftAligned, paddingLeft: 8 }}
              >{`Service measure ${
                item.status && item.status.toLowerCase() === 'c'
                  ? 'closed'
                  : 'still open'
              }`}</Text>
            </View>

            <View style={baseStyles.viewRowFlexCentreAligned}>
              <InlineIcon
                itemType='font-awesome'
                iconName={item.retailerStatus ? 'praying-hands' : 'hands'}
                iconSize={RFPercentage(2)}
                iconColor={
                  item.retailerStatus ? Colors.vwgKhaki : Colors.vwgWarmRed
                }
              />
              <Text
                style={{ ...baseStyles.textLeftAligned, paddingLeft: 5 }}
              >{`Retailer actions ${
                item.retailerStatus ? 'completed' : 'not completed'
              }`}</Text>
            </View>
            <Text
              style={{ ...baseStyles.textLeftAligned, marginTop: 5 }}
            >{`Tools: ${item.toolsAffected}`}</Text>
            <Text
              style={baseStyles.textLeftAligned}
            >{`Start date: ${item.dateCreated.substr(0, 10)}`}</Text>

            <Text
              style={baseStyles.textLeftAligned}
            >{`To be completed by: ${item.expiryDate}`}</Text>
          </View>
        }
      ></ListItem>
    );
  };
  //   console.log(items && items);

  return (
    <View>
      {items && items.length > 0 ? (
        <FlatList
          data={items && items}
          renderItem={(itemData) => <FlatListItem item={itemData.item} />}
          keyExtractor={(item) => item.id}
        />
      ) : null}
    </View>
  );
}
