import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Appbar, Menu, Provider } from 'react-native-paper';

const chatRoomHeader = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.BackAction
        onPress={() => {
          navigation.push('ConversationsLog');
        }}
      />
      <Appbar.Content title={route.params.title} />
      <Appbar.Action icon="dots-vertical" color="black" onPress={openMenu} />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="dots-vertical" color="black" onPress={openMenu} />}
      >
        <Menu.Item onPress={() => console.log('Option 1 pressed')} title="Option 1" />
        <Menu.Item onPress={() => console.log('Option 2 pressed')} title="Option 2" />
        <Menu.Item onPress={() => console.log('Option 3 pressed')} title="Option 3" />
      </Menu>
    </Appbar.Header>
    
  );
};

export default chatRoomHeader;

const styles = StyleSheet.create({});
