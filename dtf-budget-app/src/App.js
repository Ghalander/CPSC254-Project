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
      draftFlag: false,
      name: ' ',
      selectTypes: 'any',
      response: ' ',
      types: ' ',
      cardTracker: 0,
      cardDraft: ' ',
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
          bar: item.bar,
          media: item.media
        }))
      }))
      .catch(err => console.log(err));
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
          bar: item.bar,
          media: item.media
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
        bar: item.bar,
        media: item.media
      }))
    });
    this.setState({[this.state.draftFlag]: this.state.draftFlag = true});
}

  handleTypes = (that) => {
    this.setState({[this.state.jumboBudget]: this.state.jumboBudget -= that.price});
    console.log(this.state.jumboBudget);
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
  //==============================================

  render() {

    var cargo = [];
    for(var i=0; i < this.state.response.length; i++){
      cargo.push(<li key={i}>{this.state.response[i].price + " " + this.state.response[i].name + " " + this.state.response[i].bar + " " + this.state.response[i].media}</li>);
    }
    var cargoTypes = [];
    if (this.state.draftFlag === true){
      console.log(this.state.cardDraft);
      for(var j=0; j < 3; j++){
        if(this.state.cardDraft[j] !== undefined){
          cargoTypes.push(
          <div className="mx-auto col-md-3 col-1">
            <div className="card" >
              <img className="card-img-top" src={'/media/'+this.state.cardDraft[j].media} alt={this.state.cardDraft[j].media}></img>
              <div className="card-body">
                <h5 className="card-title">{this.state.cardDraft[j].name}</h5>
                <p className="card-text">{this.state.cardDraft[j].price}</p>
                <p className="card-text">Located in {this.state.cardDraft[j].bar}</p>
                <button className="btn btn-primary" onClick={this.handleTypes.bind(this, this.state.cardDraft[j])}>Go somewhere</button>
              </div>
              </div>
          </div>
          );
        }
      }
    }

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
              <option value="cider">Cider</option>
              <option value="wine">Wine</option>
            </select>
            </label>
            <br/>
            <button className="btn btn-primary" type="submit" value="Submit">Submit</button>
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
            <div>
            {/*at some point have this click event hide the cards */}
              <button className="btn btn-primary" onClick={() => {this.setState({[this.state.draftFlag]: this.state.draftFlag = false})}}>Try Again</button>
            </div>
        </main>
      </div>
    );
  }
}

export default App;
