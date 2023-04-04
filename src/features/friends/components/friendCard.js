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
  

  const goToFriendProfile = () => {
    navigation.navigate('FriendProfile', {friend: item});
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

const styles  = StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: theme.colors.bg.primary,
      padding: theme.sizes[1],
      fontSize: theme.fontSizes[1],
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'black',
    }
  });