import { View, StyleSheet } from 'react-native';
import React from 'react';

import { theme } from '../../../infrastructure/theme';
import { Card, Text, Avatar, Button } from 'react-native-paper';
import AvatarIcon from '../../../components/Avatar'
/**
 * Takes a conversation and displays it in a card format with the contacts name and the most recent message sent
 * Also displays the time the conversation was updated
 * Allows a user to click on the message to view the conversation in a new screen where they can reply to the message
 *
 * @return {*}
 */

//TODO: add a prop to the conversation card that will allow the user to click on the card and view the conversation
//TODO: set the message to be the last message sent in the conversation
const FriendCard = ({ friend = {}, navagation }) => {
  const {
    userName = 'JohnSmith',
    firstName = 'John',
    lastName = 'Smith',
    tagLine = 'Hello There',
    dateUpdated = '01/05/23',

  } = friend;

  // If the conversation is a group conversation, the title will be the names of all the participants
  // If the conversation is a one on one conversation, the title will be the name of the other participant

  //TODO: the one on one conversation title will need work for the second participant

  return (
    
    <Card.Title
      style={styles.card}
      title={userName}
      subtitle={tagLine}
      left={(props) => <AvatarIcon size={12} />}
      right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {navagation.navagite('ProfilePage')}} />}
    />
   
  );
};

export default FriendCard;

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