import { Navigation } from "react-native-navigation";
import { goToLogin } from "./src/components/navigation";
import registerScreens from "./src/components";

registerScreens();

Navigation.events().registerAppLaunchedListener(() => goToLogin());
