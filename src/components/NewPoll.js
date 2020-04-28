import React, { Component } from 'react';
import { FormattedMessage, defineMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Segment,
  Header,
  Grid,
  Divider,
  Form,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { handleSaveQuestion } from '../actions/questions';

const MESSAGES = defineMessage({
  updating: {
    id: 'new.poll.loader.updating',
    defaultMessage: 'Updating'
  },
  option1: {
    id: 'new.poll.option.one',
    defaultMessage: 'Enter option one...'
  },
  option2: {
    id: 'new.poll.option.two',
    defaultMessage: 'Enter option two...'
  }
});

export class NewPoll extends Component {
  static propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestion: PropTypes.func.isRequired
  };
  state = {
    validSubmit: false,
    isLoading: false,
    option1: '',
    option2: ''
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { authUser, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      handleSaveQuestion(option1, option2, authUser);
      setTimeout(() => res('success'), 1000);
    }).then(() => {
      this.setState({
        option1: '',
        option2: ''
      });
      this.setState({ validSubmit: true });
    });
  };
  render() {
    const disabled = this.state.option1 === '' || this.state.option2 === '';
    const { intl: { formatMessage } } = this.props;

    if (this.state.validSubmit === true) {
      return <Redirect to="/" />;
    }
    return (
      <Segment.Group>
        <Header as="h3" textAlign="left" block attached="top">
          <FormattedMessage id="new.poll.create.new" defaultMessage="Create a New Poll" /> 
        </Header>
        <Grid padded>
          <Grid.Column>
            {this.state.isLoading && (
              <Dimmer active inverted>
                <Loader content={formatMessage(MESSAGES.updating)} />
              </Dimmer>
            )}
            <p>
              <FormattedMessage
                id='new.poll.complete.question'
                defaultMessage="Complete the question:"
              />
            </p>
            <p>
              <strong>
                <FormattedMessage
                  id='new.poll.would.you.question'
                  defaultMessage="Would you rather..."
                />
              </strong>
            </p>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                id="option1"
                placeholder={formatMessage(MESSAGES.option1)}
                value={this.state.option1}
                onChange={this.handleChange}
                required
              />
              <Divider horizontal>Or</Divider>
              <Form.Input
                id="option2"
                placeholder={formatMessage(MESSAGES.option2)}
                value={this.state.option2}
                onChange={this.handleChange}
                required
              />
              <Form.Button positive size="tiny" fluid disabled={disabled}>
                <FormattedMessage id="new.poll.submit.text" defaultMessage="Submit" />
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}

export default connect(
  mapStateToProps,
  { handleSaveQuestion }
)(injectIntl(NewPoll));
