export function sendFavoriteToLocalStorage(prevState, foodDetails) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (prevState) {
    const objFavorite = {
      id: foodDetails[0].idMeal,
      type: 'food',
      nationality: foodDetails[0].strArea,
      category: foodDetails[0].strCategory,
      alcoholicOrNot: '',
      name: foodDetails[0].strMeal,
      image: foodDetails[0].strMealThumb,
    };
    if (favoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([objFavorite]));
    } else {
      favoriteRecipes.push(objFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  } else {
    const deleteFavorite = favoriteRecipes
      .filter((element) => element.id !== foodDetails[0].idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(deleteFavorite));
  }
}

export function sendFavoriteToLocalStorageDrinks(prevState, foodDetails) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (prevState) {
    const objFavorite = {
      id: foodDetails[0].idDrink,
      type: 'drink',
      nationality: '',
      category: foodDetails[0].strCategory,
      alcoholicOrNot: foodDetails[0].strAlcoholic,
      name: foodDetails[0].strDrink,
      image: foodDetails[0].strDrinkThumb,
    };
    if (favoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([objFavorite]));
    } else {
      favoriteRecipes.push(objFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  } else {
    const deleteFavorite = favoriteRecipes
      .filter((element) => element.id !== foodDetails[0].idDrink);
    localStorage.setItem('favoriteRecipes', JSON.stringify(deleteFavorite));
  }
}
