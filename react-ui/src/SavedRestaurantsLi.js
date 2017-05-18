import React from 'react';

class SavedRestaurantsLi extends React.Component {
  render() {

    return(
      <li className="searchResultItem">
        <div>
          <a href={this.props.url}><p>{this.props.name}</p></a>
        </div>
      </li>
    )
  }
}

module.exports = SavedRestaurantsLi;
