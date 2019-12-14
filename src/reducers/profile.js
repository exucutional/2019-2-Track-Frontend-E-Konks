import {
	GET_PROFILE,
	SET_PROFILE
} from '../constants/ActionTypes'
import { load } from '../actions/localDb';

const profile = load('profile');

let initialState = {
	fullName: '',
	userName: 'admin',
	bio: '',
}

if (profile && Object.keys(profile).length !== 0) {
	initialState = profile;
}

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFILE:
			return {...state};
		case SET_PROFILE:
			return {...state, ...action.payload}; 
		default: 
			return state;
	}
}