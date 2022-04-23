import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './RecipeCard.css';

function RecipeCardDrinks(props) {
  const { objDetailsDrink, id } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsdisabled] = useState(true);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [ingredientsInProgress, setIngredientsInProgress] = useState(false);
  console.log(ingredientsInProgress);

  const getProgress = () => {
    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || [];
    const cocktails = 'cocktails';
    const objMeal = inProgressRecipes[cocktails] || {};
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
        .some((element) => element.id === objDetailsDrink[0].idDrink);
      setIsFavorite(isFavoriteRecipe);
    }
  }, [objDetailsDrink]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    setIsFavorite((prevState) => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (prevState) {
        const objFavorite = {
          id: objDetailsDrink[0].idDrink,
          type: 'drink',
          nationality: '',
          category: objDetailsDrink[0].strCategory,
          alcoholicOrNot: objDetailsDrink[0].strAlcoholic,
          name: objDetailsDrink[0].strDrink,
          image: objDetailsDrink[0].strDrinkThumb,
        };
        if (favoriteRecipes === null) {
          localStorage.setItem('favoriteRecipes', JSON.stringify([objFavorite]));
        } else {
          favoriteRecipes.push(objFavorite);
          localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        }
      } else {
        const deleteFavorite = favoriteRecipes
          .filter((element) => element.id !== objDetailsDrink[0].idDrink);
        localStorage.setItem('favoriteRecipes', JSON.stringify(deleteFavorite));
      }
      return prevState;
    });
  };

  const setIngredients = () => {
    if (objDetailsDrink.length > 0) {
      return (Object.keys(objDetailsDrink[0])
        .filter((key) => key.includes('strIngredient'))
        .reduce((cur, key) => {
          if (objDetailsDrink[0][key] !== null && objDetailsDrink[0][key] !== '') {
            cur.push(objDetailsDrink[0][key]);
          } return cur;
        }, []));
    }
  };

  const setMeasure = () => {
    if (objDetailsDrink.length > 0) {
      return (Object.keys(objDetailsDrink[0])
        .filter((key) => key.includes('strMeasure'))
        .reduce((currentValue, key) => {
          if (objDetailsDrink[0][key] !== null && objDetailsDrink[0][key] !== '') {
            currentValue.push(objDetailsDrink[0][key]);
          } return currentValue;
        }, []));
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${objDetailsDrink[0].idDrink}`);
    setIsLinkCopied(!isLinkCopied);
  };

  const sendLocalStorageProgress = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const inputsIngredient = document.querySelectorAll('.strikethrough');
    const checkboxs = [...inputsIngredient].filter((el) => el.checked).map((el) => el.id);

    const objlocalStorage = {
      cocktails: {
        ...inProgressRecipes.cocktails,
        [id]: checkboxs,
      },
      meals: {
        ...inProgressRecipes.meals,
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

  return (
    <div>
      {
        (objDetailsDrink.length > 0) && objDetailsDrink.map((drink, index) => (
          <div key={ index }>
            <img
              src={ drink.strDrinkThumb }
              alt="recipe"
              data-testid="recipe-photo"
              height="250px"
              width="350px"
            />
            <h4
              data-testid="recipe-title"
              className="title"
            >
              <b>{ drink.strDrink }</b>
            </h4>
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
            <p data-testid="recipe-category" className="title">{ drink.strCategory }</p>
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
            {' '}
            <p data-testid="instructions" className="text">{ drink.strInstructions }</p>
            <Link to="/done-recipes">
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ isDisabled }
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

RecipeCardDrinks.propTypes = {
  objDetailsDrink: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeCardDrinks;
