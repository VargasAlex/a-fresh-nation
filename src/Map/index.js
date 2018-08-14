import React, { Component } from 'react';
import ReactMapGL,{ Marker } from 'react-map-gl';
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

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  _renderMarker(markets, i) {
    return (
      <Marker key={i} longitude={markets[1]} latitude={markets[0]} >
        <div className="station"><span>{this.props.marketCoords.results[i].marketname.substring(4)}</span></div>
      </Marker>
    );
  }

  render() {
    const markets = this.props.marketCoords.data;
    this.props.marketCoords.results.map(name => {
      let names = name.marketname
      console.log(names)
    })
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
