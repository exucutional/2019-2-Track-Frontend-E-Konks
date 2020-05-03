import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import store from './store';
// import Routes from './routes';
import App from './app/App';
import './styles/globalStyles.css';
import * as serviceWorker from './utils/serviceWorker';

Sentry.init({dsn: "https://7a8135e119474e07b983d29c5ee25df7@o387155.ingest.sentry.io/5222083"});

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
