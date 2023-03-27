import { View, StyleSheet, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';

import { theme } from '../../../infrastructure/theme';
import { Card, Text, Avatar } from 'react-native-paper';
import AvatarIcon from '../../../components/Avatar';
import { getMessages } from '../../../infrastructure/backend/request';
/**
 * Takes a conversation and displays it in a card format with the contacts name and the most recent message sent
 * Also displays the time the conversation was updated
 * Allows a user to click on the message to view the conversation in a new screen where they can reply to the message
 *
 * @return {*}
 */
const ConversationCard = ({ conversation = {}, seen = false, nav }) => {
  const [messages, setMessages] = useState([]);
  const [read, setRead] = useState(seen);
  const [loading, setLoading] = useState(true);
  const [headerTitle, setTitle] = useState('');
  const { participants, isGroup, dateUpdated, admin } = conversation;

  // If the conversation is a group conversation, the title will be the names of all the participants
  // If the conversation is a one on one conversation, the title will be the name of the other participant
  const title = isGroup
    ? participants.map((participant) => participant.userName).join(', ')
    : participants[0];

  useEffect(() => {
    /**
     * Gets the messages from the API and sets the messages state
     * If there are no messages, the messages state will be set to an empty array
     * If there are messages, the messages state will be set to the messages returned from the API
     * 
     *
     */
    const getMessagesFromAPI = async () => {
      const response = await getMessages(conversation._id);

      if(response === null || response.length === 0 || response === undefined){
        setMessages([]);
      }
      else if(response.length > 0) {
      setMessages(response);
      }

      //sets the loading state to false so that the component will render
      setLoading(false);
    };
    getMessagesFromAPI();

    setTitle(title);
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

    nav.push('ChatRoom', { conversation: conversation, messages: messages, title: headerTitle });
  };

  // If the messages are still loading, display a loading message
  // If there are no messages, display a message saying there are no messages
  if (loading) {
    return <Text>Loading...</Text>;
  }
  let displayMessage;
  if(messages === null || messages.length === 0 || messages === undefined){
    displayMessage = 'No messages yet';
  }
  else{
    displayMessage = messages[messages.length - 1].message;
     if (displayMessage.length > 20) {
    displayMessage = displayMessage.substring(0, 20) + '...';
  }
  }
 
 
 

  return (
    <Pressable onPress={() => readConvo(conversation)}>
      <Card.Title
        style={styles(read).card}
        title={headerTitle}
        subtitle={conversation.updatedAt}
        left={(props) => <AvatarIcon />}
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
