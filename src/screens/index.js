import { Navigation } from 'react-native-navigation';

import Login from './Login/Login';
import Home from './Home/Home';
import Drawer from '../components/Drawer';
import Rent from './Rent/Rent';
import Reminders from './Reminders/Reminders';
import Settings from './Settings/Settings';

import ActivityModal from './Home/modals/ActivityModal';
import AddRentModal from './Rent/modals/AddRentModal';
import FinishRentModal from './Rent/modals/FinishRentModal';
import AddReminderModal from './Reminders/modals/AddReminderModal';
import HelpModal from './Login/modals/HelpModal';

import EditProfileModal from './Settings/modals/EditProfileModal';
import ChangePasswordModal from './Settings/modals/ChangePasswordModal';
import RentGroupModal from './Settings/modals/RentGroupModal';
import FeedbackModal from './Settings/modals/FeedbackModal';

import DeleteGroupModal from './Settings/modals/options/DeleteGroupModal';
import LeaveGroupModal from './Settings/modals/options/LeaveGroupModal';
import NewPrimaryModal from './Settings/modals/options/NewPrimaryModal';
import RemoveMateModal from './Settings/modals/options/RemoveMateModal';
import JoinGroupModal from './Settings/modals/options/JoinGroupModal';
import OnlyCreateGroupModal from './Settings/modals/options/OnlyCreateGroupModal';

import WelcomeModal from './Login/modals/signup/WelcomeModal';
import UserInfoModal from './Login/modals/signup/UserInfoModal';
import CreateGroupModal from './Login/modals/signup/CreateGroupModal';

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
