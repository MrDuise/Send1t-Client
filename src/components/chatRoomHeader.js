import { StyleSheet } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';

const ChatRoomHeader = ({ navigation, route }) => {
  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.BackAction
        onPress={() => {
          navigation.push('ConversationsLog');
        }}
      />
      <Appbar.Content title={route.params.title} />
    </Appbar.Header>
  );
};

export default ChatRoomHeader;

const styles = StyleSheet.create({});
