import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component{

  renderError({ error, touched }) {
    //If the user touches the input then clicks away then touched = true
    if(touched && error){
      return(
        <div className="ui error message">
          <div className="header">
            {error}
          </div>
        </div>
      );
    }
  }

  //This function gets passed into redux-form component in order to show the input element
  //You could also destructure out input from form props by putting
  //renderInput({ input }) **
  renderInput = (formProps) => {
    //Adds and extra class if there is an error
    const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`;
    return(
      //Adds the onchangehandler and value properties into the input
      //This is shortened syntax for doing
      //<input onchange={formprops.input.onchange} value={formprops.input.value} />
      //** Which means this would be <input {...input} /> and so on
      <div className={className}>
        <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off" />
        {this.renderError(formProps.meta)}
      </div>

    );
  }

  onSubmit = (formValues) => {
    //The handleSubmit function automatically prevents default
    console.log(formValues)
    this.props.onSubmit(formValues);
  }

  render(){
    return (
      //the handleSubmit function comes from redux-form
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </form>
    );
  };

}

//This gets defined out of the class!
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title){
    errors.title = 'You must enter a title';
  }

  if(!formValues.description){
    errors.description = 'You must enter a description';
  }

  return errors;
}

//Basically wraps these functions and then passed to connect
export default reduxForm({
  form: 'streamForm',
  validate: validate
})(StreamForm);
