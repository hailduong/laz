// Import React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Import Others
import './css/index.scss';

// Import Redux
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducers from "./global/reducers";
import ReduxThunk from 'redux-thunk';

const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__
	? window.__REDUX_DEVTOOLS_EXTENSION__()
	: (createStore) => {
		return createStore
	};

const store = createStore(
	reducers,
	compose(
		applyMiddleware(ReduxThunk),
		reduxDevTool
	)
);


// Render
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
