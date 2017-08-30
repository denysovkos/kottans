import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';

import { Input, Container, Header, Segment, Button, Grid } from 'semantic-ui-react'
import Cards from './Cards';
import Dialog from './Dialog';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      foundUsersData: [],
      foundOrgData: [],
      isSearch: false,
      modalOpen: false,
      currentRepo: {}
    };
  }

  handleChange = (e, {value}) => this.setState({search: value, isSearch: false});
  handleSubmit = () => {
    this.setState({foundUsersData: [], foundOrgData: []});

    fetch(`https://api.github.com/users/${this.state.search}/repos`, {
      headers: {
        "Accept": "application/vnd.github.mercy-preview+json"
      }
    })
      .then(data => data.json())
      .then(data => {
        if (data.message) return;
        this.setState({foundUsersData: data});
      })
      .catch(err => console.log('err', err))

    fetch(`https://api.github.com/orgs/${this.state.search}/repos`, {
      headers: {
        "Accept": "application/vnd.github.mercy-preview+json"
        }
      })
      .then(data => data.json())
      .then(data => {
        if (data.message) return;
        this.setState({foundOrgData: data})
      })
      .catch(err => console.log('err', err))

    this.setState({isSearch: true})
  };

  handleModal = (e, data) => {
    e.preventDefault();
    console.log(data);
    this.setState({modalOpen: !this.state.modalOpen, currentRepo: data})
  }

  handleCloseModal = () => {
    this.setState({modalOpen: false, currentRepo: {}})
  }

  render() {
    let {search, foundUsersData, foundOrgData,isSearch, currentRepo, modalOpen} = this.state;
    return (
      <Container>
        <Segment padded>
        <Header>GitHub API Client</Header>
          <Input placeholder='Owner (organization or user)' fluid action value={search} onChange={this.handleChange} >
            <input />
            <Button primary disabled={!search.length} type='submit' onClick={this.handleSubmit}>Search</Button>
          </Input>
          {!foundUsersData.length && !foundOrgData.length && isSearch ?
           <Header as='h2' textAlign='center' color="pink">No data found</Header> : null}
        </Segment>
        <Container>
        <Grid columns={foundUsersData.length && foundOrgData.length ? 2 : 1} >
          {foundUsersData.length ? <Grid.Column> <Cards data={foundUsersData} handleModal={this.handleModal} /> </Grid.Column> : null}
          {foundOrgData.length ? <Grid.Column> <Cards data={foundOrgData} handleModal={this.handleModal} /> </Grid.Column> : null}
        </Grid>
        </Container>
        <Dialog modalOpen={modalOpen} currentRepo={currentRepo} handleCloseModal={this.handleCloseModal} />
      </Container>
    );
  }
}

export default App;
