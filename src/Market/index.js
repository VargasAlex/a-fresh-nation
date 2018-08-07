import React, {Component} from "react";


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
        <h1>A Fresh Nation</h1>
        <form onChange={evt => this.onFormChange(evt)}>
          <input name="zip" value={this.state.zip} />
          <button type="button" onClick={evt => this.onSubmitClick(evt)}>Submit</button>
          {this.state.results.map(result => {
            return (
              <p>{result.marketname.substring(3)}</p>
            )
          })}
        </form>
      </div>
    )
  }
}

export default Market;
