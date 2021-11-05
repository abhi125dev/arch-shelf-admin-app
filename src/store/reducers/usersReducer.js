import * as Types from '../types';
import usersState from '../initialState/usersState'

const usersReducer = (users, action) => {
	switch (action.type) {
		case Types.USERS_FILTER:
			return {
				...users,
				filter: {
					...users.filter,
					...action.payload,
				},
			}
		case Types.CLEAR_CONTEXT:
			return usersState
		default:
			return users
	}
}

export default usersReducer
