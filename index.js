import { Navigation } from 'react-native-navigation';

import registerScreens from './src/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'goodmate.Login',
        options: {
          topBar: {
            visible: false,
            title: {
              text: 'Login',
            },
          },
          layout: ['portrait'],
        },
      },
    },
  });
});

// Navigation.startSingleScreenApp({
//   screen: {
//     screen: 'goodmate.Login',
//     title: 'Login',
//     navigatorStyle: {
//       navBarHidden: true,
//     },
//   },
//   appStyle: {
//     orientation: 'portrait',
//   },
// });
