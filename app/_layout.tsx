import { SplashScreen } from 'expo-router';
import { useEffect, useRef } from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from '../redux/configureStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as Notifications from 'expo-notifications';
import Router from '../components/Router';
import { registerForPushNotificationsAsync } from '../utils/notifications';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'index',
};

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

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
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
          <Router />
        </PaperProvider>
      </Provider>
    </QueryClientProvider>
  );
}
