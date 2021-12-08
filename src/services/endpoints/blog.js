import { defaults } from "./default";

const blog = {
  addFeed: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/feeds",
    },
  },

  getFeeds: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/feeds",
    },
  },

  getFeed: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/feeds/:id",
    },
  },
  deleteFeed: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/feeds/:id",
    },
  },
  updateFeed: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/feeds/:id",
    },
  },
  addProject: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/projects",
    },
  },

  getProjects: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/projects",
    },
  },

  getProject: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/projects/:id",
    },
  },
  deleteProject: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/projects/:id",
    },
  },
  updateProject: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/projects/:id",
    },
  },
  deleteProjectImage: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/projects/image/:id",
    },
  },
  addDashboardFeed: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/dashboardFeeds",
    },
  },
  getDashboardFeed: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/dashboardFeeds",
    },
  },
  deleteDashboardFeed: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/dashboardFeeds/:id",
    },
  },
  getComments: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/feeds/:id/comment",
    },
  },
  deleteComment: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/feeds/:id/comment",
    },
  },
  deleteFeedImage: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/feeds/image/:id",
    },
  },
  getOptions: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/category/list",
    },
  },
};

export default blog;
