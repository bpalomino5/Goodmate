import { Navigation } from 'react-native-navigation';

import Login from './Login';
import Home from './Home';
import Drawer from '../components/Drawer';
import Rent from './Rent';
import Reminders from './Reminders';
import Settings from './Settings';

import ActivityModal from './modals/ActivityModal';
import AddRentModal from './modals/AddRentModal';
import AddReminderModal from './modals/AddReminderModal';

import EditProfileModal from './modals/EditProfileModal';
import ChangePasswordModal from './modals/ChangePasswordModal';
import RentGroupModal from './modals/RentGroupModal';
import FeedbackModal from './modals/FeedbackModal';
import HelpModal from './modals/HelpModal';

import WelcomeModal from './modals/signup/WelcomeModal';
import UserInfoModal from './modals/signup/UserInfoModal';
import CreateGroupModal from './modals/signup/CreateGroupModal';

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
  Navigation.registerComponent('goodmate.FeedbackModal', () => FeedbackModal);
  Navigation.registerComponent('goodmate.HelpModal', () => HelpModal);

  Navigation.registerComponent('goodmate.WelcomeModal', () => WelcomeModal);
  Navigation.registerComponent('goodmate.UserInfoModal', () => UserInfoModal);
  Navigation.registerComponent('goodmate.CreateGroupModal', () => CreateGroupModal);
}
