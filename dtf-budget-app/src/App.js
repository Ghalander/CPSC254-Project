import React, { Component, Fragment } from 'react';
import update from 'immutability-helper';
import CheckMaps from './CheckForMap.js';
import Cart from './Cart.js';
import Maps from './Map.js';
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
      draftFlag: false,
      name: ' ',
      selectTypes: 'any',
      response: ' ',
      types: ' ',
      cardTracker: 0,
      cardDraft: ' ',
      mapFlag: false,
      cardDeck: []
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
          type: item.type,
          description: item.description,
          bar: item.bar,
          lat: item.lat,
          long: item.long,
        }))
      }))
      .catch(err => console.log(err));
  }

  handleBudgetValue = e => this.setState({[this.state.jumboBudget]: this.state.jumboBudget = e});
  handleMapFlag = e => this.setState({[this.state.mapFlag]: this.state.mapFlag = e});
  handleReset = e =>{
    this.setState({
      [this.state.budget]: this.state.budget = ' ',
      [this.state.jumboBudget]: this.state.jumboBudget = ' ',
      [this.state.draftFlag]: this.state.draftFlag = false,
      [this.state.name]: this.state.name = ' ',
      [this.state.selectTypes]: this.state.selectTypes = 'any',
      [this.state.response]: this.state.response = ' ',
      [this.state.response]: this.state.types = ' ',
      [this.state.cardTracker]: this.state.cardTracker = 0,
      [this.state.cardDraft]: this.state.cardDraft = ' ',
      [this.state.mapFlag]: this.state.mapFlag = false,
    });
  }



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
    event.preventDefault();
    alert('budget: ' + this.state.budget + ' name: ' + this.state.name + ' type: ' + this.state.selectTypes);
    if(this.state.draftFlag === false){
      this.typeQuery().then(res => this.setState({ types: res.express.map((item)=>({
        price: item.price,
        name: item.name,
        type: item.type,
        description: item.description,
        bar: item.bar,
        address: item.address
        }))
      })).then(()=>{this.shuffleResults(this.state.types)})
      .catch(err => console.log(err));
    }
    this.setState({[this.state.jumboBudget]: this.state.jumboBudget = this.state.budget});
  }

  //===============================================
  // UPDATING DRINK BEFORE CARD EVENT ============
  //===============================================
  shuffleResults(event){
    var j, x, i;
    for (i = event.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = event[i];
        event[i] = event[j];
        event[j] = x;
    }
    this.state.types = event
    this.setState({[this.state.types]: this.state.types = event});
    this.drawCards();
  }
  //===============================================

  //===============================================
  // UPDATING DRINK AFTER CARD EVENT =============
  //===============================================
  drawCards(){
    // this.state.cardTracker;
    // this.state.cardDraft;
    var i = 0;
    var j = 0;
    var draft = [];
    for(i = this.state.cardTracker; j < 3; i++, j++){
      if(i < this.state.types.length){
        draft.push(this.state.types[i]);
      }
      else{
        break;
      }
    }

    this.setState({[this.state.cardTracker]: this.state.cardTracker += i});
    this.setState({[this.state.cardDraft]: this.state.cardDraft = draft.map((item)=>({
      price: item.price,
      name: item.name,
      type: item.type,
      description: item.description,
      bar: item.bar,
      address: item.address
      }))
    });
    this.setState({[this.state.draftFlag]: this.state.draftFlag = true});
}

//===========================================
//  setting values to something that is asynchronous by nature
//===============================================

  handleTypes = (that) => {
    this.setState({[this.state.cardDeck]: this.state.cardDeck = update(this.state.cardDeck, {$push: [
      that.price,
      that.name,
      that.type,
      that.bar,
      that.address
    ]})
  });
    this.setState({[this.state.jumboBudget]: this.state.jumboBudget -= that.price});
    this.drawCards();
  }



  //===============================================

  //===============================================
  // API CALLS =====================================
  //===============================================
    callApi = async () => {
     const response = await fetch('/api/cargo');
     const body = await response.json();
     if (response.status !== 200) throw Error(body.message);
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
     return body;
   };
  //==============================================

  render() {
    var cargoTypes = [];
    if (this.state.draftFlag === true){
      for(var j=0; j < 3; j++){
        if(this.state.cardDraft[j] !== undefined){
          cargoTypes.push(
          <div className="mx-auto col-md-3 col-1">
            <div className="card" >
              {/*// <img className="card-img-top" src={'/media/'+this.state.cardDraft[j].media} alt={this.state.cardDraft[j].media}></img>*/}
              <div className="card-body">
                <h5 className="card-title">{this.state.cardDraft[j].name}</h5>
                <p className="card-text">{this.state.cardDraft[j].price}</p>
                <p className="card-text">Located in {this.state.cardDraft[j].bar}</p>
                <p className="card-text">{this.state.cardDraft[j].description}</p>
                <button className="btn btn-primary" onClick={this.handleTypes.bind(this, this.state.cardDraft[j])}>Go somewhere</button>
              </div>
              </div>
          </div>
          );
        }
      }
    }
  if(this.state.mapFlag === false){
    return (
      <div className="text-center">
        <main role="main" className="inner cover">
        <div className="jumbotron my-4">
          <h1 className="cover-heading"> Take a sip.</h1>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="lead">Our site will allow you to get the most alcohol out of your budget</p>
            </div>
            <p className="mx-auto lead col-md-8">Enter your budget and we&apos;ll do our best</p>
          </div>
          <p className="lead">By Hector and Hannah </p>
            <form onSubmit={this.handleSubmit}>
            <label className="lead">Budget&nbsp;
            <input name="budget" type="text" value={this.state.budget} onChange={this.handleChange} />
            </label>
            <br/>
            <label className="lead">Pick your drink type
            <select name="selectTypes" value={this.state.selectTypes} onChange={this.handleChange}>
              <option value="any">Any</option>
              <option value="beer">Beer</option>
              <option value="gin">Gin</option>
              <option value="margarita">Margarita</option>
              <option value="rum">Rum</option>
              <option value="tequila">Tequila</option>
              <option value="vodka">Vodka</option>
              <option value="whiskey">Whiskey</option>
              <option value="wine">Wine</option>
            </select>
            </label>
            <br/>
            <button className="btn btn-primary" type="submit" value="Submit">Submit</button>
            </form>

            <div className="row">
              <div className="col-md-12">
                {this.state.jumboBudget}
              </div>
                {cargoTypes}
            </div>
            <Fragment>
              <CheckMaps budgetValue={this.state.jumboBudget} onMapFlagCallback={this.handleMapFlag} onBudgetCallback={this.handleBudgetValue}/>
            </Fragment>
        </main>
      </div>
    );
  }
  else {
    return(
      <div>
          <Fragment>
            <Cart shoppingCart={this.state.cardDeck}/>
          </Fragment>
      <div>
      <div className="container">
        <Fragment>
          <Maps listing={this.state.cardDeck}/>
        </Fragment>
        </div>
      </div>
        <div className="container">
        <button className="btn btn-primary" onClick={() => this.handleReset()}>Handle Reset</button>
        </div>
      </div>
    );
  }
  }
}

export default App;
