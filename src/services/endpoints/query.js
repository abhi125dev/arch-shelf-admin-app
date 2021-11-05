import { defaults } from "./default";

const query = {
    getQueries: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/question",
    },
  },

};

export default query;
