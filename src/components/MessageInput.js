import React from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';

const InputContainer = styled.div`
	display: flex;
	flex-direction: row;
	border: 1px solid rgba(25, 25, 25, 0.32);
	height: 10vh;
`;

const SourceInput = styled.div`
	display: flex;
	font-size: 20px;
	width: 30em;
	align-items: center;
	margin-right: 10px;
`;

const ContentInput = styled.input`
	width: calc(100%);
	font-size: 30px;
	border: none;
`;

const InputRadio = styled.input`
	width: unset;
	margin-left: 20px;
`;

function Input(props) {
	return (
		<InputContainer>
			<ContentInput 
				type='text' 
				onChange={ props.onChange } 
				onSubmit={ props.onSubmit }
				value={ props.value }/>
			<SourceInput>
				<span>Message from:</span>
				<InputRadio type='radio' name='name' value='You' checked/>You
				<InputRadio type='radio' name='name' value='Companion'/>Companion
			</SourceInput>
		</InputContainer>
	)
}

Input.propTypes = {
	onChange: PropType.func.isRequired,
	onSubmit: PropType.func.isRequired,
	value: PropType.string.isRequired,
};

export default Input;