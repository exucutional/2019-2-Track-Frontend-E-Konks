/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';
import ClipButton from './ClipButton';

const Form = styled.form`
	display: flex;
	flex-direction: row;
	border-top: 3px solid rgba(25, 25, 25, 0.32);
	justify-content: space-between;
	height: 10vh;
`;

const SourceInput = styled.div`
	display: flex;
	font-size: 15px;
	align-items: center;
	margin-right: 10px;
`;

const ContentInput = styled.input`
	font-size: 25px;
	width: calc(100%);
	border: none;
`;

const InputRadio = styled.input`
	display: flex;
	margin-left: 10px;
`;

const RightSide = styled.span`
	display: flex;
	flex-direction: row;
`;

function Input(props) {
	return (
		<Form onSubmit={props.onSubmit}>
			<ContentInput
				type="text"
				placeholder="Сообщение"
				onChange={props.onChange}
				value={props.value}
			/>
			<RightSide>
				<SourceInput>
					<InputRadio
						type="radio"
						name="name"
						value="You"
						defaultChecked
						onChange={props.youOnTyping}
					/>
					You
					<InputRadio
						type="radio"
						name="name"
						value="Companion"
						onChange={props.compOnTyping}
					/>
					Companion
				</SourceInput>
				<ClipButton />
			</RightSide>
		</Form>
	);
}

Input.propTypes = {
	onChange: PropType.func.isRequired,
	onSubmit: PropType.func.isRequired,
	value: PropType.string.isRequired,
	youOnTyping: PropType.func.isRequired,
	compOnTyping: PropType.func.isRequired,
};

export default Input;
