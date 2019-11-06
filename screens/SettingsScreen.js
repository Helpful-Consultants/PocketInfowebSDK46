import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import TitleWithAppLogo from '../components/TitleWithAppLogo';

export default function SettingsScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return <ExpoConfigView />;
}

SettingsScreen.navigationOptions = {
  headerTitle: <TitleWithAppLogo title='Settings' />
};
