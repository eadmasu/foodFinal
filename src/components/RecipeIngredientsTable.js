import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RecipeIngredientsTable extends Component {
  
  constructor(props) {
    super(props);
    this.getTotal = this.getTotal.bind(this);
  }
  
  // get the new total for each nutrient based on the standard serving amount and the user-entered recipe amount
  // acc = sum
  // curr = current element of this.props.recipeIngredients
  // idx and src are not used
  
  getTotal(field) {
    return this.props.recipeIngredients.reduce((acc, curr, idx, src) => {
      const recipeAmount = curr[field] && !isNaN(curr[field].amount) ? curr[field].amount * (curr.recipeAmount / curr.serving.amount) : 0
      return (
        acc + recipeAmount
      )
    }, 0);  // 0 = initial value for sum
  }
  
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
                <td>
                  <input
                    name={item._id}
                    value={this.props.recipeIngredients[i] ? this.props.recipeIngredients[i].recipeAmount : 1}
                    onChange={this.props.handleAmountChange} />
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
  recipeIngredients: PropTypes.array.isRequired,
  handleAmountChange: PropTypes.func.isRequired
};

export default RecipeIngredientsTable;
