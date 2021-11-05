import { defaults } from "./default";

const category = {
  addCategory: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/category/create",
    },
  },

  getCategories: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/category/list",
    },
  },

  deleteCategory: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/category/:id",
    },
  },
  updateCategory: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/category/:id",
    },
  },
};

export default category;
