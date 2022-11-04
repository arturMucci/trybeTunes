import React from 'react';
import Header from '../components/Header';

const valueLength = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isSearchBtnDisabled: true,
    };
  }

  handleSearchButton = ({ target }) => {
    if (target.value.length >= valueLength) this.setState({ isSearchBtnDisabled: false });
    else this.setState({ isSearchBtnDisabled: true });
  };

  render() {
    const { isSearchBtnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <label htmlFor="search-artist-input">
          <input
            type="text"
            data-testid="search-artist-input"
            id="search-artist-input"
            onChange={ this.handleSearchButton }
            placeholder="Pesquisar"
          />
        </label>
        <button
          type="button"
          disabled={ isSearchBtnDisabled }
          data-testid="search-artist-button"
          // onClick={this.}
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
