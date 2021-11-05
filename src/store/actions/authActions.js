import * as Types from '../types';

export const signInSuccessAction = (data, dispatch) =>
  dispatch({ type: Types.SIGN_IN, payload: data });
export const signUpSuccessAction = (data, dispatch) =>
  dispatch({ type: Types.SIGN_UP, payload: data });
export const signOutSuccessAction = (dispatch) =>
  dispatch({ type: Types.SIGN_OUT });
export const restoreUserAction = (data, dispatch) =>
  dispatch({ type: Types.RESTORE_USER, payload: data });
