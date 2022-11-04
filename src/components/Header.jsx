import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.handleUserName();
  }

  handleUserName = async () => {
    const response = await getUser('name');
    this.setState({
      userName: response.name,
      isLoading: true,
    });
  };

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        <p data-testid="header-user-name">{isLoading ? userName : 'Carregando...'}</p>
      </header>
    );
  }
}

export default Header;
