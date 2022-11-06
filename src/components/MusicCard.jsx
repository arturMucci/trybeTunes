import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music: { trackName, trackId, previewUrl }, onCheck, checked } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <div>
          <label htmlFor={ `checkbox-music-${trackId}` }>
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              id={ `checkbox-music-${trackId}` }
              checked={ checked }
              onChange={ (evnt) => onCheck(evnt, trackName) }
            />
            Favorita
          </label>
        </div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
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
