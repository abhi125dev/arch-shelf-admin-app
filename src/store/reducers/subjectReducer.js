import * as Types from '../types';

const subjectReducer = (subject, action) => {
	switch (action.type) {
		case Types.SET_SELECTED_SECTION:
			return {
				...subject,
				selectedSection: {
					isFetching: false,
					...action.payload,
				},
			}
		default:
			return subject
	}
}

export default subjectReducer
