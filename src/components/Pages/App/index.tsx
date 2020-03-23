import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import styled from 'styled-components';

import CartProvider from '../../../services/context';
import ScrollToTop from '../../../services/ScrollToTop';
import Header from '../../molecules/Header';
import BooksList from '../BooksList';
import Cart from '../Cart';

/**
 * Styles
 */
const Container = styled.div`
  padding: 60px 10px 20px;

  @media (min-width: 1200px) {
    width: 1200px;
    margin: auto;
    padding-left: 0;
    padding-right: 0;
  }
`;

/**
 * Component
 */
class App extends Component {
  render() {
    return (
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Header />

          <Container>
            <Switch>
              <Route path="/" exact={true}>
                <BooksList />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
            </Switch>
          </Container>
        </Router>
      </CartProvider>
    );
  }
}

export default App;
