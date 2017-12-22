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
    if (this.props.query != undefined)
      query = this.props.query
    const organizationList = await OrganizationApi.getOrganizationsFilter(query)
    let organizationItems = [{ items: [] }]
    organizationList.data.forEach(element => {
      organizationItems[0].items.push({
        content: element.name,
        value: element._id
      })
    });
    this.setState({
      selectItems: organizationItems
    })
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

