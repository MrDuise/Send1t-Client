import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components/native';
import {  Card, Text } from 'react-native-paper';
/**
 * Takes a conversation and displays it in a card format with the contacts name and the most recent message sent
 * Also displays the time the conversation was updated
 * Allows a user to click on the message to view the conversation in a new screen where they can reply to the message
 *
 * @return {*} 
 */
const ConversationCard = ({conversation = {}}) => {
const { participants = [{userName : "JohnSmith"}, {userName: "MikeDo"}], messages, isGroup = false, dateUpdated, admin = "JohnSmith" } = conversation

// If the conversation is a group conversation, the title will be the names of all the participants
// If the conversation is a one on one conversation, the title will be the name of the other participant

//TODO: the one on one conversation title will need work for the second participant
const title = isGroup ? participants.map(participant => participant.userName).join(', ') : participants[1].userName

  return (
    <Card>
      <Card.Title title="Card Title" subtitle="Card Subtitle" />
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>


      </Card>
  )
}

export default ConversationCard