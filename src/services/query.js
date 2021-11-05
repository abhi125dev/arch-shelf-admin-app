import { callApi } from "../utils/apiUtils";
import queries from "./endpoints/query";


export const getQueries = ({ query }) =>
  callApi({ uriEndPoint: queries.getQueries.v1, query });
