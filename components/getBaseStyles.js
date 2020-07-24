// import React from 'react';
// import { useWindowDimensions } from 'react-native';
// import { Dimensions } from 'react-native';
// const windowWidth = useWindowDimensions().width;
// const windowHeight = useWindowDimensions().height;

// const { height, width } = Dimensions.get('window');

import { Platform, StyleSheet } from 'react-native';
// import { useWindowDimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/Colors';

// export default getBaseStyles = (props) => {
//   //   const windowWidth = useWindowDimensions().width;
//   //   const windowHeight = useWindowDimensions().height;
//   console.log(props && 'in getBaseStyles', props && props);
//   return { hi: 22 };
// };

export default getBaseStyles = (props) => {
  const { fontScale, height, scale, width } = props;

  //   console.log(props && fontScale && 'in getBaseStyles, fontScale:', fontScale);
  //   console.log(props && scale && 'in getBaseStyles, scale:', scale);
  //   console.log(props && height && 'in getBaseStyles, height:', height);
  console.log(props && width && 'in getBaseStyles, width:', width);

  const bottomTabHeight = height && height > 1333 ? 100 : 80;

  let paddingSize =
    width > 1023
      ? 180
      : width > 767
      ? 140
      : width > 413
      ? 5
      : width > 374
      ? 5
      : 5;

  let fontFactor =
    scale && scale == 1 ? scale * 7 : scale == 3 ? scale * 6 : scale * 7;

  //   console.log('fontFactor!!!!!!!!', fontFactor);

  let baseFontSizeSmaller =
    width > 1023
      ? fontFactor * 1
      : width > 767
      ? fontFactor * 1
      : width > 374
      ? fontFactor * 0.9
      : fontFactor * 0.8;

  let baseFontSizeSmall =
    width > 1023
      ? fontFactor * 1.2
      : width > 767
      ? fontFactor * 1.1
      : width > 374
      ? fontFactor * 1
      : fontFactor * 0.9;

  let baseFontSize =
    width > 1023
      ? fontFactor * 1.4
      : width > 767
      ? fontFactor * 1.3
      : width > 374
      ? fontFactor * 1.1
      : fontFactor * 1;

  let baseFontSizeLarge =
    width > 1023
      ? fontFactor * 1.5
      : width > 767
      ? fontFactor * 1.4
      : width > 374
      ? fontFactor * 1.2
      : fontFactor * 1.1;

  let baseFontSizeLarger =
    width > 1023
      ? fontFactor * 2
      : width > 767
      ? fontFactor * 1.8
      : width > 374
      ? fontFactor * 1.3
      : fontFactor * 1.2;

  let baseFontSizeLargest =
    width > 1023
      ? fontFactor * 2.2
      : width > 767
      ? fontFactor * 2
      : width > 374
      ? fontFactor * 1.5
      : fontFactor * 1.4;

  let appNameFontSize =
    width > 1023
      ? fontFactor * 3.5
      : width > 767
      ? fontFactor * 3
      : width > 413
      ? fontFactor * 2
      : width > 374
      ? fontFactor * 2.3
      : fontFactor * 1.9;

  let navBarFontSize =
    width > 1023
      ? fontFactor * 1.6
      : width > 767
      ? fontFactor * 1.3
      : width > 413
      ? fontFactor * 0.9
      : width > 374
      ? fontFactor * 0.9
      : fontFactor * 0.8;

  let baseText = {
    fontFamily: 'the-sans',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSize,
  };
  let baseTextSmall = {
    fontFamily: 'the-sans',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSizeSmall,
  };
  let baseTextSmallBold = {
    fontFamily: 'the-sans',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSizeSmall,
  };
  let baseTextColoured = {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: baseFontSize,
  };
  let baseTextBold = {
    fontFamily: 'the-sans-bold',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSize,
  };
  let baseTextColouredBold = {
    fontFamily: 'the-sans-bold',
    color: Colors.vwgDeepBlue,
    fontSize: baseFontSize,
  };
  let baseLinkText = {
    fontFamily: 'the-sans',
    color: Colors.vwgLink,
    fontSize: baseFontSize,
  };
  let baseLinkTextBold = {
    fontFamily: 'the-sans-bold',
    color: Colors.vwgLink,
    fontSize: baseFontSize,
  };

  const baseStyles = StyleSheet.create({
    container: {
      backgroundColor: Colors.vwgWhite,
    },

    // BookedOutTools
    containerFlex: {
      flex: 1,
    },
    // OdisScreen
    containerFlexCentred: {
      flex: 1,
      alignItems: 'center',
    },
    viewPaddedLeft: {
      padding: 5,
    },
    viewFlexRow: {
      flexDirection: 'row',
    },
    // OdisVersions
    containerFlexJustfied: {
      flex: 1,
      justifyContent: 'center',
    },
    // StatScreen
    containerFlexCentredJustfied: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerFlexMargin: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      marginBottom: bottomTabHeight,
    },
    containerFlexMarginTop: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      marginTop: 30,
    },
    // StatsSummary
    containerFlexPadded: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // JobsScreen BookedOutToolsScreen
    containerFlexPaddedBtm: {
      flex: 1,
      // paddingTop: 15,
      paddingBottom: 10,
    },
    containerNoMargin: {
      marginLeft: 0,
      marginRight: 0,
      marginVertical: 0,
    },
    containerSignIn: {
      marginHorizontal: paddingSize,
    },
    appName: {
      ...baseText,
      color: Colors.vwgBlack,
      fontSize: appNameFontSize,
    },

    panelAppName: {
      ...baseTextBold,
      color: Colors.vwgBlack,
      fontSize: baseFontSizeLarge,
      paddingTop: 100,
      paddingLeft: 18,
    },
    panelBrandText: {
      ...baseTextBold,
      paddingTop: 5,
      paddingLeft: 18,
    },
    panelAppInfo: {
      ...baseText,
      fontSize: baseFontSizeSmaller,
      paddingTop: 5,
      paddingLeft: 18,
    },
    appLogoContainer: {
      alignItems: 'center',
      marginTop: 0,
      marginBottom: 0,
    },
    appLogo: {
      width:
        width > 1023
          ? 180
          : width > 767
          ? 150
          : width > 413
          ? 120
          : width > 374
          ? 90
          : 60,
      height:
        width > 1023
          ? 120
          : width > 767
          ? 100
          : width > 413
          ? 80
          : width > 374
          ? 60
          : 40,
      resizeMode: 'contain',
      marginTop: 0,
    },
    // navBar
    navBarNonPaddedView: {},
    navBarPaddedView: {
      marginRight: 8,
    },
    navBarBadge: {
      // borderRadius: 12,
      height: 10,
      minWidth: 0,
      width: 10,
      backgroundColor: Colors.vwgInactiveLink,
    },
    navBarBadgeFocused: {
      // borderRadius: 12,
      height: 10,
      minWidth: 0,
      width: 10,
      backgroundColor: Colors.vwgActiveLink,
    },
    navBarBadgeContainer: {
      position: 'absolute',
      top: 0,
      right: -10,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'yellow'
    },
    navBarBadgeText: {
      ...baseTextBold,
      fontSize: 6,
      textAlign: 'center',
      // paddingRight: 2
      paddingHorizontal: 0,
    },
    navBarTextFocused: {
      ...baseText,
      color: Colors.vwgActiveLink,
      fontSize: navBarFontSize,
    },
    navBarTextNotFocused: {
      ...baseText,
      color: Colors.vwgInactiveLink,
      fontSize: navBarFontSize,
    },
    searchBarContainer: {
      backgroundColor: Colors.vwgWhite,
      height: 45,
    },
    searchBarRowRefreshButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.vwgWhite,
      padding: 10,
    },
    searchBarRowErrorText: {
      color: Colors.vwgWarmRed,
    },
    searchBarInputContainer: {
      backgroundColor: Colors.vwgVeryLightGray,
      borderColor: Colors.vwgSearchBarInputContainer,
      borderRadius: Platform.OS === 'ios' ? 10 : 20,
      height: 30,
    },
    searchBarRowSearchInput: { width: '85%' },
    searchBarRowNoDataTextContainer: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingRight: 10,
      backgroundColor: Colors.vwgWhite,
    },
    searchBarRowNoDataText: {
      ...baseText,
      color: Colors.vwgDarkSkyBlue,
    },
    searchBarRowErrorText: {
      ...baseText,
      color: Colors.vwgWarmRed,
    },
    searchBarInput: {
      ...baseText,
    },
    // DealerToolsList
    touchableNoMargin: { margin: 0 },
    screenTitleText: {
      ...baseTextBold,
      textAlign: 'justify',
      fontSize: baseFontSizeLarger,
      paddingLeft: 5,
      color: Colors.vwgHeaderTitle,
      textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
    },
    textLeftAlignedSmall: {
      ...baseTextSmall,
      textAlign: 'left',
    },
    textLeftAligned: {
      ...baseText,
      textAlign: 'left',
    },
    textLeftAlignedBold: {
      ...baseTextBold,
      textAlign: 'left',
    },
    textLoading: {
      ...baseText,
      fontSize: RFPercentage(2.5),

      // flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      marginBottom: 50,
    },
    viewloadingMessage: {
      marginTop: 50,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },

    //HighlightedDate
    date: {
      ...baseTextSmall,
      paddingTop: 5,
    },
    //HighlightedDate
    dateHighlighted: {
      ...baseTextSmallBold,
      color: Colors.vwgCoolOrange,
      paddingTop: 5,
    },
    // JobsScreen
    modal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ccc',
      padding: 100,
    },
    // StatsSummary
    statsTitle: {
      ...baseTextColouredBold,
      fontSize: baseFontSizeLarger,
      paddingVertical: 10,
      marginBottom: 0,
      textAlign: 'center',
    },
    // StatsSummary
    statsText: {
      ...baseText,
      textAlign: 'center',
    },
    // OdisScreen
    odisRow: {
      flexDirection: 'row',
      borderColor: '#000',
    },
    // OdisScreen
    // odisVersionRow: {
    //   flexDirection: 'column',
    //   padding: 5,
    //   borderColor: '#000',
    // },
    // OdisScreen
    odisVersionText: {
      ...baseText,
    },
    // OdisScreen
    odisVersionTextSmaller: {
      ...baseTextSmall,
    },
    // OdisScreen
    odisVersionTextHighlighted: {
      ...baseTextBold,
      color: Colors.vwgCoolOrange,
    },
    // OdisScreen
    brandLogo: {
      height: 50,
      width: 50,
      marginRight: 10,
    },
    // OdisScreen
    rowWithImage: {
      marginTop: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 0,
    },
    // OdisScreen
    contentImage: {
      width: 225,
      height: 70,
      resizeMode: 'contain',
      marginBottom: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    // LtpScreen JobsScreen BookedOutToolsScreen
    promptRibbon: {
      padding: 10,
      backgroundColor: Colors.vwgDarkSkyBlue,
    },
    // LtpScreen JobsScreen BookedOutToolsScreen
    noneFoundPromptRibbon: {
      padding: 10,
      backgroundColor: Colors.vwgWarmRed,
    },
    // LtpScreen JobsScreen BookedOutToolsScreen
    promptRibbonText: {
      ...baseText,
      textAlign: 'center',
      color: Colors.vwgWhite,
    },
    // LtpScreen
    containerFlexAndMargin: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      marginBottom: bottomTabHeight,
    },
    // ProductsScreen
    containerFlexAndReducedMargin: {
      flex: 1,
      marginBottom: -5,
    },
    // ProductsScreen
    item: {
      marginTop: 10,
      color: 'red',
      marginHorizontal: 10,
      paddingBottom: 10,
      borderBottomColor: Colors.vwgLightGray,
      borderTopColor: Colors.vwgWhite,
      borderLeftColor: Colors.vwgWhite,
      borderRightColor: Colors.vwgWhite,
      borderWidth: 1,
    },
    // ProductsLinks
    itemTopRow: {
      flexDirection: 'row',
      marginHorizontal: 0,
      marginBottom: 10,
    },
    // ProductsLinks
    itemTitleContainer: {
      width: '70%',
      paddingLeft: 15,
      paddingRight: 25,
    },
    // ProductsLinks
    itemTitle: {
      flexWrap: 'wrap',
      ...baseLinkTextBold,
    },
    // ProductsLinks
    // itemMainRow: {
    //   fontFamily: 'the-sans',
    //   fontSize: RFPercentage(1.8),
    //   color: Colors.vwgVeryDarkGray,
    // },
    // ProductsLinks
    itemMainText: {
      ...baseText,
      textAlign: 'justify',
    },
    //SignInScreen
    errorText: {
      ...baseTextColouredBold,
      marginTop: 5,
      marginBottom: 3,
      color: Colors.vwgWarmRed,
      fontSize: baseFontSizeLarger,
      textAlign: 'center',
      paddingHorizontal: 15,
    },
    inputContainer: {
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputStyle: {
      ...baseTextColoured,
      marginTop: 3,
      marginBottom: 3,
      color: Colors.vwgWarmMidBlue,
      fontSize: baseFontSizeLarge,
      lineHeight: 19,
      textAlign: 'left',
    },
    inputStyleSignIn: {
      ...baseTextColoured,
      marginTop: 3,
      marginBottom: 0,
      color: Colors.vwgWarmMidBlue,
      fontSize: baseFontSizeLarge,
      //   lineHeight: 19,
      textAlign: 'left',
    },
    inputLabelText: {
      ...baseTextColoured,
      marginTop: 10,
      marginBottom: 3,
      color: Colors.vwgDarkSkyBlue,
      fontSize: baseFontSizeLarger,
      lineHeight: 19,
      textAlign: 'center',
    },
    inputLabelTextSignIn: {
      ...baseTextColoured,
      marginTop: 10,
      marginBottom: 3,
      color: Colors.vwgDarkSkyBlue,
      fontSize: baseFontSize,

      textAlign: 'left',
    },
    //SignInScreen
    instructions: {
      ...baseTextColoured,
      marginHorizontal: 30,
      marginVertical: 10,
      textAlign: 'center',
      color: Colors.vwgVeryDarkGray,
    },
    //SignInScreen
    securityCheckText: {
      fontFamily: 'the-sans',
      fontFamily: 'the-sans-bold',
      marginTop: 5,
      marginBottom: 3,
      color: Colors.vwgMintGreen,
      fontSize: baseFontSizeLarger,
      textAlign: 'center',
      paddingHorizontal: 15,
    },
    //SignInScreen
    buttonSignIn: {
      marginVertical: 20,
      marginHorizontal: paddingSize,
      backgroundColor: Colors.vwgLink,
    },
    buttonTextSignIn: {
      ...baseText,
      color: Colors.vwgWhite,
    },
    text: {
      ...baseTextColoured,
    },
    textBold: {
      ...baseTextColouredBold,
    },
    linkText: {
      ...baseLinkText,
    },
    linkTextBold: {
      ...baseLinkTextBold,
    },
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.vwgWhite,
    },
  });

  //   const windowWidth = useWindowDimensions().width;
  //   const windowHeight = useWindowDimensions().height;
  //   console.log(props && 'in getBaseStyles', props && props);
  return baseStyles;
};
