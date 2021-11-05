import { defaults } from "./default";

const testimonial = {
  addTestimonial: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/testimonials/add",
    },
  },
  getTestimonials: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/testimonials",
    },
  },
  getTestimonial: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/testimonials/:id",
    },
  },
  deleteTestimonial: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/testimonials/:id",
    },
  },
  updateTestimonial: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/testimonials/:id",
    },
  },
  deleteTestimonialImage: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/testimonials/image/:id",
    },
  },
};

export default testimonial;
