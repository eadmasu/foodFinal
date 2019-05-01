import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import './App.css';
// import _ from 'lodash';
// import foodItems from './data/fooditems.js';

class ComponentTemplate extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // key1: starting value,
      // key2: starting value, etc
    }
    // example of binding a method so "this" will be recognized within it
    // this.addToRecipe = this.addToRecipe.bind(this);
  }
  
  // example of event handler method
  addToRecipe(event) {
    const id = event.target.name;   // eg, if the item calling this has a name that is an id
    this.setState({
      // key: new value based on existing state or not
    })
  }
  
  // any other class methods go here
  
  render() {
    
    // console.log('fooditems', foodItems);    // eg, to check if values are as expected on startup
    
    return (
      <div>
        {/* All the rest of your JSX tags and code here  */}
      </div>
    );
  }
  
}

ComponentTemplate.propTypes = {
  someRequiredString: PropTypes.string.isRequired,
  someRequiredFunction: PropTypes.func.isRequired
};

export default ComponentTemplate;
