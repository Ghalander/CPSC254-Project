import React, { Component } from 'react';

//Access values passed over from our main app using this.props.params
//==============================================
//=========Values taken from main application============
//==== this.props.budgetValue
//==== USE: When our budget is less than 0 or ideally when they can't purchase anything
//=========show road map of what they are getting


class CheckMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapFlag: ' ',
      budgetValue: -1
    }
  }

  sendBack(){
    this.props.onMapFlagCallback.call(this, true);
    this.props.onBudgetCallback.call(this, 7);
  }
    render(){
      if(this.props.budgetValue < 0 && this.state.budgetValue === -1){
        {this.sendBack()}
          return (
            <div>
            </div>
          );
      }
      else {
        return (
          <div>
          </div>
        );
      }
  }
}

export default CheckMaps;
