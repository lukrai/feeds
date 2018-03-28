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
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
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
    const { handleSubmit, pristine, reset, submitting, } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.submit.bind(this))} reply>
        <Field
          name="message"
          type="text"
          component={renderField}
          label="Message"
        />
        <Button type="submit" content='Add Reply' labelPosition='left' icon='edit' primary disabled={submitting}/>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'messageForm', 
  validate, 
})(AddMessage);
