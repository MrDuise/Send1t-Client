
# Send1t

### “Connecting people around the world!”
<p>The purpose of this project is to make a mobile application that satisfies the basic needs of a modern communication platform. This means that it will require a user to send instant messages with other users one-on-one in real-time, as well as be able to send a message to a group of people at the same time. This Repo is the Client. 

The Back-End can be found here: https://github.com/MrDuise/Send1t-API
<p>The problem that this projects solves is my own lack of understanding in a technology I use every single day. Mobile telecommunications is something that most everyone uses, from other software such as Snapchat, Facebook Messenger, WhatsApp, and many others. It's something that is needed in every field, in almost every walk of life. But like the washing machine, most people don’t know how it works, and when it breaks, someone else needs to fix it. 

<p>The purpose of this project is to fix my lack of understanding, as I seek to better myself in the ways of modern communication while at the same time developing an exceptional mobile chat app. 

## Installation

To install this project insure that you have Node and NPM installed. You will also need an android or Iphone emulator to get this run
1. fork the main branch, then clone the repo
2. ```npm install``` to download the dependinces 
3. ```npm run start``` to start it up

This will get it running on your localhost, allowing access through Postman or some other API testing tool.


    
## Demo

<img src="final demo.gif" width="360" height="740"/>



## Technologies and Logical System Architecture
<p>This diagram shows the design of the logical solution of this project. A primary focus of this project is to design it in N-tier architecture, so each tier of the project, and the details of that layer, are displayed in this diagram. This diagram also serves to list the technologies used in this project and the role they played.
To summarize, the project will consist of a client layer, presentation layer, business layer, and a data access layer. The problem with Javascript based projects is that data access is not enforced in any way, requiring the developer to key the data access layers in mind. The only time the general rule of n-layer was semi broken is in the web-socket connection, in which this layer directly talks to the database throught the data access layer.

<img width="600" alt="image" src="readme docs/Technology diagram v2.png">



## Detailed Technical Design
### General Technical Approach
<p>Send1t is a MERN(Mongo, Express, React Native, Node) Stack application developed using N-layer and Model, View, Controller architecture. The back-end portion of the application was written with the JavaScript programming language, whereas the front-end of Send1t was be designed designed using simple tools such as draw.io and written using React Native. The application’s data will persist in a MongoDB database. All code will be managed in a GitHub repository so that code changes can be easily documented and tracked throughout the project’s timeline. 

### Key Technical Design Decisions
<p>This application will be created in using the Spring framework. It will be designed in N-layer architecture and use a Model, View, Controller structure. This design structure was chosen because the app is mainly a create, read, update, delete (CRUD) application so the N-layer/MVC structure is an optimal solution. 
<p>The presentation layer will consist of all the viewable aspects of the application such as where users can view posts and account information. The business layer will hold all the logical actions for features such as logging in, registering, and making posts. The data access layer is responsible for reading data from the database to the business layer so that actions can be executed. This would include validating login credentials and editing posts. The data persistence layer is the database itself. All data for posts and user information will persist in the database/database persistence layer. The data will exist in a relational database using MySQL so that data can be organized in a structured format. This will make CRUD operations much simpler across the application.
<p>Along with N-layer architecture, this application will also utilize Model, View, Controller (MVC) architecture. The models will be the container for all logic that relates to the application’s data. In this case, the user and post models. The controllers are responsible for handling all user requests and business logic of the application. This would include processing logins, registers, and making posts. Lastly, views will oversee all UI logic, including page navigation, text boxes, and buttons across the application.

## Database Design
The MongoDB database will be hosted through MongoDB Atlas. This removes a complex process of transfering all the data from a local system to cloud storage. The database will be split into 3 collections, the Users, Conversations, and Messages. Each collection has a conspending schema in the APIs code that enforces a standard layout as document databases don't enforce this. The users schema contains two lists of forgien keys. One is in the array of conversations, which is used to fetch all conversations that a user is a part of. The other is related to the contacts list. This is a reference to other user documents, so that anytime they update their information, it is also set to other users. The Messages colleciton is the only other place where foregin keys are used. This key is the conversationID, and is used to link the message to a single conversation. 


