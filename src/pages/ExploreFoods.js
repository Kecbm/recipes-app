import React from 'react';
import ExploreButtons from '../components/ExploreButtons';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  return (
    <div>
      <Header title="Explore Foods" />
      <ExploreButtons page="foods" />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
