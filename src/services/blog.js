import { callApi } from "../utils/apiUtils";
import blog from "./endpoints/blog";

export const addFeed = ({ body }) =>
  callApi({ uriEndPoint: blog.addFeed.v1, body });

export const getFeeds = ({ query }) =>
  callApi({ uriEndPoint: blog.getFeeds.v1, query });

export const getFeed = ({ pathParams }) =>
  callApi({ uriEndPoint: blog.getFeed.v1, pathParams });

export const deleteFeed = ({ pathParams }) =>
  callApi({ uriEndPoint: blog.deleteFeed.v1, pathParams });

export const updateFeed = ({ body, pathParams }) =>
  callApi({ uriEndPoint: blog.updateFeed.v1, body, pathParams });

export const addDashboardFeed = ({ body }) =>
  callApi({ uriEndPoint: blog.addDashboardFeed.v1, body });

export const getDashboardFeed = () =>
  callApi({ uriEndPoint: blog.getDashboardFeed.v1 });

export const deleteDashboardFeed = ({ pathParams }) =>
  callApi({ uriEndPoint: blog.deleteDashboardFeed.v1, pathParams });

export const getComments = ({ pathParams, query }) =>
  callApi({ uriEndPoint: blog.getComments.v1, pathParams, query });

export const deleteComment = ({ pathParams }) =>
  callApi({ uriEndPoint: blog.deleteComment.v1, pathParams });

export const getOptions = ({ query }) =>
  callApi({ uriEndPoint: blog.getOptions.v1, query });

export const deleteFeedImage = ({ pathParams, body }) =>
  callApi({ uriEndPoint: blog.deleteFeedImage.v1, pathParams, body });
