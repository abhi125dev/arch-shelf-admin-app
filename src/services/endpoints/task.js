import { defaults } from "./default";

export const task = {
  createTask: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/create-task",
    },
  },
  editTask: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/edit-task",
    },
  },
  deleteTask: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/delete-task",
    },
  },
  getTasks: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/tasks",
    },
  },
  uploadTaskDoc: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/upload-task-doc/:taskId",
      headerProps: {
        "Content-Type": "multipart/form-data",
      },
    },
  },
  getTaskDocs: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/get-doc-list/:taskId",
    },
  },
  getAdvisorTasks: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/advisor-task-log",
    },
  },
  deleteTaskDoc: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/delete-task-doc/:docId",
    },
  },
  downloadDoc: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/download-task-doc/:docId",
    },
  },
  changeTaskStatus: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/change-task-status/:taskId/:statusId",
    },
  },
  changeAdvisorTaskStatus: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/change-tasklog-status",
    },
  },
};
