import React, { useState, useEffect, useRef, useContext } from 'react';
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
import { Avatar, IconButton, Appbar, Menu, Provider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import io from 'socket.io-client';
import AppContext from '../../../components/AppContext';
/**
 * @description This screen allows the user to chat with other users
 * This is the most important screen in the app as well as the most complex
 * @param {*} { route, navigation } gets the paramaters that were passed in when the user naviagated to the page, allows the user to navigate back to the conversation log
 * @return {*}  - returns the screen
 *
 * @param {*} { route, navigation }
 * @return {*}
 */
const ChatRoom = ({ route, navigation }) => {
  const myContext = useContext(AppContext);
  const [messages, setMessages] = useState(route.params.messages);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const socketRef = useRef();


  useEffect(() => {
    //connects to the socket.io server
    socketRef.current = io('http://10.0.2.2:8000');

    //listens for the sendMessage event
    //this is the response from the server after the client sends a message
    socketRef.current.on('sendMessage', (message) => {
      messages.push(message);
    });
    //listens for the typing event
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
  /**
   * @description This function sends a message to the server
   * takes the text from the text input turns into a message object, then sends it to the server via the sendMessage event
   *
   */
  const sendMessage = () => {
    if (text.trim() !== '') {
      const message = {
        sender: myContext.userNameValue,
        message: text.trim(),
        conversationId: route.params.conversation._id,
      };
      socketRef.current.emit('sendMessage', message);
      console.log('In the socket.io event', message);
      setText('');
    }
  };
  /**
   * @description This function sends a typing event to the server
   *
   */
  const sendTyping = () => {
    socketRef.current.emit('typing');
    setTimeout(() => {
      socketRef.current.emit('stop typing');
    }, 1000);
  };
  /**
   * this is the function that renders the messages
   *
   * @param {*} { item } - the message object
   * @return {*}
   */
  const renderItem = ({ item }) => {
    //if the message was sent by the current user, then it will be rendered on the right side of the screen
    if (item.sender === myContext.userNameValue) {
      return (
        <View style={[styles.messageContainer, styles.sentMessage]}>
          <View style={styles.messageContent}>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTime}>
              {new Date(item.createdAt).toLocaleTimeString()}
            </Text>
          </View>
          <Avatar.Image
            size={40}
            source={{ uri: item.sender.profilePicture }}
            style={styles.avatar}
          />
        </View>
      );
      //if the message was sent by the other user, then it will be rendered on the left side of the screen
    } else {
      return (
        <View style={[styles.messageContainer, styles.receivedMessage]}>
          <Avatar.Image
            size={40}
            source={{ uri: item.sender.profilePicture }}
            style={styles.avatar}
          />
          <View style={styles.messageContent}>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTime}>
              {new Date(item.createdAt).toLocaleTimeString()}
            </Text>
          </View>
        </View>
      );
    }
  };
/**
 * @description This function renders the text input and send button
 *
 * @return {*} 
 */
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
//this is the main return statement
//it renders the appbar, the flatlist, and the text input
  return (
    <View style={styles.container}>
   

      <FlatList
        ref={(ref) => {
          this.flatList = ref;
        }}
        data={messages}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text style={styles.noMessages}>No messages</Text>
        )}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.messagesContainer}
        //this is to make sure that the flatlist scrolls to the bottom when a new message is sent
        onContentSizeChange={() => {
          this.flatList.scrollToEnd({ animated: true });
        }}
        onLayout={() => {
          this.flatList.scrollToEnd({ animated: true });
        }}
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
