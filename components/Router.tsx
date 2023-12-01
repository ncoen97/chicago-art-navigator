import React from 'react';
import { Drawer } from 'expo-router/drawer';
import DrawerContent from './DrawerContent';

const Router = () => {
  return (
    <Drawer drawerContent={DrawerContent}>
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
  );
};

export default Router;
