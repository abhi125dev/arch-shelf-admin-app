import * as Types from '../types';
import { client } from '../index'

const authMiddleware = ({ type, payload }) => {
	switch (type) {
		case Types.SIGN_IN:
		case Types.SIGN_UP:
			localStorage.setItem('user', JSON.stringify(payload))
			break
		case Types.SIGN_OUT:
			client.resetStore()
			localStorage.removeItem('user')
			return { type: Types.CLEAR_CONTEXT }
		default:
			break
	}
}

export default authMiddleware
