import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      thisAlbum: '',
      thisAlbumMusics: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const albumId = match.params.id;
    const mockMusics = await getMusics(albumId);
    const albumMusics = [...mockMusics];
    const albumInformation = albumMusics.shift();
    console.log(albumInformation);
    console.log(albumMusics);
    this.setState({
      thisAlbum: albumInformation,
      thisAlbumMusics: albumMusics,
    });
  }

  render() {
    const { thisAlbum, thisAlbumMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
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
            .map((music) => <MusicCard key={ music.trackId } music={ music } />)}
        </div>
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
