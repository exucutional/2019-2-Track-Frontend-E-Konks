/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from '@emotion/styled';
import ProfileInput from './ProfileInput';
import AvatarForm from './AvatarForm';

const Profile = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function ProfileForm(props) {
	const {
		setFullName,
		setUserName,
		setBio,
		fullName,
		userName,
		bio,
	} = props.state;
	const fullNameOnChange = (event) => setFullName(event.target.value);;
	const userNameOnChange = (event) => setUserName(event.target.value);
	const bioOnChange = (event) => setBio(event.target.value);
	return (
		<Profile>
			<AvatarForm/>
			<ProfileInput
				onChange={ fullNameOnChange }
				label='Full name'
				value={ fullName }
				info=''/>
			<ProfileInput
				onChange={ userNameOnChange }
				label='Username'
				minLength='5'
				required='t'
				value={ userName }
				info='Minimum lenght is 5 characters'/>
			<ProfileInput
				onChange={ bioOnChange }
				label='Bio'
				textarea='t'
				value={ bio }
				info='Any detail about you'/>
		</Profile>
	);
}

export default ProfileForm;