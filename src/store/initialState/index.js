import appState from "./appState";
import userState from "./userState";
import usersState from "./usersState";
import taskState from "./taskState";
import categoriesState from "./categoriesState";
import feedState from "./feedState";
import commentState from "./commentState";

export const initialState = {
  app: appState,
  user: userState,
  users: usersState,
  tasks: taskState,
  categories: categoriesState,
  feeds: feedState,
  comments: commentState,
};
