import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useContext } from 'react';
import { Appbar, Menu, Searchbar } from 'react-native-paper';
import { logOut } from '../infrastructure/backend/request';
import AppContext from './AppContext';


const ConvoLogHeader = ({ navigation, route }) => {
  const myContext = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to track whether search is visible or not
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

  // Function to handle search icon click
  const handleSearchIconClick = () => {
    setIsSearchVisible(true);
  };

  // Function to handle search query change
  const handleSearchQueryChange = query => {
    setSearchQuery(query);
  };

  // Function to handle search cancel
  const handleSearchCancel = () => {
    setSearchQuery('');
    setIsSearchVisible(false);
  };

  const openMenu = () => {
    setVisible(true);
  }

  const logout = async () => {
    setVisible(false);
    await logOut();
    myContext.userNameValue = '';
    myContext.setUser(null);
    myContext.setContacts([]);
    
    navigation.push('Login');
  };

  const openProfile = () => {
    setVisible(false);
    navigation.push('Profile');
  };

  const onSearch = () => {
   console.log(searchQuery);
  };

  const closeMenu = () => setVisible(false);
  return (
    <TouchableWithoutFeedback onPress={handleSearchCancel}>
    <Appbar.Header mode="center-aligned">
      <Appbar.Content title="Conversations" />
      {isSearchVisible ? (
        <Searchbar
          placeholder="Search users"
          onChangeText={handleSearchQueryChange}
          value={searchQuery}
          onSubmitEditing={onSearch}
          autoFocus
        />
      ) : (
        <Appbar.Action icon="magnify" onPress={handleSearchIconClick} />
      )}
      {isSearchVisible && (
        <Appbar.Action icon="close" onPress={handleSearchCancel} />
      )}

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action
            icon="menu"
            color="black"
            onPress={openMenu}
          />
        }
      >
        <Menu.Item
          onPress={openProfile}
          title="Profile"
        />
        <Menu.Item onPress={logout} title="Logout" />
      </Menu>
    </Appbar.Header>
    </TouchableWithoutFeedback>
  );
};

export default ConvoLogHeader;

const styles = StyleSheet.create({});
