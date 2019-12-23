import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	margin: 10px;
	padding: 5px;
`;

const TopPart = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 10px;
	border-bottom: 1px solid #dddddd;
`;

const BottomPart = styled.div`
	display: flex;
	flex-direction: row;
	margin: 10px;
	color: grey;
`;

const TopColumn = styled.div`
	display: flex;
	flex-direction: column;
`;

const Name = styled.div`
	font-size: 25px;
	color: grey;
`;

const Location = styled.div`
	font-size: 15px;
	color: grey;
`;

const Info = styled.div`
`;

const Temperature = styled.div`
	display: flex;
	font-size: 60px;
	margin-top: -10px;
	color: lightslategrey;
`;

const Celcius = styled.div`
	display: flex;
	font-size: 10px;
	margin-top: 10px;
`;

function CityForm(props) {
	return (
		<Container>
			<TopPart>
				<TopColumn>
					<Name>{props.name}</Name>
					<Location>{props.location}</Location>
				</TopColumn>
				<Temperature>{props.temperature}<Celcius>°C</Celcius></Temperature>
			</TopPart>
			<BottomPart>
				<Info>Humidity: {props.humidity} | {props.direction} | {props.speed}</Info>
			</BottomPart>
		</Container>
	);
}

export default CityForm;