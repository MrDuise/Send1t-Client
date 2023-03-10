import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import io from 'socket.io-client';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:3000');

    socketRef.current.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socketRef.current.on('typing', () => {
      setIsTyping(true);
    });

    socketRef.current.on('stop typing', () => {
      setIsTyping(false);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (text.trim() !== '') {
      const message = {
        _id: messages.length + 1,
        text: text.trim(),
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'User',
          avatar: 'https://placeimg.com/140/140/any',
        },
      };
      socketRef.current.emit('message', message);
      setText('');
    }
  };

  const sendTyping = () => {
    socketRef.current.emit('typing');
    setTimeout(() => {
      socketRef.current.emit('stop typing');
    }, 1000);
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.user._id === 1 ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        {item.user._id !== 1 && (
          <Avatar.Image
            size={40}
            source={{ uri: item.user.avatar }}
            style={styles.avatar}
          />
        )}
        <View style={styles.messageContent}>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.messageTime}>
            {new Date(item.createdAt).toLocaleTimeString()}
          </Text>
        </View>
      </View>
    );
  };

  const renderTextInput = () => {
    return (
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={text}
          onChangeText={(text) => {
            setText(text);
            sendTyping();
          }}
        />
        <TouchableOpacity onPress={sendMessage}>
          <IconButton icon="send" disabled={text.trim() === ''} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        inverted={true}
        contentContainerStyle={styles.messagesContainer}
      />
      {isTyping && <Text style={styles.typingMessage}>User is typing...</Text>}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {renderTextInput()}
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  avatar: {
    marginRight: 10,
  },
  messageContent: {
    borderRadius: 10,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  textInput: {
    flexGrow: 1,
    marginRight: 10,
  },
  typingMessage: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  keyboardAvoidingView: {
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
});


