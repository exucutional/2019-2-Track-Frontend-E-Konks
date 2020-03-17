/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropType from 'prop-types';
import styled from '@emotion/styled';

const Input = styled.input`
	display: flex;
	width: 100%;
	box-sizing: border-box;
	box-shadow: none;
	outline: none;
	border: none;
	padding 20px 15px;
	font-size: inherit;
	&:focus ~ Label {
		top: -85px;
		left: 15px;
	}
	&:valid ~ Label {
		top: -85px;
		left: 15px;
	}
	&:invalid ~ Label {
		top: -85px;
		left: 15px;
		color: red;
	}
	background-color: inherit;
`;
	
const Label = styled.label`
	display: block;
	font-size: 0.7em;
	position: relative;
	top: -45px;
	left: 15px;
	color: #999;
	transition: .5s;
	pointer-events: none;
`;
	
const Container = styled.div`
	display: flex;
	flex-direction: column;
	positon: relative;
	font-family: sans-serif;
	font-size: 30px;
	padding: 15px 5px;
	margin-top: 30px;
	background-color: #f4f0f6;
	border-bottom: 2px solid;
	width: 90vw;
	height: 10vh;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
`;

const Info = styled.div`
	font-size: 0.8em;
	color: #999;
	margin-top: 5px;
	margin-left: 10px;
`;

const InputArea = styled.textarea`
	display: flex;
	width: 100%;
	box-sizing: border-box;
	box-shadow: none;
	outline: none;
	border: none;
	padding 20px 15px;
	font-size: inherit;
	margin-top: 30px;
	&:focus ~ Label {
		top: -140px;
		left: 15px;
	}
	&:valid ~ Label {
		top: -140px;
		left: 15px;
	}
	&:invalid ~ Label {
		top: -140px;
		left: 15px;
		color: red;
	}
	background-color: inherit;
`;

function ProfileInput(props) {
	if (props.textarea !== 't') {
		return (
			<div>
				<Container>
					<Input 
						id={ props.id }
						type='text' 
						minLength={ props.minLength } 
						required={ props.required }
						onChange={ props.onChange }
						value={ props.value }/>
					<Label>{ props.label }</Label>
				</Container>
				<Info>{ props.info }</Info>
			</div>
		);
	}
	return (
		<div>
			<Container style={ {height: '20vh'} }>
				<InputArea 
					type='text' 
					minLength={ props.minLength } 
					required={ props.required }
					onChange={ props.onChange }
					value={ props.value }/>
				<Label>{ props.label }</Label>
			</Container>
			<Info>{ props.info }</Info>
		</div>
	);
}

ProfileInput.defaultProps = {
	minLength: '0',
	textarea: '',
	required: '',
	info: '',
}

ProfileInput.propTypes = {
	id: PropType.string.isRequired,
	textarea: PropType.string,
	minLength: PropType.string,
	required: PropType.string,
	onChange: PropType.func.isRequired,
	value: PropType.string.isRequired,
	label: PropType.string.isRequired,
	info: PropType.string,
}

export default ProfileInput;