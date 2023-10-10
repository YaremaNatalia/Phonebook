import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import img from './wallpaper.jpg';

export const Container = styled.div`
  width: 100vw;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding: 50px;
  background-image: url(${img});
  background-size: cover;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.1)
      ),
      url(${img});
    background-size: cover;
    z-index: -1;
    pointer-events: none;
  }
`;

export const StyledNavLink = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  padding: 12px;
  font-weight: 700;
  color: #000;

  font-size: 20px;

  transition: all 0.3s;

  &.active {
    color: #fff;
  }
`;
