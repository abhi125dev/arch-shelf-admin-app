import * as Types from "../types";

const feedReducer = (feeds, feed, dashboardFeed, action) => {
  switch (action.type) {
    case Types.GET_FEEDS:
      return {
        ...feeds,
        feedsList: action.payload || [],
      };
    case Types.GET_FEED:
      return {
        ...feed,
        feedDetail: action.payload || {},
      };
    case Types.GET_DASHBOARD_FEED:
      return {
        ...dashboardFeed,
        dashboardFeed: action.payload || {},
      };
    default:
      return feeds;
  }
};

export default feedReducer;
