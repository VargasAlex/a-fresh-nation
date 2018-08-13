import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import MARKER_STYLE from './marker-style';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class Map extends Component {
  constructor(props) {
    super(props)

    this.state ={
      markets: [],
        viewport: {
          width: window.screen.width,
          height: window.screen.height,
          latitude: 40.7410986,
          longitude: -73.997623,
          zoom: 8
        }
      }
    }


  _renderMarker(market, i) {
    console.log(market)
    return (
      <Marker key={i} longitude={market.lng} latitude={market.lat} >
        <div className="station"><span>words</span></div>
      </Marker>
    );
  }



  render() {
    const markets = this.props.marketCoords.coordinates
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
      {markets.map(this._renderMarker)}
      </ ReactMapGL>
    );
  }
}

export default Map;
