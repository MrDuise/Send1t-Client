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

const NewConversation = ({ navigation }) => {
  const myContext = useContext(AppContext);

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const contacts = await getFriends();
      setContacts(contacts);
      console.log(contacts);
    };
    getContacts();
  }, []);

  const addParticipant = (contact) => {
    participants.push(contact);
    setClicked(true);
    console.log(participants);
  };

  const makeConversation = async () => {
    let isGroup = myContext.participantsValue.length > 2 ? true : false;
    console.log(myContext.participantsValue);
    const conversation = await makeNewConversation(
      myContext.participantsValue,
      isGroup
    );
    console.log(conversation);
    let headerTitle = conversation.participants[0].userName;
    myContext.participantsValue = [];
    navigation.push('ChatRoom', {
      conversation: conversation,
      messages: [],
      title: headerTitle,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Select Contacts..." />
      </Appbar.Header>
      <View>
        {contacts.length > 0 ? (
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
