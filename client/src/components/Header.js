import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
    <nav>
      <div className='nav-wrapper'>
        <a className='brand-logo'>
          Emaily
        </a>
        <ul className="right hide-on-med-and-down">
          <li><a>Login with Google</a></li>
        </ul>
      </div>
    </nav>
    );
  }
}

export default Header;
