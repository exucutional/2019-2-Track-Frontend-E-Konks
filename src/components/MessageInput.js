/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';
import ClipButton from './ClipButton';
import LocationButton from './LocationButton';
import VoiceRecordButton from './VoiceRecordButton';

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
				<ClipButton
					yourName={props.yourName}
					chatId={props.chatId}
					setMessages={props.setMessages}
					setChats={props.setChats}
					// eslint-disable-next-line react/prop-types
					messages={props.messages}
				/>
				<LocationButton setInputValue={props.setInputValue}/>
				<VoiceRecordButton
					yourName={props.yourName}
					chatId={props.chatId}
					setMessages={props.setMessages}
					setChats={props.setChats}
					// eslint-disable-next-line react/prop-types
					messages={props.messages}
					isRecording={props.isRecording}
					setIsRecording={props.setIsRecording}
				/>
			</RightSide>
		</Form>
	);
}

Input.propTypes = {
	onChange: PropType.func.isRequired,
	onSubmit: PropType.func.isRequired,
	setInputValue: PropType.func.isRequired,
	value: PropType.string.isRequired,
	youOnTyping: PropType.func.isRequired,
	compOnTyping: PropType.func.isRequired,
	yourName: PropType.string.isRequired,
	chatId: PropType.string.isRequired,
	setMessages: PropType.func.isRequired,
	setChats: PropType.func.isRequired,
	isRecording: PropType.bool.isRequired,
	setIsRecording: PropType.func.isRequired,
};

export default Input;
