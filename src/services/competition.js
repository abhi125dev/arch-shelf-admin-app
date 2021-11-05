import { callApi } from "../utils/apiUtils";
import competition from "./endpoints/competition";

export const addCompetition = ({ body }) =>
  callApi({ uriEndPoint: competition.addCompetition.v1, body });

export const getCompetitions = ({ query }) =>
  callApi({ uriEndPoint: competition.getCompetitions.v1, query });
