import Dashboard from "Pages/Dashboard";
import Resources from "Pages/Resources";
import Testimonial from "../components/pages/Testimonial";
import AddTestimonial from "../components/pages//Testimonial/AddTestimonial";
import AddResource from "../components/pages/Resources/AddResource";
import Categories from "../components/pages/Categories";
import Projects from "../components/pages/Projects";
import AddProjects from "../components/pages/Projects/AddProjects";
import ViewFeed from "../components/ViewFeed";
import Courses from "../components/pages/Courses";
import AddCourses from "../components/pages/Courses/AddCourses";
import Competitions from "../components/pages/Competitions";
import AddCompetitions from "../components/pages/Competitions/AddCompetitions";
import Breakfast from "../components/pages/Breakfast";
import AddBreakfast from "../components/pages/Breakfast/AddBreakfast";

const navigationRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/resources",
    component: Resources,
  },
  {
    path: "/resource/add",
    component: AddResource,
  },
  {
    path: "/resources/:id",
    component: ViewFeed,
  },
  {
    path: "/resources/:id/edit",
    component: AddResource,
  },
  {
    path: "/categories",
    component: Categories,
  },
  {
    path: "/testimonials",
    component: Testimonial,
  },
  {
    path: "/testimonials/add",
    component: AddTestimonial,
  },
  {
    path: "/testimonials/edit/:id",
    component: AddTestimonial,
  },
  {
    path: "/projects",
    component: Projects,
  },
  {
    path: "/project/add",
    component: AddProjects,
  },
  {
    path: "/projects/:id",
    component: ViewFeed,
  },
  {
    path: "/projects/:id/edit",
    component: AddProjects,
  },
  {
    path: "/courses",
    component: Courses,
  },
  {
    path: "/course/add",
    component: AddCourses,
  },
  {
    path: "/courses/:id",
    component: ViewFeed,
  },
  {
    path: "/courses/:id/edit",
    component: AddCourses,
  },
  {
    path: "/competitions",
    component: Competitions,
  },
  {
    path: "/competition/add",
    component: AddCompetitions,
  },
  {
    path: "/competitions/:id",
    component: ViewFeed,
  },
  {
    path: "/competitions/:id/edit",
    component: AddCompetitions,
  },
  {
    path: "/breakfasts",
    component: Breakfast,
  },
  {
    path: "/breakfast/add",
    component: AddBreakfast,
  },
  {
    path: "/breakfasts/:id",
    component: ViewFeed,
  },
  {
    path: "/breakfasts/:id/edit",
    component: AddBreakfast,
  },
  // {
  //   path: "/queries",
  //   component: Query,
  // },
  // {
  //   path: "/founders",
  //   component: Founder,
  // },
  // {
  //   path: "/founders/add",
  //   component: AddFounder,
  // },
  // {
  //   path: "/founder/:id",
  //   component: ViewFeed,
  // },
  // {
  //   path: "/founder/:id/edit",
  //   component: AddFounder,
  // },
  // {
  //   path: "/appointments",
  //   component: Appointments
  // },
  // {
  //   path: "/appointments/settings",
  //   component: Advisor
  // },
  // {
  //   path: "/profile",
  //   component: Profile
  // },
  // {
  //   path: "/my-adviser",
  //   component: Advisor
  // },
  // {
  //   path: "/adviser",
  //   component: Advisor
  // },

  // {
  //   path: "/adviser/:adviserId",
  //   component: Advisor
  // },
  // {
  //   path: "/tasks",
  //   component: Tasks
  // },
  // {
  //   path: "/action-list",
  //   component: Tasks
  // },
  // {
  //   path: "/action-plan",
  //   component: Tasks
  // },
  // {
  //   path: "/timelog",
  //   component: TimeLog
  // },
  // {
  //   path: "/students",
  //   component: Student
  // },
  // {
  //   path: "/students/:studentId",
  //   component: Student
  // },
  // {
  //   path: "/location",
  //   component: Location
  // },
  // {
  //   path: "/actions",
  //   component: Tasks
  // },
  // {
  //   path: "/timelog/list",
  //   component: TimeLog
  // },
  // {
  //   path: "/students/:studentId/action-list",
  //   component: Tasks
  // },
  // {
  //   path: "/destination-tracker/",
  //   component: DestinationTracker
  // },
  // {
  //   path: "/destination-tracker/:trackPath",
  //   component: DestinationTracker
  // },
  // {
  //   path: "/reports/:reportPath",
  //   component: Reports
  // }
];

export { navigationRoutes };
