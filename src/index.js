import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from "react-intl";
import App from './components/App';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import middleware from './middleware';


const DEFAULT_LOCALE = 'en';
const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <IntlProvider defaultLocale={DEFAULT_LOCALE} locale={navigator.locale || DEFAULT_LOCALE}>
    <Provider store={store}>
      <App />
    </Provider>
  </IntlProvider>,
  document.getElementById('root')
);
