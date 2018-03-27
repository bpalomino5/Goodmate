import { Navigation } from 'react-native-navigation';

import Login from './Login';

export default function registerScreens() {
  Navigation.registerComponent('goodmate.Login', () => Login);
}
