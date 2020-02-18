/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import ProfileInput from './ProfileInput';
import AvatarForm from './AvatarForm';
import { getProfile } from '../actions/index'
import {
	SET_PROFILE,
} from '../constants/ActionTypes'

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
	const {
		setProfile,
	} = props;
	const fullNameOnChange = (event) => { setProfile({fullName: event.target.value}); setFullName(event.target.value); };
	const userNameOnChange = (event) => { setProfile({userName: event.target.value}); setUserName(event.target.value); };
	const bioOnChange = (event) => { setProfile({bio: event.target.value}); setBio(event.target.value); };
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

const mapStateToProps = (state) => ({
	fullName: state.profile.fullName,
	userName: state.profile.userName,
	bio: state.profile.bio,
})

const mapDispatchToProps = (dispatch) => ({
	setProfile: (profile) => {
		dispatch({
			type: SET_PROFILE,
			payload: profile,
		});
	},
	// eslint-disable-next-line object-shorthand
	getProfile: getProfile,
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProfileForm)