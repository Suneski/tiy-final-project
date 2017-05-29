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

class SearchResultLi extends React.Component {

  render() {

    var rating = this.props.rating;

    switch(rating){
      case 1:
        rating = one;
        break;
      case 1.5:
        rating = onefive;
        break;
      case 2:
        rating = two;
        break;
      case 2.5:
        rating = twofive;
        break;
      case 3:
        rating = three;
        break;
      case 3.5:
        rating = threefive;
        break;
      case 4:
        rating = four;
        break;
      case 4.5:
        rating = fourfive;
        break;
      case 5:
        rating = five;
        break;
      default:
        rating = zero;
    }

    var locationArray = [this.props.address1.split(' ').join('+'), this.props.city.split(' ').join('+'), this.props.state.split(' ').join('+')];
    var location = locationArray.join('+');
    var googleMapsLink = `https://www.google.com/maps/dir//${location}`

    return(
      <li className="searchResultItem">
        <div className="imageResult">
          <a href={this.props.url}><img src={this.props.imageUrl} alt={this.props.name}/></a>
        </div>
        <div className="restaurantDetails">
          <div
            className={this.props.addButton}
            onClick={this.props.addRestaurant}>
          </div>
          <div
            className={this.props.favorited}
            onClick={this.props.removeCheckMark}>
          </div>
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

          <p className="directions"><a href={googleMapsLink} target="_blank">Get Directions</a></p>
        </div>
      </li>
    )
  }
}

module.exports = SearchResultLi;
