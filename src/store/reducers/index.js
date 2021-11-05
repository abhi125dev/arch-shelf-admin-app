import { mainMiddleware } from "../middleware";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import usersReducer from "./usersReducer";
import categoryReducer from "./categoryReducer";
import feedReducer from "./feedReducer";
import commentReducer from "./commentReducer";

export const mainReducer = (
  { app, user, users, categories, feeds, feed, dashboardFeed, comments },
  action
) => {
  const { appMiddleware, authMiddleware } = mainMiddleware(action);
  return {
    app: appReducer(app, appMiddleware || action),
    user: userReducer(user, action),
    users: usersReducer(users, authMiddleware || action),
    categories: categoryReducer(categories, action),
    feeds: feedReducer(feeds, feed, dashboardFeed, action),
    comments: commentReducer(comments, action),
  };
};
