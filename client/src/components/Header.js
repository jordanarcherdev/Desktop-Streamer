import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';

class Header extends React.Component {

  onSignOutClick = () => {
    this.props.logoutUser();
  }

  buttonControl(){
    if (this.props.isSignedIn){
      return (
        <button onClick={this.onSignOutClick} className="ui button primary">Log Out</button>
      );
    }

    return (
      <Link to="/users/login" className="ui button primary">Login</Link>
    );
  }

  render(){
    return(
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">Desktop Streamer</Link>

        <div className="right menu">
          <Link to="/" className="item">All Streams</Link>
          {this.buttonControl()}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { logoutUser })(Header);
