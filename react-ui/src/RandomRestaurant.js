import React from 'react';

import './index.css';

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
import logo from './images/yelp/yelp-burst-positive.png'

class RandomRestaurant extends React.Component {

  render() {
    let rating;
    if (this.props.rating === "0") {
      rating = zero;
    }
    if (this.props.rating === "1") {
      rating = one;
    }
    if (this.props.rating === "1.5") {
      rating = onefive;
    }
    if (this.props.rating === "2") {
      rating = two;
    }
    if (this.props.rating === "2.5") {
      rating = twofive;
    }
    if (this.props.rating === "3") {
      rating = three;
    }
    if (this.props.rating === "3.5") {
      rating = threefive;
    }
    if (this.props.rating === "4") {
      rating = four;
    }
    if (this.props.rating === "4.5") {
      rating = fourfive;
    }
    if (this.props.rating === "5") {
      rating = five;
    }

    let googleMapsLink = `https://www.google.com/maps/dir//${this.props.location}`

    return(
      <div className="searchResultItem" id="random">
        <div className="image-result">
          <a href={this.props.url} target="_blank"><img src={this.props.imageUrl} alt={this.props.name}/></a>
        </div>
        <div className="restaurantDetails">
          <div className="textResults">
            <a href={this.props.url} target="_blank" className="restaurant-name">{this.props.name}</a>
              <p>
                <img
                  src={rating}
                  alt="star rating"
                  className="star-rating"/>
                <a href={this.props.url} target="_blank">
                  <img
                    src={logo}
                    alt="yelp logo"
                    className="yelp-logo"
                  />
                </a>
              </p>
            <p>{this.props.address1}</p>
            <p>{this.props.address2}</p>
            <p>{this.props.address3}</p>
            <p>{this.props.city}, {this.props.state} {this.props.zipCode}</p>
            <br />
            <p>Price: {this.props.price}</p>
          </div>
          <p className="directions"><a href={googleMapsLink} target="_blank">Get Directions</a></p>
        </div>

      </div>
    )
  }
}

module.exports = RandomRestaurant;
