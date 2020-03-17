import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import CitiesList from './components/CitiesList';
import CityInfo from './components/CityInfo';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/'>
					<CitiesList/>
				</Route>
				<Route path='/location:locId'>
					<CityInfo/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
