import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';
import Navbar from './Navbar.jsx';
import React, {Component} from 'react';
// Create App component
class App extends Component {
  // Set initial stage
  constructor(props) {
    super(props);  
    this.state = {
      currentUser: {name: 'Tin'},
      messages: [],
      clientCount: 0
    };
    // Makesure newMessage function inherit property of App
    this.newMessage = this.newMessage.bind(this);
    // Create connection to the server
    this.socket = new WebSocket('ws://localhost:3001');
  }
  // Function to create new message 
  newMessage(username, content) {
    if (this.state.currentUser.name != username) {
      const newName = {
        type: 'postNotification',
        username: username,
        content: `${this.state.currentUser.name} changed name to ${username}` 
      };
      this.setState({currentUser: {name:username}});
      // Sending new messages to the server
      this.socket.send(JSON.stringify(newName));  
    }
    // Set a new varible that will be added to the existing message list
    const newMessage = {
      type: 'postMessage',
      username: username,
      content: content
    };
    // Sending new messages to the server
    this.socket.send(JSON.stringify(newMessage)); 
  }
  componentDidMount() { 
    // Establish connection and send data to make sure connection has been established
    this.socket.onopen = () => {};
    // Function to receive data to server
    this.socket.onmessage = (event) => {  
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      const parsedData = JSON.parse(event.data);
      // When data from the server comes in, the switch function with sort them out base on the property type
      // to appropriately assign them to the correct message.
      switch(parsedData.type) {
        case 'clientConnection':
          this.setState({
            clientCount: parsedData.num
          });
          break;
        case 'postNotification':
          let messages = this.state.messages;
          let newMessages = messages.concat(parsedData); 
          this.setState({
            messages: newMessages
          });
          break;
        case 'postMessage':
          messages = this.state.messages;
          newMessages = messages.concat(parsedData); 
          this.setState({
            messages: newMessages
          });
          break;
      }
    }
  }
  render() {
    return (
      <div>
        <Navbar clientCount = {this.state.clientCount} />
        {/*assigning props to components*/}
        <MessageList messages = { this.state.messages } />
        <Chatbar currentUser = { this.state.currentUser }  
                newMessage = { this.newMessage } /> 
      </div>
    );
  }
}
export default App;
