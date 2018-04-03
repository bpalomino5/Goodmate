import { Navigation } from 'react-native-navigation';

import Login from './Login';
import Home from './Home';
import Drawer from '../components/Drawer';
import Rents from './Rents';

import ActivityModal from '../components/ActivityModal';
import AddRentModal from '../components/AddRentModal';

export default function registerScreens() {
  Navigation.registerComponent('goodmate.Login', () => Login);
  Navigation.registerComponent('goodmate.Home', () => Home);
  Navigation.registerComponent('goodmate.Rents', () => Rents);
  Navigation.registerComponent('goodmate.Drawer', () => Drawer);
  Navigation.registerComponent('goodmate.ActivityModal', () => ActivityModal);
  Navigation.registerComponent('goodmate.AddRentModal', () => AddRentModal);
}
