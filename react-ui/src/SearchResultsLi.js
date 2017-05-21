import React from 'react';
import './RestaurantQuery.css';

import zero from './images/yelp/stars-0.png'
import one from './images/yelp/stars-1.0.png'
import onefive from './images/yelp/stars-1.5.png'
import two from './images/yelp/stars-2.0.png'
import twofive from './images/yelp/stars-2.5.png'
import three from './images/yelp/stars-3.0.png'
import threefive from './images/yelp/stars-3.5.png'
import four from './images/yelp/stars-4.0.png'
import fourfive from './images/yelp/stars-4.5.png'
import five from './images/yelp/stars-5.0.png'
import logo from './images/yelp/yelp.png'

class SearchResultLi extends React.Component {
  render() {
    let rating;
    if (this.props.rating === 0) {
      rating = zero;
    }
    if (this.props.rating === 1) {
      rating = one;
    }
    if (this.props.rating === 1.5) {
      rating = onefive;
    }
    if (this.props.rating === 2) {
      rating = two;
    }
    if (this.props.rating === 2.5) {
      rating = twofive;
    }
    if (this.props.rating === 3) {
      rating = three;
    }
    if (this.props.rating === 3.5) {
      rating = threefive;
    }
    if (this.props.rating === 4) {
      rating = four;
    }
    if (this.props.rating === 4.5) {
      rating = fourfive;
    }
    if (this.props.rating === 5) {
      rating = five;
    }

    return(
      <li className="searchResultItem">
        <div className="imageResult">
          <a href={this.props.url}><img src={this.props.imageUrl} alt={this.props.name}/></a>
        </div>
        <div className="restaurantDetails">
          <div className="addButton" onClick={this.props.addRestaurant}></div>
          <div className="textResults">
            <a href={this.props.url}>{this.props.name}</a>
            <p>
              <img src={rating} alt="star rating" className="star-rating"/> <a href={this.props.url}>
                <img src={logo} alt="yelp logo" className="yelp-logo"/>
              </a>
            </p>
            <p>(based on {this.props.reviewCount} reviews)</p>
            <p>Price: {this.props.price}</p>
            <p>{this.props.address1}</p>
            <p>{this.props.address2}</p>
            <p>{this.props.address3}</p>
            <p>{this.props.city}, {this.props.state} {this.props.zipCode}</p>
          </div>
        </div>
      </li>
    )
  }
}

module.exports = SearchResultLi;
