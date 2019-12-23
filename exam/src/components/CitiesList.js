import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import CityForm from './CityForm';
import AddButton from './AddButton';

const Container = styled.div`
	height: 100vh;
	background-color: #0000000d;
`;

const API_KEY = '2f4a9f370af1e03c0804f91640d43014';

function CitiesList() {
	const [lweather, setLweather] = useState({});
	useEffect(() => {
		if ("geolocation" in navigator) {
			const geoSuccess = (position) => {
				const {
					latitude,
					longitude,
				} = position.coords;
				fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
					.then(resp => resp.json())
					.then(data => {
						console.log(data);
						setLweather({
							name: data.name,
							location: data.sys.country,
							temperature: Math.round(data.main.temp - 273),
							humidity: `${data.main.humidity}%`,
							direction: data.wind.deg,
							speed: data.wind.speed,
						});
					})
					.catch((error) => {
						console.log(error);
					})
			};
			const geoError = (error) => {
				console.log(error.message);
			};
			const geoOptions = {
				enableHighAccuracy: true,
				maximumAge: 1000,
				timeout: 27000,
			};
			navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions); 
		}
	}, []);
	const onClick = () => {
		
	};
	return (
		<Container>
			<CityForm
				{...lweather}
				/>
		<AddButton
			onClick={onClick}
		/>
		</Container>
	);
}

export default CitiesList;
