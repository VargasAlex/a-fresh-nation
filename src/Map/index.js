import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import "./style.css"

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class Map extends Component {
  constructor(props) {
    super(props)

    this.state ={
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
        <div className="station"><span>{market.marketname.substring(4)}</span></div>
      </Marker>
    );
  }


  render() {
    const markets = this.props.marketCoords.coordinates;
    const marketNames = this.props.marketData.results
    console.log(marketNames)
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
