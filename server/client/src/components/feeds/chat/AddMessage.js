import React, { Component } from 'react';
import { Field, reduxForm,  } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';

const validate = values => {
  const errors = {};
  if (!values.message) {
    errors.message = 'Can\'t be empty' ;
  }
  return errors;
}

const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

class AddMessage extends Component {
  
  submit(values, dispatch) {
    this.props.handleSendMessageClick(values.message);
    this.props.reset();
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, user} = this.props;
    if (user) {
      return (
        <Form onSubmit={handleSubmit(this.submit.bind(this))} reply>
          <Field
            name="message"
            type="text"
            component={renderField}
            placeholder="Say something"
          />
          <Button type="submit" content='Add Reply' labelPosition='left' icon='edit' primary disabled={submitting}/>
          <Button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </Button>
        </Form>
      );
    } else {
      return(
        <div>
          Login to chat. 
        </div>
      );
    }
  }
}

export default reduxForm({
  form: 'messageForm', 
  validate, 
})(AddMessage);
