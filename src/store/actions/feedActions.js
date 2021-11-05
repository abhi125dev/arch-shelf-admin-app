import * as Types from "../types";

export const getFeedsAction = (data, dispatch) =>
  dispatch({ type: Types.GET_FEEDS, payload: data });

export const getFeedAction = (data, dispatch) =>
  dispatch({ type: Types.GET_FEED, payload: data });

export const getDashboardFeedAction = (data, dispatch) =>
  dispatch({ type: Types.GET_DASHBOARD_FEED, payload: data });
