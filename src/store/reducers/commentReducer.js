import * as Types from "../types";

const commentReducer = (comments, action) => {
  switch (action.type) {
    case Types.GET_COMMENTS:
      return {
        ...comments,
        feedComments: action.payload.comments || [],
        count: action.payload.count || 0,
      };
    default:
      return comments;
  }
};

export default commentReducer;
