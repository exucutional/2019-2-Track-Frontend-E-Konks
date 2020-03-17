import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Button = styled.img`
	width: 1em;
	&:hover {
		filter: invert(0.5);
	};
	cursor: pointer;
`;

function LocationButton(props) {
	const onClick = () => {
		if ("geolocation" in navigator) {
			const geoSuccess = (position) => {
				const {
					latitude,
					longitude,
				} = position.coords;
				props.setInputValue(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
			};
			const geoError = (error) => {
			};
			const geoOptions = {
				enableHighAccuracy: true,
				maximumAge: 1000,
				timeout: 27000,
			};
			navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions); 
		}
	};
	return (
		<Button src='https://image.flaticon.com/icons/svg/684/684809.svg' onClick={ onClick }/>
	);
}

LocationButton.propTypes = {
	setInputValue: PropTypes.func.isRequired,
}

export default LocationButton;