<img width="500" alt="image" src="readme docs/database schema.png">

## DevOps 
### Render Webhosting
## [https://send1t-api.onrender.com](https://send1t-api.onrender.com)
<p>The Send1t API is the only part of the application that is hosted. It is hosted using Render Web Service. This made delivering updates to my API much easier, as its connected to my Github repos main branch, so any major update is automaticlly built on Render. The MongoDB database is set up through MongoDB Atlas, which is hosted by AWS. This is auto scaled and I don't need to touch it, I just need my access token. 
  
## Logging
Logging exists at each HTTPs route within the API. This is handled by the logging fraemwork Morgan, which automatically records the route that the requst hit and the response code that was sent back, the time of the request, and how long the response took. This is sent to Renders internal hosting logs, from which I can download them if I so wish. 
  
  
## Functional Requirements
<details closed>
<summary>Login Requirements</summary>


|      Sub-Features      |    Actor    |                                              Description                                             |                                             Outcome                                             | In Scope? | Completed? |
|:----------------------:|:-----------:|:----------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------:|:---------:|:----------:|
|   User Authentication   |    User     |                                   I would like to input my username                                  |                      so that I can access web site                      |    Yes    |    Yes     |
|   User Authentication   |    User     |                                   I would like to input my password                                  |                      so that I can access web site                      |    Yes    |    Yes     |
|   User Authentication   |   System    |            I would like to display an error if username is incorrect                                |               so that web site is not accessible              |    Yes    |    Yes     |
|   User Authentication   |   System    |            I would like to display an error if password  is incorrect                               |               so that web site is not accessible              |    Yes    |    Yes     |
|   User Authentication   |   System    |      I would like to display a system error if credential store is not found                       |      so that support can debug a system issue      |    Yes    |    Yes     |
|   User Authentication   |   System    |                           I would like to verify the username                                       |               so that only authorized users can have access               |    Yes    |    Yes     |
|   User Authentication   |   System    |                           I would like to verify the password                                       |               so that only authorized users can have access               |    Yes    |    Yes     |
| Social Media Integration|    User     |                       I would like to login in with Facebook                                       |       so that I can sign in without making a brand new account        |    No    |    No     |
| Social Media Integration|    user     |                        I would like to login in with Twitter                                       |       so that I can sign in without making a brand new account        |    No    |    No     |
| Social Media Integration|    user     |                        I would like to login with Google                                        |       so that I can sign in without making a brand new account        |    No    |    No     |
</details>
  
<details closed>
<summary>Register Requirements</summary>

|     Sub-Features     |    Actor    |                                              Description                                             |                                             Outcome                                             | In Scope? | Completed? |
|:--------------------:|:-----------:|:----------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------:|:---------:|:----------:|
|      Registration    |    User     |                    I would like to register on web site before login                     |                               So that I have an account                               |    Yes    |    Yes     |
|                      |    User     |                                I would like to enter a username                                |                              So that I can make an account                              |    Yes    |    Yes     |
|                      |    User     |                                  I would like to enter a password                                 |                              So that I can make an account                              |    Yes    |    Yes     |
|                      |    User     |                                  I would like to enter a first name                                |                              So that I can make an account                              |    Yes    |    Yes     |
|                      |    User     |                                   I would like to enter a last name                                |                              So that I can make an account                              |    Yes    |    Yes     |
|                      |    User     |                                      I would like to enter an email                                  |                              So that I can make an account                              |    Yes    |    Yes     |
| Password Requirements |   System    |                              Verify that password has one number                              |                       So that the password meets the minimum security requirements                      |    Yes    |    Yes     |
|                      |   System    |                           Verify that password has 1 lower case character                          |                       So that the password meets the minimum security requirements                      |    Yes    |    Yes     |
|                      |   System    |                           Verify that password has 1 upper case character                          |                       So that the password meets the minimum security requirements                      |    Yes    |    Yes     |
|                      |   System    |                           Verify that password has min of 8 characters                           |                       So that the password meets the minimum security requirements                      |    Yes    |    Yes     |
|                      |   System    |                           Verify that password has max of 32 characters                          |                       So that the password meets the minimum security requirements                      |    Yes    |    Yes     |
|  Email Verification   |   System    | Verify that email has not been used and display an error if it has been taken |                           So that no duplicate accounts are made                          |    Yes    |    Yes     |
|      User Access      |   System    |                   Verify that password is linked to the username entered                   |               So only the correct password can gain access to that account              |    Yes    |    Yes     |
|                      |   System    |                                         Encrypt the password                                        |                            So that the password is not stored as plain text                           |    Yes    |    Yes     |
|    Profile Picture    |    User     |                       Register a profile picture, limited in size to 200*200 pixels                       |                                               N/A                                               |    Yes    |    no     |
|  Minimum Requirements |   System    |     Display the minimum requirements of the username as an error if the one entered does not match     | So the user knows the entered data will not work and what they should try instead |    Yes    |    Yes     |
|                      |   System    |     Display the minimum requirements of the password as an error if the one entered does not match     | So the user knows the entered data will not work and what they should try instead |    Yes    |    Yes     |
| Unique Username Check |   System    | Verify that the entered username has not been used and display an error if it has been taken |                       So that every username is unique |    Yes    |    Yes     |
  
