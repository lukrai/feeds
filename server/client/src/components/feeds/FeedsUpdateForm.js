import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form';
// import validate from '../../utils/validateFeedForm';
import { Link } from 'react-router-dom';
import { Header, Grid, Segment, Button, Form } from 'semantic-ui-react';
import { updateFeed, updateFeedSuccess } from '../../actions/feeds';

const validateAndUpdateFeed = (values, dispatch, props) => {

  return dispatch(updateFeed(props.activeFeed.feed._id, values)).payload
    .then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      console.log(result);
      // if (result && result.status !== 200) {
      //     console.log("kode");
      //     dispatch(createFeedFailure(result.payload.response.data));
      //     throw new SubmissionError(result.payload.response.data);
      // }
      // //let other components know that everything is fine by updating the redux` state
      dispatch(updateFeedSuccess());

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

const renderPages = ({ fields, meta: { error, submitFailed } }) =>
  <div>
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
            //value="so"
            type="text"
            component={renderField}
            label="FB Page"
          />
        </div>
      )}
    </ul>
  </div>

class FeedsUpdateForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateFeed || nextProps.activeFeed.feed == null) {
      this.context.router.history.push('/feeds');
    }
  }

  renderError(newPost) {
    if (newPost && newPost.error && newPost.error.message) {
      return (
        <div className="alert alert-danger">
          {newPost ? newPost.error.message : ''}
        </div>
      );
    } else {
      return <span></span>
    }
  }

  render() {
    const { handleSubmit, submitting, reset, pristine } = this.props;
    return (
      <Grid columns={3} stackable style={{ paddingTop: '1em', paddingLeft: '1em', paddingRight: '1em' }}>
        <Grid.Column width={4}>
          {/* <Segment/> */}
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment>
            <Header as='h1' dividing >
              New Feed
              </Header>
            <Form onSubmit={handleSubmit(validateAndUpdateFeed)}>
              <Field
                name="title"
                type="text"
                component={renderField}
                label="Title"
              />
              <FieldArray name="pages" component={renderPages} />
              <div>
                <Button as={Link} to="/feeds">
                  Cancel
                  </Button>
                <Button type="submit" disabled={submitting}>
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
  form: 'FeedsUpdateForm', // a unique identifier for this form
  //validate, // <--- validation function given to redux-form
  //asyncValidate
})(FeedsUpdateForm)
