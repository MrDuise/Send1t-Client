import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext } from 'react';
import { Appbar, Menu, Searchbar } from 'react-native-paper';
import { logOut, seachForUser } from '../infrastructure/backend/request';
import AppContext from './AppContext';
import SearchResults from './searchResults';


const ConvoLogHeader = ({ navigation, route }) => {
  const myContext = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to track whether search is visible or not
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query
  const [searchResults, setSearchResults] = useState([]); // State to store search results


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
    myContext.setUserName('');
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
    const searchResult = seachForUser(searchQuery);

    if(searchResult.message !== "User not found"){
      setSearchQuery('');
      setSearchResults(searchResult);
    } else {
      const notFound = "0 results";
      setSearchResults(notFound)
    }
  };

  const closeMenu = () => setVisible(false);
  return (
    <TouchableWithoutFeedback onPress={handleSearchCancel}>
       <React.Fragment>
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
    {searchResults.length > 0 && (
          <SearchResults results={searchResults} />
        )}
         </React.Fragment>
    </TouchableWithoutFeedback>
   
  );
};

export default ConvoLogHeader;

const styles = StyleSheet.create({});
