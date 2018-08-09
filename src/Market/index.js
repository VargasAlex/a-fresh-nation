import React, {Component} from "react";
import "./style.css"

class Market extends Component {
  constructor(props, context) {
    super(props, context);

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
            <button className="submit" type="button" onClick={evt => this.onSubmitClick(evt)}>Submit</button>
          </div>
        </form>
         <p>{this.state.marketInfo.Address}</p>
         <p>{this.state.marketInfo.GoogleLink}</p>
         <p>{this.state.marketInfo.Products}</p>
         <p>{schedule}</p>
         {this.state.results.map(result => {
           return (
             <div className="market-name" key={result.id} id={result.id} onClick={evt => this.onMarketClick(evt)}>
               {result.marketname.substring(4)}
             </div>
           )
         })}
      </div>
    )
  }
}


export default Market;
