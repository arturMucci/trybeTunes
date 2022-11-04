import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const valueLength = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchParam: '',
      searchedSinger: '',
      isSearchBtnDisabled: true,
      isLoading: false,
      albums: [],
      mostra: 'none',
    };
  }

  handleSearchParam = ({ target }) => {
    this.setState({
      searchParam: target.value,
      isSearchBtnDisabled: target.value.length < valueLength,
    });
  };

  handleSearchButton = async () => {
    const { searchParam } = this.state;
    this.setState({ isLoading: true, searchedSinger: searchParam });
    const albums = await searchAlbumsAPI(searchParam);
    this
      .setState({
        searchParam: '',
        albums,
        isLoading: false,
        isSearchBtnDisabled: true,
        mostra: 'block',
      });
  };

  render() {
    const {
      isSearchBtnDisabled, searchParam, searchedSinger, isLoading, albums, mostra,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        {isLoading
          ? 'Carregando'
          : (
            <>
              <label htmlFor="search-artist-input">
                <input
                  type="text"
                  data-testid="search-artist-input"
                  id="search-artist-input"
                  value={ searchParam }
                  onChange={ this.handleSearchParam }
                  placeholder="Pesquisar"
                />
              </label>
              <button
                type="button"
                disabled={ isSearchBtnDisabled }
                data-testid="search-artist-button"
                onClick={ this.handleSearchButton }
              >
                Pesquisar
              </button>
              <p>{albums.length > 0 && `Resultado de álbuns de: ${searchedSinger}`}</p>
              <ul>
                { albums.length > 0
                  ? albums
                    .map((album) => (
                      <li key={ album.collectionId }>
                        <Link
                          data-testid={ `link-to-album-${album.collectionId}` }
                          to={ `/album/${album.collectionId}` }
                        >
                          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                          <p>{`Álbum: ${album.collectionName}`}</p>
                          <p>{album.artistName}</p>
                        </Link>
                      </li>
                    ))
                  : <p style={ { display: mostra } }>Nenhum álbum foi encontrado</p>}
              </ul>
            </>
          ) }
      </div>
    );
  }
}

export default Search;
