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
      recipeIngredients: [],
      loggedIn: false,
      username: '',
      sortedBy: ''
    }
    this.addToRecipe = this.addToRecipe.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.login = this.login.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
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
  
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }
  
  login(event) {
    if (this.state.username.length > 4) {
      this.setState({
        loggedIn: true
      })
    }
  }
  
  handleSortChange(event) {
    this.setState({
      sortedBy: event.target.value
    })
  }
  
  sortByField(arr, field) {
    return arr.sort((a, b) => {
      return (
        (b[field] ? b[field].amount : 0) - (a[field] ? a[field].amount : 0)
      );
    })
  }
  
  render() {
    
    const sortedFoodItems = this.sortByField(foodItems, this.state.sortedBy);
    
    return (
      <div className="App">
        <div className="container">
        {!this.state.loggedIn &&
          <h1>Hi! Who are you? <input name="username" value={this.state.username} onChange={this.handleUsernameChange} /> <button className="btn btn-primary" onClick={this.login}>Log in</button></h1>
        }
        {this.state.loggedIn &&
          <div>
            <h1>What's in that?</h1>
            <p>Create a recipe by adding ingredients. See how much sugar, protein and salt are in your recipe.</p>
            <div className="form-inline">
              <div className="form-group">
                <label htmlFor="sel1" style={{marginRight: 10}}>Sort items by most to least </label>
                <select className="form-control" onChange={this.handleSortChange}>
                  <option>Choose one</option>
                  <option value="protein">Protein</option>
                  <option value="sugar">Sugar</option>
                  <option value="sodium">Sodium</option>
                </select>
              </div>
            </div>
            <div className="row">
            {sortedFoodItems
              .map((f, i) => {
              return (
                <div
                  className="col-sm-2 food-card"
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
        }
        </div>
      </div>
    );
  }
  
}

export default App;
