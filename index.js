import { Navigation } from 'react-native-navigation';

import registerScreens from './src/screens';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'goodmate.Login',
    title: 'Login',
  },
});
