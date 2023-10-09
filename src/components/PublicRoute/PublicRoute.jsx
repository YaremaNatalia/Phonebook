import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectAuthentificated } from 'redux/selectors';

const PublicRoute = ({ children, redirectTo = '/' }) => {
  const isAuthentificated = useSelector(selectAuthentificated);
  return isAuthentificated ? <Navigate to={redirectTo} /> : children;
};

export default PublicRoute;
