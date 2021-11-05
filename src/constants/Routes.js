const Routes = {
  // Auth Routes
  LOGIN: "/login",
  REGISTRATION: "/registration",
  RESET_PASSWORD: "/reset-password",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD_CONFIRM: "/password/reset/:token",
  PRINT: "/print",
  SUBJECTS: {
    path: "/courses",
    fullPath: "/courses/:pivotId?/:sectionId?/:type?/:outcomeId?",
    learningArchive: "/courses/:pivotId?/:sectionId?/learning-archive",
  },
  ASSESSMENT: {
    path: "/assessment",
    instructions: "/assessment/instructions",
    questions: "/assessment/questions",
  },
  REPORTING: "/reporting",
  CERTIFICATES: "/certificates",

  ACTIVITY: "/activity",
  ACTIVITY_SINGLE_USER: "/activity/:id",
  USERS: "/learners",
  SINGLE_USER: "/learners/:id",
  BOOKMARKS: "/bookmarks",
  GROUPS: "/group-manager",
  MANAGER: "/manager",
  MATRIX: "/matrix",

  DASHBOARD: "/dashboard",
  BLOGS: "/blogs",
  INITIATIVE: "/initiatives",
  ADDINITIATIVE: "/initiatives/add",
  TESTIMONIAL: "/testimonials",
  CATEGORIES: "/categories",
  ADDBLOGS: "/blogs/add",
  VIEWBLOGS: "/blogs/:id",
  APPOINTMENTS: "/appointments",
  PROFILE: "/profile",
  MY_ADVISOR: "/my-advisor",
  ADVISOR: "/adviser",
  TASKS: "/tasks",
  ACTION_LIST: "/action-list",
  ACTION_PLAN: "/action-plan",
  TIMELOG: "/timelog",
  STUDENTS: "/students",
  ACTIONS: "/actions",
  TIMELOG_LIST: "/timelog/list",

  DESTINATION_TRACKER: {
    PRE_16: {
      KS4_DATA: "/destination-tracker/ks4-data",
      KS4_QUESTIONNAIRE: "/destination-tracker/ks4-questionnaire",
      Y11_DASHBOARD: "/destination-tracker/y11-dashboard",
    },
    POST_16: {
      KS5_STUDIES: "/destination-tracker/ks5-studies",
      MAY_RETURN_LIVE_DASHBOARD:
        "/destination-tracker/may-return-live-dashboard",
      POST_16_QUESTIONNAIRE: "/destination-tracker/post-16-questionnaire",
      SUBJECT_OPTIONS_UCAS: "/destination-tracker/subject-option-ucas",
    },
    BOTH: {
      INFORMATION_NOTES: "/destination-tracker/information-notes",
      SEPTEMBER_GUARANTEE: "/destination-tracker/september-guarantee",
      OCTOBER_ACTIVITY_SURVEY: "/destination-tracker/october-activity-survey",
      STUDENT_DATA: "/destination-tracker/student-data",
    },
  },
  DESTINATION_TRACKER_REPORTS: {
    PRE16_Y10_DASHBOARD: "/reports/pre16Y10Dashboard",
  },
  REPORTS: {
    POST_MAYRETURN: "/reports/post16-may-return",
    POST_SETP_GURANTEE: "/reports/post16-sept-guarantee",
    POST_OCTOBER_SUR: "/reports/october_survey",
    POST_BURSARY: "/reports/bursary",
    POST_SEND: "/reports/send",
    POST_LAC: "/reports/lac",
    POST_EAL: "/reports/eal",
  },
};

export { Routes };
