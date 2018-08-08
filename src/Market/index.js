import React, {Component} from "react";
import "./style.css"
import { Button } from 'react-bootstrap';

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '',
      marketname: '',
      results: [],
    }
  }


  onFormChange(evt) {
    const domElement = evt.target.value;
    this.setState({zip: domElement});
  }

  onSubmitClick(evt) {
    fetch(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${this.state.zip}`)
    .then(response => response.json())
      .then(marketname => {
        console.log(marketname.results)
        this.setState({
          results: marketname.results
        });
      });
  }

  render () {
    return (
      <div className="Market">
        <h1 className="title">🍎 🍌 🍓 A Fresh Nation! 🥦 🥕 🥑</h1>
        <form onChange={evt => this.onFormChange(evt)}>
          <div className='form-inline'>
            <input className="form-control input-small" name="zip" placeholder="Insert zip code here..." value={this.state.zip} />
            <button type="button" onClick={evt => this.onSubmitClick(evt)}>Submit</button>
          </div>
          {this.state.results.map(result => {
            return (
              <p key={result.id}>{result.marketname.substring(4)}</p>
            )
          })}
        </form>
      </div>
    )
  }
}

export default Market;
