const msgError = 'Sorry, we haven\'t found any recipes for these filters.';

export const fetchDrinksIngredient = async (ingredient) => {
  const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await resp.json();
  if (data.drinks === null) {
    global.alert(msgError);
    return { drinks: [] };
  }
  return data;
};

export const fetchDrinksName = async (name) => {
  const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await resp.json();
  if (data.drinks === null) {
    global.alert(msgError);
    return { drinks: [] };
  }
  return data;
};

export const fetchDrinksFirstLetter = async (letter) => {
  if (letter.length !== 1) global.alert('Your search must have only 1 (one) character');
  const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await resp.json();
  if (data.drinks === null) {
    global.alert(msgError);
    return { drinks: [] };
  }
  return data;
};

export const fetchFilterByDrinksCategory = async (category) => {
  const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await resp.json();
  if (data.drinks === null) {
    global.alert(msgError);
    return { drinks: [] };
  }
  return data;
};
