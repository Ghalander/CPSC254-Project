import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    //state is the reacts way of updating stuff
    //think of state as our global object which holds all of our variables
    // add " name='substate' " to whatever input tags so it can store the values properly
    // select input defaults to 'any'
    this.state = {
      budget: ' ',
      jumboBudget: ' ',
      name: ' ',
      response: ' ',
      types: ' ',
      selectTypes: 'any'
    };

    //must include for callbacks
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //this is called as soon as the main website has loaded everything
  componentDidMount() {
    this.callApi()
      // .then(res => this.setState({ response: res.express }))
      .then(res => this.setState({ response: res.express.map((item)=>({
          price: item.price,
          name: item.name,
          bar: item.bar
        }))
      }))
      .catch(err => console.log(err));
  }

//API CALLS
//=======================================
  callApi = async () => {
   const response = await fetch('/api/cargo');
   const body = await response.json();
   if (response.status !== 200) throw Error(body.message);
   console.log(body);
   return body;
 };

 typeQuery = async() => {
   const response = await fetch('/api/type', {
     method: "PUT",
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({drinkType: this.state.selectTypes})
   });
   const body = await response.json();
   if (response.status !== 200) throw Error(body.message);
   console.log(body);
   return body;
 };
//========================================

//any time the text box is changed our value is updated
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

//this will allow for multiple data input
    this.setState({
      [name]: value,
    })
  };

//when they hit the submit button it will send the info for some database search
  handleSubmit(event) {
    alert('budget: ' + this.state.budget + ' name: ' + this.state.name + ' type: ' + this.state.selectTypes);
    this.typeQuery().then(res => this.setState({ types: res.express.map((item)=>({
        price: item.price,
        name: item.name,
        type: item.type,
        bar: item.bar
      }))
    }))
    .catch(err => console.log(err));
    this.state.jumboBudget = this.state.budget;
    event.preventDefault();
  }

  render() {
    var cargo = [];
    for(var i=0; i < this.state.response.length; i++){
      cargo.push(<li key={i}>{this.state.response[i].price + " " + this.state.response[i].name + " " + this.state.response[i].bar}</li>);
    }
    var cargoTypes = [];
    {/*This will push all the types into cards, at some point I will change it to do only three at a time*/}
    if ( this.state.types !== ' '){
      for(var j=0; j < this.state.types.length; j++){
        {/*All it does is list all the items for testing
          cargoTypes.push(<li key={j}>{this.state.types[j].price + " " + this.state.types[j].name + " " + this.state.types[j].bar}</li>);
          */}
          cargoTypes.push(
          <div className="col-md-4">
            <div className="card" styles={{width: '4 em;'}}>
              <img className="card-img-top" src="..." alt="Card image cap"></img>
              <div className="card-body">
                <h5 className="card-title">{this.state.types[j].name}</h5>
                <p className="card-text">{this.state.types[j].price}</p>
                <p className="card-text">Located in {this.state.types[j].bar}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
              </div>
          </div>
          );
      }
    }
    return (
      <div className="text-center">
        <main role="main" className="inner cover">
          <h1 className="cover-heading"> Take a sip.</h1>

          <div className="row">
            <div className="col-md-8">
              <p className="lead">Our site will allow you to get the most alcohol out of your budget</p>
            </div>
            <p className="lead col-md-8">Enter your budget and we&apos;ll do our best</p>
          </div>


          <p className="lead">By Hector and Hannah </p>
            <form onSubmit={this.handleSubmit}>
            <label className="lead">Budget&nbsp;
            <input name="budget" type="text" value={this.state.budget} onChange={this.handleChange} />
            </label>
            <br/>
            {/*the input for drink type should be replaced with a SELECT (dropdown)*/}
            {/*<label className="lead">Drink Type&nbsp;
            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
            </label>*/}
            <label className="lead">Pick your drink type
            <select name="selectTypes" value={this.state.selectTypes} onChange={this.handleChange}>
              <option value="any">Any</option>
              <option value="beer">Beer</option>
              <option value="cider">Cider</option>
              <option value="wine">Wine</option>
            </select>
            </label>
            <br/>
            <input type="submit" value="Submit"/>
            </form>
            <div>
              <ul>
                {cargo}
              </ul>
            </div>
            <div className="row">
              <div className="col-md-12">
                {this.state.jumboBudget}
              </div>
                {cargoTypes}
            </div>
        </main>
      </div>
    );
  }
}

export default App;
