import React, { Component } from 'react';
import $ from 'jquery';

class Cart extends Component {

  shoppingCart(){
    var shoppingCart = [];
    for (var k=0; k < this.props.shoppingCart.length; k+=5){

      shoppingCart.push('<div className="row"><p> $' + this.innerList(k, shoppingCart));
    }
    return shoppingCart;
  }

  innerList(k, shoppingCart){
    var tempCart = '';
    for (var h = 0; h < 4; h++){
      tempCart += (this.props.shoppingCart[k+h] + " ");
    }
    return tempCart;
  }

  displayList(list){
    $('.list').append(list);
  }
  componentDidMount(){
    var list = this.shoppingCart();
    this.displayList(list);
  }


    render(){
      return (
        <div>
          <div className="container">
            <p className="lead"> List of drinks!</p>
          </div>
          <div className="container list">
          </div>
        </div>
      );
    }
}

export default Cart;
