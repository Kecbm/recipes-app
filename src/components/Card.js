import React from 'react';
import { number, string } from 'prop-types';
import '../Page.css';

function Card(props) {
  const { strMealThumb, strDrinkThumb, strMeal, strDrink, index } = props;
  return (
    <div className="card-recipe" data-testid={ `${index}-recipe-card` }>
      <div>
        <img
          width="100"
          data-testid={ `${index}-card-img` }
          src={ strMealThumb || strDrinkThumb }
          alt={ strMeal || strDrink }
        />
      </div>
      <div>
        <h3
          data-testid={ `${index}-card-name` }
        >
          { strMeal || strDrink }
        </h3>
      </div>
    </div>
  );
}

Card.defaultProps = {
  strMealThumb: '',
  strDrinkThumb: '',
  strMeal: '',
  strDrink: '',
};

Card.propTypes = {
  strMealThumb: string,
  strDrinkThumb: string,
  strMeal: string,
  strDrink: string,
  index: number.isRequired,
};

export default Card;
