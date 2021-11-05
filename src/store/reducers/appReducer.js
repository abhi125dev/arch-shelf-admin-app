import * as Types from "../types";

const appReducer = (app, action) => {
  switch (action.type) {
    case Types.APP_LOADED:
      return {
        ...app,
        loading: !app.loading,
      };
    case Types.SET_BREADCRUMBS:
      return {
        ...app,
        breadcrumbs: action.payload,
      };
    case Types.RESET_BREADCRUMBS:
      return {
        ...app,
        breadcrumbs: [],
      };
    case Types.OPEN_LEFT_NAV:
      return {
        ...app,
        openMenu: action.payload,
      };
    case Types.SET_EXPORT_TO_PDF:
      return {
        ...app,
        export_to_pdf: action.payload,
      };
    default:
      return app;
  }
};

export default appReducer;
