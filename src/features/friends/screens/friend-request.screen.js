import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';

const FriendRequestsScreen = () => {
  const [friendRequests, setFriendRequests] = useState([
    { id: '1', name: 'Friend 1' },
    { id: '2', name: 'Friend 2' },
    { id: '3', name: 'Friend 3' },
    // Add more friend requests here as needed
  ]);

  const handleAccept = (id) => {
    // Logic to accept friend request
    // Update friendRequests state accordingly
    setFriendRequests(friendRequests.filter((request) => request.id !== id));
  };

  const handleDeny = (id) => {
    // Logic to deny friend request
    // Update friendRequests state accordingly
    setFriendRequests(friendRequests.filter((request) => request.id !== id));
  };

  const renderFriendRequest = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            onPress={() => handleAccept(item.id)}
            style={styles.acceptButton}
          >
            Accept
          </Button>
          <Button
            mode="outlined"
            onPress={() => handleDeny(item.id)}
            style={styles.denyButton}
          >
            Deny
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={friendRequests}
        renderItem={renderFriendRequest}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FriendRequestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  acceptButton: {
    marginLeft: 8,
  },
  denyButton: {
    marginLeft: 8,
    borderColor: 'red',
  },
});


