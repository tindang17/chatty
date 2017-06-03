import React, {Component} from 'react'
class Message extends Component {

  parsedType() {
    switch(this.props.message.type) {
      case 'postNotification':
        return(
          <div className='message system'>
            {this.props.message.content}
          </div>);
        break;
      case 'postMessage':
        return(
          <div className='message'>
            <span className='message-username'>{ this.props.message.username }</span>
            <span className='message-content'>{ this.props.message.content }</span>
          </div>);
        break;
    }
  }
  
  render() {
    return this.parsedType();
  }
}

export default Message;
