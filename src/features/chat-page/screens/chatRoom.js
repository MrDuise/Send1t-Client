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

const ChatRoom = ({ route, navigation }) => {
  const myContext = useContext(AppContext);
  const [messages, setMessages] = useState(route.params.messages);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [visible, setVisible] = useState(false);
  const socketRef = useRef();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    socketRef.current = io('http://10.0.2.2:8000');

    socketRef.current.on('sendMessage', (message) => {
      messages.push(message);
      
      console.log(messages);
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
        sender: myContext.userNameValue,
        message: text.trim(),
        conversationId: route.params.conversation._id,
      };
      socketRef.current.emit('sendMessage', message);
      console.log('In the socket.io event', message);
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

    if(item.sender === myContext.userNameValue){
      return (
        <View
          style={[styles.messageContainer, styles.sentMessage]}
        >
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
    } else {
      return (
        <View
          style={[styles.messageContainer, styles.receivedMessage]}
        >
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
      <Appbar.Header  mode="center-aligned">
       
        <Appbar.BackAction
          onPress={() => {
            navigation.push('ConversationsLog');
          }}
        />
        <Appbar.Content title={route.params.title} />
        <Provider>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color="black"
              onPress={openMenu}
            />
          }
        >
          <Menu.Item
            onPress={() => {
              navigation.push('Profile', {
                title: route.params.title,
                userId: route.params.userId,
              });
            }}
            title="View Profile"
          />
          <Menu.Item
            onPress={() => {
              navigation.push('BlockUser', {
                title: route.params.title,
                userId: route.params.userId,
              });
            }}
            title="Block User"
          />
        </Menu>
        </Provider>
      </Appbar.Header>

      
      <FlatList
      ref={(ref) => {
        this.flatList = ref;
      }
      }
        data={messages}
        renderItem={renderItem}
        onLayout={() => {
          this.flatList.scrollToEnd({ animated: true });
        }}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => {
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
