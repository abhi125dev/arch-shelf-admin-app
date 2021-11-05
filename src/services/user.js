import { callApi } from "../utils/apiUtils";
import { user } from "./endpoints/user";

export const registerUser = ({ body }) =>
  callApi({ uriEndPoint: user.register.v1, body });

export const loginUser = ({ body }) =>
  callApi({ uriEndPoint: user.login.v1, body });

export const currentUser = () => callApi({ uriEndPoint: user.currentUser.v1 });

export const logoutUser = () => callApi({ uriEndPoint: user.logout.v1 });

export const forgotPassword = ({ body }) =>
  callApi({ uriEndPoint: user.requestPasswordReset.v1, body });

export const updatePassword = ({ body }) =>
  callApi({ uriEndPoint: user.updatePassword.v1, body });

export const thirdPartyRegister = ({ body }) =>
  callApi({ uriEndPoint: user.thirdPartyRegister.v1, body });

export const getSchoolList = ({ query = {} }) =>
  callApi({ uriEndPoint: user.schoolsList.v1, query });

export const schoolStudents = ({ body }) =>
  callApi({ uriEndPoint: user.schoolStudents.v1, body });

export const logTime = ({ body }) =>
  callApi({ uriEndPoint: user.logTime.v1, body });

export const listTimeLog = ({ body }) =>
  callApi({ uriEndPoint: user.listTimeLog.v1, body });

export const deleteTimeLog = ({ body }) =>
  callApi({ uriEndPoint: user.deleteTimeLog.v1, body });

export const getProfilePic = () =>
  callApi({ uriEndPoint: user.getProfilePic.v1 });

export const uploadProfilePic = ({ body }) =>
  callApi({ uriEndPoint: user.uploadProfilePic.v1, body });

export const getProfileDetails = ({ pathParams }) =>
  callApi({ uriEndPoint: user.getProfileDetails.v1, pathParams });
