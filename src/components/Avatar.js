import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Badge } from 'react-native-paper';
import React, {useState} from 'react';

const AvatarIcon = ({ profilePic= "", onlineStatus = false }) => {

  return (
    <>
      {profilePic !== "" ? (
        <>
        
        <Badge size={12} style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'green' }}> </Badge>
        </>
      ) : (
        <>
        <Avatar.Icon size={32} icon="account" />
        <Badge size={12} style={styles.statusState}> </Badge>
        </>
      )}
    </>
  );
};

export default AvatarIcon;

const styles = StyleSheet.create({
    statusState: {
        position: 'absolute',
        bottom: 0,
        right: 3,
        backgroundColor: onlineStatus ? 'green' : 'red',
    }
});
