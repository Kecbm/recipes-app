const msgError = 'Sorry, we haven\'t found any recipes for these filters.';

export const fetchFoodsIngredient = async (ingredient) => {
  const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await resp.json();
  if (data.meals === null) {
    global.alert(msgError);
    return { meals: [] };
  }
  return data;
};

export const fetchFoodsName = async (name) => {
  const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await resp.json();
  if (data.meals === null) {
    global.alert(msgError);
    return { meals: [] };
  }
  return data;
};

export const fetchFoodsFirstLetter = async (letter) => {
  if (letter.length !== 1) global.alert('Your search must have only 1 (one) character');
  const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await resp.json();
  if (data.meals === null) {
    global.alert(msgError);
    return { meals: [] };
  }
  return data;
};

export const fetchFilterByFoodsCategory = async (category) => {
  const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await resp.json();
  if (data.meals === null) {
    global.alert(msgError);
    return { meals: [] };
  }
  return data;
};

export const fetchFilterbyArea = async (nationality) => {
  const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`);
  const data = await resp.json();
  if (data.meals === null) {
    global.alert(msgError);
    return { meals: [] };
  }
  return data;
};
