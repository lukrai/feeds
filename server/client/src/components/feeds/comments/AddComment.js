import React, { Component } from 'react';
import { Field, reduxForm,  } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';

const validate = values => {
  const errors = {};
  if (!values.comment) {
    errors.comment = 'Required';
  } else if (values.comment.length < 2) {
    errors.comment = 'Must be 2 characters or more';
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


class AddComment extends Component {
  
  submit(values, dispatch) {
    console.log(this.props);
    // here you can access all the form props from this.props
    this.props.handleCommentSubmit(this.props.feedId, this.props.user, values);
  }

  render() {
    const { handleSubmit, handleCommentSubmit, pristine, reset, submitting, feedId, user } = this.props;
    console.log(this.props);
    return (
      <Form onSubmit={handleSubmit(this.submit.bind(this))} reply>
        {/* <Form.TextArea as={Field} name='comment' type="text" /> */}
        <Field
          name="comment"
          type="text"
          component={renderField}
          label="Comment"
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
  form: 'commentForm', 
  validate, 

})(AddComment)

//export default AddComment;
