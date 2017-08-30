import React, {Component} from 'react';
import {Button, Card, Header, Icon, Image, Modal, Segment} from 'semantic-ui-react'

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);

    this.state = {
      contributors_url: [],
      languages_url: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const {currentRepo, modalOpen} = nextProps;
    if(modalOpen) {
      console.log('func call')
      this.getData(currentRepo.contributors_url, 'contributors_url');
      this.getData(currentRepo.languages_url, 'languages_url');
    }
  }


  getData(link, name) {
    console.log('func call getData')
    fetch(link)
      .then(data => data.json())
      .then(data => this.setState({[name]: data}))
      .catch(err => console.log(err));
  };

  render() {
    const {modalOpen, currentRepo, handleCloseModal} = this.props;
    const {contributors_url, languages_url} = this.state;

    return (
      <Modal size='fullscreen'
        open={modalOpen}
        onClose={handleCloseModal}
      >
        <Header icon='github' content={currentRepo.full_name} />
        <Modal.Content>
          <strong>Link on repo:</strong> <a href={currentRepo.html_url}>click here</a><br />
          {currentRepo.fork && <span><strong>Link on fork's source:</strong> <a href={currentRepo.homepage}>click here</a></span>}<br />
          {contributors_url.length ? <Card.Group>{contributors_url.slice(0, 3).map(v => {
            return (
                  <Card>
                    <Card.Content>
                      <Image floated='right' size='mini' src={v.avatar_url} />
                      <Card.Header>
                        <a href={v.html_url}>Steve Sanders</a> | {v.contributions}
                      </Card.Header>
                    </Card.Content>
                  </Card>
            )
          })}</Card.Group> : <strong>No contributors</strong>}
          {Object.keys(languages_url).length ? <Segment>{Object.keys(languages_url).map(x => <p><strong>{x}</strong> : {languages_url[x]}</p>)}</Segment> : <strong>No languages available</strong>}
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={handleCloseModal} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default Dialog;
