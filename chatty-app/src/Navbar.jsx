import React, {Component} from 'react';
  class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
          <span className='numberOfUsers' type='text'>{this.props.clientCount}</span>
      </nav> 
    );
  }
}

export default Navbar;