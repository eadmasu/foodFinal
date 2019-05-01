import React, {Component} from 'react';
import './App.css';
import _ from 'lodash';
import foodItems from './data/fooditems.js';
import RecipeIngredientsTable from './components/RecipeIngredientsTable'

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
        
          <RecipeIngredientsTable
            recipeIngredients={this.state.recipeIngredients}
            />
        </div>
      </div>
    );
  }
  
}

export default App;
