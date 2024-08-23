import { Platform, StyleSheet } from 'react-native';
// import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';
// import Constants from 'expo-constants';

export default getBaseStyles = (props) => {
  const { fontScale, height, scale, width } = props;

  //   console.log(props && fontScale && 'in getBaseStyles, fontScale:', fontScale);
  //   console.log(props && scale && 'in getBaseStyles, scale:', scale);
  //   console.log(props && height && 'in getBaseStyles, height:', height);
  //   console.log(props && width && 'in getBaseStyles, width:', width);
  //   console.log('in getBaseStyles, props :', props);

  const gridRows = 8;
  //   console.log('gridRows', gridRows);

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
            : scale * 8
          : scale * 8
    : scale * 8;

  let gridHeight = height
    ? gridRows && gridRows === 8
      ? height >= 1200
        ? 140
        : height >= 1024
          ? 115
          : height >= 840
            ? 115
            : height >= 720
              ? 98
              : height >= 630
                ? 80
                : 68
      : height >= 1200
        ? 160
        : height >= 1024
          ? 120
          : height >= 840
            ? 125
            : height >= 720
              ? 110
              : height >= 630
                ? 100
                : 88
    : 80;

  let gridWidth =
    scale && width
      ? scale >= 3.5
        ? width >= 768
          ? '45%'
          : '45%'
        : scale >= 3
          ? width >= 768
            ? '45%'
            : '45%'
          : scale >= 2
            ? width >= 768
              ? '37%'
              : width >= 600
                ? '45%'
                : '45%'
            : '45%'
      : '45%';

  //   console.log('gridHeight!!!!!!!!', gridHeight);
  //   console.log('gridWidth!!!!!!!!', gridWidth);
  //   console.log('fontFactor!!!!!!!!', fontFactor);

  let baseFontSize = fontFactor * 1;
  let baseFontSizeSmall =
    Platform.OS === 'ios' ? fontFactor * 0.9 : fontFactor * 0.8;
  let baseFontSizeVerySmall =
    Platform.OS === 'ios' ? fontFactor * 0.8 : fontFactor * 0.7;
  let baseFontSizeVeryVerySmall =
    Platform.OS === 'ios' ? fontFactor * 0.7 : fontFactor * 0.6;
  let baseFontSizeLarge = fontFactor * 1.1;
  let baseFontSizeVeryLarge = fontFactor * 1.2;

  let letterSpacingScale = {
    tighter: Platform.OS === 'ios' ? 0 : -0.2,
    muchTighter: Platform.OS === 'ios' ? 0 : -0.5,
    normal: Platform.OS === 'ios' ? 0 : -0.1,
    wider: Platform.OS === 'ios' ? 0 : 0.3,
  }; // Decrease the spacing between letters

  //   console.log('letterSpacingScale!!!!!!!!', letterSpacingScale);

  //   let appNameFontSize =
  //       gridRows && gridRows === 8 ? fontFactor * 1.7 : fontFactor * 2;

  let appNameFontSize =
    gridRows && gridRows === 8 ? fontFactor * 1.3 : fontFactor * 1.6;
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
    fontFamily: 'TheGroupTEXT-Regular',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSize,
  };
  let baseTextHead = {
    fontFamily: 'TheGroupHEAD-Light',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSize,
  };
  let baseTextBold = {
    fontFamily: 'TheGroupTEXT-Bold',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSize,
  };
  let baseTextColoured = {
    fontFamily: 'TheGroupTEXT-Regular',
    color: Colors.vwgDeepBlue,
    fontSize: baseFontSize,
  };
  let baseTextColouredBold = {
    fontFamily: 'TheGroupTEXT-Bold',
    color: Colors.vwgDeepBlue,
    fontSize: baseFontSize,
  };
  let baseTextColouredHead = {
    fontFamily: 'TheGroupHEAD-Light',
    color: Colors.vwgDeepBlue,
    fontSize: baseFontSize,
  };
  let baseTextSmall = {
    fontFamily: 'TheGroupTEXT-Regular',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSizeSmall,
    letterSpacing: letterSpacingScale.muchTighter,
  };
  let baseTextLarge = {
    fontFamily: 'TheGroupTEXT-Regular',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSizeLarge,
  };
  let baseTextLargeBold = {
    fontFamily: 'TheGroupTEXT-Bold',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSizeLarge,
  };
  let baseTextLargerBold = {
    fontFamily: 'TheGroupTEXT-Bold',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSizeVeryLarge,
  };
  let baseTextSmallBold = {
    fontFamily: 'TheGroupTEXT-Bold',
    color: Colors.vwgVeryDarkGray,
    fontSize: baseFontSizeSmall,
  };
  let baseTextSmallColoured = {
    fontFamily: 'TheGroupTEXT-Regular',
    color: Colors.vwgDeepBlue,
    fontSize: baseFontSizeSmall,
  };
  let baseLinkText = {
    fontFamily: 'TheGroupTEXT-Regular',
    color: Colors.vwgLink,
    fontSize: baseFontSize,
  };
  let baseLinkTextBold = {
    fontFamily: 'TheGroupTEXT-Bold',
    color: Colors.vwgLink,
    fontSize: baseFontSize,
    letterSpacing: letterSpacingScale.tighter,
  };
  let baseLinkTextSmallBold = {
    fontFamily: 'TheGroupTEXT-Bold',
    color: Colors.vwgLink,
    fontSize: baseFontSizeSmall,
    letterSpacing: letterSpacingScale.tighter,
  };

  let baseLinkTextLarge = {
    fontFamily: 'TheGroupTEXT-Regular',
    color: Colors.vwgLink,
    fontSize: baseFontSizeLarge,
    letterSpacing: letterSpacingScale.tighter,
  };
  let baseLinkTextLargeBold = {
    fontFamily: 'TheGroupTEXT-Bold',
    color: Colors.vwgLink,
    fontSize: baseFontSizeLarge,
  };

  const baseStyles = StyleSheet.create({
    paddingLeft: { paddingLeft: 12 },
    // BUTTON - START
    //SignInScreen
    backgroundImage: {
      flex: 1,
      justifyContent: 'center',
      resizeMode: 'contain',
      // resizeMode: 'cover',
    },
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
      ...baseText,
      fontSize: baseFontSizeVeryLarge,
      color: Colors.vwgWhite,
      textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
    },
    buttonTitleSmall: {
      ...baseText,
      fontSize: baseFontSize,
      color: Colors.vwgWhite,
      textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
    },
    buttonTitleWithIcon: {
      ...baseText,
      fontSize: baseFontSizeVeryLarge,
      color: Colors.vwgWhite,
      paddingLeft: 5,
      textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
    },
    buttonTitleCancel: {
      ...baseText,
      fontSize: baseFontSizeVeryLarge,
      color: Colors.vwgWarmRed,
      textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
    },
    buttonTitleWithIconCancel: {
      ...baseText,
      fontSize: baseFontSizeVeryLarge,
      color: Colors.vwgWarmRed,
      paddingLeft: 5,
      textTransform: Platform.OS === 'ios' ? 'none' : 'uppercase',
    },
    buttonSignIn: {
      marginVertical: 5,
      marginHorizontal: paddingSize,
      backgroundColor: Colors.vwgLink,
    },
    buttonTextSignIn: {
      ...baseText,
      color: Colors.vwgWhite,
    },
    // BUTTON - END
    // CONTAINER - START
    container: {
      backgroundColor: Colors.vwgWhite,
    },
    // BookedOutTools
    containerFlex: {
      flex: 1,
      backgroundColor: Colors.vwgWhite,
    },
    containerFlexCentredJustfied: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    // OdisScreen
    containerFlexCentred: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
    },
    // OdisVersions
    containerFlexJustfied: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    // StatScreen
    containerFlexCentredJustfiedGrow: {
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
      marginTop: 100,
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
      //   flex: 1,
    },
    // LtpListScreen
    containerFlexAndMargin: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      marginBottom: bottomTabHeight,
    },
    containerFlexAndReducedMargin: {
      flex: 1,
      marginBottom: -5,
    },
    // CONTAINER - END
    // IMAGE - START
    imageAppLogo: {
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

    // OdisScreen
    imageBrandLogo: {
      height: 50,
      width: 50,
      marginRight: 10,
    },
    // ElsaScreen
    inlineImageElsa: {
      width: 230,
      height: 168,
      resizeMode: 'contain',
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    // OdisScreen
    inlineImageOdis: {
      width: 225,
      height: 70,
      resizeMode: 'contain',
      marginBottom: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    // IMAGE - END
    // NAV BAR - START
    navBarFontSize: baseFontSizeVeryLarge,
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
    navBarTextBadge: {
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
    // NAV BAR - END
    // PANEL - START
    panelWidth: {
      width: panelWidth,
    },
    panelTextNav: {
      ...baseText,
      fontSize: panelTextFontSize,
      color: Colors.vwgWhite,
      fontSize: baseFontSizeVerySmall,
    },
    panelTextAppName: {
      ...baseText,
      color: Colors.vwgBlack,
      fontSize: Platform.OS === 'ios' ? baseFontSizeLarge : baseFontSizeSmall,
      textTransform: 'uppercase',
      paddingTop: 20,
    },
    panelTextBrand: {
      ...baseTextBold,
      paddingTop: 5,
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeSmall,
    },
    panelTextAppInfo: {
      ...baseText,
      fontSize: baseFontSizeVerySmall,
      paddingTop: 5,
    },
    textExtraApp: {
      ...baseText,
      fontSize: baseFontSizeVerySmall,
      paddingTop: 2,
    },
    textUpdateApp: {
      ...baseText,
      textTransform: 'uppercase',
      fontSize: baseFontSizeLarge,
      paddingTop: 2,
    },
    // PANEL - END
    // SEARCH BAR - START
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
      backgroundColor: Colors.vwgVeryVeryLightGray,
      borderColor: Colors.vwgSearchBarInputContainer,
      borderRadius: Platform.OS === 'ios' ? 10 : 20,
      height: 30,
      paddingLeft: 5,
    },
    searchBarRowSearchInput: { width: '85%' },
    searchBarRowTextNoDataContainer: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingRight: 10,
      backgroundColor: Colors.vwgWhite,
    },
    searchBarRowTextNoData: {
      ...baseText,
      color: Colors.vwgDarkSkyBlue,
      fontSize: Platform.OS === 'ios' ? baseFontSizeLarge : baseFontSizeSmall,
    },
    searchBarRowTextError: {
      ...baseText,
      color: Colors.vwgWarmRed,
      fontSize: Platform.OS === 'ios' ? baseFontSizeLarge : baseFontSizeSmall,
    },
    searchBarTextInput: {
      ...baseText,
      fontSize: Platform.OS === 'ios' ? baseFontSizeLarge : baseFontSizeSmall,
    },
    searchBarTextCancel: {
      ...baseText,
      color: Colors.vwgWarmRed,
    },
    // SEARCH BAR - END
    // DealerToolsList

    // TEXT - START

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
    textColouredBold: {
      ...baseTextColouredBold,
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeSmall,
    },
    textSmallColoured: {
      ...baseTextSmallColoured,
    },
    textSmallLight: {
      ...baseTextSmall,
      color: Colors.vwgMidDarkGray,
    },
    textSmallColouredCentred: {
      ...baseTextSmallColoured,
      textAlign: 'center',
    },
    textSmallError: {
      ...baseTextSmall,
      color: Colors.vwgWarmRed,
    },
    textColouredCentred: {
      ...baseTextColoured,
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeSmall,
      textAlign: 'center',
    },
    textLargeColouredCentred: {
      ...baseTextColoured,
      fontSize: baseFontSizeVeryLarge,
      textAlign: 'center',
    },
    textBold: {
      ...baseTextColouredBold,
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeVerySmall,
    },
    textLink: {
      ...baseLinkText,
    },
    returnLink: {
      ...baseLinkText,
      color: Colors.vwgLink,
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeVerySmall,
    },
    textLinkBold: {
      ...baseLinkTextBold,
    },
    textLinkSmallBold: {
      ...baseLinkTextSmallBold,
    },
    textLinkBoldLarge: {
      ...baseLinkTextLargeBold,
    },
    textLinkLarge: {
      ...baseLinkText,
      fontSize: Platform.OS === 'ios' ? baseFontSizeLarge : baseFontSizeSmall,
    },
    textLinkVeryLarge: {
      ...baseLinkText,
      fontSize: Platform.OS === 'ios' ? baseFontSizeVeryLarge : baseFontSize,
    },
    textLeftAligned: {
      ...baseText,
      textAlign: 'left',
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeVerySmall,
    },
    textLeftAlignedSmall: {
      ...baseTextSmall,
      fontSize:
        Platform.OS === 'ios' ? baseFontSizeSmall : baseFontSizeVerySmall,
      textAlign: 'left',
    },
    textLeftAlignedLarge: {
      ...baseTextLarge,
      textAlign: 'left',
    },
    textLoanToolNumber: {
      ...baseTextBold,
      textAlign: 'left',
      fontSize:
        Platform.OS === 'ios' ? baseFontSizeSmall : baseFontSizeVerySmall,
    },
    textLeftAlignedBold: {
      ...baseTextBold,
      textAlign: 'left',
      fontSize:
        Platform.OS === 'ios' ? baseFontSizeSmall : baseFontSizeVerySmall,
    },
    textLeftAlignedBoldSmall: {
      ...baseTextSmallBold,
      textAlign: 'left',
      fontSize:
        Platform.OS === 'ios' ? baseFontSizeSmall : baseFontSizeVerySmall,
    },
    textLeftAlignedBoldLarge: {
      ...baseTextLargeBold,
      textAlign: 'left',
      fontSize: Platform.OS === 'ios' ? baseFontSizeLarge : baseFontSize,
    },
    textLeftAlignedBoldVeryLarge: {
      ...baseTextVeryLargeBold,
      textAlign: 'left',
      fontSize:
        Platform.OS === 'ios' ? baseFontSizeVeryLarge : baseFontSizeLarge,
    },
    textCentred: {
      ...baseText,
      textAlign: 'center',
    },
    textVeryLargeCentred: {
      ...baseText,
      fontSize: baseFontSizeVeryLarge,
      textAlign: 'center',
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
      fontSize: baseFontSizeVeryLarge,
    },
    textLoading: {
      ...baseText,

      // flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      marginBottom: 50,
    },
    textLoading: {
      ...baseTextColoured,
      fontSize: baseFontSizeVeryLarge,
      textAlign: 'center',
      marginBottom: 50,
    },
    textJobSummary: {
      ...baseTextColouredBold,
      fontSize: Platform.OS === 'ios' ? baseFontSizeLarge : baseFontSizeSmall,
      textAlign: 'left',
    },
    textJobDate: {
      ...baseTextSmall,
      color: Colors.vwgMidDarkGray,
      fontSize:
        Platform.OS === 'ios' ? baseFontSizeSmall : baseFontSizeVerySmall,
      textAlign: 'left',
    },
    // StatsSummary
    textStats: {
      ...baseText,
      paddingHorizontal: 10,
      textAlign: 'center',
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeSmall,
    },
    // OdisScreen
    textOdisVersion: {
      ...baseTextBold,
      fontSize:
        Platform.OS === 'ios' ? baseFontSizeSmall : baseFontSizeVerySmall,
    },
    // OdisScreen
    textOdisVersionSmaller: {
      ...baseTextSmall,
    },
    textOdisVersionSmallerHighlighted: {
      ...baseTextSmall,
      color: Colors.vwgWarmOrange,
      fontSize:
        Platform.OS === 'ios' ? baseFontSizeSmall : baseFontSizeVerySmall,
    },
    // OdisScreen
    textOdisVersionHighlighted: {
      ...baseTextBold,
      color: Colors.vwgWarmOrange,
      fontSize:
        Platform.OS === 'ios' ? baseFontSizeSmall : baseFontSizeVerySmall,
    },
    textToolNumber: {
      ...baseLinkTextBold,
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeVerySmall,
      letterSpacing:
        Platform.OS === 'ios'
          ? letterSpacingScale.tighter
          : letterSpacingScale.muchTightertighter,
      textAlign: 'left',
    },
    partDescription: {
      ...baseText,
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeVerySmall,
    },
    // StatsSummary
    textStatsTitle: {
      ...baseTextColouredBold,
      //   color: 'teal',
      paddingTop: 15,
      paddingBottom: 5,
      paddingHorizontal: 10,
      marginBottom: 0,
      textAlign: 'center',
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeSmall,
    },
    //HighlightedDate
    textDate: {
      ...baseTextSmall,
      paddingTop: 5,
      fontSize:
        Platform.OS === 'ios' ? baseFontSizeSmall : baseFontSizeVerySmall,
    },
    //HighlightedDate
    textDateHighlighted: {
      ...baseTextSmallBold,
      color: Colors.vwgCoolOrange,
      paddingTop: 5,
      fontSize:
        Platform.OS === 'ios' ? baseFontSizeSmall : baseFontSizeVerySmall,
    },
    // LtpListScreen JobsScreen BookedOutToolsScreen
    textPromptRibbon: {
      ...baseText,
      textAlign: 'center',
      color: Colors.vwgWhite,
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeSmall,
    },

    textSectionRibbon: {
      ...baseText,
      textAlign: 'center',
      color: Colors.vwgBlack,
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeSmall,
    },
    textNoData: {
      ...baseText,
      textAlign: 'left',
      marginLeft: 5,
      color: Colors.vwgBlack,
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeSmall,
    },
    textAppName: {
      ...baseText,
      letterSpacing: letterSpacingScale.tighter,
      fontSize: appNameFontSize,
      textTransform: 'uppercase',
    },
    textItemTitle: {
      flexWrap: 'wrap',
      ...baseLinkTextBold,
      fontSize:
        Platform.OS === 'ios'
          ? width >= 1024
            ? fontFactor * 1
            : width >= 768
              ? fontFactor * 1
              : width >= 411
                ? fontFactor * 0.9
                : width >= 375
                  ? fontFactor * 0.9
                  : fontFactor * 0.9
          : width >= 1024
            ? fontFactor * 0.8
            : width >= 768
              ? fontFactor * 0.8
              : width >= 411
                ? fontFactor * 0.7
                : width >= 375
                  ? fontFactor * 0.7
                  : fontFactor * 0.7,
    },
    textItemTitleHighlighted: {
      flexWrap: 'wrap',
      ...baseLinkTextBold,
      color: Colors.vwgWarmRed,
      fontSize:
        Platform.OS === 'ios'
          ? width >= 1024
            ? fontFactor * 1
            : width >= 768
              ? fontFactor * 1
              : width >= 411
                ? fontFactor * 0.9
                : width >= 375
                  ? fontFactor * 0.9
                  : fontFactor * 0.9
          : width >= 1024
            ? fontFactor * 0.8
            : width >= 768
              ? fontFactor * 0.8
              : width >= 411
                ? fontFactor * 0.7
                : width >= 375
                  ? fontFactor * 0.7
                  : fontFactor * 0.7,
    },
    textItemMain: {
      ...baseText,
      textAlign: 'justify',
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeSmall,
    },
    //SignInScreen
    textError: {
      ...baseTextColouredBold,
      marginTop: 5,
      marginBottom: 3,
      color: Colors.vwgWarmRed,
      fontSize: baseFontSizeVeryLarge,
      textAlign: 'center',
      paddingHorizontal: 15,
    },

    textInputStyle: {
      ...baseTextColoured,
      marginTop: 3,
      marginBottom: 3,
      color: Colors.vwgWarmMidBlue,
      fontSize: baseFontSizeLarge,
      lineHeight: 19,
      textAlign: 'left',
    },
    textInputStyleSignIn: {
      ...baseTextColoured,
      marginTop: 3,
      marginBottom: 0,
      color: Colors.vwgWarmMidBlue,
      fontSize: baseFontSizeLarge,
      //   lineHeight: 19,
      textAlign: 'left',
    },
    textBasketInputJob: {
      ...baseText,
      fontSize: baseFontSizeVeryLarge,
    },
    textInputLabel: {
      ...baseTextColoured,
      marginTop: 10,
      marginBottom: 3,
      color: Colors.vwgDarkSkyBlue,
      fontSize: baseFontSizeVeryLarge,
      lineHeight: 19,
      textAlign: 'center',
    },
    textInputLabelSignIn: {
      ...baseTextColoured,
      marginTop: 10,
      marginBottom: 3,
      color: Colors.vwgDarkSkyBlue,
      fontSize: baseFontSize,

      textAlign: 'left',
    },
    //SignInScreen
    textSignedIn: {
      ...baseText,
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeSmall,
      marginTop: gridRows && gridRows === 8 ? 2 : 5,
      textAlign: 'center',
    },
    textSignedInSmall: {
      ...baseText,
      fontSize:
        Platform.OS === 'ios' ? baseFontSizeSmall : baseFontSizeVerySmall,
      marginTop: gridRows && gridRows === 8 ? 2 : 5,
      textAlign: 'center',
    },
    textInstructions: {
      ...baseText,
      marginHorizontal: 30,
      marginVertical: 10,
      textAlign: 'center',
    },
    textInstructionsSmall: {
      ...baseText,
      fontSize: baseFontSizeSmall,
      marginHorizontal: 30,
      marginVertical: 10,
      textAlign: 'center',
      color: Colors.vwgVeryDarkGray,
    },
    //SignInScreen
    textSecurityCheck: {
      ...baseTextBold,
      marginTop: 5,
      marginBottom: 3,
      color: Colors.vwgMintGreen,
      fontSize: baseFontSizeVeryLarge,
      textAlign: 'center',
      paddingHorizontal: 15,
    },
    textScreenTitle: {
      ...baseText,
      textAlign: 'justify',
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeSmall,
      paddingLeft: 5,
      color: Colors.vwgHeaderTitle,
      textTransform: Platform.OS === 'ios' ? 'uppercase' : 'uppercase',
    },
    textHomeGridCell: {
      ...baseText,
      fontSize: Platform.OS === 'ios' ? baseFontSize : baseFontSizeSmall,
      //color: gridRows === 8 ? Colors.vwgCoolOrange : Colors.vwgWhite,
      color: Colors.vwgWhite,
      lineHeight: baseFontSizeVeryLarge,
      textAlign: 'center',
    },
    textHomeGridCellCount: {
      ...baseText,
      color: Colors.vwgWhite,
      fontSize: baseFontSizeSmall,
    },
    // TEXT - END
    // TOUCHABLE - START
    touchableNoMargin: { margin: 0 },
    // TOUCHABLE - END
    // VIEW - START
    // JobsScreen
    viewModal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ccc',
      padding: 100,
    },
    viewHomeGridCell: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // width: PixelRatio.getPixelSizeForLayoutSize(50),
      //height: Platform.OS === 'ios' ? RFPercentage(14) : RFPercentage(20),
      height: gridHeight,
      borderColor: Colors.vwgDeepBlue,
      borderStyle: 'solid',
      borderWidth: 1,
      backgroundColor: Colors.vwgDeepBlue,
      margin:
        height >= 1200
          ? 5
          : height >= 1024
            ? 5
            : height >= 840
              ? 5
              : height >= 720
                ? gridRows && gridRows === 8
                  ? 4
                  : 5
                : height >= 630
                  ? gridRows && gridRows === 8
                    ? 4
                    : 5
                  : gridRows && gridRows === 8
                    ? 4
                    : 5,
      shadowColor: 'black',
      // shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      // shadowRadius: 10,
      // elevation: 5,
      shadowOpacity: Platform.OS === 'ios' ? 0 : 0.26,
      //   shadowOffset: { width: 0, height: 2 },
      shadowRadius: Platform.OS === 'ios' ? 0 : 10,
      elevation: Platform.OS === 'ios' ? 0 : 5,
      borderRadius: Platform.OS === 'ios' ? 3 : 4,
      // height: PixelRatio.getPixelSizeForLayoutSize(40),
      // width: Platform.OS === 'ios' ? RFPercentage(23.5) : RFPercentage(34),
      width: gridWidth,
    },

    viewPaddedLeft: {
      padding: 5,
    },
    viewNoPadding: {
      padding: 0,
    },
    viewLoadingMessage: {
      marginTop: 50,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    viewImageAppLogo: {
      alignItems: 'center',
      marginTop: 0,
      marginBottom: 0,
    },
    viewColumnFlexLeft: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    viewColumnFlexCentre: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    viewInputContainerSignIn: {
      alignItems: 'flex-start',
      justifyContent: 'center',

      marginBottom: 0,
    },
    viewRowFlexSpaceBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    viewRowFlex: {
      flexDirection: 'row',
    },
    viewRowFlexData: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      //   backgroundColor: 'red',
    },
    viewRowFlexCentreJustified: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    viewRowFlexCentreAligned: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewRowFlexCentreJustifiedAligned: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewRowFullWidth: {
      width: '100%',
    },
    viewRowFlexLeftPadded: {
      flexDirection: 'row',
      padding: 10,
    },
    viewRowBasket: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 5,
    },
    viewRowBasketInput: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 5,
    },
    // OdisScreen
    viewRowWithImage: {
      marginTop: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 0,
    },
    // LtpListScreen JobsScreen BookedOutToolsScreen
    viewPromptRibbon: {
      padding: 10,
      backgroundColor:
        Platform.OS === 'ios' ? Colors.vwgDarkSkyBlue : Colors.vwgInfoBar,
    },
    viewSectionRibbon: {
      padding: 5,
      backgroundColor: Colors.vwgVeryLightSkyBlue,
      flexDirection: 'row',
      borderBottomColor: Colors.vwgWhite,
      borderTopColor: Colors.vwgVeryLightSkyBlue,
      borderLeftColor: Colors.vwgVeryLightSkyBlue,
      borderRightColor: Colors.vwgVeryLightSkyBlue,
      borderWidth: 2,
    },
    viewDataList: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: Colors.vwgWhite,
    },
    viewDataListItemWithBorder: {
      paddingVertical: 5,
      backgroundColor: Colors.vwgWhite,
      borderBottomColor: Colors.vwgMidGray,
      borderTopColor: Colors.vwgWhite,
      borderLeftColor: Colors.vwgWhite,
      borderRightColor: Colors.vwgWhite,
      borderWidth: 1,
    },
    viewDataListItemNoBorder: {
      paddingVertical: 5,
      backgroundColor: Colors.vwgWhite,
      borderBottomColor: Colors.vwgWhite,
      borderTopColor: Colors.vwgWhite,
      borderLeftColor: Colors.vwgWhite,
      borderRightColor: Colors.vwgWhite,
      borderWidth: 1,
    },
    // LtpListScreen JobsScreen BookedOutToolsScreen
    viewPromptRibbonNoneFound: {
      padding: 10,
      backgroundColor: Colors.vwgWarmRed,
    },
    viewDummyDataRibbon: {
      padding: 10,
      backgroundColor: Colors.vwgWarmOrange,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopColor: Colors.vwgWhite,
      borderBottomColor: Colors.vwgWhite,
      borderTopWidth: 1,
      borderBottomWidth: 2,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    },
    // OdisScreen
    viewRowWithImage: {
      marginTop: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 0,
    },
    viewItem: {
      marginTop: 10,
      marginHorizontal: 10,
      paddingBottom: 10,
      borderBottomColor: Colors.vwgLightGray,
      borderTopColor: Colors.vwgWhite,
      borderLeftColor: Colors.vwgWhite,
      borderRightColor: Colors.vwgWhite,
      borderWidth: 1,
    },
    viewItemTitle: {
      width: '70%',
      paddingLeft: 15,
      paddingRight: 25,
    },
    viewItemTopRow: {
      flexDirection: 'row',
      marginHorizontal: 0,
      marginBottom: 10,
    },
    // VIEW - END
  });

  //   const windowWidth = useWindowDimensions().width;
  //   const windowHeight = useWindowDimensions().height;
  //   console.log(props && 'in getBaseStyles', props && props);
  return baseStyles;
};
