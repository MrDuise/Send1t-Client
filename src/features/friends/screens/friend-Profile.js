import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Avatar, Badge, Button, Appbar } from 'react-native-paper';
import AvatarIcon from '../../../components/Avatar';
import AppContext from '../../../components/AppContext';

const sendFriendRequest = (friend) => {
  console.log('sending friend request to: ' + friend._id.userName);
};

const FriendRequestButton = ({ friend }) => {
  if (friend.friendStatus === 'pending') {
    return (
      <Button
        mode="grey"
        style={styles.optionsButton}
        labelStyle={styles.optionsButtonLabel}
        icon="account-clock"
      >
        request sent
      </Button>
    );
  } else if (friend.friendStatus === 'accepted') {
    return (
      <Button
        mode="outlined"
        style={styles.optionsButton}
        labelStyle={styles.optionsButtonLabel}
        icon="account-check"
      >
        Friends
      </Button>
    );
  } else if (friend.friendStatus === null) {
    //this means that the user is not friends with the person. need to add a search feature to search for users
    return (
      <Button
        mode="outlined"
        style={styles.optionsButton}
        labelStyle={styles.optionsButtonLabel}
        icon="account-plus"
        onPress={sendFriendRequest}
      >
        Add Friend
      </Button>
    );
  }
};

/**
 * This screen displays the users profile information
 * This page is accessed by clicking on the profile icon in the bottom navigation bar
 * current this page is a static page and does not display any information from the database
 * @param {*} { navigation }
 * @return {*}
 */
const FriendProfile = ({ navigation, route }) => {
  const myContext = useContext(AppContext);
  console.log(route.params.friend);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 30 }}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://picsum.photos/id/237/200/300',
          }}
          style={styles.image}
        />
        <View style={{ top: -60 }}>
          <AvatarIcon
            profilePic={{ uri: 'https://picsum.photos/200' }}
            onlineStatus={route.params.friend._id.status}
            size={120}
          />
        </View>
        <View style={styles.usernameHeader}>
          <Text style={styles.usernameText}>
            {route.params.friend._id.firstName}{' '}
            {route.params.friend._id.lastName}
          </Text>
        </View>
        <View style={styles.tagLine}>
          <Text style={styles.tagLineText}>{route.params.friend.tagLine}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <FriendRequestButton friend={route.params.friend} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FriendProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 350,
    height: 150,
    borderRadius: 8,
  },

  usernameHeader: {
    alignItems: 'center',
    color: 'black',
    top: -30,
  },
  usernameText: {
    fontSize: 20,
    lineHeight: 30,
    color: '#323842FF',
  },
  tagLine: {
    alignItems: 'center',
    marginTop: 10,
  },
  tagLineText: {
    width: 237,
    fontSize: 16,
    lineHeight: 26,
    color: '#9095A0FF',
  },
  optionsButton: {
    borderWidth: 1,
    borderColor: '#9095A0FF',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  optionsButtonLabel: {
    color: 'black',
    marginRight: 10,
  },
  optionsButtonIcon: {
    width: 24,
    height: 24,
    color: '#9095A0FF',
  },
  friendsMenu: {
    marginTop: 20,
  },
  friendsMenuHeader: {
    alignItems: 'center',
    backgroundColor: '#F7F8FAFF',
    height: 52,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  friendsMenuTitle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 26,
    color: '#323842FF',
  },
});
