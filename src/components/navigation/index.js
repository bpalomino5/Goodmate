import { Navigation } from 'react-native-navigation';

export const goToHome = () => Navigation.setRoot({
  root: {
    sideMenu: {
      left: {
        component: {
          name: 'goodmate.Drawer',
          options: {
            topBar: {
              visible: false,
              height: 0,
            },
          },
        },
      },
      center: {
        stack: {
          id: 'Stack',
          children: [
            {
              component: {
                name: 'goodmate.Home',
                options: {
                  topBar: {
                    visible: false,
                    height: 0,
                  },
                },
              },
              options: {
                layout: ['portrait'],
              },
            },
          ],
        },
      },
    },
  },
});

export const goToLogin = () => Navigation.setRoot({
  root: {
    sideMenu: {
      center: {
        stack: {
          id: 'Stack',
          children: [
            {
              component: {
                name: 'goodmate.Login',
                options: {
                  topBar: {
                    visible: false,
                    height: 0,
                  },
                },
              },
              options: {
                layout: ['portrait'],
              },
            },
          ],
        },
      },
    },
  },
});

export const toggleDrawer = componentId => Navigation.mergeOptions(componentId, {
  sideMenu: {
    left: {
      visible: true,
    },
  },
});
