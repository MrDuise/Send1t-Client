import React from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SideNavBar } from './src/components/SideNavBar';
import ConversationsLog from './src/features/conversation-log/screens/conversation-log.screen';
import { SideNavBar } from './components/SideNavBar';
const Drawer = createDrawerNavigator();



export const RootNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={() => <SideNavBar />}>
      <Drawer.Screen name="Home" component={ConversationsLog} />
    </Drawer.Navigator>
  );
};