import React from 'react';
import { NavLink } from 'react-router-dom';
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
        <nav>
          <ul>
            <li>
              <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
            </li>
            <li>
              <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
            </li>
            <li>
              <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
// data-testid="link-to-search"
export default Header;
