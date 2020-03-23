import React, { Component, Context } from 'react';

import { Book } from '../components/molecules/Book';

export const CartContext: Context<any> = React.createContext(null);

export interface ContextProps {
  getCartItems: () => Book[] | [];
  getCartItemsCount: () => number;
  getCartTotalPrice: () => number;
  isAddedToCart: (book: Book) => boolean;
  updateCart: (book: Book, adding: boolean) => void;
}

interface ContextState {
  cart: Book[];
}

export default class CartProvider extends Component<{}, ContextState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      cart: []
    };
  }

  componentDidMount() {
    if (typeof localStorage !== 'undefined') {
      const cartInStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || 'null') : [];

      this.setState({cart: cartInStorage});
    }
  }

  getCartItems = () => {
    return this.state.cart;
  };

  getCartItemsCount = () => {
    return this.state.cart.length;
  };

  getCartTotalPrice = () => {
    if (this.getCartItemsCount() > 0) {
      const reduceCondition = (accumulator: number, book: Book) => accumulator + book.price;
      return this.getCartItems().reduce(reduceCondition, 0)
    }

    return 0;
  }

  isAddedToCart = (book: Book) => {
    const { cart } = this.state;

    return cart.some(cartItem => cartItem.isbn === book.isbn);
  }

  updateCart = (book: Book, adding: boolean) => {
    const { cart } = this.state;

    const newCart = (adding ?
      Array.from(new Set([...cart, book])) : // Add to cart
      cart.filter((item) => item.isbn !== book.isbn) // Remove from cart
    )

    this.setState({ cart: newCart });

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  }

  render() {
    const { children } = this.props;

    return (
      <CartContext.Provider
        value={{
          ...this.state,
          getCartItems: this.getCartItems,
          getCartItemsCount: this.getCartItemsCount,
          getCartTotalPrice: this.getCartTotalPrice,
          isAddedToCart: this.isAddedToCart,
          updateCart: this.updateCart
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}