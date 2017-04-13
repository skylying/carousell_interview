import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { Billboard } from './container';
import reducer from './reducers/topicReducer';

const store = createStore(reducer, applyMiddleware(thunk));


render(
	<Provider store={store}>
    <Billboard />
  </Provider>,
  document.getElementById('app')
);
