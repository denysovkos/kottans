import React, {Component} from 'react';
import {Label, Segment} from 'semantic-ui-react';

class Sort extends Component {
  render() {
    const {handleSort} = this.props;
    return (
      <Segment>
        Sort by: {' '}
        <Label as='a' color='blue' name="name" onClick={handleSort}>
          Repo name
        </Label>
        <Label as='a' color='blue' name="stargazers_count" onClick={handleSort}>
          Stars count
        </Label>
        <Label as='a' color='blue' name="open_issues_count" onClick={handleSort}>
          Open issues count
        </Label>
        <Label as='a' color='blue' name="updated_at" onClick={handleSort}>
          Updated date
        </Label>
      </Segment>
    );
  }
}

Sort.propTypes = {};
Sort.defaultProps = {};

export default Sort;
