import { getAllLearnerRoles, getAllManagerRoles, allRoles } from "Utils/roles";
import { Routes } from "./Routes";

const allManagerRoles = getAllManagerRoles();
const allLearnerRoles = getAllLearnerRoles();

const menuLinks = [
  {
    name: "Dashboard",
    icon: "far fa-th-large",
    path: Routes.DASHBOARD,
    show: allRoles,
  },
  {
    name: "Courses",
    icon: "far fa-graduation-cap",
    path: Routes.SUBJECTS.path,
    show: allLearnerRoles,
  },
  {
    name: "Learners",
    icon: "far fa-users",
    path: Routes.USERS,
    show: allManagerRoles,
  },
  {
    name: "Groups",
    icon: "far fa-users-class",
    path: Routes.GROUPS,
    show: allManagerRoles,
  },
  {
    name: "Activity Reports",
    icon: "far fa-history",
    path: Routes.ACTIVITY,
    show: allManagerRoles,
  },
  {
    name: "My Certificates",
    icon: "far fa-file-certificate",
    path: Routes.CERTIFICATES,
    show: allLearnerRoles,
  },
  {
    name: "My Profile",
    icon: "far fa-user-alt",
    path: Routes.PROFILE,
    show: allRoles,
  },
  {
    name: "Training Matrix",
    icon: "fas fa-th-list",
    path: Routes.MATRIX,
    show: allRoles,
  },
];

export { menuLinks };
