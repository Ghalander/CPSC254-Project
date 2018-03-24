import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    //state is the reacts way of updating stuff
    //think of state as our global object which holds all of our variables
    this.state = {
      budget: ' ',
      name: ' '
    };

    //must include for callbacks
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

//any time the text box is changed our value is updated
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

//this will allow for multiple data input
    this.setState({
      [name]: value
    })
  }

//when they hit the submit button it will send the info for some database search
  handleSubmit(event) {
    alert('budget: ' + this.state.budget + ' name: ' + this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <div className="text-center">
        <main role="main" className="inner cover">
          <h1 className="cover-heading"> Take a sip.</h1>
          <p className="lead">Our site will allow you to get the most alcohol out of your budget</p>
          <p className="lead">Enter your budget and we&apos;ll do our best</p>
            <form onSubmit={this.handleSubmit}>
            <label className="lead">Budget&nbsp;
            <input name="budget" type="text" value={this.state.budget} onChange={this.handleChange} />
            </label>
            <br/>
            {/*the input for drink type should be replaced with a SELECT (dropdown)*/}
            <label className="lead">Drink Type&nbsp;
            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
            <br/>
            <input type="submit" value="Submit"/>
            </form>
        </main>
      </div>
    );
  }
}

export default App;
