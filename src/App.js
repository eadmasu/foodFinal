import React, {Component} from 'react';
import request from 'axios';

import './App.css';
import foodItems from './data/fooditems.js';
import RecipeIngredientsTable from './components/RecipeIngredientsTable'

// API reference: https://ndb.nal.usda.gov/ndb/doc/apilist/API-FOOD-REPORTV2.md
// Food search: https://ndb.nal.usda.gov/ndb/search/list
// Get a key here: https://ndb.nal.usda.gov/ndb/doc/index# (page search for "key")

const APIKEY = 'DEMO_KEY'
const APIURL = 'https://api.nal.usda.gov/ndb/V2/reports?ndbno=09038&ndbno=45086173&ndbno=45009100&type=b&format=json';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},             // shows which item was most recently selected
      recipeIngredients: [],        // array of user's selected ingredients
      loggedIn: false,              // true once user enters a name > 4 characters
      username: '',                 // username entered by user
      loginError: false,            // will be set true if username is entered incorrectly
      sortedBy: ''                  // field the items are being sorted on ('protein', 'sugar', etc)
    }
    this.addToRecipe = this.addToRecipe.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.login = this.login.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }
  
  // get data from API
  
  componentWillMount() {
    request.get(`${APIURL}&api_key=${APIKEY}`)
      .then((content) => {
        console.log('returned from api', content.data);
  
        const str1 = JSON.stringify(content.data);
        const str2 = JSON.stringify(content.data, null, 4); // (Optional) beautiful indented output.
        console.log(str2);
      })
      .catch((error) => {
        console.error('Error reading data:', error);
      });
  }
  
  // for the selected ingredient, add it to the recipe
  
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
  
  //  take whatever quantity the user specified, and change the nutrient amounts displayed accordingly
  
  handleAmountChange(event) {
    // what is the id of this ingredient?
    const id = event.target.name;
    console.log(`looking for ${id}`);
    
    // what is its index in the recipeIngredients array?
    const index = this.state.recipeIngredients.findIndex(r => r._id === id);
    console.log(`setting ${index} element to ${event.target.value}`);
    
    // update the right element of recipeIngredients
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
  
  // when the user enters a username in the login screen, set it in the state

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }
  
  // change the state to indicate user is logged in
  
  login(event) {
    if (this.state.username.length > 4 && isNaN(this.state.username)) {
      this.setState({
        loggedIn: true
      })
    } else {
      this.setState({
        loginError: true
      })
    }
  }
  
  // handle user selecting a different sort variable
  
  handleSortChange(event) {
    this.setState({
      sortedBy: event.target.value
    })
  }
  
  // utility sort function to sort arr by descending value of field (a string)
  
  sortByField(arr, field) {
    return arr.sort((a, b) => {
      return (
        (b[field] ? b[field].amount : 0) - (a[field] ? a[field].amount : 0)
      );
    })
  }
  
  // this is where put the JSX (html + javascript) to display:
  
  render() {
    
    const sortedFoodItems = this.sortByField(foodItems, this.state.sortedBy);
    
    return (
      <div className="App">
        <div className="container">
          
          {/* Show this if not logged in */}
          
        {!this.state.loggedIn &&
          <div>
          <h1>Hi! Who are you? <input name="username" value={this.state.username} onChange={this.handleUsernameChange} /> <button className="btn btn-primary" onClick={this.login}>Log in</button></h1>
            <p style={{color: this.state.loginError ? 'red' : 'black'}}>Enter a username that is more than 4 letters</p>
          </div>
        }
        
          {/* Show this once logged in */}
          
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
            {sortedFoodItems.map((f, i) => {
              return (
                <div
                  className="col-lg-2 col-sm-4 col-xs-6 food-card"
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
              handleAmountChange={this.handleAmountChange}
              />
          </div>
        }
        </div>
      </div>
    );
  }
  
}

export default App;
