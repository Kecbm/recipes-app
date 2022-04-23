import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import getDetailsById from '../services/FetchDetails';

function RecipeInProgress({ match }) {
  const [objDetailsMeal, setObjDetailsMeal] = useState(false);

  useEffect(() => {
    const requestData = async () => {
      const { params: { id } } = match;
      setObjDetailsMeal(await getDetailsById(id));
    };

    requestData();
  }, [match]);

  return (
    <div>
      {objDetailsMeal && <RecipeCard
        objDetailsMeal={ objDetailsMeal }
        id={ objDetailsMeal[0].idMeal }
      /> }
    </div>);
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }) }).isRequired,
};

export default RecipeInProgress;
