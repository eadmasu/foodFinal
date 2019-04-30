import React, {Component} from 'react';
import './App.css';
import _ from 'lodash';
import foodItems from './data/fooditems.js';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
      recipeIngredients: []
    }
    this.addToRecipe = this.addToRecipe.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }
  
  addToRecipe(event) {
    const id = event.target.name;
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const item = foodItems.find(f => f._id === id);
    console.log('adding', item);
    item.recipeAmount = item.serving.amount;    // set default amount to whatever is 1 serving
    this.setState({
      selectedItem: item,
      recipeIngredients: this.state.recipeIngredients.concat(item)
    })
  }
  
  handleAmountChange(event) {
    const id = event.target.name;
    console.log(`looking for ${id}`);
    const index = this.state.recipeIngredients.findIndex(r => r._id === id);
    console.log(`setting ${index} element to ${event.target.value}`);
    // set the right element of recipeIngredients
    this.setState({
      recipeIngredients: [
      ...this.state.recipeIngredients.slice(0,index),
      {
        ...this.state.recipeIngredients[index],
        recipeAmount: event.target.value,
      },
      ...this.state.recipeIngredients.slice(index+1)
    ]
    })
    
  }
  
  getTotal(field) {
    return this.state.recipeIngredients.reduce((acc, curr, idx, src) => {
                return (
                  acc + (curr[field] && !isNaN(curr[field].amount) ? curr[field].amount : 0)
                )
              }, 0);
  }
  
  render() {
    
    console.log('fooditems', foodItems);
    
    return (
      <div className="App">
        <h1>What's in that?</h1>
        <p>Create a recipe by adding ingredients. See how much sugar, protein and salt are in your recipe.</p>
        <div className="container">
          <div className="row">
          {foodItems.map((f, i) => {
            return (
              <div
                className="col-sm-4 col-xs-6 food-card"
                key={i}
              >
                <div className="name">
                  {f.name}
                </div>
                <button
                  className="btn btn-primary"
                  onClick={this.addToRecipe}
                  name={f._id}
                >Add to recipe
                </button>
              </div>
            )
          })}
          </div>
        
          <table className="table table-bordered" style={{marginTop: '30px'}}>
            <thead>
            <tr>
              <td>Quantity</td>
              <td>Units</td>
              <td>Item</td>
              <td>Protein</td>
              <td>Sugar</td>
              <td>Sodium</td>
            </tr>
            </thead>
            <tbody>
            {this.state.recipeIngredients.map((item, i) => {
              return (
                <tr
                  key={i}
                >
                  <td><input
                    name={item._id}
                    value={this.state.recipeIngredients[i].recipeAmount}
                    onChange={this.handleAmountChange} />
                  </td>
                  <td>{item.serving.units}</td>
                  <td style={{textAlign: 'left'}}>{item.name}</td>
                  <td>{item.protein && `${item.protein.amount * (item.recipeAmount / item.serving.amount)} g`}</td>
                  <td>{item.sugar && `${item.sugar.amount * (item.recipeAmount / item.serving.amount)} g`}</td>
                  <td>{item.sodium && `${item.sodium.amount * (item.recipeAmount / item.serving.amount)} mg`}</td>
                </tr>
              )
            })}
            <tr style={{background: '#e1e1e1'}}>
              <td colSpan={2}></td>
              <td>Total</td>
              {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce */}
              <td>{this.state.recipeIngredients.reduce((acc, curr, idx, src) => {
                return (
                  acc + (curr.protein && !isNaN(curr.protein.amount) ? curr.protein.amount : 0)
                )
              }, 0)}
              </td>
              <td>
                {`${this.state.recipeIngredients.reduce((acc, curr, idx, src) => {
                  return (
                    acc + (curr.sugar && !isNaN(curr.sugar.amount) ? curr.sugar.amount : 0)
                  )
                }, 0)} g`}
              </td>
              <td>{`${this.getTotal('sodium')} mg`}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
}

export default App;
