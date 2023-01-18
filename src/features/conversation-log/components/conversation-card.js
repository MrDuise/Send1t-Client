import { View, StyleSheet } from 'react-native';
import React from 'react';

import { theme } from '../../../infrastructure/theme';
import { Card, Text, Avatar } from 'react-native-paper';
import AvatarIcon from '../../../components/Avatar'
/**
 * Takes a conversation and displays it in a card format with the contacts name and the most recent message sent
 * Also displays the time the conversation was updated
 * Allows a user to click on the message to view the conversation in a new screen where they can reply to the message
 *
 * @return {*}
 */

const ConversationCard = ({ conversation = {} }) => {
  const {
    participants = [{ userName: 'JohnSmith' }, { userName: 'MikeDo' }],
    messages = ['Hello There', 'Hey hows it going man?'],
    isGroup = false,
    dateUpdated = '01/05/23',
    admin = 'JohnSmith',
  } = conversation;

  // If the conversation is a group conversation, the title will be the names of all the participants
  // If the conversation is a one on one conversation, the title will be the name of the other participant

  //TODO: the one on one conversation title will need work for the second participant
  const title = isGroup
    ? participants.map((participant) => participant.userName).join(', ')
    : participants[1].userName;

  return (
    <Card.Title
      style={styles.card}
      title={title}
      subtitle={dateUpdated}
      left={(props) => <AvatarIcon />}
      right={(props) => <Text {...props}>{messages[1]}</Text>}
    />
  );
};

export default ConversationCard;

const styles = StyleSheet.create({
  card: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.ui.primary,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.bg.primary,
    padding: theme.sizes[1],
    fontSize: theme.fontSizes[1],
  },
});
