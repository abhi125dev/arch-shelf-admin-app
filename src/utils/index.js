import _ from "lodash";
import moment from "moment";

export const scrollTo = (top, container = window) => {
  if (!container) {
    throw new Error("Container was not specified!");
  }
  container.scrollTo({
    top,
    behavior: "smooth",
  });
};

export const determineLastActivityLabel = (date) => {
  const currentDate = moment();
  const activeInDays = moment().diff(date, "days");
  return currentDate.isSame(moment(date), "day")
    ? "today"
    : `${activeInDays === 0 ? 1 : activeInDays} days ago`;
};

export const checkBoolDefaultFilters = (value) => {
  return value !== undefined ? Boolean(parseInt(value)) : undefined;
};

export const filterSubjectList = (subjects) => {
  const newSubjects = _.cloneDeep(subjects);

  return newSubjects
    .filter((item) => item.selected)
    .map((item) => {
      delete item.name;
      delete item.selected;

      return item;
    });
};

export const compare = (prop) => {
  return function(a, b) {
    const nameA = a[prop].toUpperCase();
    const nameB = b[prop].toUpperCase();
    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  };
};

export const reactToPdf = (url, onComplete) => {
  let iframe = document.createElement("iframe");
  iframe.setAttribute("src", url);
  iframe.setAttribute("height", "0");
  iframe.setAttribute("name", "for_print");
  iframe.setAttribute("id", "for_print");
  iframe.style.position = "absolute";

  const listener = ({ data }) => {
    if (data.exportReady === true) {
      window.frames["for_print"].focus();
      window.frames["for_print"].print();
      setTimeout(function() {
        const iframe = window.frames["for_print"];

        if (iframe) iframe.frameElement.remove();

        window.removeEventListener("message", listener);
        onComplete();
      }, 100);
    }
  };

  window.addEventListener("message", listener);
  document.body.appendChild(iframe);
};

export const getInitials = (name) => {
  if (name) {
    const fullname = name && name.split(" ");
    const firstname = fullname[0];
    const lastname = fullname[fullname.length - 1];
    return lastname !== firstname ? firstname[0] + lastname[0] : firstname[0];
  } else {
    return "";
  }
};

export const categoryTypes = () => {
  return [
    { id: "resources", value: "Resource" },
    { id: "products", value: "Product" },
    { id: "projects", value: "Project" },
    { id: "courses", value: "Course" },
    // { id: "competitions", value: "Competition" },
    // { id: "breakfasts", value: "Over Breakfast" },
  ];
};

export const getLinks = (type) => {
  switch (type) {
    case "resource":
      return "/resources";
    case "products":
      return "/products";
    case "projects":
      return "/projects";
    case "courses":
      return "/courses";
    case "competitions":
      return "/competitions";
    case "breakfasts":
      return "/breakfasts";
    default:
      return "/resources";
  }
};
