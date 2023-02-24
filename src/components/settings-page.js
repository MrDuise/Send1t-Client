import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  IconButton,
  Colors,
  Button,
  Provider,
  Portal,
  Modal,
} from 'react-native-paper';

const { logOut } = require('../infrastructure/backend/request');
const settingsMenu = ({ navigator }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const editProfile = () => {
    navigator.navigate('EditProfile');
  };

  const logOut = async () => {
    const res = await logOut();
    navigator.navigate('Login');
  };
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Button mode="contained" onPress={editProfile}>
            Edit Profile
          </Button>

          <Button mode="contained" onPress={logOut}>
            Log Out
          </Button>
        </Modal>
      </Portal>
      <IconButton
        icon="cog"
        color={Colors.white}
        size={30}
        onPress={showModal}
      />
    </Provider>
  );
};

export default settingsMenu;
