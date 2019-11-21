import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import { Card, Image, Text } from 'react-native-elements';
import vwLogo from '../assets/images/logos/vw-logo.png';
import audiLogo from '../assets/images/logos/audi-logo.png';
import skodaLogo from '../assets/images/logos/skoda-logo.png';
import seatLogo from '../assets/images/logos/seat-logo.png';
import cvLogo from '../assets/images/logos/cv-logo.png';
// import statsGrab from '../assets/images/content/stats.jpg';

export default function StatsSummary(props) {
  //   console.log('props.statsItems');
  //   console.log(props.statsItems);
  //   console.log('props.statsItems');
  //   const items = props.items[0].brandVersions || [];
  //   console.log(props);
  const { statsObj, userDataObj } = props;

  // console.log('start statsDummyData');
  // console.log(statsDummyData);
  //   console.log('statsData', items);
  //   console.log(logoChooser);
  //   console.log('statsDummyData', statsDummyData);
  return (
    <View style={styles.container}>
      {userDataObj ? (
        <View>
          <Card>
            <View style={styles.statsRow}>
              {/* <Image
                  source={logoChooser[item.brandCode.toLowerCase()]}
                  style={styles.logo}
                /> */}
              <View>
                <Text style={styles.statsVersionText}>
                  User Name: {userDataObj.userName}
                </Text>
                <Text style={styles.statsVersionText}>
                  User ID: {userDataObj.userId}
                </Text>
                <Text style={styles.statsVersionText}>
                  Dealer Id: {userDataObj.dealerId}
                </Text>
                <Text style={styles.statsVersionText}>
                  Dealer Name: {statsObj.userName}
                </Text>

                <Card title='Mandatory Tools!'>
                  <Text style={styles.statsVersionText}>
                    {`2,556 Mandatory; ${statsObj.loggedTools} logged`}
                  </Text>
                </Card>
                <Card title='Loan Tool Usage'>
                  <Text style={styles.statsVersionText}>
                    {`99 Usage; 99 Current bookings`}
                  </Text>
                </Card>
                <Card title='Support Tickets'>
                  <Text style={styles.statsVersionText}>
                    {`${statsObj.tiwTicketsRaised} raised; ${statsObj.tiwTicketsClosed} closed`}
                  </Text>
                </Card>
                <Card title='Active Jobs'>
                  <Text style={styles.statsVersionText}>
                    `XX active; X.XX% Effectiveness`
                  </Text>
                </Card>
                <Card title='Service Measures'>
                  <Text style={styles.statsVersionText}>
                    {`${statsObj.completedServiceMeasures} active; ${statsObj.activeServiceMeasures} completed`}
                  </Text>
                </Card>
              </View>
            </View>
          </Card>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

_handlePressDocs = url => {
  WebBrowser.openBrowserAsync(url);
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 0
    // backgroundColor: '#00889d'
  },
  statsRow: {
    flexDirection: 'row',
    padding: 5,
    borderColor: '#000',
    fontSize: 12
  },
  statsVersionText: {
    fontSize: 12
  },
  logo: {
    height: 50,
    width: 50,
    marginRight: 10
  },
  contentImage: {
    // height: 50,
    width: 205,
    height: 70,
    resizeMode: 'contain',
    marginTop: 200,
    marginLeft: 'auto',
    marginRight: 'auto'
    // paddingLeft: 20,
    // paddingRight: 20
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
