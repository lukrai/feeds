import React, { Component } from 'react';
import { Field, reduxForm,  } from 'redux-form';
import { Button, Form, Label } from 'semantic-ui-react';

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
  <div style={{paddingBottom: '0.5em'}}>
    {touched && (error && <span><Label basic color='red' pointing='below'>{error}</Label></span>)         }
    <Form.Input {...input} type={type} placeholder={placeholder} autoComplete="off"/>
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
          <Button type="submit" content='Add Reply' labelPosition='right' icon='send' primary disabled={submitting}/>
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
