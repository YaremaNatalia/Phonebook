import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthentificated, selectUserLoading } from 'redux/selectors';

import { refreshUserThunk } from 'redux/authentifServices';

import { Loader } from './components/Loader';
import { AppNav, Container } from 'App.styled';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import UserMenu from 'components/UserMenu/UserMenu';
import { Navigation } from 'components/Navigation/Navigation';
import { AuthentifNav } from 'components/AuthentifNav/AuthentifNav';
import PublicRoute from 'components/PublicRoute/PublicRoute';

const HomePage = lazy(() => import('pages/HomePage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));

export const App = () => {
  const dispatch = useDispatch();
  const authentificated = useSelector(selectAuthentificated);
  const isLoading = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return (
    <Container>
      {!isLoading && (
        <>
          <header>
            <AppNav>
              <Navigation />
              {authentificated ? <UserMenu /> : <AuthentifNav />}
            </AppNav>
          </header>
          <main>
            <Suspense fallback={<Loader />}>
              <Routes>
                {/* <Route path="/" element={<Navigation />} /> */}
                <Route index element={<HomePage />} />
                <Route
                  path="/register"
                  element={
                    <PublicRoute redirectTo="/contacts">
                      <RegisterPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute redirectTo="/contacts">
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/contacts"
                  element={
                    <PrivateRoute redirectTo="/login">
                      <ContactsPage />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </main>
        </>
      )}
    </Container>
  );
};
