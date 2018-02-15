import React, { Component } from 'react';

import { Button, Form } from 'semantic-ui-react';

class AddComment extends Component {
  render(){
    return(
      <Form reply>
        <Form.TextArea />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    );
  }
}

export default AddComment;
