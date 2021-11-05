import * as Types from "../types";

export const getCommentsAction = (data, dispatch) =>
  dispatch({ type: Types.GET_COMMENTS, payload: data });
