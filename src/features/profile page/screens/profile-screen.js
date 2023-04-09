import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Avatar, Badge, Button, Appbar } from 'react-native-paper';
import AvatarIcon from '../../../components/Avatar';
import AppContext from '../../../components/AppContext';
/**
 * This screen displays the users profile information
 * This page is accessed by clicking on the profile icon in the bottom navigation bar
 * current this page is a static page and does not display any information from the database
 * @param {*} { navigation }
 * @return {*}
 */
const ProfilePage = ({ navigation }) => {
  const myContext = useContext(AppContext);
  console.log(myContext.userValue);
  /**
   * This function navigates to the friends list screen
   *
   */
  const seeFriends = () => {
    navigation.navigate('FriendsList');
  };
  /**
   *method for sending a user to the friend request screen
   *
   */
  const seeFriendRequests = () => {
    navigation.navigate('FriendRequests');
  };

  const changeStatus = () => {
    myContext.setOnlineStatus(!myContext.onlineStatusValue);
  };

  const openEditProfile = () => {
    navigation.navigate('EditProfile');
  };

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
            onlineStatus={myContext.user.status}
            size={120}
          />
        </View>
        <View style={styles.usernameHeader}>
          <Text style={styles.usernameText}>
            {myContext.user.firstName} {myContext.user.lastName}
          </Text>
        </View>
        <View style={styles.tagLine}>
          <Text style={styles.tagLineText}>
            Software Developer at XYZ Corp. I love coding and learning new
            things!
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Button
            mode="outlined"
            style={styles.optionsButton}
            labelStyle={styles.optionsButtonLabel}
            icon="pencil"
            onPress={openEditProfile}
          >
            Edit Profile
          </Button>
          <Button
            mode="outlined"
            style={styles.optionsButton}
            labelStyle={styles.optionsButtonLabel}
            icon="account-multiple"
            onPress={seeFriends}
          >
            Friends {myContext.contactsValue.length}
          </Button>
        </View>
      </View>
      <View style={styles.friendsMenu}>
        <View style={styles.friendsMenuHeader}>
          <Text style={styles.friendsMenuTitle}>
            Friends {myContext.contactsValue.length}
          </Text>
          <Button
            mode="text"
            labelStyle={{ color: '#0366d6' }}
            uppercase={false}
            onPress={seeFriendRequests}
          >
            See Friend requests
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;

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
