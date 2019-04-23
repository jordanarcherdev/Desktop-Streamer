import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import LoginForm from '../forms/LoginForm';

class Login extends React.Component{

  onSubmit = (formValues) => {
    this.props.loginUser(formValues);
  }

  render(){
    return(
      <div>
        <h3>Sign In</h3>
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    );
  };

}

export default connect(null, {loginUser})(Login);