</details>
  
<details closed>
<summary>Sending Messages Requirements</summary>

Sure! Here's the updated markdown table with sub-features based on the description:

|     Sub-Features      |    Actor    |                                              Description                                             |                                             Outcome                                             | In Scope? | Completed? |
|:---------------------|:-----------|:----------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------|:---------:|:----------:|
| Sending Messages      | User       | Send messages in text format to one person                                                          | Have a conversation                                                                               |    Yes    |    Yes     |
| Sending Messages      | User       | Send messages in text format to more than one person                                                | Have a group conversation                                                                         |    Yes    |    Yes     |
| Saving Messages       | System     | Save user messages                                                                                  | Conversations can be continued at a later time                                                     |    Yes    |    Yes     |
| Linking Messages      | System     | Link saved messages to each conversation                                                            | Users can have more than one conversation at a time                                               |    Yes    |    Yes     |
| Group Message Limit   | System     | Limit group messages to 5 people max                                                               | Prevent system overload                                                                           |    Yes    |    Yes     |
| Starting Conversation | User       | Have an icon to start a new conversation                                                            | Start a conversation with another user                                                             |    Yes    |    Yes     |
| Starting Conversation | User       | See a list of contacts when starting a new conversation                                              | Choose who to talk to                                                                             |    Yes    |    Yes     |
| Conversation List     | System     | Display a list of the user's recent conversations from most recent to least recent                   | Allow users to view the most up-to-date conversations first                                       |    Yes    |    Yes     |
| View Chat Log         | System     | Display all past messages from a conversation when the user clicks on it                            | Allow users to view past messages from a specific conversation                                     |    Yes    |    Yes     |
| Conversation Size     | System     | Define conversations as messages between 2 to 5 people                                              | Set expectations for what constitutes a conversation                                              |    Yes    |    Yes     |
| Chat Log Definition   | System     | Define chat logs as the list of messages displayed in order from least recent to most recent        | Set expectations for how messages are displayed within a conversation                              |    Yes    |    Yes     |
| Delete Conversation   | User       | Have the ability to delete a conversation                                                           | Allow users to remove conversations they no longer wish to keep                                    |    Yes    |    Yes     |
| Delete Conversation   | System     | Delete a conversation when the user selects it                                                      | Remove the conversation from the user's account                                                    |    Yes    |    Yes     |
| Unlink Conversation   | System     | Unlink a conversation from the account of only the user that selected it to be deleted             | Allow other users to keep the messages from the conversation if they wish to                        |    Yes    |    Yes     |
| Fully Delete          | System     | Fully delete a conversation only when all users have been removed from it                           | Ensure that the conversation is completely removed only when all users no longer have access to it |    Yes    |    no     |
| Notification          |
  
</details>
  
<details closed>
<summary>Account Requirements</summary>

# Send1t Release 1 User Stories

