import * as Types from "../types";

const authMiddleware = ({ type }) => {
  switch (type) {
    case Types.RESTORE_USER:
      return { type: Types.APP_LOADED, payload: { loading: false } };
    default:
      break;
  }
};

export default authMiddleware;
