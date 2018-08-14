import React, { Component } from "react";
import "./style.css"
import Map from "../Map";


// const GEOCODE_API_KEY = process.env.REACT_APP_GEOCODE_API_KEY;

class Market extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zip_code: '',
      results: [],
      marketInfo: {},
    }
  }

  onFormChange(evt) {
    const domElement = evt.target.value;
    this.setState({ zip_code: domElement });
  }

  onSubmitClick(evt) {
    fetch(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${this.state.zip_code}`)
      .then(response => response.json())
      .then(response => {
        // console.log(response.results)
        let marketDetailsPromises = [];
        response.results.forEach(market => {
          let promise = fetch(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${market.id}`)
            .then(response => response.json())
            .then(data => Object.assign({}, data, market))
          marketDetailsPromises.push(promise)
        });
        this.setState({
          results: response.results
        });
        return Promise.all(
          marketDetailsPromises
        )
      })
      .then(markets => {
        // console.log('markets',markets)
        const urls = markets
        const data = urls.map(url => {
          const link = new URL(url.marketdetails.GoogleLink)
          const param = link.searchParams.get('q');
          const coords = param.split(', ')
          const lat = coords[0];
          const long = coords[1].split(' ')[0];
          let coordinates = [lat, long].map(Number);
          // console.log(coordinates)
          return coordinates
        })
        this.setState({
          data: data
        })
          // console.log('single', market)
          // let addressPromise = fetch(`https://api.opencagedata.com/geocode/v1/json?q=${market.marketdetails.Address}&key=${GEOCODE_API_KEY}`)
          //   .then(response => response.json())
          //   .then(data => Object.assign({}, data, market))
          // marketAddress.push(addressPromise)
      //   });
      //   console.log(data)
      //   return Promise.all(
      //     marketAddress
      //   )
      // })
      // .then(marketAddress => {
      //   console.log(marketAddress)
      //   let coordinates= marketAddress.map(apiData => {
      //     let coordinate = {};
      //     if (apiData.results.length === 0 ) {return null}
      //     coordinate.lat = apiData.results[0].geometry.lat
      //     marketAddress;
      //     coordinate.lng = apiData.results[0].geometry.lng
      //     coordinate.id = apiData.id
      //     coordinate.marketname = apiData.marketname
      //     return coordinate
      //   })
      //   coordinates = coordinates.filter(coordinate => {
      //     return coordinate !== null
      //   })
      //   this.setState({
      //     coordinates: coordinates
      //   })
      })
  }

  onMarketClick(evt) {
    const market = evt.target.getAttribute('id')
    // console.log(market)
    fetch(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${market}`)
      .then(response => response.json())
      .then(marketInfo => {
        this.setState({
          marketInfo: marketInfo.marketdetails
        })
      })
  }

  render() {
    let schedule = '';
    if (this.state.marketInfo.Schedule) {
      schedule = this.state.marketInfo.Schedule.substring(0, this.state.marketInfo.Schedule.length - 16)
    }
    let marketCoords = this.state;
    let marketData = this.state.results;
    // console.log(marketData)
    console.log(marketCoords)
    return (
      <div className="Market">
        <form onChange={evt => this.onFormChange(evt)}>
          <h1 className="title">🍎 🍌 🍓 A Fresh Nation! 🥦 🥕 🥑</h1>
          <div className='form-inline'>
            <input className="form-control input-small" name="zip" placeholder="Insert zip code here..." value={this.state.zip} />
            <button className="submit" type="button" onClick={evt => this.onSubmitClick(evt)}>Submit</button>
          </div>
        </form>
        {/* <p>{this.state.marketInfo.Address}</p>
        <p>{this.state.marketInfo.GoogleLink}</p>
        <p>{this.state.marketInfo.Products}</p>
        <p>{schedule}</p> */}
        <Map
          marketCoords = {this.state}
          marketData = {this.state}
        />
      </div>
    )
  }
}


export default Market;
