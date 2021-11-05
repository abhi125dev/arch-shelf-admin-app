import { callApi } from "../utils/apiUtils";
import { task } from "./endpoints/task";

export const createTask = ({ body }) =>
  callApi({ uriEndPoint: task.createTask.v1, body });

export const editTask = ({ body }) =>
  callApi({ uriEndPoint: task.editTask.v1, body });

export const deleteTask = ({ body }) =>
  callApi({ uriEndPoint: task.deleteTask.v1, body });

export const getTasks = ({ query, body }) =>
  callApi({ uriEndPoint: task.getTasks.v1, query, body });

export const uploadTaskDoc = ({ body, pathParams }) =>
  callApi({ uriEndPoint: task.uploadTaskDoc.v1, body, pathParams });

export const getTaskDocs = ({ pathParams }) =>
  callApi({ uriEndPoint: task.getTaskDocs.v1, pathParams });

export const getAdvisorTasks = ({ body, query }) =>
  callApi({ uriEndPoint: task.getAdvisorTasks.v1, body, query });

export const deleteTaskDoc = ({ pathParams }) =>
  callApi({ uriEndPoint: task.deleteTaskDoc.v1, pathParams });

export const downloadDoc = ({ pathParams }) =>
  callApi({ uriEndPoint: task.downloadDoc.v1, pathParams });

export const changeTaskStatus = ({ pathParams }) =>
  callApi({ uriEndPoint: task.changeTaskStatus.v1, pathParams });

export const changeAdvisorTaskStatus = ({ body }) =>
  callApi({ uriEndPoint: task.changeAdvisorTaskStatus.v1, body });
