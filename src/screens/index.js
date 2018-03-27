import { Navigation } from 'react-native-navigation';

import Login from './Login';
import Home from './Home';

export default function registerScreens() {
  Navigation.registerComponent('goodmate.Login', () => Login);
  Navigation.registerComponent('goodmate.Home', () => Home);
}
