import React from 'react';
import ReactDOM from 'react-dom';
import {persistStore} from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { Provider} from 'react-redux';
import {configureStore} from './redux/store';

const store= configureStore();
const persistor = persistStore(store);
ReactDOM.render(
  <Provider store={store} >
    <PersistGate
    loading={<div>Loading...</div>}
    persistor={persistor}>
      <BrowserRouter>
      <App />
    </BrowserRouter>
    </PersistGate>
  
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals