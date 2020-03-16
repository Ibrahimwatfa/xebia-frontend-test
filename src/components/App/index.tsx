import React, { Component } from 'react';
import request from '../../services/request';

interface AppProps {

}

interface AppState {
  
}

class App extends Component<AppProps, AppState> {
  state = {
    loading: false,
    booksList: null
  }

  componentDidMount() {
    this.state.booksList = request();
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default App;
