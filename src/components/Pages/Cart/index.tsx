import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { CartContext, ContextProps } from '../../../services/context';
import { getBookOffers, Offer } from '../../../services/request';

import { BooksWrapper } from '../BooksList';
import BookCard, { Book } from '../../molecules/Book';

const Text = styled.div`
  font-size: 40px;
  padding-top: 40px;
  width: 100%;
`;

const Cart = (props: ContextProps) => {
  const cartItems = props.getCartItems() as Book[];
  const cartTotalPrice = props.getCartTotalPrice();

  const [bestOffer, setBestOffer] = useState<number>(0);

  const fetchOffers = async () => {
    if (cartItems.length > 0) {
      const booksIds = cartItems.map((item) => item.isbn);
      const offersResponse = await getBookOffers(booksIds);
      let newPriceP = cartTotalPrice, newPriceM = cartTotalPrice, newPriceS = cartTotalPrice;

      if (offersResponse.offers) {
        offersResponse.offers.map((offer: Offer) => {
          if (offer.type === "percentage") {
            newPriceP = cartTotalPrice - (cartTotalPrice * offer.value) / 100;

          } else if (offer.type === "minus") {
            newPriceM = (cartTotalPrice - offer.value);

          } else if (offer.type === "slice" && cartTotalPrice >= offer.sliceValue) {
            newPriceS = (
              cartTotalPrice - (Math.floor(cartTotalPrice / offer.sliceValue) * offer.value)
            );
          }
        });

        setBestOffer(Math.min(newPriceP, newPriceM, newPriceS));
      }
    }
  }

  useEffect(() => {
    fetchOffers();
  }, [cartItems]);

  return (
    <BooksWrapper>
      {(!cartItems || cartItems.length === 0) && (
        <Text>Ton panier est vide</Text>
      )}

      {cartItems && cartItems.length > 0 && (
        <>
          <Text>Totale: {cartTotalPrice} €</Text>
          {bestOffer && bestOffer > 0 && <Text>La meilleure offre: {bestOffer}  €</Text>}
          <Text>Récapitule:</Text>
          {cartItems.map((book: Book) => (<BookCard key={book.isbn} book={book} isCartPage={true} />))}
        </>
      )}
    </BooksWrapper>
  );
}

export default () => (
  <CartContext.Consumer>
    {context => (
      <Cart {...context} />
    )}
  </CartContext.Consumer>
);