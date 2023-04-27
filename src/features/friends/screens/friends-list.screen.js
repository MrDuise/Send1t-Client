import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../../components/AppContext';
import { theme } from '../../../infrastructure/theme';

import FriendCard from '../components/friendCard';

const FriendsList = ({ navigation }) => {
  const myContext = useContext(AppContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setFriends(myContext.contactsValue);
    console.log(friends);
  }, []);

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={friends.filter((contact) => contact.friendStatus !== 'pending')}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <FriendCard item={item} nav={navigation} />
          )}
          ListEmptyComponent={<Text>No Contacts</Text>}
        />
      </SafeAreaView>
    );
};

export default FriendsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
});
