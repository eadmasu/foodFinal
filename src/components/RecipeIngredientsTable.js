import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import './App.css';
// import _ from 'lodash';
// import foodItems from './data/fooditems.js';

class RecipeIngredientsTable extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // key1: starting value,
      // key2: starting value, etc
    }
    this.getTotal = this.getTotal.bind(this);
  }
  
  getTotal(field) {
    return this.props.recipeIngredients.reduce((acc, curr, idx, src) => {
      return (
        acc + (curr[field] && !isNaN(curr[field].amount) ? curr[field].amount : 0)
      )
    }, 0);
  }
  
  // any other class methods go here
  
  render() {
    
    return (
      <div>
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
          {this.props.recipeIngredients.map((item, i) => {
            return (
              <tr
                key={i}
              >
                <td>{item.serving.amount}</td>
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
            <td>
              {`${this.getTotal('protein')} g`}
              </td>
            <td>
              {`${this.getTotal('sugar')} g`}
            </td>
            <td>
              {`${this.getTotal('sodium')} mg`}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
}

RecipeIngredientsTable.propTypes = {
  recipeIngredients: PropTypes.array.isRequired
};

export default RecipeIngredientsTable;
