import React, { Component, Fragment } from 'react';
import { FormattedMessage, defineMessage, injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Menu,
  Responsive,
  Image,
  Grid,
  Button,
  Container
} from 'semantic-ui-react';
import { setAuthUser } from '../actions/authUser';

const MESSAGES = defineMessage({
  home: {
    id: 'nav.menu.item.home',
    defaultMessage: 'home'
  },
  poll: {
    id: 'nav.menu.item.poll',
    defaultMessage: 'new poll'
  },
  leader: {
    id: 'nav.menu.item.leader',
    defaultMessage: 'leader board'
  },
  logout: {
    id: 'nav.menu.logout',
    defaultMessage: 'Logout'
  }
});

class Nav extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.setAuthUser(null);
  };

  render() {
    const { authUser, users, intl: { formatMessage } } = this.props;

    return (
      <Container>
        <Responsive as={Menu} minWidth={651} pointing secondary>
          <Menu.Item name={formatMessage(MESSAGES.home)} as={NavLink} to="/" exact />
          <Menu.Item name={formatMessage(MESSAGES.poll)} as={NavLink} to="/add" />
          <Menu.Item name={formatMessage(MESSAGES.leader)} as={NavLink} to="/leaderboard" />
          <Menu.Menu position="right">
            <Menu.Item>
              <span>
                <Image
                  src={users[authUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {users[authUser].name}
              </span>
            </Menu.Item>
            <Menu.Item>
              <Button
                content={formatMessage(MESSAGES.logout)}
                labelPosition="right"
                basic
                compact
                icon="log out"
                size="mini"
                onClick={this.handleLogout}
              />
            </Menu.Item>
          </Menu.Menu>
        </Responsive>
        <Responsive as={Fragment} minWidth={375} maxWidth={650}>
          <Grid columns={2} padded="vertically">
            <Grid.Row>
              <Grid.Column>
                <Image
                  src={users[authUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {users[authUser].name}
              </Grid.Column>
              <Grid.Column verticalAlign="bottom" textAlign="right">
                <Button
                  content={formatMessage(MESSAGES.logout)}
                  labelPosition="right"
                  basic
                  compact
                  icon="log out"
                  size="mini"
                  onClick={this.handleLogout}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Menu pointing secondary widths={3}>
                  <Menu.Item name={formatMessage(MESSAGES.home)} as={NavLink} to="/" exact />
                  <Menu.Item name={formatMessage(MESSAGES.poll)} as={NavLink} to="/add" />
                  <Menu.Item
                    name={formatMessage(MESSAGES.leader)}
                    as={NavLink}
                    to="/leaderboard"
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
        <Responsive as={Fragment} maxWidth={374}>
          <Grid padded="vertically" columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Image
                  src={users[authUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {users[authUser].name}
                <Button
                  content={formatMessage(MESSAGES.logout)}
                  labelPosition="right"
                  basic
                  compact
                  icon="log out"
                  size="mini"
                  floated="right"
                  onClick={this.handleLogout}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Menu pointing secondary widths={3}>
                  <Menu.Item name={formatMessage(MESSAGES.home)} as={NavLink} to="/" exact />
                  <Menu.Item name={formatMessage(MESSAGES.poll)} as={NavLink} to="/add" />
                  <Menu.Item
                    name={formatMessage(MESSAGES.leader)}
                    as={NavLink}
                    to="/leaderboard"
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
      </Container>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users
  };
}

export default connect(
  mapStateToProps,
  { setAuthUser }
)(injectIntl(Nav));
