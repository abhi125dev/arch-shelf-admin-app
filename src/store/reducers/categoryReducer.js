import * as Types from "../types";

const categoryReducer = (categories, action) => {
  switch (action.type) {
    case Types.GET_CATEGORIES:
      return {
        ...categories,
        categoryList: action.payload || [],
      };
    default:
      return categories;
  }
};

export default categoryReducer;
