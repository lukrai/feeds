import React, { Component, PropTypes } from 'react';
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import validate from '../../utils/validateFeedForm';
import { withRouter, Link } from 'react-router-dom';
import { createFeed, createFeedSuccess, createFeedFailure, resetNewFeed } from '../../actions/feeds';

const validateAndCreateFeed = (values, dispatch) => {
    return dispatch(createFeed(values)).payload
        .then(result => {
            // Note: Error's "data" is in result.payload.response.data (inside "response")
            // success's "data" is in result.payload.data
            console.log(result);
            if (result && result.status !== 200) {
                console.log("kode");
                dispatch(createFeedFailure(result.payload.response.data));
                throw new SubmissionError(result.payload.response.data);
            }
            //let other components know that everything is fine by updating the redux` state
            dispatch(createFeedSuccess(result.data)); //ps: this is same as dispatching RESET_USER_FIELDS
            this.context.router.history.push('/feeds');
        });



    // return dispatch(createPost(values, sessionStorage.getItem('jwtToken')))
    //   .then(result => {
    //     // Note: Error's "data" is in result.payload.response.data (inside "response")
    //     // success's "data" is in result.payload.data
    //     if (result.payload.response && result.payload.response.status !== 200) {
    //       dispatch(createPostFailure(result.payload.response.data));
    //       throw new SubmissionError(result.payload.response.data);
    //     }
    //     //let other components know that everything is fine by updating the redux` state
    //     dispatch(createPostSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
    //   });
  }

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
            console.log("watafak")
            this.context.router.history.push('/feeds');
        }
    }




  
    renderError(newPost) {
      if (newPost && newPost.error && newPost.error.message) {
        return (
          <div className="alert alert-danger">
            { newPost ? newPost.error.message : '' }
          </div>
          );
      } else {
        return <span></span>
      }
    }

    render() {
      const {handleSubmit, submitting, newFeed, reset, pristine } = this.props;
      return (
        <div className='container'>
          { this.renderError(newFeed) }
          <form onSubmit={ handleSubmit(validateAndCreateFeed) }>

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
      
            <div>
              {/* <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={ submitting }>
                Submit
              </button> */}
             
            </div>
          </form>
        </div>
      )
    }
  }
  
  
export default reduxForm({
    form: 'FeedsForm', // a unique identifier for this form
    //validate, // <--- validation function given to redux-form
    //asyncValidate
})(FeedsForm)
  