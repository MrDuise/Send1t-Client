import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { Avatar, Button, Text, IconButton } from 'react-native-paper';

const avatars = [
  { name: 'avatar1', image: require('../../../../assets/avatars/avatar1.png') },
  { name: 'avatar2', image: require('../../../../assets/avatars/avatar2.png') },
  { name: 'avatar3', image: require('../../../../assets/avatars/avatar3.png') },
  { name: 'avatar4', image: require('../../../../assets/avatars/avatar4.png') },
  { name: 'avatar5', image: require('../../../../assets/avatars/avatar5.png') },
    { name: 'avatar6', image: require('../../../../assets/avatars/avatar6.png') },
];
/**
 * Screen to select an avatar for the user
 * This will be used as the profile picture
 * @param {*} navigation
 */
const AvatarSelection = ({navigation}) => {
  const [selectedAvatar, setSelectedAvatar] = useState('');

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Starter Profile Picture</Text>
      <View style={styles.avatarContainer}>
        {//flatlist to render the avatars in a grid
        }
        <FlatList
          data={avatars}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          keyExtractor={(item) => item.name}
          numColumns={3}
          renderItem={({ item }) => (
           <Pressable onPress={() => handleAvatarSelect(item)}>
            <Avatar.Image
              source={item.image}
              size={80}
              style={[
                styles.avatar,
                selectedAvatar === item && styles.selectedAvatar,
              ]}
            />
           </Pressable>
          )}
        />
        
      </View>
      <Button
        mode="contained"
        disabled={!selectedAvatar}
        onPress={() => console.log('Selected Avatar:', selectedAvatar)}
        style={styles.button}
      >
        Select Avatar
      </Button>
    </View>
  );
}

export default AvatarSelection;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarContainer: {
    rowGap: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#000',
    margin: 10,
  },
  selectedAvatar: {
    borderWidth: 4,
  },
  button: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
});
