import React from 'react';


class SavedRestaurantsLi extends React.Component {
  render() {

    return(
      <li className="searchResultItem">
        <div className="imageResult">
          <a href={this.props.url}><img src={this.props.imageUrl} alt={this.props.name}/></a>
        </div>
        <div className="restaurantDetails">
          <div className="textResults">
            <a href={this.props.url}>{this.props.name}</a>
            <p>Rating: {this.props.rating}</p>
            <p>Price: {this.props.price}</p>
            <p>{this.props.address1} {this.props.address2} {this.props.address3}</p>
            <p>{this.props.city}, {this.props.state} {this.props.zipCode}</p>
          </div>
        </div>
      </li>
    )
  }
}

module.exports = SavedRestaurantsLi;
