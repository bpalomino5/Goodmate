import { Navigation } from 'react-native-navigation';

// Screens
import Login from './Login/Login';
import Home from './Home/Home';
import Drawer from '../components/shared/Drawer/Drawer';
import Rent from './Rent/Rent';
import Reminders from './Reminders/Reminders';
import Settings from './Settings/Settings';

// Home Modals
import ActivityModal from './Home/components/modals/ActivityModal';

// Rent Modals
import AddRentModal from './Rent/components/modals/AddRentModal';
import FinishRentModal from './Rent/components/modals/FinishRentModal';

// Reminders Modals
import AddReminderModal from './Reminders/components/modals/AddReminderModal';

// Settings Modals
// profile
import EditProfileModal from './Settings/components/modals/profile/EditProfileModal';
import ChangePasswordModal from './Settings/components/modals/profile/ChangePasswordModal';

// general
import RentGroupModal from './Settings/components/modals/general/RentGroup/RentGroupModal';
import FeedbackModal from './Settings/components/modals/general/FeedbackModal';
// // options
import DeleteGroupModal from './Settings/components/modals/general/RentGroup/options/DeleteGroupModal';
import LeaveGroupModal from './Settings/components/modals/general/RentGroup/options/LeaveGroupModal';
import NewPrimaryModal from './Settings/components/modals/general/RentGroup/options/NewPrimaryModal';
import RemoveMateModal from './Settings/components/modals/general/RentGroup/options/RemoveMateModal';
import JoinGroupModal from './Settings/components/modals/general/RentGroup/options/JoinGroupModal';
import OnlyCreateGroupModal from './Settings/components/modals/general/RentGroup/options/OnlyCreateGroupModal';

// Login Modals
import WelcomeModal from './Login/components/modals/signup/WelcomeModal';
import UserInfoModal from './Login/components/modals/signup/UserInfoModal';
import CreateGroupModal from './Login/components/modals/signup/CreateGroupModal';
import HelpModal from './Login/components/modals/HelpModal';

export default function registerScreens() {
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Rent', () => Rent);
  Navigation.registerComponent('Drawer', () => Drawer);
  Navigation.registerComponent('ActivityModal', () => ActivityModal);
  Navigation.registerComponent('AddRentModal', () => AddRentModal);
  Navigation.registerComponent('FinishRentModal', () => FinishRentModal);
  Navigation.registerComponent('Reminders', () => Reminders);
  Navigation.registerComponent('AddReminderModal', () => AddReminderModal);
  Navigation.registerComponent('Settings', () => Settings);
  Navigation.registerComponent('EditProfileModal', () => EditProfileModal);
  Navigation.registerComponent('ChangePasswordModal', () => ChangePasswordModal);
  Navigation.registerComponent('RentGroupModal', () => RentGroupModal);
  Navigation.registerComponent('FeedbackModal', () => FeedbackModal);
  Navigation.registerComponent('HelpModal', () => HelpModal);

  Navigation.registerComponent('WelcomeModal', () => WelcomeModal);
  Navigation.registerComponent('UserInfoModal', () => UserInfoModal);
  Navigation.registerComponent('CreateGroupModal', () => CreateGroupModal);

  Navigation.registerComponent('DeleteGroupModal', () => DeleteGroupModal);
  Navigation.registerComponent('LeaveGroupModal', () => LeaveGroupModal);
  Navigation.registerComponent('NewPrimaryModal', () => NewPrimaryModal);
  Navigation.registerComponent('RemoveMateModal', () => RemoveMateModal);
  Navigation.registerComponent('JoinGroupModal', () => JoinGroupModal);
  Navigation.registerComponent('OnlyCreateGroupModal', () => OnlyCreateGroupModal);
}
