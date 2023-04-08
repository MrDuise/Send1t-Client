import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../../components/AppContext';
import { theme } from '../../../infrastructure/theme';

import FriendCard from '../components/friendCard';

const FriendsList = ({ navigation }) => {
  const myContext = useContext(AppContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setFriends(myContext.user.contacts);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {myContext.user.contacts.length > 0 ? (
          friends.map((contact) => (
            <FriendCard item={contact} key={contact.userName} nav={navigation}/>
          ))
        ) : (
          <Text>No Contacts</Text>
        )}
      </View>
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
