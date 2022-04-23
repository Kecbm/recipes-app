import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import RecipeCardDrinks from '../components/RecipeCardDrinks';
import getDetailsById from '../services/FetchDetails';

function RecipeInProgressDrinks({ match }) {
  const [objDetailsDrink, setObjDetailsDrink] = useState(false);

  useEffect(() => {
    const requestData = async () => {
      const { params: { id } } = match;
      setObjDetailsDrink(await getDetailsById('', id));
    };

    requestData();
  }, [match]);

  return (
    <div>
      {objDetailsDrink && <RecipeCardDrinks
        objDetailsDrink={ objDetailsDrink }
        id={ objDetailsDrink[0].idDrink }
      />}
    </div>);
}

RecipeInProgressDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }) }).isRequired,
};

export default RecipeInProgressDrinks;
