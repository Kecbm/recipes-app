import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ContextDrinks from '../Context/contextDrinks/ContextDrinks';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { setIngredients, start, handleShareClick, getRecommended, getDrinkDetails }
from '../services/FunctionsDetail';
import '../css/Detail.css';
import { sendFavoriteToLocalStorageDrinks } from '../services/Favorites';

function DetailDrink({ match: { params: { id } }, history }) {
  const {
    drinkDetails,
    setDrinkDetails,
    recommended,
    setRecommended,
  } = useContext(ContextDrinks);
  const [isStart, setIsStart] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (recommended.length > 0) {
    recommended.length = 6;
  }

  const arrFoodLength = 6;

  const drinkId = id;

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteRecipes !== null) {
      const isFavoriteRecipe = favoriteRecipes
        .some((element) => element.id === drinkId);
      setIsFavorite(isFavoriteRecipe);
    }
  }, [drinkId]);

  useEffect(() => {
    getDrinkDetails(drinkId, setDrinkDetails);
    getRecommended(setRecommended);
    start(setIsStart);
  }, [drinkId]);

  const measure = 'strMeasure';
  const ingredient = 'strIngredient';

  const handleClick = () => {
    history.push(`/drinks/${drinkId}/in-progress`);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    setIsFavorite((prevState) => {
      sendFavoriteToLocalStorageDrinks(prevState, drinkDetails);
      return prevState;
    });
  };

  return (
    <div>
      {
        drinkDetails && drinkDetails.map((drink, index) => (
          <div key={ index }>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrinkThumb }
              data-testid="recipe-photo"
              className="imgStyle"
            />
            <h5
              data-testid="recipe-title"
              className="title"
            >
              <b>{ drink.strDrink }</b>
            </h5>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => handleShareClick(drinkId, setIsClicked) }
              className="button"
            >
              <img src={ shareIcon } alt="shareIcon" />
            </button>
            { isClicked ? <p>Link copied!</p> : '' }
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ handleFavorite }
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              className="button"
            >
              <img
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                alt="heartIcon"
              />
            </button>
            <p data-testid="recipe-category" className="title">{ drink.strAlcoholic }</p>
            <h5 className="ingredients"><b>Ingredients</b></h5>
            {
              drinkDetails && setIngredients(drinkDetails, ingredient)
                .map((element, i) => (
                  <div
                    key={ element }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                    className="text"
                  >
                    <p>
                      {`${element} - ${setIngredients(drinkDetails, measure)[i]}`}
                    </p>
                  </div>
                ))
            }
            <h5 className="title"><b>Instructions</b></h5>
            <p data-testid="instructions" className="text">{ drink.strInstructions }</p>
            <h5 className="title"><b>Recommended</b></h5>
            <section className="recommendedStyle">
              {
                recommended.length === arrFoodLength
                && recommended.map((food, f) => (
                  <div
                    key={ food.idMeal }
                    data-testid={ `${f}-recomendation-card` }
                    className="cardStyle"
                  >
                    <img
                      src={ food.strMealThumb }
                      alt={ food.strMealThumb }
                      width="100px"
                    />
                    <p>{ food.strCategory }</p>
                    <h5
                      data-testid={ `${f}-recomendation-title` }
                    >
                      <b>{ food.strMeal}</b>
                    </h5>
                  </div>
                ))
              }
            </section>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="buttonStyle"
              onClick={ handleClick }
            >
              { isStart ? 'Continue Recipe' : 'Start recipe' }
            </button>
          </div>

        ))
      }
    </div>
  );
}

DetailDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default DetailDrink;
