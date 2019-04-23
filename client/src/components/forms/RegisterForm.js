import React from 'react';
import { Field, reduxForm } from 'redux-form';


class RegisterForm extends React.Component{

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
    return(
      //the handleSubmit function comes from redux-form
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} >
        <Field name="name" component={this.renderInput} label="Your Name" />
        <Field name="email" component={this.renderInput} label="Your Email Address" />
        <Field name="password" component={this.renderInput} label="Your Password" />
        <Field name="passwordConfirm" component={this.renderInput} label="Confirm Password" />
        <button className="ui button primary">Register</button>
      </form>
    );
  }

}

const validate = (formValues) => {
  const errors = {};

  if(!formValues.name){
    errors.name = 'You must enter your name';
  }

  if(!formValues.email){
    errors.email = 'You must enter your email';
  }

  if(!formValues.password){
    errors.password = 'You must enter a password';
  }

  if(!formValues.passwordConfirm){
    errors.passwordConfirm = 'Please confirm your password';
  }

  return errors;
}

export default reduxForm({
  form: 'registerForm',
  validate: validate
})(RegisterForm);
