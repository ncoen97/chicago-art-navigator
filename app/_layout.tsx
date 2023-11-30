import { SplashScreen } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useRef, useState } from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from '../redux/configureStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import DrawerContent from '../components/DrawerContent';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return <RootLayoutNav />;
}

const queryClient = new QueryClient();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(181, 9, 56)', // museum's primary color
    accent: 'rgb(3, 101, 100)', // deep teal
    background: '#f6f6f6', // light gray
    backdrop: 'rgba(0,0,0,0.5)',
    input: '#ebebeb', // light gray
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token: Notifications.ExpoPushToken;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }
}

function RootLayoutNav() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('NOTIFICATION RECEIVED', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('notification response o.o', response);
    });

    return () => {
      if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
      if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <Drawer
            screenListeners={{ state: state => console.log(JSON.stringify(state)) }}
            drawerContent={DrawerContent}
          >
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: 'Search',
                title: 'Art Institute Of Chicago',
              }}
            />
            <Drawer.Screen
              name="favorites"
              options={{
                drawerLabel: 'Favorites',
                title: 'Art Institute Of Chicago',
              }}
            />
            <Drawer.Screen
              name="artwork/[id]"
              options={{
                title: 'Art Institute Of Chicago',
                drawerItemStyle: { display: 'none' },
              }}
            />
            <Drawer.Screen
              name="settings"
              options={{
                drawerLabel: 'Settings',
                title: 'Art Institute Of Chicago',
              }}
            />
            <Drawer.Screen
              name="[...missing]"
              options={{
                drawerLabel: 'Settings',
                title: 'Art Institute Of Chicago',
                drawerItemStyle: { display: 'none' },
              }}
            />
          </Drawer>
        </PaperProvider>
      </Provider>
    </QueryClientProvider>
  );
}
