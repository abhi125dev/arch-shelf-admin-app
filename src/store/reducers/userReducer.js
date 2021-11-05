import * as Types from "../types";

const userReducer = (user, action) => {
  switch (action.type) {
    case Types.SIGN_IN:
    case Types.SIGN_UP:
      return {
        ...action.payload,
        loggedIn: true,
      };
    case Types.SIGN_OUT:
      return {
        loggedIn: false,
      };
    case Types.RESTORE_USER:
      return {
        ...action.payload,
        loggedIn: Boolean(action.payload && action.payload.email),
      };
    case Types.PROFILE_UPDATE_SUCCESS:
    case Types.SET_SELECTED_SCHOOL:
      return {
        ...user,
        ...action.payload,
      };
    default:
      return user;
  }
};

export default userReducer;
