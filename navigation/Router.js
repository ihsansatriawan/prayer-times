import { createRouter } from '@expo/ex-navigation';

import PrayerTimesScreen from '../screens/PrayerTimesScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => PrayerTimesScreen,
  rootNavigation: () => RootNavigation,
}));
