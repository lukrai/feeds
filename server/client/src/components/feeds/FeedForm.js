// import React, { Component } from 'react';
// import { reduxForm, Filed } from 'redux-form';

// class FeedForm extends Component {
//     render() {
//         return(
//             <div>
                
//             </div>    
//         );
//     }
// }

// export default reduxForm({
//     form: 'FeedForm'
// })(FeedForm);

import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import validate from '../../utils/validateFeedForm';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../../actions';

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