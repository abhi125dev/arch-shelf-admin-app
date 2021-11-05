import * as Types from '../types';

export const profileUpdateAction = (data, dispatch) => dispatch({ type: Types.PROFILE_UPDATE_SUCCESS, payload: data })
export const setSelectedSchoolAction = (data, dispatch) => dispatch({ type: Types.SET_SELECTED_SCHOOL, payload: data })
