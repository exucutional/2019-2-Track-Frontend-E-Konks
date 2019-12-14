import {
	GET_PROFILE,
} from '../constants/ActionTypes'

const getProfileRequest = () => ({
	type: GET_PROFILE,
})

export const getProfile = () => {
	return (dispatch, getState) => {
		dispatch(getProfileRequest());
	}
}