import React from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends React.Component{

  renderError({ error, touched }) {
    if(touched && error){
      return(
        <div className="ui error message">
          <div className="header">
            {error}
          </div>
        </div>
      )
    }
  }

  renderInput = (formProps) => {
    const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`;

    return(
      <div className={className}>
        <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off" />
        {this.renderError(formProps.meta)}
      </div>
    )

  }

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="email" component={this.renderInput} label="Enter your email" />
        <Field name="password" component={this.renderInput} label="Enter your password" />
        <button className="ui button primary">Login</button>
      </form>
    )
  }

}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = 'Please enter your email';
  }

  if (!formValues.password) {
    errors.password = 'Please enter your password';
  }

  return errors;
}

export default reduxForm({
  form: 'loginForm',
  validate: validate
})(LoginForm);
