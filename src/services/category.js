import { callApi } from "../utils/apiUtils";
import category from "./endpoints/category";

export const addCategory = ({ body }) =>
  callApi({ uriEndPoint: category.addCategory.v1, body });

export const getCategories = ({ query }) =>
  callApi({ uriEndPoint: category.getCategories.v1, query });

export const deleteCategory = ({ body, pathParams }) =>
  callApi({ uriEndPoint: category.deleteCategory.v1, body, pathParams });

export const updateCategory = ({ body, pathParams }) =>
  callApi({ uriEndPoint: category.updateCategory.v1, body, pathParams });
