import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      thisAlbum: '',
      thisAlbumMusics: [],
      favoriteSongs: [],
      whosChecked: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const albumId = match.params.id;
    const mockMusics = await getMusics(albumId);
    const albumMusics = [...mockMusics];
    const albumInformation = albumMusics.shift();
    const favoriteSongs = await getFavoriteSongs();
    const whosChecked = albumMusics
      .map((music) => favoriteSongs.some(({ trackId }) => trackId === music.trackId));
    this.setState({
      thisAlbum: albumInformation,
      thisAlbumMusics: albumMusics,
      favoriteSongs,
      whosChecked,
    });
  }

  saveFavorite = async (target, thisAlbumMusics, whosChecked) => {
    this.setState({ isLoading: true });
    const music = thisAlbumMusics.find((each) => each.trackId === Number(target.id));
    await addSong(music);
    thisAlbumMusics.forEach((each, index) => {
      if (each.trackId === Number(target.id)) {
        whosChecked[index] = true;
      }
    });
    this.setState((prev) => ({
      isLoading: false,
      favoriteSongs: [...prev.favoriteSongs, music],
    }));
  };

  removeSong = async (target, thisAlbumMusics, whosChecked) => {
    this.setState({ isLoading: true });
    const music = thisAlbumMusics.find((each) => each.trackId === Number(target.id));
    await removeSong(music);
    thisAlbumMusics.forEach((each, index) => {
      if (each.trackId === Number(target.id)) {
        whosChecked[index] = false;
      }
    });
    this.setState((prev) => ({
      isLoading: false,
      favoriteSongs: [...prev.favoriteSongs, music],
    }));
  };

  onCheck = async ({ target }) => {
    const { thisAlbumMusics, whosChecked } = this.state;
    if (target.checked) {
      await this.saveFavorite(target, thisAlbumMusics, whosChecked);
    }
    if (!target.checked) {
      await this.removeSong(target, thisAlbumMusics, whosChecked);
    }
  };

  render() {
    const { thisAlbum, thisAlbumMusics, isLoading, whosChecked } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading
          ? <p>Carregando...</p> : (
            <>
              <h1>Album</h1>
              <div>
                <img
                  src={ thisAlbum.artworkUrl100 }
                  alt={ `Capa do album ${thisAlbum.collectionCensoredName}` }
                />
                <p data-testid="album-name">
                  {thisAlbum.collectionName}
                </p>
                <p data-testid="artist-name">
                  {thisAlbum.artistName}
                </p>
              </div>
              <div>
                {thisAlbumMusics
                  .map((music, index) => (<MusicCard
                    key={ music.trackId }
                    music={ music }
                    checked={ whosChecked[index] }
                    onCheck={ this.onCheck }
                  />))}
              </div>
            </>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
