import React, { PureComponent } from 'react'
import SingleSelect from '@atlaskit/single-select';
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
    const orginazationItems = orginazationRes.data.map(object => ({
      content: object.name,
      value: object.name,
      name: object.name,
      description: object.description,
      address: object.address,
      director: object.director,
      _id: object._id,
      createdAt: object.createdAt,
      updatedAt: object.updatedAt
    }));
    this.setState({ selectItems: [{ items: orginazationItems }] })
  }

  getRealValue(){
    if(typeof this.props.value === "string" && this.state.selectItems.length > 0){
      return this.state.selectItems[0].items.find(i => i.value === this.props.value);
    }
    return this.props.value;
  }

  render() {
    return (
      <SingleSelect
        placeholder="Choose a Organization"
        items={this.state.selectItems}
        noMatchesFound="Empty items"
        hasAutocomplete
        onSelected={(object) => this.props.onChange(object.item)}
        defaultSelected={this.getRealValue()}
        {...this.props}
      />
    );
  }
}

