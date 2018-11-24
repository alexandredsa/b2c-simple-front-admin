import React, { Component } from 'react';
import { Button, Jumbotron } from "react-bootstrap";

class NotFoundContainer extends Component {
    render() {
        return (
            <Jumbotron>
                <h1>Hello, world!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
            </p>
                <p>
                    <Button bsStyle="primary">Learn more</Button>
                </p>
            </Jumbotron>
        )
    }
}

export default NotFoundContainer;