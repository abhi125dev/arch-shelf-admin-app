import * as Types from '../types';

const taskReducer = (tasks, action) => {
  switch (action.type) {
    case Types.STORE_TASK_LIST:
      return {
        ...tasks,
        taskList: action.payload.tasks || [],
        total: action.payload.total_count || 0,
      };
    default:
      return tasks;
  }
};

export default taskReducer;
