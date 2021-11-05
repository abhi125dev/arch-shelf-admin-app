import { callApi } from "../utils/apiUtils";
import testimonial from "./endpoints/testimonial";

export const addTestimonial = ({ body }) =>
  callApi({ uriEndPoint: testimonial.addTestimonial.v1, body });

export const getTestimonials = () =>
  callApi({ uriEndPoint: testimonial.getTestimonials.v1 });

export const getTestimonial = ({ pathParams }) =>
  callApi({ uriEndPoint: testimonial.getTestimonial.v1, pathParams });

export const deleteTestimonial = ({ pathParams }) =>
  callApi({ uriEndPoint: testimonial.deleteTestimonial.v1, pathParams });

export const updateTestimonial = ({ pathParams, body }) =>
  callApi({ uriEndPoint: testimonial.updateTestimonial.v1, body, pathParams });

export const deleteTestimonialImage = ({ pathParams }) =>
  callApi({ uriEndPoint: testimonial.deleteTestimonialImage.v1, pathParams });
