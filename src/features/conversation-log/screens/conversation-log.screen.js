import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { theme } from '../../../infrastructure/theme';

import AppContext from '../../../components/AppContext';
import ConversationList from '../components/conversation-list';

import {getConversations} from '../../../infrastructure/backend/request';
/**
 *This screen will display all the conversations a user has had with other users
Handles the logic for getting the conversations from the API then passes that to the Conversation List component to display them
 *
 * @param {*} { Conversations }
 * @return {*} 
 */
const ConversationsLog = ({navigation}) => {

  const myContext = useContext(AppContext);
  const [Conversations, setConversations] = useState([]);
  const userName = myContext.userNameValue;

  useEffect(() => {
    const getConversationsFromAPI = async () => {
      const conversations = await getConversations(userName);
      setConversations(conversations);
    };
    getConversationsFromAPI();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ConversationList conversationsList = {Conversations} nav={navigation}/>
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
