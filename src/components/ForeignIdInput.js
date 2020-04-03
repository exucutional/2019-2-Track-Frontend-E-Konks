/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import styled from '@emotion/styled';

const Form = styled.form`
	display: flex;
	font-size: 30px;
	border: solid;
	margin-left: 4vw;
	margin-right: 4vw;
	width: 92vw;
	position: fixed;
	bottom: 15vh;
`;

function ForeignIdInput(props) {
	const {
		foreignPeerId,
		setForeignPeerId,
		foreignIdInputMode,
		setForeignIdInputMode,
		setMyPeerConn,
		peer,
	} = props.state;
	const onSubmit = (event) => {
		event.preventDefault();
		setForeignIdInputMode(false);
		setMyPeerConn(peer.connect(foreignPeerId));
	}
	const onChange = (event) => setForeignPeerId(event.target.value);
	return (
		foreignIdInputMode &&
		<Form onSubmit={onSubmit}>
			<label style={{ width: 'inherit' }}>
				<input
					type="text"
					placeholder="ID собеседника"
					value={foreignPeerId}
					onChange={onChange}
					style={{ display: 'flex', fontSize: 'inherit', width: '100%' }}
					id="foreign-id-input"
				/>
			</label>
			<input
				type="submit"
				value="Соединиться"
				style={{ position: 'relative', fontSize: 'inherit', cursor: 'pointer' }}
				id="foreign-id-submit"
			/>
		</Form>
	); 
}

export default ForeignIdInput;