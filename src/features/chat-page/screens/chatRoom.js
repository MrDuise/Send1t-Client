import { StyleSheet, View, SafeAreaView } from 'react-native'
import { TextInput, Button, List, Text, Provider } from 'react-native-paper';
import React, {useEffect, useState, useContext} from 'react'
import AppContext from '../../../components/AppContext';
import { theme } from '../../../infrastructure/theme';

import MessagesLog from '../components/messagesLog'


import {io} from 'socket.io-client';

const socket = io('http://localhost:3000');

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Listen for incoming chat messages
    socket.on('chat message', (msg) => {
      setMessages((messages) => [...messages, msg]);
      setIsTyping(false);
    });

    // Clean up the Socket.IO connection
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('chat message', message.trim());
      setMessage('');
      setIsTyping(false);
    }
  };

  const handleTyping = (text) => {
    setMessage(text);
    if (text.trim() !== '') {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  return (
    <View style={styles.container}>
      <List.Section style={styles.listSection}>
        <List.Subheader>Chat Messages</List.Subheader>
        {messages.map((msg, index) => (
          <List.Item key={index} title={msg} />
        ))}
      </List.Section>
      <View style={styles.inputContainer}>
        <TextInput
          label="Type a message"
          value={message}
          onChangeText={handleTyping}
          style={styles.textInput}
        />
        {isTyping && (
          <View style={styles.typingIndicatorContainer}>
            <Text style={styles.typingIndicatorText}>User is typing...</Text>
          </View>
        )}
        <Button mode="contained" onPress={sendMessage} style={styles.sendButton}>
          Send
        </Button>
      </View>
    </View>
  );
};

export default ChatRoom



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  listSection: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  textInput: {
    flex: 1,
    marginRight: 16,
    backgroundColor: 'transparent',
  },
  sendButton: {
    marginLeft: 8,
  },
  typingIndicatorContainer: {
    position: 'absolute',
    top: -16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  typingIndicatorText: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
});