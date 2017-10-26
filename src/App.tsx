import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import {Main} from './containers/Main';
import {rootReducer} from './reducers/root';
import './common.css';

declare var process: any;
const env = process.env.NODE_ENV;
const middlewares: any[] = [ thunk ];

if (env === 'dev') {
  middlewares.push(createLogger());
}

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));

const rootNode = document.createElement('div');
rootNode.setAttribute('id', 'root');
document.body.appendChild(rootNode);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root'),
);
