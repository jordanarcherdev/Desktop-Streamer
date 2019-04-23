import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions';
import RegisterForm from '../forms/RegisterForm';

class RegisterUser extends React.Component{

  onSubmit = formValues => {
    this.props.registerUser(formValues);
  }

  render(){
    return (
      <div>
        <h3>Register</h3>
        <RegisterForm onSubmit={this.onSubmit} />
      </div>
    );
  }

}

export default connect(null, { registerUser })(RegisterUser);
