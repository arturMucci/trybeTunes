import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music, onCheck, checked } = this.props;
    return (
      <div>
        <p>{music.trackName}</p>
        <div>
          <label htmlFor={ music.trackId }>
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${music.trackId}` }
              id={ music.trackId }
              checked={ checked }
              onChange={ (evnt) => onCheck(evnt, music) }
            />
            Favorita
          </label>
        </div>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape().isRequired,
  onCheck: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
