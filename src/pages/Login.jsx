import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

const three = 3;
const Delay = 1000;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoginButtonDisabled: true,
      userName: '',
      isLoading: true,
    };
  }

  componentWillUnmount() {
  }

  checkNameInputLength = ({ target }) => {
    this.setState({
      isLoginButtonDisabled: target.value.length < three,
      userName: target.value,
    });
  };

  handleUserName = () => {
    this.setState({ isLoading: false });
    const { userName } = this.state;
    const { history } = this.props;
    createUser({ name: userName });
    setTimeout(() => {
      history.push('/search');
    }, Delay);
  };

  render() {
    const {
      isLoginButtonDisabled,
      isLoading,
    } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <label htmlFor="name-input">
          <input
            data-testid="login-name-input"
            name="login-name-input"
            id="login-name-input"
            onChange={ this.checkNameInputLength }
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ isLoginButtonDisabled }
          onClick={ this.handleUserName }
        >
          Entrar
        </button>
        {isLoading || <p>Carregando...</p>}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
