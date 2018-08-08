import React, {Component} from "react";
import "./style.css"

class Market extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zip_code: '',
      results: [],
      marketInfo: {}
    }
  }

  onFormChange(evt) {
    const domElement = evt.target.value;
    this.setState({zip_code: domElement});
  }

  onSubmitClick(evt) {
    fetch(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${this.state.zip_code}`)
    .then(response => response.json())
      .then(marketname => {
        console.log(marketname.results)
        this.setState({
          results: marketname.results
        });
      });
  }

  onMarketClick(evt) {
    const market = evt.target.getAttribute('id')
    console.log(market)
    fetch(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${market}`)
    .then(response => response.json())
      .then(marketInfo => {
        this.setState({
          marketInfo: marketInfo.marketdetails
        })
      })
  }

  render () {
    let schedule = '';
    if (this.state.marketInfo.Schedule) {
      schedule = this.state.marketInfo.Schedule.substring(0, this.state.marketInfo.Schedule.length - 16)
    }
     return (
      <div className="Market">
        <h1 className="title">🍎 🍌 🍓 A Fresh Nation! 🥦 🥕 🥑</h1>
        <form onChange={evt => this.onFormChange(evt)}>
          <div className='form-inline'>
            <input className="form-control input-small" name="zip" placeholder="Insert zip code here..." value={this.state.zip} />
            <button type="button" onClick={evt => this.onSubmitClick(evt)}>Submit</button>
          </div>
           <p>{this.state.marketInfo.Address}</p>
           <p>{this.state.marketInfo.GoogleLink}</p>
           <p>{this.state.marketInfo.Products}</p>
           <p>{schedule}</p>
          {this.state.results.map(result => {
            return (
              <p key={result.id} id={result.id} onClick={evt => this.onMarketClick(evt)}>
                {result.marketname.substring(4)}
              </p>
            )
          })}
        </form>
      </div>
    )
  }
}

export default Market;
