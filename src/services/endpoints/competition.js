import { defaults } from "./default";

const Competition = {
  addCompetition: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/competitions",
    },
  },

  getCompetitions: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/competitions",
    },
  },

  getCompetition: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/competitions/:id",
    },
  },

  deleteCompetition: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/competitions/:id",
    },
  },

  updateCompetition: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/competitions/:id",
    },
  },
};

export default Competition;