| Sub-Features | Actor | Description | Outcome | In Scope? | Completed? |
|:------------:|:-----:|:-----------:|:-------:|:---------:|:----------:|
| Full Name | User | Be able to see my full name on my profile | View my details | Yes | Yes |
| Username | User | Be able to see my username on my profile | Check my information | Yes | Yes |
| Email | User | Be able to see my email on my profile | Check my information | Yes | Yes |
| Profile Picture | User | Be able to see my profile picture | Check my information | Yes | No |
| Edit Button | System | Display a button to edit the user's info | Edit account details | Yes | Yes |
| Tagline | User | Be able to set a tagline for my profile | Personalize my profile | Yes | Yes |
| Connection Status | User | Be able to see the connection status of my contacts | Check their availability | Yes | Yes |

</details>
  
<details closed>
<summary>Contact Requirements</summary>

|    Sub-Features   |    Actor    |                                              Description                                             |                                             Outcome                                             | In Scope? | Completed? |
|:-----------------:|:-----------:|:----------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------:|:---------:|:----------:|
|     Add Contact    |     User    |                                Ability to add a contact to the user's contact list                                |                     User has a list of people to talk to                     |    Yes    |    Yes     |
|    Contact List    |    System   |                      List of contacts is connected to each user profile                                     |                      Contacts are associated with user profiles                  |    Yes    |    Yes     |
|   View Contact(s)  |     User    |                                      Ability to view user's contacts                                     |                  User can see their list of contacts in the app                   |    Yes    |    Yes     |
|   Delete Contact   |     User    |                                  Ability to delete a contact from the user's list                                 |              User can remove unwanted people from their list of contacts             |    Yes    |    Yes     |
|Contact List Order  |    System   |                                 Display the list of contacts in alphabetical order                                |                 User can find people in their contact list more easily              |    Yes    |    Yes     |
| Contact's Picture  |    System   |                            Display the contact's profile picture in each contact slot                           |                  User can see who the contact is by their profile picture            |    Yes    |     No     |
| Connection Status  |    System   | Display the contact's connection status symbol in each contact slot so that the user knows who can talk |  User can see at a glance who is available to talk based on connection status symbol |    Yes    |    Yes     |
|   Contact's Name   |    System   |                                 Display the contact's username in each contact slot                                |                     User can easily identify who they are talking to                 |    Yes    |    Yes     |
  
</details>
  
<details closed>
<summary>Edit Profile Requirements</summary>
  
|    Sub-Features   |    Actor    |                                              Description                                             |                                             Outcome                                             | In Scope? | Completed? |
|:-----------------:|:-----------:|:----------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------:|:---------:|:----------:|
|    Edit Password   |     User    |                                 Change password to be more secure if the need arises                              |                                       Password is updated                                           |    Yes    |    Yes     |
|   Update First Name  |    System   |                               Update the first name with the new user supplied first name                            |                                       First name is updated                                          |    Yes    |    Yes     |
|   Update Last Name  |    System   |                                Update the last name with the new user supplied last name                            |                                        Last name is updated                                          |    Yes    |    Yes     |
|     Update Email   |    System   |                                   Update the email with the user supplied email                                 |                                         Email is updated                                             |    Yes    |    Yes     |
|    Update Password |    System   |                                 Update the password with the user supplied password                               |                                        Password is updated                                           |    Yes    |    Yes     |
|      Save Button   |    System   |                                               Have a save button                                               |                            User can save the changes they made to their profile                           |    Yes    |    Yes     |
|     Cancel Button  |    System   |                                              Have a cancel button                                             |                        User can cancel the changes they made to their profile without saving                      |    Yes    |    Yes     |
|  Encrypt Password  |    System   |                                          Encrypt the updated password                                          |                                New password is not stored as plain-text                               |    Yes    |    Yes     |
|   Send Update Email |    System   |                 Send an email when the user's information has been updated with a message saying what was changed             |                 User knows what was changed and when in case they did not change the information              |    Yes    |    Yes     |
| Update Profile Picture |    User    |                                  Upload a new photo for my profile picture                                 |                              User's profile picture is updated                                           |    Yes    |    No      |
|       Crop Photo    |    System   |                                          Crop the photo to correct dimensions                                      |                                       User's photo is correctly sized                                     |    Yes    |    No      |
  
</details>

  


