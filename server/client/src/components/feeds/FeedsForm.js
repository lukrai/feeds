import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form';
import validate from '../../utils/validateFeedForm';
import { Link } from 'react-router-dom';
import { Header, Grid, Segment, Button, Form, Checkbox, Message, Dropdown } from 'semantic-ui-react';
import { createFeed, createFeedSuccess, createFeedFailure } from '../../actions/feeds';
import { validateFeedFields, validateFeedFieldsSuccess, validateFeedFieldsFailure } from '../../actions/feeds';

const dropdownOptions = [
  { key: 'FB', value: 'facebook', text: 'Facebook' }, 
  { key: 'TW', value: 'twitter', text: 'Twitter' }, 
  { key: 'YT', value: 'youtube', text: 'Youtube' },
];

const asyncValidate = (values, dispatch) => {
  return dispatch(validateFeedFields(values)).payload
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      console.log(result);

      // let {data, status} = result.payload.response;
      //if status is not 200 or any one of the fields exist, then there is a field error
      if (result && result.status === 200 && result.data.error) {
        // if (result.status != 200 || data.title || data.pages) {
        //let other components know of error by updating the redux` state
        dispatch(validateFeedFieldsFailure(result.data.error));
        throw result.data; //throw error
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(validateFeedFieldsSuccess(result.data)); //ps: this is same as dispatching RESET_USER_FIELDS
      }
    });
}

const validateAndCreateFeed = (values, dispatch) => {
  console.log(values);
  return dispatch(createFeed(values)).payload
    .then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      console.log(result);
      if (result && result.status !== 200) {
        dispatch(createFeedFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      //let other components know that everything is fine by updating the redux` state
      dispatch(createFeedSuccess(result.data)); //ps: this is same as dispatching RESET_USER_FIELDS
      //this.context.router.history.push('/feeds');
    });
}

const renderField = ({ input, label, type, meta: { touched, error } }) =>
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error && <span> {error} </span>}
      </div>
    </div>
  </div>

const renderPageField = ({ input, label, type, meta: { asyncValidating, touched, error } }) =>
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error && <span> {error} </span>}
        {asyncValidating && <span> Validating... </span>}
      </div>
    </div>
  </div>

const DropdownFormField = props => (
  <Form.Field>
    <Dropdown 
      selection {...props.input}
      value={props.input.value}
      onChange={(param, data) => props.input.onChange(data.value)}
      options={dropdownOptions}
      placeholder={"Feed source"}
    />
    <div className="red-text" style={{ marginBottom: '20px' }}>
      {props.meta.touched && props.meta.error && <span> {props.meta.error} </span>}
    </div>
   </Form.Field>
 )

const renderPages = ({ fields, meta: { error, submitFailed } }) =>
  <div>
    {console.log(fields)}
    <div style={{ paddingBottom: '1em' }}>
      <Button type="button" onClick={() => fields.push({})}>
        Add FB Page
      </Button>
      {submitFailed &&
        error &&
        <span>
          {error}
        </span>}
    </div>
    <ul>
      {fields.map((pages, index) =>
        <div key={index}>
          <Button
            type="button"
            onClick={() => fields.remove(index)}
          >
            Remove Page
          </Button>
          <h4>
            Page #{index + 1}
          </h4>
          <Field
            name={`${pages}.url`}
            type="text"
            component={renderPageField}
            label="FB Page"
          />
          <Field
            name={`${pages}.source`}
            type="text"
            component={DropdownFormField}
          />
        </div>
      )}
    </ul>
  </div>

class FeedsForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.newFeed.feed);
    if (nextProps.newFeed.feed && !nextProps.newFeed.error) {
      this.context.router.history.push('/feeds');
    }
  }

  renderError(newFeed) {
    if (newFeed && newFeed.error) {
      return (
        <Message color='red'>
          <Message.Header>Errors in your submission</Message.Header>
          <Message.List>
            <Message.Item>{newFeed.error}</Message.Item>
          </Message.List>
        </Message>
      );
    } else {
      return (
        <span></span>
      );
    }
  }

  render() {
    const { handleSubmit, submitting, newFeed, reset, pristine } = this.props;
    console.log(this.props)
    return (

      <Grid columns={3} stackable style={{ paddingTop: '1em', paddingLeft: '1em', paddingRight: '1em' }}>
        <Grid.Column width={4}>
          {/* <Segment/> */}
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment>
            <Header as='h1' dividing>
              New Feed
            </Header>
            <Form onSubmit={handleSubmit(validateAndCreateFeed)}>
              <Field
                name="title"
                type="text"
                component={renderField}
                label="Title"
              />
              <FieldArray name="pages" component={renderPages} />
              <Form.Field>
                <Checkbox label='Is private' />
              </Form.Field>

              {this.renderError(newFeed)}

              <div>
                <Button as={Link} to="/feeds">
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting || newFeed.error ? true : false}>
                  Submit
                    </Button>
                <Button type="button" disabled={pristine || submitting} onClick={reset}>
                  Clear Values
                </Button>
              </div>
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
        </Grid.Column>
      </Grid>

    )
  }
}

export default reduxForm({
  form: 'FeedsForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  asyncValidate,
})(FeedsForm)
