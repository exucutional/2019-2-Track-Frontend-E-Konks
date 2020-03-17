import {
	GET_CITIES,
	SET_CITIES,
} from '../constants/ActionTypes';

const getCitiesRequest = () => ({
	type: GET_CITIES,
})

export const getCities = () => {
	return (dispatch, getState) => {
		dispatch(getCitiesRequest);
	}
}
