import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Card, IconButton, Appbar, Checkbox } from 'react-native-paper';
import React, { useState, useContext } from 'react';
import AppContext from '../../../components/AppContext';
import { theme } from '../../../infrastructure/theme';
import AvatarIcon from '../../../components/Avatar';

/**
 * @description This component is used to display the contacts in the new conversation screen
 * @param {*} {item} - the contact to be displayed
 * @return {*}  - returns the contact card displayed in the new conversation screen
 *
 * @param {*} {item}
 * @return {*}
 */
const NewConvoContact = ({ item }) => {
  const [clicked, setClicked] = useState(false);
  const myContext = useContext(AppContext);
  /**
   * @description This function adds the contact to the participants array in the app context
   * and sets the state of the contact card to clicked
   *
   *
   * @param {*} contact - the contact to be added to the participants array
   */
  const addParticipant = (contact) => {
    setClicked(!clicked);
    if (clicked === false) {
      myContext.participantsValue.push(contact.userName);
    } else {
      myContext.participantsValue.pop(contact.userName);
    }
    console.log(`${item.userName} plus ${clicked}`);
    console.log(myContext.participantsValue);
  };
  return (
    <Pressable onPress={() => addParticipant(item)}>
      <Card.Title
        title={item.userName}
        style={styles(clicked).card}
        key={item.userName}
        left={(props) => <AvatarIcon />}
      />
    </Pressable>
  );
};

export default NewConvoContact;

const styles = (clicked) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: clicked === true ? 'grey' : theme.colors.bg.primary,
      padding: theme.sizes[1],
      fontSize: theme.fontSizes[1],
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'black',
    },
  });
