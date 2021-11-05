import * as Types from '../types';

const profileMiddleware = ({ type, payload }) => {
	switch (type) {
		case Types.PROFILE_UPDATE_SUCCESS:
			localStorage.setItem('user', JSON.stringify(payload))
			break
		default:
			break
	}
}

export default profileMiddleware
