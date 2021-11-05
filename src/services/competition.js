import { callApi } from "../utils/apiUtils";
import competition from "./endpoints/competition";

export const addCompetition = ({ body }) =>
  callApi({ uriEndPoint: competition.addCompetition.v1, body });

export const getCompetitions = ({ query }) =>
  callApi({ uriEndPoint: competition.getCompetitions.v1, query });

export const getCompetition = ({ pathParams }) =>
  callApi({ uriEndPoint: competition.getCompetition.v1, pathParams });

export const deleteCompetition = ({ pathParams }) =>
  callApi({ uriEndPoint: competition.deleteCompetition.v1, pathParams });

export const updateCompetition = ({ body, pathParams }) =>
  callApi({ uriEndPoint: competition.updateCompetition.v1, body, pathParams });
