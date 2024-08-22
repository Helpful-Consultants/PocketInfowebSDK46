import { Platform } from 'react-native';

const tintColor = '#2f95dc';
const errorText = '#a9043f';
const vwgLinkColor = Platform.OS === 'ios' ? '#00A1D0' : '#0288D1';
const vwgHeaderColor = Platform.OS === 'ios' ? '#FFFFFF' : '#196F99';
// const vwgTitleColor = Platform.OS === 'ios' ? '#000000' : '#FFFFFF';
const vwgTitleColor = Platform.OS === 'ios' ? '#161e1e' : '#FFFFFF';
const vwgActiveLinkColor = Platform.OS === 'ios' ? '#004466' : '#004466';
const vwgInactiveLinkColor = Platform.OS === 'ios' ? '#00A1D0' : '#0288D1';
const vwgAndroidNavColor = '#3689b1';
const vwgAndroidStatusColor = '#196F99';
const vwgInfoBarColor = '#196F99';
const vwgAlertColor = '#e2a933';
const vwgBadgeAlertColor = '#e2a933';
const vwgBadgeOKColor = '#95a844';
const vwgBadgeSevereAlertColor = '#d13032';

export default {
  tintColor,
  iosBlue: 'rgba(0, 122, 125, 1)',
  vwgAlertColor: vwgAlertColor,
  vwgBadgeOKColor: vwgBadgeOKColor,
  vwgBadgeAlertColor: vwgBadgeAlertColor,
  vwgBadgeSevereAlertColor: vwgBadgeSevereAlertColor,
  vwgLink: vwgLinkColor,
  vwgHeader: vwgHeaderColor,
  vwgAndroidNav: vwgAndroidNavColor,
  vwgHeaderTitle: vwgTitleColor,
  vwgActiveLink: vwgActiveLinkColor,
  vwgInactiveLink: vwgInactiveLinkColor,
  vwgAndroidStatus: vwgAndroidStatusColor,
  vwgInfoBar: vwgInfoBarColor,
  tabIconSelected: tintColor,
  tabIconDefault: '#ccc',
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
  transparentBackground: 'rgba(0, 0, 0, 0)',
  vwgWarmOrange: '#e2a933',
  vwgCoolOrange: '#eaad00',
  vwgWarmRed: '#a9043f',
  vwgWarmPink: '#a21e4d',
  vwgDeepPurple: '#601939',
  vwgLightMintGreen: '#c2cca6',
  vwgMintGreen: '#95a844',
  vwgKhaki: '#848b00',
  vwgMidBlue: '#006384',
  vwgVeryLightSkyBlue: '#d6eff7',
  vwgLightSkyBlue: '#c6dfe7',
  vwgSkyBlue: '#80b0c8',
  vwgDarkSkyBlue: '#4777a3',
  vwgDeepBlue: '#004466',
  vwgWarmLightBlue: '#3689b1',
  vwgWarmMidBlue: '#0b4a76',
  vwgCoolLightIosBlue: '#4a9ced',
  vwgNiceBlue: '#0096da',
  vwgVeryVeryVeryLightGray: '#f6f6f6',
  vwgVeryVeryLightGray: '#f0f0f0',
  vwgVeryLightGray: '#e8e8e8',
  vwgLightGray: '#ccc',
  vwgMidGray: '#999',
  vwgMidDarkGray: '#777',
  vwgDarkGray: '#666',
  vwgVeryDarkGray: '#333',
  vwgBlack: '#000',
  vwgWhite: '#fff',
  vwgSearchBarContainer: '#fff',
  vwgSearchBarInputContainer: '#c6dfe7',
};
