import React, { PureComponent } from 'react'
import SingleSelect from '@atlaskit/single-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import OrganizationApi from 'api/OrganizationApi'

export default class SelectBoxOrganization extends PureComponent {
  static propTypes = {
    query: PropTypes.object
  };
  state = {
    selectItems: []
  };
  async componentDidMount() {
    let query = {}
    const orginazationRes = await OrganizationApi.getOrganizationsFilter(query)
    const orginazationItems = orginazationRes.data.map(or => ({
      content: or.name,
      value: or.name
    }));
    this.setState({ selectItems: [{ items: orginazationItems }] })
  }


  render() {
    return (
      <SingleSelect
        items={this.state.selectItems}
        placeholder="Choose a Organization"
        noMatchesFound="Empty items"
        hasAutocomplete
      // defaultSelected={selectItems[0].items[0]}
      />
    );
  }
}

