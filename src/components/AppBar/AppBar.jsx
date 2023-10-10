import { useSelector } from 'react-redux';


import { AuthentifNav } from 'components/AuthentifNav/AuthentifNav';
import { selectAuthentificated } from 'redux/selectors';
import UserMenu from 'components/UserMenu/UserMenu';
import { Navigation } from 'components/Navigation/Navigation';
import { AppNav } from './AppBar.styled';

export const AppBar = () => {
  const authentificated = useSelector(selectAuthentificated);

  return (
    <header>
      <AppNav>
        <Navigation />
        {authentificated ? <UserMenu /> : <AuthentifNav />}
      </AppNav>
    </header>
  );
};
