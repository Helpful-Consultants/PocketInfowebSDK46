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
  //   console.log(props && width && 'in getBaseStyles, width:', width);

  const bottomTabHeight = height && height >= 1333 ? 100 : 80;

  let paddingSize =
    width >= 1024
      ? 180
      : width >= 768
      ? 140
      : width >= 411
      ? 5
      : width >= 375
      ? 5
      : 5;

  let fontFactor = scale
    ? scale >= 3.5
      ? width >= 768
        ? scale * 6
        : scale * 5
      : scale >= 3
      ? width >= 768
        ? scale * 6
        : scale * 5.5
      : scale >= 2
      ? width >= 768
        ? scale * 10
        : scale * 6
      : scale * 6
    : scale * 6;

  //   console.log('fontFactor!!!!!!!!', fontFactor);
  let baseFontSize = fontFactor * 1;
  let zzbaseFontSize =
    width >= 1024
      ? fontFactor * 1.4
      : width >= 768
      ? fontFactor * 1.3
      : width >= 411
      ? fontFactor * 1.0
      : width >= 375
      ? fontFactor * 1.0
      : fontFactor * 1;

  let baseFontSizeSmall = fontFactor * 0.9;
  let baseFontSizeSmaller = fontFactor * 0.8;
  let baseFontSizeLarge = fontFactor * 1.1;
  let baseFontSizeLarger = fontFactor * 1.2;
  let baseFontSizeLargest = fontFactor * 1.2;

  let appNameFontSize = fontFactor * 2;
  let panelTextFontSize = fontFactor * 1.1;
  let navBarFontSize = fontFactor * 1;

  let panelWidth =
    width >= 1024
      ? 500
      : width >= 768
      ? 400
      : width >= 411
      ? 360
      : width >= 375
      ? 300
      : '90%';

  let baseText = {
    fontFamily: 'the-sans',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSize,
  };
  let baseTextBold = {
    fontFamily: 'the-sans-bold',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSize,
  };
  let baseTextColoured = {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: baseFontSize,
  };
  let baseTextColouredBold = {
    fontFamily: 'the-sans-bold',
    color: Colors.vwgDeepBlue,
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
  let baseTextSmallColoured = {
    fontFamily: 'the-sans',
    color: Colors.vwgDeepBlue,
    fontSize: baseFontSizeSmall,
  };

  let baseTextlargeBold = {
    fontFamily: 'the-sans-bold',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSizeLarge,
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
  let baseLinkTextLarge = {
    fontFamily: 'the-sans',
    color: Colors.vwgLink,
    fontSize: baseFontSizeLarge,
  };
  let baseLinkTextLargeBold = {
    fontFamily: 'the-sans-bold',
    color: Colors.vwgLink,
    fontSize: baseFontSizeLarge,
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
    viewNoPadding: {
      padding: 0,
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
      //   flex: 1,
      //   paddingLeft: 10,
      //   paddingRight: 10,
      //   paddingBottom: 40,
      //   alignItems: 'center',
      //   justifyContent: 'center',
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
    panelWidth: {
      width: panelWidth,
    },
    panelNavText: {
      fontSize: panelTextFontSize,
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
        width >= 1024
          ? 180
          : width >= 768
          ? 150
          : width >= 411
          ? 120
          : width >= 375
          ? 90
          : 60,
      height:
        width >= 1024
          ? 120
          : width >= 768
          ? 100
          : width >= 411
          ? 80
          : width >= 375
          ? 60
          : 40,
      resizeMode: 'contain',
      marginTop: 0,
    },
    navBarFontSize: baseFontSizeLarger,
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
      fontSize: 8,
      textAlign: 'center',
      // paddingRight: 2
      paddingHorizontal: 0,
    },
    navBarText: {
      ...baseTextBold,
      fontSize: baseFontSizeLarge,
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
    text: {
      ...baseText,
    },
    textError: {
      ...baseText,
      color: Colors.vwgWarmRed,
    },
    textSmall: {
      ...baseTextSmall,
    },
    textColoured: {
      ...baseTextColoured,
    },
    textSmallColoured: {
      ...baseTextSmallColoured,
    },
    textSmallError: {
      ...baseTextSmall,
      color: Colors.vwgWarmRed,
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
    linkTextBoldLarge: {
      ...baseLinkTextLargeBold,
    },
    linkTextLarge: {
      ...baseLinkTextLarge,
    },
    textLeftAlignedSmall: {
      ...baseTextSmall,
      textAlign: 'left',
    },
    textLeftAligned: {
      ...baseText,
      textAlign: 'left',
    },
    textCentred: {
      ...baseText,
      textAlign: 'center',
    },
    textLeftAlignedLarge: {
      ...baseText,
      textAlign: 'left',
    },
    textReopenClosedBasket: {
      ...baseText,
      fontSize: baseFontSizeLarge,
      color: Colors.vwgWhite,
    },
    textConfirmation: {
      ...baseTextBold,
      textAlign: 'left',
      color: Colors.vwgMintGreen,
      fontSize: baseFontSizeLarger,
    },
    textLoading: {
      ...baseText,

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
    columnFlexLeft: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    rowFlexSpaceBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowFlex: {
      flexDirection: 'row',
    },
    rowFullWidth: {
      width: '100%',
    },
    rowFlexLeftPadded: {
      flexDirection: 'row',
      padding: 10,
    },
    rowBasket: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 5,
    },
    rowBasketInput: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 5,
    },
    //Highl
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
    jobSummaryText: {
      ...baseTextColouredBold,
      fontSize: baseFontSizeLarge,
      textAlign: 'left',
    },
    toolNumber: {
      ...baseLinkTextBold,
      fontSize: baseFontSizeLarge,
      textAlign: 'left',
      paddingTop: 10,
      textTransform: 'uppercase',
    },
    toolNumberSmall: {
      ...baseLinkTextBold,
      fontSize: baseFontSizeSmall,
      textAlign: 'left',
      paddingTop: 10,
      textTransform: 'uppercase',
    },
    // StatsSummary
    statsTitle: {
      ...baseTextColouredBold,
      fontSize: baseFontSize,
      //   color: 'teal',
      paddingTop: 15,
      paddingBottom: 5,
      paddingHorizontal: 10,
      marginBottom: 0,
      textAlign: 'center',
    },
    // StatsSummary
    statsText: {
      ...baseText,
      paddingHorizontal: 20,
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
    basketInputTextJob: {
      ...baseText,
      fontSize: baseFontSizeLarger,
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
    buttonClose: {
      backgroundColor: Colors.vwgDeepBlue,
      borderRadius: Platform.OS === 'ios' ? 3 : 2,
      elevation: Platform.OS === 'ios' ? 0 : 5,
    },
    buttonConfirm: {
      backgroundColor: Colors.vwgLink,
      borderRadius: Platform.OS === 'ios' ? 3 : 2,
      elevation: Platform.OS === 'ios' ? 0 : 5,
    },
    buttonCancel: {
      borderColor: Colors.vwgWarmRed,
      borderRadius: Platform.OS === 'ios' ? 3 : 0,
    },
    buttonTitle: {
      ...baseTextSmall,
      color: Colors.vwgWhite,

      textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
    },
    buttonTitleWithIcon: {
      ...baseTextSmall,
      color: Colors.vwgWhite,
      paddingLeft: 5,
      textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
    },
    buttonTitleCancel: {
      ...baseTextSmall,
      color: Colors.vwgWarmRed,

      textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
    },
    buttonTitleWithIconCancel: {
      ...baseTextSmall,
      color: Colors.vwgWarmRed,
      paddingLeft: 5,
      textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
    },
    buttonSignIn: {
      marginVertical: 20,
      marginHorizontal: paddingSize,
      backgroundColor: Colors.vwgLink,
    },
    buttonTextSignIn: {
      ...baseText,
      color: Colors.vwgWhite,
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
