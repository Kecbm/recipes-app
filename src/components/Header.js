import React, { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../Page.css';

const obj = {
  backgroundColor: '#cc4b1d',
  border: '1px solid transparent',
  borderColor: '#cc4b1d',
};

const buttonStyle = obj;

function Header({ page, title, searchButtonEnabled, exploreSearch }) {
  const [inputVisable, setButtonVisable] = useState(false);

  function handleClick() {
    setButtonVisable(!inputVisable);
  }

  return (
    <div>
      <header className="centralizar">
        <Link to="/profile">
          <button
            data-testid="profile-top-btn"
            src={ profileIcon }
            type="button"
            className="button"
            style={ buttonStyle }
          >
            <img src={ profileIcon } alt="profile" />
          </button>
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {searchButtonEnabled && (
          <button
            data-testid="search-top-btn"
            type="button"
            src={ searchIcon }
            onClick={ handleClick }
            style={ buttonStyle }
          >
            <img src={ searchIcon } alt="search" />
          </button>)}
      </header>
      {inputVisable && <SearchBar page={ page } exploreSearch={ exploreSearch } />}
    </div>
  );
}

Header.defaultProps = {
  exploreSearch: '',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  searchButtonEnabled: PropTypes.bool.isRequired,
  exploreSearch: string,
};

export default Header;
