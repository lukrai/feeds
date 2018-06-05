import React, { Component } from 'react';
import { Segment, Container, Header} from 'semantic-ui-react';

class Error extends Component {
    render() {
        let errorText = "404 NOT FOUND";
        if (this.props.error) {
            errorText = this.props.error.toString();
        }
        
        return (
            <Container>
                <Segment
                vertical
                style={{ padding: '5em 0em' }}
                >
                    <Container textAlign='center'>
                        <Header as='h1'>{errorText} :(</Header>
                    </Container>
                </Segment>
            </Container>
        );
  }
}

export default Error;