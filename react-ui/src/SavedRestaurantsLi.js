import React from 'react';


class SavedRestaurantsLi extends React.Component {
  render() {

    return(
      <li className="searchResultItem">
          <a href={this.props.url}><p>{this.props.name}</p></a>
      </li>
    )
  }
}

module.exports = SavedRestaurantsLi;
