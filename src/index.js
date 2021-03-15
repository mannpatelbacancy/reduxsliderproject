import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import homePageReducer from './store/reducers/homePage';
import {createStore} from 'redux';

const store=createStore(homePageReducer);

const app=(
    <Provider store={store}>
      <App/>
    </Provider>);

ReactDOM.render(app,document.getElementById('root'));

