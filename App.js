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
import ChatRoom from './src/features/chat-page/screens/chatRoom';
import ProfilePage from './src/features/profile page/screens/profile-screen';
import AvatarSelection from './src/features/register/screens/avatar-selection';
import NewConversation from './src/features/conversation-log/screens/newConversation';
import ChatRoomHeader from './src/components/chatRoomHeader';

const Stack = createNativeStackNavigator();
//const Drawer = createDrawerNavigator();
//const Tab = createBottomTabNavigator();
/**
 * @description This is the main app component that holds the global state and the navigation
 * @return {*}  - returns the app component
 *
 * @export
 * @return {*} 
 */
export default function App() {
  //global state values
  const [signedIn, setSignedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [user, setUser] = useState({});
  const [participants, setParticipants] = useState([]);

  const userValues = {
    signedInValue: signedIn,
    userNameValue: userName,
    userValue: user,
    conversationsValue: conversations,
    activeConversationValue: activeConversation,
    participantsValue: participants,
    setUserName,
    setSignedIn,
    setConversations,
    setActiveConversation,
    setUser,
    setParticipants,
  };

  useMemo(() => {}, [userValues]);
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
            <Stack.Screen name="ChatRoom" component={ChatRoom} options={({ navigation, route }) => ({header: () => 
              <ChatRoomHeader navigation={navigation} route={route} />,
             
            })} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="AvatarSelection" component={AvatarSelection} />
            <Stack.Screen name="NewConversation" component={NewConversation} />
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
