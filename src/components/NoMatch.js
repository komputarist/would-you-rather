import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Container, Header } from 'semantic-ui-react';

export class NoMatch extends Component {
  render() {
    return (
      <Container textAlign="center">
        <Header as="h3">
          <FormattedMessage id="no.match.404" defaultMessage="No Match 404 Error" />
        </Header>
        <p>
          <FormattedMessage
            id="no.match.nothing.text"
            defaultMessage="Nothing to see here. Please use the menu to try again."
          />
        </p>
      </Container>
    );
  }
}

export default NoMatch;
