import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CartLink from '../Cart/CartLink';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: black;
  text-align: right;

  a {
    line-height: 58px;
    text-decoration: none;
    color: white;
    margin-right: 30px;
    display: inline-block;
    vertical-align: top;

    &:hover {
      text-decoration: underline;
    }

    img {
      width: 40px;
      margin-top: 10px;
    }
  }
`;

export default () => (
  <Header>
    <nav>
      <Link to="/">Livres</Link>
      <Link to="/cart">
        <CartLink />
      </Link>
    </nav>
  </Header>
);