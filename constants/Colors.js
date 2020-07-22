import { Platform } from 'react-native';

const tintColor = '#2f95dc';
const errorText = '#a9043f';
const vwgLinkColor = Platform.OS === 'ios' ? '#00A1D0' : '#0288D1';
const vwgHeaderColor = Platform.OS === 'ios' ? '#FFFFFF' : '#196F99';
const vwgTitleColor = Platform.OS === 'ios' ? '#000000' : '#FFFFFF';
const vwgActiveLinkColor = Platform.OS === 'ios' ? '#004466' : '#004466';
const vwgInactiveLinkColor = Platform.OS === 'ios' ? '#00A1D0' : '#0288D1';
const vwgAndroidNavColor = '#3689b1';
const vwgAndroidStatusColor = '#196F99';
const vwgInfoBarColor = '#196F99';

export default {
  tintColor,
  errorText,
  iosBlue: 'rgba(0, 122, 125, 1)',
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
  vwgLightSkyBlue: '#c6dfe7',
  vwgSkyBlue: '#80b0c8',
  vwgDarkSkyBlue: '#4777a3',
  vwgDeepBlue: '#004466',
  vwgWarmLightBlue: '#3689b1',
  vwgWarmMidBlue: '#0b4a76',
  vwgCoolLightIosBlue: '#4a9ced',
  vwgNiceBlue: '#0096da',
  vwgVeryVeryLightGray: '#f6f6f6',
  vwgVeryLightGray: '#f0f0f0',
  vwgLightGray: '#ccc',
  vwgMidGray: '#999',
  vwgDarkGray: '#666',
  vwgVeryDarkGray: '#333',
  vwgBlack: '#000',
  vwgWhite: '#fff',
  vwgSearchBarContainer: '#fff',
  vwgSearchBarInputContainer: '#c6dfe7',
};
