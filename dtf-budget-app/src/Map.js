import React, { Component } from 'react';
import $ from 'jquery';

class Maps extends Component {
  constructor(props) {
    super(props);

  }

  showMap(dest){

    $('.map').html(
      '<iframe width="600" height="450" frameborder="0" styles="border:0" src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyBoge6Bopxdq2A8zpUl4re14laauHXk8jg&origin=E+Commonwealth+Ave+Harbor+Blvd+Fullerton+CA+92832'+
        dest
      +'&mode=walking"></iframe>'
    );
  }

  checkUnique(arr){

    var coordinates = [];

    for(var i = 4; i < arr.length; i+=5){
        coordinates.push(arr[i]);
    }

    var uniqueCoords = [];
    uniqueCoords.push(coordinates[0]);

    for(var j = 1; j < arr.length; j++){
      if(!uniqueCoords.includes(coordinates[j]) && coordinates[j] != undefined){
        uniqueCoords.push(coordinates[j]);
      }
    }
    return uniqueCoords;
  }

  componentDidMount(){
    var coord = this.checkUnique(this.props.listing);
    var destinations = '';

    for(var i = 0; i < coord.length-1; i++){
      destinations += ('&waypoints='+coord[i]);
    }
    destinations += ('&destination='+coord[coord.length-1]);
    this.showMap(destinations);
  }

    render(){
      if (this.props.loaded) {
            return (
              <div>Loading...</div>
          );
        }
      else{
          return (
            <div>
              <div className="map"></div>
            </div>
          );
      }
  }
}

export default Maps;
