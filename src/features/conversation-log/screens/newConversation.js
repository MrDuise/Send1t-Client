import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { Card, IconButton, Appbar, FAB } from 'react-native-paper';
import React, { useEffect, useState, useContext } from 'react';
import { theme } from '../../../infrastructure/theme';

import AppContext from '../../../components/AppContext';
import AvatarIcon from '../../../components/Avatar';
import NewConvoContact from '../components/newConvoContactCard';
import {
  getFriends,
  makeNewConversation,
} from '../../../infrastructure/backend/request';
/**
 * @description This screen allows the user to select contacts to add to a new conversation
 * @param {*} { navigation } allows the user to navigate to the chat screen
 * @return {*}  - returns the screen
 */
const NewConversation = ({ navigation }) => {
  const myContext = useContext(AppContext);

  const [contacts, setContacts] = useState(myContext.user.contacts);

  
 

  
/**
 * @description This function creates a new conversation and navigates to the chat screen
 * 
 *
 */
const makeConversation = async () => {
    //checks if the conversation is a group chat or not by the number of participants
    let isGroup = myContext.participantsValue.length > 2 ? true : false;
    console.log(myContext.participantsValue);
    //creates the conversation by calling the API
    const conversation = await makeNewConversation(
      myContext.participantsValue,
      isGroup
    );
    //log the new conversation for testing
    console.log(conversation);
    //sets the header title to the first participant in the conversation
    let headerTitle = conversation.participants[0].userName;
    //resets the participants array in the app context
    myContext.participantsValue = [];
    //navigates to the chat screen
    navigation.push('ChatRoom', {
      conversation: conversation,
      messages: [],
      title: headerTitle,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {myContext.user.contacts.length > 0 ? (
          contacts.map((contact) => (
            <NewConvoContact item={contact} key={contact.userName} />
          ))
        ) : (
          <Text>No Contacts</Text>
        )}
      </View>
      <FAB icon="plus" style={styles.fab} onPress={makeConversation} />
    </SafeAreaView>
  );
};

export default NewConversation;

const styles = (clicked) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.bg.primary,
    },
    card: {
      flexDirection: 'row',
      backgroundColor:
        clicked === true ? theme.colors.bg.primary : theme.colors.bg.secondary,
      padding: theme.sizes[1],
      fontSize: theme.fontSizes[1],
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 6,
    },
  });
