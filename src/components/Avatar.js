import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Badge } from 'react-native-paper';
import React, { useState } from 'react';
/**
 * This component is used to display a users Avatar Icon with a online status
 * If the user does not have a photo, then it display a simple account Icon
 * @param {*} { profilePic = "", onlineStatus = true }
 * @return {*}
 */
const AvatarIcon = ({ profilePic = '', onlineStatus = true, size = 32 }) => {
  
  return (
    <View style={styles(onlineStatus, size).container}>
      {profilePic !== '' ? (
        <Avatar.Image
          source={profilePic}
          size={size}
          style={styles(onlineStatus, size).avatar}
        />
      ) : (
        <Avatar.Icon
          size={size}
          icon="account"
          style={styles(onlineStatus, size).avatar}
        />
      )}

      <Badge size={size / 6} style={styles(onlineStatus, size).statusState} />
    </View>
  );
};

export default AvatarIcon;

const styles = (onlineStatus, size) =>
  StyleSheet.create({
    container: {
      width: size,
      height: size,
      position: 'relative',
    },
    avatar: {
      flex: 1,
      borderRadius: size / 2,
    },
    statusState: {
      position: 'absolute',
      bottom: -size / 8,
      right: -size / 8,
      backgroundColor: onlineStatus === true ? 'green' : 'red',
      borderRadius: size / 4,
      borderWidth: 2,
      borderColor: '#fff',
      width: size / 4,
      height: size / 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
