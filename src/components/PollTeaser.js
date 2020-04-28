import React, { Component, Fragment } from 'react';
import { FormattedMessage, defineMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import { colors } from '../utils/helpers';

const MESSAGES = defineMessage({
  answer: {
    id: 'poll.teaser.button.answer',
    defaultMessage: 'Answer Poll'
  },
  results: {
    id: 'poll.teaser.button.results',
    defaultMessage: 'Results'
  }
});

export class PollTeaser extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool.isRequired
  };
  state = {
    viewPoll: false
  };
  handleClick = e => {
    this.setState(prevState => ({
      viewPoll: !prevState.viewPoll
    }));
  };
  render() {
    const { question, unanswered, intl: { formatMessage } } = this.props;
    const buttonColor = unanswered === true ? colors.green : colors.blue;
    const buttonContent = unanswered === true
      ?
        `${formatMessage(MESSAGES.answer)}`
      :
        `${formatMessage(MESSAGES.results)}`;

    if (this.state.viewPoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <Fragment>
        <Header as="h5" textAlign="left">
          <FormattedMessage
            id="poll.result.would.you.text"
            defaultMessage="Would you rather"
          />
        </Header>
        <p style={{ textAlign: 'center' }}>
          {question.optionOne.text}
          <br />
          <FormattedMessage
            id="poll.result.or.text"
            defaultMessage="or..."
          />
        </p>
        <Button
          color={buttonColor.name}
          size="tiny"
          fluid
          onClick={this.handleClick}
          content={buttonContent}
        />
      </Fragment>
    );
  }
}

export default injectIntl(PollTeaser);
