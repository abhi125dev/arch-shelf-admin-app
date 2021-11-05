import * as Types from '../types';

const subjectMiddleware = ({ type, payload }) => {
	switch (type) {
		case Types.SET_SELECTED_SECTION:
			localStorage.setItem('selectedSection', JSON.stringify(payload))
			break
		case Types.RESTORE_SELECTED_SECTION:
			return {
				type: Types.SET_SELECTED_SECTION,
				payload: localStorage.getItem('selectedSection')
					? JSON.parse(localStorage.getItem('selectedSection'))
					: null,
			}
		default:
			break
	}
}

export default subjectMiddleware
