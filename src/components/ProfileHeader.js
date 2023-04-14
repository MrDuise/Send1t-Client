import { StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { logOut } from '../infrastructure/backend/request';
import AppContext from './AppContext';

const ProfileHeader = ({ navigation, route }) => {
  const myContext = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  const openMenu = () => {
    setVisible(true);
  };

  const logout = async () => {
    setVisible(false);
    await logOut();
    myContext.userNameValue = '';
    myContext.setUser(null);
    myContext.setContacts([]);
    
    navigation.push('Login');
  };

  const closeMenu = () => setVisible(false);
  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.BackAction
        onPress={() => {
          navigation.navigate('ConversationsLog')
        }}
      />
      <Appbar.Content title="Profile" />

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="menu" color="black" onPress={openMenu} />}
      >
        <Menu.Item onPress={logout} title="Logout" />
      </Menu>
    </Appbar.Header>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({});
