import React, {Component} from 'react';
  class Chatbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        content: '',
        username: 'Anonymous'
      };
    }
  
    onKeyDown(event) {
      if (event.key === 'Enter') {
        this.props.newMessage(this.state.username, this.state.content);
        const content = this.state.content;
        const newContent = '';
        this.setState({content: newContent}); 
      }
    }
    
    onUserChange(event) {
      this.setState({username: event.target.value || 'Anonymous'});   
    }
     
    onContentChange(event) {
      this.setState({content: event.target.value});
    }
     
    render() {
      return (
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)"  
                defaultValue={this.props.currentUser.name} 
                onBlur={this.onUserChange.bind(this)}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" 
                onChange={this.onContentChange.bind(this)} 
                onKeyDown={this.onKeyDown.bind(this)}
                value={this.state.content}/>
        </footer>
      );
    }
  }

export default Chatbar;