import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './RecipeCard.css';

function RecipeCard(props) {
  const { objDetailsMeal, id } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsdisabled] = useState(true);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  // const [isLocalStorageCreated, setIsLocalStorageCreated] = useState(false);
  const [ingredientsInProgress, setIngredientsInProgress] = useState(false);
  console.log(ingredientsInProgress);

  const getProgress = () => {
    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || [];
    const meal = 'meals';
    const objMeal = inProgressRecipes[meal] || {};
    const arrId = objMeal[id] || [];

    if (arrId) {
      setIngredientsInProgress(arrId);
      arrId.forEach((element) => {
        const initialChecked = document.getElementById(element);
        initialChecked.setAttribute('checked', true);
      });
    }
  };

  useEffect(() => {
    getProgress();
  }, []);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      const isFavoriteRecipe = favoriteRecipes
        .some((element) => element.id === objDetailsMeal[0].idMeal);
      setIsFavorite(isFavoriteRecipe);
    }
  }, [objDetailsMeal]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    setIsFavorite((prevState) => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (prevState) {
        const objFavorite = {
          id: objDetailsMeal[0].idMeal,
          type: 'food',
          nationality: objDetailsMeal[0].strArea,
          category: objDetailsMeal[0].strCategory,
          alcoholicOrNot: '',
          name: objDetailsMeal[0].strMeal,
          image: objDetailsMeal[0].strMealThumb,
        };
        if (favoriteRecipes === null) {
          localStorage.setItem('favoriteRecipes', JSON.stringify([objFavorite]));
        } else {
          favoriteRecipes.push(objFavorite);
          localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        }
      } else {
        const deleteFavorite = favoriteRecipes
          .filter((element) => element.id !== objDetailsMeal[0].idMeal);
        localStorage.setItem('favoriteRecipes', JSON.stringify(deleteFavorite));
      }
      return prevState;
    });
  };

  const setIngredients = () => {
    if (objDetailsMeal.length > 0) {
      return (Object.keys(objDetailsMeal[0])
        .filter((key) => key.includes('strIngredient'))
        .reduce((cur, key) => {
          if (objDetailsMeal[0][key] !== null && objDetailsMeal[0][key] !== '') {
            cur.push(objDetailsMeal[0][key]);
          } return cur;
        }, []));
    }
  };

  const setMeasure = () => {
    if (objDetailsMeal.length > 0) {
      return (Object.keys(objDetailsMeal[0])
        .filter((key) => key.includes('strMeasure'))
        .reduce((currentValue, key) => {
          if (objDetailsMeal[0][key] !== null && objDetailsMeal[0][key] !== '') {
            currentValue.push(objDetailsMeal[0][key]);
          } return currentValue;
        }, []));
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${objDetailsMeal[0].idMeal}`);
    setIsLinkCopied(!isLinkCopied);
  };

  const sendLocalStorageProgress = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const inputsIngredient = document.querySelectorAll('.strikethrough');
    const checkboxs = [...inputsIngredient].filter((el) => el.checked).map((el) => el.id);

    const objlocalStorage = {
      cocktails: {
        ...inProgressRecipes.cocktails,
      },
      meals: {
        ...inProgressRecipes.meals,
        [id]: checkboxs,
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(objlocalStorage));
  };

  const handleChecked = () => {
    const inputsIngredient = document.querySelectorAll('.strikethrough');
    const checkboxs = [...inputsIngredient];
    const isAllCheckboxCheked = checkboxs.every((el) => el.checked);
    setIsdisabled(!isAllCheckboxCheked);
    sendLocalStorageProgress();
  };

  const addDoneRecipeInLocalStorage = (recipe) => {
    const doneRecipesInLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const newDoneRecipes = [...doneRecipesInLocalStorage, recipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
  };

  return (
    <div>
      {
        (objDetailsMeal.length > 0) && objDetailsMeal.map((food, index) => (
          <div key={ index }>
            <img
              src={ food.strMealThumb }
              alt="recipe"
              data-testid="recipe-photo"
              height="250px"
              width="350px"
            />
            <h4 data-testid="recipe-title" className="title"><b>{ food.strMeal }</b></h4>
            <button
              type="button"
              data-testid="share-btn"
              src={ shareIcon }
              onClick={ handleShare }
              className="button"
            >
              {isLinkCopied && <p>Link copied!</p>}
              <img src={ shareIcon } alt="shareIcon" />
            </button>
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
            <div id="ingredients" className="text">
              {setIngredients().map((element, i) => (
                <div key={ element } data-testid={ `${i}-ingredient-step` }>
                  <label htmlFor={ element }>
                    <input
                      type="checkbox"
                      id={ element }
                      name={ element }
                      className="strikethrough"
                      onClick={ handleChecked }
                    />
                    <span>{`${element} - ${setMeasure()[i]}`}</span>
                  </label>
                </div>
              ))}
            </div>
            <h5 className="title"><b>Instructions</b></h5>
            <p data-testid="instructions" className="text">{ food.strInstructions }</p>
            <Link to="/done-recipes">
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ isDisabled }
                onClick={ () => addDoneRecipeInLocalStorage(food) }
                className="button-recipe"
              >
                Finish recipe
              </button>
            </Link>
          </div>
        ))
      }
    </div>
  );
}

RecipeCard.propTypes = {
  objDetailsMeal: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeCard;

/*
{ingredients.map((element, i) => (
  <li key={ element }>
    <input
      type="checkbox"
      id="element"
      name="element"
      data-testid={ `${i}-ingredient-name-and-measure` }
    />
    <label htmlFor="scales">{element - measure[i]}</label>
  </li>
))} */
