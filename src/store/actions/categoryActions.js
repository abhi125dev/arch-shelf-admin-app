import * as Types from "../types";

export const getCategoriesAction = (data, dispatch) =>
  dispatch({ type: Types.GET_CATEGORIES, payload: data });
