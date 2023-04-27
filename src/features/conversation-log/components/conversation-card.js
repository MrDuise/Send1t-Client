import { View, StyleSheet, Pressable } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import { theme } from '../../../infrastructure/theme';
import { Card, Text, Avatar } from 'react-native-paper';
import AvatarIcon from '../../../components/Avatar';
import { getMessages } from '../../../infrastructure/backend/request';
import AppContext from '../../../components/AppContext';
/**
 * Takes a conversation and displays it in a card format with the contacts name and the most recent message sent
 * Also displays the time the conversation was updated
 * Allows a user to click on the message to view the conversation in a new screen where they can reply to the message
 *
 * @return {*}
 */
const ConversationCard = ({ conversation = {}, seen = false, nav }) => {
  const myContext = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [read, setRead] = useState(seen);
  const [loading, setLoading] = useState(true);
  const [headerTitle, setHeaderTitle] = useState('');
  const { participants, isGroup, dateUpdated, admin } = conversation;

  // If the conversation is a group conversation, the title will be the names of all the participants
  // If the conversation is a one on one conversation, the title will be the name of the other participant

  const setTitle = () => {
    let title = participants[0];
    if (isGroup === true) {
      title = participants.map((participant) => participant).join(', ');
      if (title.length > 20) {
        title = title.substring(0, 20) + '...';
      }
    } else {
      if (title === myContext.userNameValue) {
        title = participants[1];
      }
    }

    setHeaderTitle(title);
  };

  useEffect(() => {
    setTitle();
    setLoading(false);
  }, []);

  /**
   * Takes a conversation and navigates to the ChatRoom screen
   * Passes the conversation and messages to the ChatRoom screen
   * Passes the title of the conversation to the ChatRoom screen
   *
   * @param {*} conversation
   */
  const readConvo = (conversation) => {
    setRead(true);
    console.log('Conversation: ', conversation);
    console.log('Messages: ', messages);

    nav.push('ChatRoom', { conversation: conversation, title: headerTitle });
  };

  // If the messages are still loading, display a loading message
  // If there are no messages, display a message saying there are no messages
  if (loading) {
    return <Text>Loading...</Text>;
  }
  let displayMessage = conversation.lastMessage.message;
  if (displayMessage.length > 20) {
    displayMessage = displayMessage.substring(0, 20) + '...';
  }

  return (
    <Pressable onPress={() => readConvo(conversation)}>
      <Card.Title
        style={styles(read).card}
        title={headerTitle}
        subtitle={conversation.updatedAt}
        left={(props) => <AvatarIcon onlineStatus={true}/>}
        right={(props) => <Text {...props}>{displayMessage}</Text>}
      />
    </Pressable>
  );
};

export default ConversationCard;

const styles = (read) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor:
        read === true ? theme.colors.bg.primary : theme.colors.bg.secondary,
      padding: theme.sizes[1],
      fontSize: theme.fontSizes[1],
    },
  });
