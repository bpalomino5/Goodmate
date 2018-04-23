import { Navigation } from 'react-native-navigation';

import Login from './Login';
import Home from './Home';
import Drawer from '../components/Drawer';
import Rent from './Rent';
import Reminders from './Reminders';
import Settings from './Settings';

import ActivityModal from './modals/ActivityModal';
import AddRentModal from './modals/rent/AddRentModal';
import FinishRentModal from './modals/rent/FinishRentModal';
import AddReminderModal from './modals/AddReminderModal';
import HelpModal from './modals/HelpModal';

import EditProfileModal from './modals/settings/EditProfileModal';
import ChangePasswordModal from './modals/settings/ChangePasswordModal';
import RentGroupModal from './modals/settings/RentGroupModal';
import FeedbackModal from './modals/settings/FeedbackModal';

import DeleteGroupModal from './modals/settings/options/DeleteGroupModal';
import LeaveGroupModal from './modals/settings/options/LeaveGroupModal';
import NewPrimaryModal from './modals/settings/options/NewPrimaryModal';
import RemoveMateModal from './modals/settings/options/RemoveMateModal';
import JoinGroupModal from './modals/settings/options/JoinGroupModal';
import OnlyCreateGroupModal from './modals/settings/options/OnlyCreateGroupModal';

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
  Navigation.registerComponent('goodmate.FinishRentModal', () => FinishRentModal);
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

  Navigation.registerComponent('goodmate.DeleteGroupModal', () => DeleteGroupModal);
  Navigation.registerComponent('goodmate.LeaveGroupModal', () => LeaveGroupModal);
  Navigation.registerComponent('goodmate.NewPrimaryModal', () => NewPrimaryModal);
  Navigation.registerComponent('goodmate.RemoveMateModal', () => RemoveMateModal);
  Navigation.registerComponent('goodmate.JoinGroupModal', () => JoinGroupModal);
  Navigation.registerComponent('goodmate.OnlyCreateGroupModal', () => OnlyCreateGroupModal);
}
