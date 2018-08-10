import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class Map extends Component {
  constructor(props) {
    super(props)

    this.state ={
      markets: [],
        viewport: {
          width: 400,
          height: 400,
          latitude: 40.7410986,
          longitude: -73.997623,
          zoom: 8
        }
      }
    }



  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(viewport) => this.setState({ viewport })}
      >

      </ ReactMapGL>
    );
  }
}

export default Map;
