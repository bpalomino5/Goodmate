import { Navigation } from 'react-native-navigation';

import Login from './Login';
import Home from './Home';
import Drawer from '../components/Drawer';
import ActivityModal from '../components/ActivityModal';
import Rents from './Rents';

export default function registerScreens() {
  Navigation.registerComponent('goodmate.Login', () => Login);
  Navigation.registerComponent('goodmate.Home', () => Home);
  Navigation.registerComponent('goodmate.Rents', () => Rents);
  Navigation.registerComponent('goodmate.Drawer', () => Drawer);
  Navigation.registerComponent('goodmate.ActivityModal', () => ActivityModal);
}
