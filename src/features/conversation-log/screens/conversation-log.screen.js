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

import {getConversations} from '../../../infrastructure/backend/request';
/**
 *This screen will display all the conversations a user has had with other users
Handles the logic for getting the conversations from the API then passes that to the Conversation List component to display them
 *
 * @param {*} { Conversations }
 * @return {*} 
 */
const ConversationsLog = ({route}) => {
  const [Conversations, setConversations] = useState([]);
  const {userName} = route.params;

  useEffect(() => {
    const getConversationsFromAPI = async () => {
      const conversations = await getConversations(JSON.stringify(userName));
      setConversations(conversations);
      conversations.map((conversation) => {
        console.log(conversation);
      });

    };
    getConversationsFromAPI();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
//this breaks because username is not being passed correctly
      <ConversationList conversationsList ={Conversations}/>
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
