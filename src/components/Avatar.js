import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Badge } from 'react-native-paper';
import React, {useState} from 'react';
/**
 * This component is used to display a users Avatar Icon with a online status
 * If the user does not have a photo, then it display a simple account Icon
 * @param {*} { profilePic = "", onlineStatus = true }
 * @return {*} 
 */
const AvatarIcon = ({ profilePic = "", onlineStatus = true, size=32 }) => {

  return (
    <>
      {profilePic !== "" ? (
        <>
        
        <Badge size={12} style={styles(onlineStatus).statusState}> </Badge>
        </>
      ) : (
        <>
        <Avatar.Icon size={size} icon="account" />
        <Badge size={size - 20} style={styles(onlineStatus).statusState}> </Badge>
        </>
      )}
    </>
  );
};

export default AvatarIcon;

const styles = (onlineStatus) => StyleSheet.create({
    statusState: {
        position: 'absolute',
        bottom: 0,
        right: 3,
        backgroundColor: onlineStatus === true ? 'green' : 'red',
    }
});
