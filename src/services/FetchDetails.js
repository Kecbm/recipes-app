const getDetailsById = async (idMeal, idDrink) => {
  const endPointMeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  const endPointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;

  const request = await fetch(idMeal ? endPointMeal : endPointDrink);
  const { meals, drinks } = await request.json();
  return meals || drinks;
};

export default getDetailsById;
