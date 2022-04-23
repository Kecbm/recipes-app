import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ContextFoods from '../Context/contextFoods/ContextFoods';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { setIngredients, videoId, start } from '../services/FunctionsDetail';
import { sendFavoriteToLocalStorage } from '../services/Favorites';
import '../css/Detail.css';

function DetailFood({ match: { params: { id } }, history }) {
  const {
    setFoodDetails,
    foodDetails,
    recommended,
    setRecommended,
  } = useContext(ContextFoods);
  const [isStart, setIsStart] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (recommended.length > 0) {
    recommended.length = 6;
  }

  const arrDrinkLength = 6;

  const getFoodDetails = async (param) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${param}`);
    const { meals } = await response.json();

    setFoodDetails(meals);
  };

  const getRecommended = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await response.json();

    setRecommended(drinks);
  };

  const foodId = id;

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteRecipes !== null) {
      const isFavoriteRecipe = favoriteRecipes
        .some((element) => element.id === foodId);
      setIsFavorite(isFavoriteRecipe);
    }
  }, [foodId]);

  useEffect(() => {
    getFoodDetails(foodId);
    getRecommended();
    start(setIsStart);
  }, []);

  const measure = 'strMeasure';
  const ingredient = 'strIngredient';

  const handleClick = () => {
    history.push(`/foods/${foodId}/in-progress`);
  };

  const handleShareClick = () => {
    const link = `http://localhost:3000/foods/${foodId}`;
    navigator.clipboard.writeText(link);
    setIsClicked(true);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    setIsFavorite((prevState) => {
      sendFavoriteToLocalStorage(prevState, foodDetails);
      return prevState;
    });
  };

  return (
    <div>
      {
        foodDetails && foodDetails.map((food, index) => (
          <div key={ index }>
            <img
              src={ food.strMealThumb }
              alt="recipe"
              data-testid="recipe-photo"
              className="imgStyle"
            />
            <h4 data-testid="recipe-title" className="title"><b>{food.strMeal}</b></h4>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ handleShareClick }
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
            <p data-testid="recipe-category" className="title">{ food.strCategory }</p>
            <h5 className="ingredients"><b>Ingredients</b></h5>
            <div>
              {
                foodDetails && setIngredients(foodDetails, ingredient).map((elem, i) => (
                  <div
                    key={ elem }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                    className="text"
                  >
                    <p>{`${elem} - ${setIngredients(foodDetails, measure)[i]}`}</p>
                  </div>
                ))
              }
            </div>
            <h5 className="title"><b>Instructions</b></h5>
            <p data-testid="instructions" className="text">{ food.strInstructions }</p>
            <h5 className="title"><b>Video</b></h5>
            <div>
              {
                foodDetails && <iframe
                  title="video"
                  data-testid="video"
                  height="250px"
                  width="350px"
                  src={ `//www.youtube.com/embed/${videoId(food.strYoutube)}` }
                  frameBorder="0"
                  allowFullScreen
                />
              }
            </div>
            <h5 className="title"><b>Recommended</b></h5>
            <section className="recommendedStyle">
              {
                recommended.length === arrDrinkLength
                  && recommended.map((drink, d) => (
                    <div
                      key={ drink.idDrink }
                      data-testid={ `${d}-recomendation-card` }
                      className="cardStyle"
                    >
                      <img
                        src={ drink.strDrinkThumb }
                        alt={ drink.strDrink }
                        width="100px"
                      />
                      <p>{ drink.strAlcoholic }</p>
                      <h5
                        data-testid={ `${d}-recomendation-title` }
                      >
                        <b>{ drink.strDrink }</b>
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

DetailFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default DetailFood;
