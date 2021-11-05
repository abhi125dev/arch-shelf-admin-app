import { defaults } from "./default";

const Competition = {
  addCompetition: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/competition",
    },
  },

  getCompetitions: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/competition",
    },
  },

};

export default Competition;
