import { SplashScreen } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from '../redux/configureStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import DrawerContent from '../components/DrawerContent';

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
    background: '#f6f6f6', // light grey
    surface: '#ffffff', // white
    text: '#333333', // dark grey for text
    disabled: '#cccccc', // grey for disabled elements
    placeholder: '#888888', // lighter grey for placeholders
    backdrop: 'rgba(0,0,0,0.5)', // for modal backdrops
    onSurface: '#000000', // black for elements on surface
    button: 'rgb(181, 9, 56)',
    input: '#ebebeb', // light grey or a lighter shade of primary
  },
};

function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <Drawer drawerContent={DrawerContent}>
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: 'Home',
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
              name="search/index"
              options={{
                drawerLabel: 'Search',
                title: 'Art Institute Of Chicago',
              }}
            />
            <Drawer.Screen
              name="search/[id]"
              options={{
                drawerLabel: 'Search',
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
