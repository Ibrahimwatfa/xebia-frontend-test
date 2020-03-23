import React from 'react';
import styled from 'styled-components';

import { CartContext, ContextProps } from '../../../services/context';
import { Book } from '../../molecules/Book';

import CartIconSvg from './icons/cart-icon.svg';

const AddToCartStyle = styled.button`
  font-size: 13px;
  border-radius: 5px;
  padding: 6px 8px;
  cursor: pointer;
  border: 0;
  background-color: black;
  color: white;
  transition: 0.3s background-color ease;

  &:hover {
    background-color: red;
  }

  svg, span {
    display: inline-block;
    vertical-align: top;
  }

  svg {
    width: 15px;
    fill: white;
  }
  span {
    padding-left: 5px;
  }
`;

interface AddToCartProps {
  book: Book;
}

type AllProps = AddToCartProps & ContextProps;

const AddToCartButton = ({
  book,
  isAddedToCart,
  updateCart
}: AllProps) => {
  const isAdded = isAddedToCart(book);

  return (
    <AddToCartStyle onClick={() => updateCart(book, !isAdded)}>
      <CartIconSvg />
      <span>{isAdded ? 'Supprimer du panier' : 'Ajouter au panier'}</span>
    </AddToCartStyle>
  )
}

export default (props: AddToCartProps) => (
  <CartContext.Consumer>
    {context => (
      <AddToCartButton {...props} {...context} />
    )}
  </CartContext.Consumer>
);