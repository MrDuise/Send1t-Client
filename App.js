import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useMemo } from 'react';
import { theme } from './src/infrastructure/theme';

import AppContext from './src/components/AppContext';

//component imports
import ConversationsLog from './src/features/conversation-log/screens/conversation-log.screen';
import Register from './src/features/register/screens/register.screen';
import WelcomePage from './src/features/welcome page/screens/welcome-page.screen';
import ConversationCard from './src/features/conversation-log/components/conversation-card';
import Login from './src/features/login/screens/login.screen';
import EditProfile from './src/features/editProfile/screens/EditProfile';

const Stack = createNativeStackNavigator();
//const Drawer = createDrawerNavigator();
//const Tab = createBottomTabNavigator();

export default function App() {
  //global state values
  const [signedIn, setSignedIn] = useState(false);
  const [userName, setUserName] = useState('');
  //const [user, setUser] = useState(null);

  const userValues = {
    signedInValue: signedIn,
    userNameValue: userName,
    setUserName,
    setSignedIn,
  };

  useMemo(() => {}, [userValues]);

  //current navigation stack does not work for nested calls
  //https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
  return (
    <NavigationContainer>
      <AppContext.Provider value={userValues}>
        <SafeAreaView style={styles.container}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={WelcomePage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
              name="ConversationsLog"
              component={ConversationsLog}
            />
            <Stack.Screen
              name="ConversationCard"
              component={ConversationCard}
            />
            <Stack.Screen name="EditProfile" component={EditProfile} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </SafeAreaView>
      </AppContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
