import React from 'react';
import styled from 'styled-components';

import { CartContext, ContextProps } from '../../../services/context';

import CartIconSvg from './icons/cart-icon.svg';

const CartIconStyle = styled.span`
  width: 30px;
  height: 60px;
  display: block;
  position: relative;

  svg {
    fill: white;
    width: 100%;
    height: 100%;
  }
`;

const CartCount = styled.span`
  position: absolute;
  right: -8px;
  top: 14px;
  border-radius: 50%;
  background-color: red;
  width: 16px;
  height: 16px;
  line-height: 14px;
  text-align: center;
  font-size: 12px;
`;

const CartLink = (props: ContextProps) => (
  <CartIconStyle>
    <CartCount>{props.getCartItemsCount()}</CartCount>
    <CartIconSvg />
  </CartIconStyle>
)

export default () => (
  <CartContext.Consumer>
    {context => (
      <CartLink {...context} />
    )}
  </CartContext.Consumer>
);