import { defaults } from "./default";

export const user = {
  register: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/auth/register",
    },
  },
  schoolsList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/schools",
    },
  },
  login: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/auth/login",
    },
  },
  currentUser: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/me",
    },
  },
  logout: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/auth/logout",
    },
  },
  requestPasswordReset: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/request-password-reset",
    },
  },
  updatePassword: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/update-password",
    },
  },
  thirdPartyRegister: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/third-party-register",
    },
  },
  schoolStudents: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/school-students",
    },
  },
  logTime: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/log-time",
    },
  },
  listTimeLog: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/list-timelog",
    },
  },
  deleteTimeLog: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/delete-logged-time",
    },
  },
  uploadProfilePic: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/upload-profile-pic",
      headerProps: {
        "Content-Type": "multipart/form-data",
      },
    },
  },
  getProfilePic: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/get-profile-pic",
    },
  },
  getProfileDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/get-user-details/:userId",
    },
  },
};
