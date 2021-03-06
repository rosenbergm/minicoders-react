import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { Provider } from "react-redux";
import store from './redux/store'
import * as consoleProxy from 'console-proxy'

window.reset = () => {
  window.consoleStack = []
  window.positionStack = []
}
window.reset()
window.console.success = function () {}
window.intervals = []
window.clearIntervals = () => {
  window.intervals.map(interval => clearInterval(interval))
}


var console = consoleProxy.getConsole({
    error: function () {
      var args = Array.prototype.slice.apply(arguments);
      store.dispatch({
        type: 'ADD_TO_CONSOLE',
        log: `<span style="color: red;">${args}</span>`
      })
      return args;
    },
    success: function () {
      var args = Array.prototype.slice.apply(arguments);
      store.dispatch({
        type: 'ADD_TO_CONSOLE',
        log: `<span style="color: green;">${args}</span>`
      })
      return args;
    },
    log: function () {
      var args = Array.prototype.slice.apply(arguments);
      store.dispatch({
        type: 'ADD_TO_CONSOLE',
        log: `${args}`
      })
      return args;
    }
  });

const httpLink = createHttpLink({
  uri: 'http://localhost:7300',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App client={client} console={console} />
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(<AppWithProvider/>, document.getElementById('root'));
registerServiceWorker();
