import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import { theme } from '../../../infrastructure/theme';
import ConversationList from '../components/conversation-list';
/**
 *This screen will display all the conversations a user has had with other users
Handles the logic for getting the conversations from the API then passes that to the Conversation List component to display them
 *
 * @param {*} { Conversations }
 * @return {*} 
 */
const ConversationsLog = () => {
  const [Conversations, setConversations] = useState([]);
  return (
    <SafeAreaView style={styles.container}>

      <ConversationList />
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
});
