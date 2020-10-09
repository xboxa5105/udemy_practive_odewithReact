import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './Payment'

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return 'Still deciding';
        break;

      case false:
        return (
          <li>
            <a href='/auth/google'>Logging with Google</a>
          </li>
        );
        break;

      default:
        return [
          <li key="1">
            <Payment/>
          </li>,

          <li key="2">
            <a href='/api/logout'>Logged Out</a>
          </li>,
        ];
        break;
    }
  }
  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link to={this.props.auth} className='brand-logo'>
            Emaily
          </Link>
          <ul className='right'>{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
