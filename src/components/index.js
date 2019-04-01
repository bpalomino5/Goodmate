import { Navigation } from "react-native-navigation";

// Screens
import Login from "./login";
import Home from "./home";
import Drawer from "./shared/drawer";
import Rent from "./rent";
import Reminders from "./reminders";
import Settings from "./settings";

// Home Modals
import ActivityModal from "./home/components/activity-modal";

// Rent Modals
import AddRentModal from "./rent/components/add-rent-modal";
import FinishRentModal from "./rent/components/finish-rent-modal";

// Reminders Modals
import AddReminderModal from "./reminders/components/add-reminder-modal";

// Settings Modals
// profile
import EditProfileModal from "./settings/components/edit-profile-modal";
import ChangePasswordModal from "./settings/components/change-password-modal";

// general
import RentGroupModal from "./settings/components/rent-group-modal";
import FeedbackModal from "./settings/components/feedback-modal";
// // options
import DeleteGroupModal from "./settings/components/delete-group-modal";
import LeaveGroupModal from "./settings/components/leave-group-modal";
import NewPrimaryModal from "./settings/components/new-primary-modal";
import RemoveMateModal from "./settings/components/remove-mate-modal";
import JoinGroupModal from "./settings/components/join-group-modal";
import OnlyCreateGroupModal from "./settings/components/only-create-group-modal";

// Login Modals
import WelcomeModal from "./login/components/welcome-modal";
import UserInfoModal from "./login/components/user-info-modal";
import CreateGroupModal from "./login/components/create-group-modal";
import HelpModal from "./login/components/help-modal";

export default function registerScreens() {
  Navigation.registerComponent("Login", () => Login);
  Navigation.registerComponent("Home", () => Home);
  Navigation.registerComponent("Rent", () => Rent);
  Navigation.registerComponent("Drawer", () => Drawer);
  Navigation.registerComponent("ActivityModal", () => ActivityModal);
  Navigation.registerComponent("AddRentModal", () => AddRentModal);
  Navigation.registerComponent("FinishRentModal", () => FinishRentModal);
  Navigation.registerComponent("Reminders", () => Reminders);
  Navigation.registerComponent("AddReminderModal", () => AddReminderModal);
  Navigation.registerComponent("Settings", () => Settings);
  Navigation.registerComponent("EditProfileModal", () => EditProfileModal);
  Navigation.registerComponent(
    "ChangePasswordModal",
    () => ChangePasswordModal
  );
  Navigation.registerComponent("RentGroupModal", () => RentGroupModal);
  Navigation.registerComponent("FeedbackModal", () => FeedbackModal);
  Navigation.registerComponent("HelpModal", () => HelpModal);

  Navigation.registerComponent("WelcomeModal", () => WelcomeModal);
  Navigation.registerComponent("UserInfoModal", () => UserInfoModal);
  Navigation.registerComponent("CreateGroupModal", () => CreateGroupModal);

  Navigation.registerComponent("DeleteGroupModal", () => DeleteGroupModal);
  Navigation.registerComponent("LeaveGroupModal", () => LeaveGroupModal);
  Navigation.registerComponent("NewPrimaryModal", () => NewPrimaryModal);
  Navigation.registerComponent("RemoveMateModal", () => RemoveMateModal);
  Navigation.registerComponent("JoinGroupModal", () => JoinGroupModal);
  Navigation.registerComponent(
    "OnlyCreateGroupModal",
    () => OnlyCreateGroupModal
  );
}
