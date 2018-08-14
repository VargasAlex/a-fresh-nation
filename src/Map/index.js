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
      this._renderMarker = this._renderMarker.bind(this);
    }

  _renderMarker(markets, i) {
    return (
      <Marker key={i} longitude={markets[1]} latitude={markets[0]} >
         <div className="station"><span>hi</span></div>
      </Marker>
    );
  }


  render() {
    const markets = this.props.marketCoords.data;
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        {markets ? markets.map(this._renderMarker) : null}
      </ ReactMapGL>
    );
  }
}

export default Map;
