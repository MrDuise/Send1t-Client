import { View, StyleSheet,Pressable } from 'react-native';
import React, {useState, useEffect} from 'react';

import { theme } from '../../../infrastructure/theme';
import { Card, Text, Avatar } from 'react-native-paper';
import AvatarIcon from '../../../components/Avatar'
import { getMessages } from '../../../infrastructure/backend/request';
/**
 * Takes a conversation and displays it in a card format with the contacts name and the most recent message sent
 * Also displays the time the conversation was updated
 * Allows a user to click on the message to view the conversation in a new screen where they can reply to the message
 *
 * @return {*}
 */

//TODO: add a prop to the conversation card that will allow the user to click on the card and view the conversation
//TODO: set the message to be the last message sent in the conversation
const ConversationCard = ({ conversation = {}, seen = false }) => {
  const {
    participants = [{ userName: 'JohnSmith' }, { userName: 'MikeDo' }],
    messages = ['Hello There', 'Hey hows it going man?'],
    isGroup = false,
    dateUpdated = '01/05/23',
    admin = 'JohnSmith',
  } = conversation;

  useEffect(() => {
    const getMessagesFromAPI = async () => {
      const messages = await getMessages(conversation._id);
      setMessage(messages);
    };
    getMessagesFromAPI();
  }, []);

  

  const [message, setMessage] = useState(messages[1]);
  const [read, setRead] = useState(seen);

  const readConvo = (conversation) => {
    setRead(true);
    console.log(conversation._id);
  };

  // If the conversation is a group conversation, the title will be the names of all the participants
  // If the conversation is a one on one conversation, the title will be the name of the other participant

  //TODO: the one on one conversation title will need work for the second participant
  const title = isGroup
    ? participants.map((participant) => participant.userName).join(', ')
    : participants[0];
  return (
    <Pressable onPress={() => readConvo(conversation)}>
    <Card.Title
      style={styles(read).card}
      title={title}
      subtitle={dateUpdated}
      left={(props) => <AvatarIcon />}
      right={(props) => <Text {...props}>{messages[1]}</Text>}
    />
    </Pressable>
  );
};

export default ConversationCard;

const styles = (read) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: read === true ? theme.colors.bg.primary : theme.colors.bg.secondary,
    padding: theme.sizes[1],
    fontSize: theme.fontSizes[1],
  },
});
