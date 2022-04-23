import React from 'react';
import ExploreButtons from '../components/ExploreButtons';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  return (
    <div>
      <Header title="Explore Drinks" />
      <ExploreButtons page="drinks" />
      <Footer />

    </div>
  );
}

export default ExploreDrinks;
