import React, { Component } from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'; 
import Polyline from '@mapbox/polyline';
import Geolocation from '@react-native-community/geolocation';
// navigator.geolocation = require('@react-native-community/geolocation');

class MapsScreen extends Component {
  constructor (props) {
    super(props)
    const region = {
       latitude: -6.2691134,
       longitude: 106.484353,
       latitudeDelta: 0.02,
       longitudeDelta: 0.02
    }
    this.state = {
      region, // default region maps
      myLocation: {
         title: 'My Location',
         latitude: region.latitude,
         longitude: region.longitude
      },
      destination: {
         title: 'Destination',
         latitude: -6.2691134,
         longitude: 106.484353
      },
      error:null,
      concat: null,
      x: 'false',
      coords: [] // menampung array koordinat polyline
    }
    this.mergeLot = this.mergeLot.bind(this);
  }

  mergeLot(){
    if (this.state.myLocation.latitude != null && this.state.myLocation.longitude != null)
    {
      let concatLot = this.state.myLocation.latitude +","+this.state.myLocation.longitude;
      let concatdestination = this.state.destination.latitude +","+ this.state.destination.longitude;
      this.setState({
        concat: concatLot
      }, () => {
        this.getDirections(concatLot, concatdestination);
      });
    }

  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyA57OyrCvXWB-xOLBAHRLU3s5cExPpXwcA`)
      let respJson = await resp.json();
      // console.log('@respJson',respJson);
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
          return  {
              latitude : point[0],
              longitude : point[1]
          }
      })
      this.setState({coords: coords})
      this.setState({x: "true"})
      return coords
    } catch(error) {
      // console.log('masuk fungsi',error)
        this.setState({x: "error"})
        return error
    }
  }

  renderMapMarkers (location) {
    return (
       <MapView.Marker
          key={location.title}
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude}}
       >
       </MapView.Marker>
    )
  }

  componentDidMount() {
    this.callLocation();
   }

   async callLocation(){
    await Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        this.setState({ 
          myLocation: {
            title: 'My Location',
            latitude: currentLatitude,
            longitude: currentLongitude
          } 
        });
        // this.mergeLot();
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    )
  }

  render() {
    return (
      <View
        style={{ flex: 1, width: window.width, height: 100, backgroundColor: 'red' }}
      >
      <MapView
        style={{ flex: 1, width: window.width, height: 100, backgroundColor: 'red' }}
        initialRegion={this.state.region}
        showsUserLocation
      >
        {this.renderMapMarkers(this.state.myLocation)}
        {this.renderMapMarkers(this.state.destination)}

        { this.state.myLocation.latitude != null && this.state.myLocation.longitude != null &&
        <MapView.Polyline
          coordinates={[
            { latitude: this.state.myLocation.latitude, longitude:this.state.myLocation.longitude },
            { latitude: this.state.destination.latitude, longitude:this.state.destination.longitude }
          ]}
          strokeColor="indigo" // fallback for when `strokeColors` is not supported by the map-provider 
          strokeWidth={6}
        />}
        {/* <MapViewDirections
          origin={this.state.myLocation}
          destination={this.state.destination}
          apikey={GOOGLE_MAPS_APIKEY}
        /> */}
      </MapView>
      </View>
    );
  } 
}

export default MapsScreen;
