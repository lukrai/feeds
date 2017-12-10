import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import validate from '../../utils/validateFeedForm';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../../actions';
import { List, Loader, Header, Grid, Segment, Button, Form } from 'semantic-ui-react';

const renderField = ({ input, label, type, meta: { touched, error } }) =>
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}  />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error && <span> {error} </span>}
      </div>
    </div>
  </div>

const renderPages = ({ fields, meta: { error, submitFailed } }) =>
  <ul>
    <li>

      <button type="button" onClick={() => fields.push({})}>
        Add FB Page
      </button>
      {submitFailed &&
        error &&
        <span>
          {error}
        </span>}
    </li>
    {fields.map((pages, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Page"
          onClick={() => fields.remove(index)}
        />
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
      </li>
    )}
  </ul>

// var FeedForm = props => {
//   const { pristine, reset, submitting, formValues, history, submitFeedForm} = props;

let FeedForm = ({pristine, reset, submitting, formValues, history, submitFeedForm}) => {
    //const { } = props;
  return (

    <div className="container">
    <Grid columns={3} stackable style={{paddingTop: '1em', paddingLeft: '1em', paddingRight: '1em' }}>
      <Grid.Column width={4}>
        {console.log(feeds)}
      </Grid.Column>
      <Grid.Column width={8}>
        <Segment>             
          <Header as='h1' dividing >
            New Feed
          </Header>

          <Form>
            <Form.Field>
              <label>First Name</label>
              <input placeholder='First Name' />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder='Last Name' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='Is private' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>

        </Segment>
      </Grid.Column>
      <Grid.Column width={4}>

      </Grid.Column>
    </Grid>
    <form onSubmit={() => submitFeedForm(formValues, history)}>
        {console.log(history)}
      <Field
        name="title"
        type="text"
        component={renderField}
        label="Title"
      />
      <FieldArray name="pages" component={renderPages} />
      <div>
        <Link to="/feeds" className="red btn-flat white-text">
            Cancel
        </Link>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>     
    </form>
    </div>
  )
}

function mapStateToProps(state) {
    //console.log(state.form, " 111");
    if(state.form){
        //console.log(state.form.feedForm, "222");
        return { formValues: state.form.feedForm};
    }
}

FeedForm = reduxForm({
    form: 'feedForm', // a unique identifier for this form
    //validate
})(FeedForm)

export default connect(mapStateToProps, actions)((withRouter(FeedForm)));