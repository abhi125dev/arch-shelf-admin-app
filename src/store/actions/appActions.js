import * as Types from '../types';

export const resetBreadcrumbs = dispatch => dispatch({ type: Types.RESET_BREADCRUMBS })
export const setBreadcrumbs = (data, dispatch) => dispatch({ type: Types.SET_BREADCRUMBS, payload: data })
export const openLeftNav = (data, dispatch) => dispatch({ type: Types.OPEN_LEFT_NAV, payload: data })
export const appLoadingSwitch = dispatch => dispatch({ type: Types.APP_LOADED })
export const setExportToPdf = (data, dispatch) => dispatch({ type: Types.SET_EXPORT_TO_PDF, payload: data })
