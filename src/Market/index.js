import React, {Component} from "react";


class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marketname: '',
      results: [],
    }
  }

  componentDidMount() {
    fetch('http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=10002')
      .then(response => response.json())
      .then(marketname => {
        console.log(marketname)
        this.setState({
          results: marketname.results
        })
        console.log(this.state.results)
        });
      }

  render () {
    return (
      <div className="Market">
        <h1>A Fresh Nation</h1>
        {this.state.results.map(result => {
          return (
          <p>{result.marketname}</p>
          )
        })}
      </div>
    )
  }
}

export default Market;
