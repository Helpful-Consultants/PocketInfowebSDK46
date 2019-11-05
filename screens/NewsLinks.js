import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Image, ScrollView, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import placeholderImage from '../assets/images/robot-prod.png';

// const list = [
//   {
//     createdDate: '25/10/2019 07:39:52',
//     headline: 'VAS 6161 Verification Testing',
//     id: '25',
//     imageName: 'vas6161.png',
//     ipAddress: '86.184.244.91',
//     lastUpdated: '25/10/2019 07:52:05',
//     linkTo:
//       'https://toolsinfoweb.co.uk/content/documents/inventory/11/Rotronics_VAS_6161_Support.pdf',
//     newsType: 'News',
//     newstext:
//       'To ensure your VAS 6161 is performing to factory specification it is recommended by Rotronics and Volkswagen Group that a 12 monthly verification is performed. This will help support operational demands on the tester.',
//     updatedBy: 'Simon Groves'
//   },
//   {
//     createdDate: '31/08/2018 11:20:33',
//     headline: 'Tools & Equipment: Blocked & Back Orders Oct 2019',
//     id: '4',
//     imageName: 'deliveryTruckTimings.png',
//     ipAddress: '86.188.233.41',
//     lastUpdated: '20/09/2019 08:33:08',
//     linkTo: 'https://toolsinfoweb.co.uk/?controller=stories&action=view&id=38',
//     newsType: 'News',
//     newstext:
//       'The Tools and Equipment department in AG are seeing an ever increasing demand for key inventory items, mainly diagnostic equipment. This increase in demand is having significant impact on all markets and their ability to fulfil current demand. ',
//     updatedBy: 'Lyndon Evans'
//   },
//   {
//     createdDate: '30/11/2018 12:04:18',
//     headline: 'Windows 10',
//     id: '18',
//     imageName: 'windows10Logo.png',
//     ipAddress: '86.159.21.161',
//     lastUpdated: '06/09/2019 10:35:39',
//     linkTo:
//       'https://www.toolsinfoweb.co.uk/Content/Documents/desktopBulletins/Windows%2010/Windows_10_Upgrade_Comms.pdf',
//     newsType: 'News',
//     newstext: 'Windows 10 Upgrade - Compatible VAS Diagnostic Equipment',
//     updatedBy: 'Simon Groves'
//   },
//   {
//     createdDate: '23/11/2018 09:35:35',
//     headline: 'Must Read..! Loan Tool Programme Returns',
//     id: '13',
//     imageName: 'returnsProcess20180921_180x120.png',
//     ipAddress: '83.100.207.5',
//     lastUpdated: '11/03/2019 09:19:56',
//     linkTo: '?controller=stories&action=view&id=47',
//     newsType: 'News',
//     newstext:
//       'We are constantly improving the Loan Tool Programme to ensure we have more tools available for when you need them. But we need your help to ensure the Returns Process runs smoothly.',
//     updatedBy: 'Lyndon Evans'
//   },
//   {
//     createdDate: '28/02/2019 11:00:18',
//     headline: 'Please Check the contacts we have for your site',
//     id: '21',
//     imageName: 'contactsRolodex.png',
//     ipAddress: '86.132.21.59',
//     lastUpdated: '28/02/2019 11:02:49',
//     linkTo: '?controller=dealers&action=dealerContactsCheck',
//     newsType: 'News',
//     newstext:
//       'We will soon be forcing you to check your contact details on a regular basis. Why not get ahead of the game? Please review the list of contacts that we have for your location and let us know any colleagues who have left.',
//     updatedBy: 'Simon Groves'
//   },
//   {
//     createdDate: '13/12/2018 20:51:33',
//     headline: 'VW AG Sales Catalogue',
//     id: '20',
//     imageName: 'salesCatalogueNovember2018.png',
//     ipAddress: '86.177.21.164',
//     lastUpdated: '13/12/2018 20:52:27',
//     linkTo:
//       'https://toolsinfoweb.co.uk/VW_AG_Sales_Catalogue/Catalogue_2018_December',
//     newsType: 'News',
//     newstext:
//       'All Factory-supplied Tools & Equipment is now on show inside the catalogue: a  searchable, detailed, descriptive resource  N.B. this catalogue does not work if you are using Internet Explorer.',
//     updatedBy: 'Simon Groves'
//   },
//   {
//     createdDate: '31/08/2018 11:16:33',
//     headline: 'New ordering and delivery process for special tools',
//     id: '1',
//     imageName: 'matraBoxesWarehouse.png',
//     ipAddress: '86.177.21.164',
//     lastUpdated: '08/12/2018 07:28:08',
//     linkTo: 'Content/Documents/Library/Matra_Supply_And_Order_Type.pdf',
//     newsType: 'News',
//     newstext:
//       'As of 1st January 2018, the way in which special tools are ordered was changed. This is a result of MATRA switching to being a production partner for Volkswagen Group.',
//     updatedBy: 'Simon Groves'
//   },
//   {
//     createdDate: '08/11/2018 13:37:36',
//     headline: 'VAS 6154 Aftersales Support',
//     id: '10',
//     imageName: 'VAS6154.png',
//     ipAddress: '165.225.80.226',
//     lastUpdated: '04/12/2018 14:43:41',
//     linkTo:
//       'https://toolsinfoweb.co.uk/?controller=desktopBulletins&action=list',
//     newsType: 'News',
//     newstext:
//       'There is a clear Aftersales Support process for issues involving VAS 6154. For further details, refer to the process description.',
//     updatedBy: 'Simon Groves'
//   }
// ];

export default class NewsLinks extends React.Component {
  render() {
    // console.log(this.props.items);
    const list = this.props.items || [];
    imageSource =
      'https://react-native-elements.github.io/react-native-elements/img/card.png';
    return (
      <View>
        <ScrollView>
          <Text style={styles.tipText}>
            You can scroll through these news items and touch one to open up the
            story on Tools Infoweb.
          </Text>
          {list.map((item, i) => (
            <Touchable
              onPress={() => this._handlePressDocs(item.linkTo)}
              key={i}
            >
              {/* <Card title={item.headline} image={placeholderImage}> */}
              <Card title={item.headline}>
                <Image style={styles.image} source={{ imageSource }} />
                <Text style={{ marginBottom: 10 }}>{item.newstext}</Text>
              </Card>
            </Touchable>
          ))}
        </ScrollView>
      </View>
    );
  }

  _handlePressDocs = url => {
    WebBrowser.openBrowserAsync(url);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#222'
  },
  tipText: {
    fontSize: 12,
    marginLeft: 15,
    marginTop: 3,
    marginBottom: 20
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12
  },
  optionIconContainer: {
    marginRight: 9
  },
  option: {
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 20
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
    color: '#000'
  },
  summaryText: {
    fontSize: 12,
    marginTop: 5,
    color: '#000',
    marginRight: 20
  }
});
