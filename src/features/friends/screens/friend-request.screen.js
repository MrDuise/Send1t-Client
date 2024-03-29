import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import {getFriendRequests} from '../../../infrastructure/backend/request';

const FriendRequestsScreen = () => {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      const friendRequests = await getFriendRequests();
      setFriendRequests(friendRequests);
    };

    fetchFriendRequests();
  }, []);

  


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
        <Title>{item.userName}</Title>
        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            onPress={() => handleAccept(item._id)}
            style={styles.acceptButton}
          >
            Accept
          </Button>
          <Button
            mode="outlined"
            onPress={() => handleDeny(item._id)}
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
        ListEmptyComponent={<Title>No friend requests</Title>}
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


