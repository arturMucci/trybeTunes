import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      thisAlbum: '',
      thisAlbumMusics: [],
      favoriteSongs: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const albumId = match.params.id;
    const mockMusics = await getMusics(albumId);
    const albumMusics = [...mockMusics];
    const albumInformation = albumMusics.shift();
    this.setState({
      thisAlbum: albumInformation,
      thisAlbumMusics: albumMusics,
    });
  }

  onCheck = ({ target }, trackName) => {
    const { favoriteSongs } = this.state;
    if (target.checked) {
      this.setState((prev) => ({
        isLoading: true,
        favoriteSongs: [...prev.favoriteSongs, trackName],
      }), async () => {
        await addSong(favoriteSongs);
        this.setState({
          isLoading: false,
        });
      });
    }
  };

  render() {
    const { thisAlbum, thisAlbumMusics, isLoading, favoriteSongs } = this.state;
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
                  .map((music) => (<MusicCard
                    key={ music.trackId }
                    music={ music }
                    checked={ favoriteSongs.includes(music.trackName) }
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
