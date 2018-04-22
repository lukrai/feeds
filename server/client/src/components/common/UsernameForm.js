import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import { Header, Grid, Segment, Button, Form, Checkbox, Message, Dropdown, Modal } from 'semantic-ui-react';
import { updateUser, updateUserSuccess, updateUserFailure } from '../../actions/users';
import { validateUserUsername, validateUserUsernameSuccess, validateUserUsernameFailure } from '../../actions/users';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  return errors
}

const asyncValidate = (values, dispatch) => {
  return dispatch(validateUserUsername(values)).payload
    .then((result) => {
      dispatch(validateUserUsernameSuccess(result.data));
    }).catch(function (err) {
      dispatch(validateUserUsernameFailure("Username is already taken"));
    });
}

const validateAndUpdateUser = (values, dispatch, props) => {
  return dispatch(updateUser(props.user._id, values)).payload
    .then(result => {
      dispatch(updateUserSuccess(result.data));
    }).catch(function (err) {
      dispatch(updateUserFailure(err.response.data));
    });
}

const renderField = ({ input, label, type, meta: { asyncValidating, touched, error } }) =>
  <div>
    <div>
      {/* <input {...input} type={type} placeholder={label} /> */}
      <Form.Input {...input} type={type} placeholder={label} error={touched && (error ? true : false)} loading={asyncValidating} />
      <div style={{ marginBottom: '20px' }}>
        {touched && error && <span>
          <Message color='red'>
            <Message.Header>{error}</Message.Header>
          </Message> </span>}
      </div>
    </div>
  </div>

class UsernameForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.resetMe();
  }

  renderError(user) {
    if (user && user.error) {
      return (
        <Message color='red'>
          <Message.Header>{user.error}</Message.Header>
        </Message>
      );
    } else {
      return (
        <span></span>
      );
    }
  }

  render() {
    const { asyncValidating, handleSubmit, submitting, reset, pristine, user } = this.props;
    if (user && !user.username) {
      return (
        <Modal dimmer open={true} >
          <Segment>
            <Header as='h1' dividing>
              Set Your Username
              </Header>
            <Form onSubmit={handleSubmit(validateAndUpdateUser)}>
              <Field
                name="username"
                type="text"
                component={renderField}
                label="Username"
              />
              {this.renderError(user)}
              <div>
                <Button type="submit" disabled={submitting || user.error ? true : false || asyncValidating ? true : false}>
                  Submit
                  </Button>
                <Button type="button" disabled={pristine || submitting} onClick={reset}>
                  Clear Value
                  </Button>
              </div>
            </Form>
          </Segment>
        </Modal>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default reduxForm({
  form: 'UsernameForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  asyncValidate,
  asyncChangeFields: ['username']
})(UsernameForm)
