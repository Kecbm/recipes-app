export const setIngredients = (foodDetails, string) => {
  if (foodDetails.length > 0) {
    return (Object.keys(foodDetails[0])
      .filter((key) => key.includes(string))
      .reduce((cur, key) => {
        if (foodDetails[0][key] !== null && foodDetails[0][key] !== '') {
          cur.push(foodDetails[0][key]);
        } return cur;
      }, []));
  }
};

const MATCH_VIDEO = 11;

const getVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === MATCH_VIDEO)
    ? match[2]
    : null;
};

export const videoId = (url) => {
  const video = getVideoId(url);
  return video;
};

export const start = (setState) => {
  const startRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (startRecipes !== null) {
    const newState = true;
    setState(newState);
  }
};

export const handleShareClick = (drinkId, state) => {
  const link = `http://localhost:3000/drinks/${drinkId}`;
  navigator.clipboard.writeText(link);
  state(true);
};

export const getRecommended = async (state) => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();

  state(meals);
};

export const getDrinkDetails = async (drinkId, state) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
    const { drinks } = await response.json();

    state(drinks);
  } catch (error) {
    state(error);
  }
};
