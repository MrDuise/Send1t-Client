import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,

} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { theme } from '../../../infrastructure/theme';
import { Appbar, FAB } from 'react-native-paper';
import AppContext from '../../../components/AppContext';
import ConversationList from '../components/conversation-list';

import { getConversations } from '../../../infrastructure/backend/request';
/**
 *This screen will display all the conversations a user has had with other users
Handles the logic for getting the conversations from the API then passes that to the Conversation List component to display them
 *
 * @param {*} { Conversations }
 * @return {*} 
 */
const ConversationsLog = ({ navigation }) => {
  const myContext = useContext(AppContext);
  const [Conversations, setConversations] = useState([]);
  //gets the username from the context and stores it in a variable
  const userName = myContext.userNameValue;

  //gets the conversations from the API and sets the state to the conversations
  useEffect(() => {
    const getConversationsFromAPI = async () => {
      const conversations = await getConversations(userName);
      setConversations(conversations);
    };
    getConversationsFromAPI();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Conversations" />
        <Appbar.Action icon="calendar" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <ConversationList conversationsList={Conversations} nav={navigation} />
      <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate('NewConversation')} />
    </SafeAreaView>
  );
};

export default ConversationsLog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,

    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,

  }
});
