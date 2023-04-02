import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import {
  Appbar,
  Menu,
  Provider as PaperProvider,
  Modal,
} from 'react-native-paper';
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
import ChatRoom from './src/features/chat-page/screens/chatRoom';
import ProfilePage from './src/features/profile page/screens/profile-screen';
import AvatarSelection from './src/features/register/screens/avatar-selection';
import NewConversation from './src/features/conversation-log/screens/newConversation';
import ChatRoomHeader from './src/components/chatRoomHeader';
import ConvoLogHeader from './src/components/ConvoLogHeader';

const Stack = createNativeStackNavigator();

/**
 * @description This is the main app component that holds the global state and the navigation
 * @return {*}  - returns the app component
 *
 * @export
 * @return {*}
 */
export default function App() {
  //global state values
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [userName, setUserName] = useState('');
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [participants, setParticipants] = useState([]);

  const userValues = {
    onlineStatusValue: onlineStatus,
    userNameValue: userName,
    user: user,
    conversationsValue: conversations,
    activeConversationValue: activeConversation,
    contactsValue: contacts,
    participantsValue: participants,
    setUserName,
    setOnlineStatus,
    setConversations,
    setActiveConversation,
    setUser,
    setContacts,
    setParticipants,
  };

  useMemo(() => {}, [userValues]);
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppContext.Provider value={userValues}>
          <SafeAreaView style={styles.container}>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={WelcomePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ConversationsLog"
                component={ConversationsLog}
                options={({ navigation, route }) => ({
                  header: () => (
                    <ConvoLogHeader navigation={navigation} route={route} />
                  ),
                })}
              />
              <Stack.Screen
                name="ConversationCard"
                component={ConversationCard}
              />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen
                name="ChatRoom"
                component={ChatRoom}
                options={({ navigation, route }) => ({
                  header: () => (
                    <ChatRoomHeader navigation={navigation} route={route} />
                  ),
                })}
              />
              <Stack.Screen name="Profile" component={ProfilePage} />
              <Stack.Screen
                name="AvatarSelection"
                component={AvatarSelection}
              />
              <Stack.Screen
                name="NewConversation"
                component={NewConversation}
              />
            </Stack.Navigator>
            <StatusBar style="auto" />
          </SafeAreaView>
        </AppContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
