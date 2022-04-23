import React from 'react';
import { number, string } from 'prop-types';

const cardStyle = {
  alignItems: 'center',
  borderRadius: '10px',
  boxShadow: '0 0 1em #cc4b1d',
  color: '#260101',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '1vh',
  padding: '1vh 3vh',
};

function CardIngredients(props) {
  const { index, strMeal, strMealThumb, strDrink, strDrinkThumb } = props;
  return (
    <div
      data-testid={ `${index}-ingredient-card` }
      style={ cardStyle }
    >
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

CardIngredients.defaultProps = {
  strMealThumb: '',
  strDrinkThumb: '',
  strMeal: '',
  strDrink: '',
};

CardIngredients.propTypes = {
  strMealThumb: string,
  strDrinkThumb: string,
  strMeal: string,
  strDrink: string,
  index: number.isRequired,
};

export default CardIngredients;
