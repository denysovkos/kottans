import React, {Component} from 'react';
import {Button, Form, Segment} from 'semantic-ui-react';

class Filters extends Component {
  render() {
    const {availableLanguages, handleChange, handleApplyFilters} = this.props;

    const options = [
      {text: 'Yes', value: 'true'},
      {text: 'No', value: 'false'},
    ];

    return (
      <Segment>
        <Form>
          <Form.Group widths={3}>
            <Form.Dropdown label='Has open issues'
                           selection compact
                           name="has_issues"
                           onChange={handleChange}
                           options={options}/>
            <Form.Dropdown label='Has topics'
                           selection compact
                           name="topics"
                           onChange={handleChange}
                           options={options}/>
            <Form.Input label='Starred from:'
                        name="stargazers_count"
                        onChange={handleChange}/>
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input label='Updated after:'
                        name="updated_at"
                        onChange={handleChange}
                        type="date"
            />
            <Form.Dropdown label="Language" options={availableLanguages}
                           onChange={handleChange}
                           selection compact name="language"/>
          </Form.Group>

          <Button primary type='submit' onClick={handleApplyFilters}>Apply filters</Button>
        </Form>
      </Segment>
    );
  }
}

Filters.propTypes = {};
Filters.defaultProps = {};

export default Filters;

//has topics
// starred >= X times
// updated after X date
// type (all, forks, or sources)
// language