import { Navigation } from 'react-native-navigation';

import Login from './Login';
import Home from './Home';
import Drawer from '../components/Drawer';
import Rent from './Rent';
import Reminders from './Reminders';
import Settings from './Settings';

import ActivityModal from '../components/ActivityModal';
import AddRentModal from '../components/AddRentModal';
import AddReminderModal from '../components/AddReminderModal';

import EditProfileModal from './modals/EditProfileModal';
import ChangePasswordModal from './modals/ChangePasswordModal';
import RentGroupModal from './modals/RentGroupModal';

export default function registerScreens() {
  Navigation.registerComponent('goodmate.Login', () => Login);
  Navigation.registerComponent('goodmate.Home', () => Home);
  Navigation.registerComponent('goodmate.Rent', () => Rent);
  Navigation.registerComponent('goodmate.Drawer', () => Drawer);
  Navigation.registerComponent('goodmate.ActivityModal', () => ActivityModal);
  Navigation.registerComponent('goodmate.AddRentModal', () => AddRentModal);
  Navigation.registerComponent('goodmate.Reminders', () => Reminders);
  Navigation.registerComponent('goodmate.AddReminderModal', () => AddReminderModal);
  Navigation.registerComponent('goodmate.Settings', () => Settings);
  Navigation.registerComponent('goodmate.EditProfileModal', () => EditProfileModal);
  Navigation.registerComponent('goodmate.ChangePasswordModal', () => ChangePasswordModal);
  Navigation.registerComponent('goodmate.RentGroupModal', () => RentGroupModal);
}
