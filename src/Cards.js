import React, {Component} from 'react';
import {Button, Card, Icon, Image, Label, Segment} from 'semantic-ui-react';
import Filters from './Filters';
import Sort from './Sort';
import {sortBy, uniq} from 'lodash';

class Cards extends Component {

  constructor(props) {
    super(props);

    this.state = {
      availableLanguages: [],
      filters: {},
      data: [],
      sort: {
        name: {
          asc: true
        },
        stargazers_count: {
          asc: true
        },
        open_issues_count: {
          asc: true
        },
        updated_at: {
          asc: true
        },
      }
    }
  }

  componentWillMount() {
    let {data} = this.props;
    this.setState({data});
    let availableLanguages = [];

    data.map(x => typeof x.language === 'string' && availableLanguages.push(x.language));

    availableLanguages = uniq(availableLanguages);
    availableLanguages.map((x, i) => availableLanguages[i] = {text: x, value: x});

    this.setState({availableLanguages});
  }

  handleChange = (e, {name, value}) => {
    this.setState({
      filters: {
        [name]: value
      }
    });
  };

  handleApplyFilters = () => {
    let {filters} = this.state;
    let {data} = this.props;

    data = data.filter(item => {
      for (let key in filters) {

        if (key === 'stargazers_count') {
          if (item[key] < filters[key])
            return false;
        }

        if (key === 'updated_at') {
          if (new Date(item[key]) < new Date(filters[key]))
            return false;
        }

        if (key === 'topics') {
          if (String(!!item[key].length) !== filters[key])
            return false;
        }

        if (key !== 'stargazers_count' && key !== 'updated_at' && key !== 'topics' && String(item[key]) !== filters[key]) {
          return false;
        }
      }
      return true;
    });

    this.setState({data});
  };

  handleSort = (e, {name}) => {
    let {data, sort} = this.state;
    data = sortBy(data, name);

    if (!sort[name].asc) {
      data = data.reverse()
    }

    this.setState({data, sort: Object.assign({...sort}, {[name]: {asc: !this.state.sort[name].asc}})});
  }


  render() {
    const {availableLanguages, data} = this.state;
    const {handleModal} = this.props;
    return (
      <Segment padded>
        <Filters availableLanguages={availableLanguages} handleChange={this.handleChange}
                 handleApplyFilters={this.handleApplyFilters}/>
        <Sort handleSort={this.handleSort}/>
        <Card.Group>
          {
            data.map(x => {
              return (
                <Card key={x.id} fluid>
                  <Card.Content>
                    {x.fork && <Label basic color='teal' ribbon='right'>Forked</Label>}
                    <Card.Header style={{marginTop: 10}}>
                      {x.name}
                      <Image floated='right' size='mini' src={x.owner.avatar_url}/>
                    </Card.Header>
                    <Card.Meta>
                      {x.description}<br/>
                      {x.stargazers_count ? <Label basic>
                        <Icon name="star" color="yellow"/>
                        <Label.Detail>{x.stargazers_count}</Label.Detail>
                      </Label> : null}
                    </Card.Meta>
                    <Card.Description>
                      <strong>Updated at: </strong> {x.updated_at ? <span>{new Date(x.updated_at).toString()}</span> :
                      <span>never updated</span>}<br/>
                      <strong>Language:</strong> {x.language}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button basic primary onClick={() => window.location.replace(`${x.html_url}`)}>To
                      repository</Button>
                    <Button basic secondary onClick={(e) => handleModal(e, x)}>Details</Button>
                  </Card.Content>
                </Card>
              )
            })
          }
        </Card.Group>
      </Segment>
    );
  }
}

export default Cards;
