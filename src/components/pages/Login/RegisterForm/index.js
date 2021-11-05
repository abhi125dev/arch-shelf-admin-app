import React, { useState } from "react";
import { PageMetaTags } from "Common";
import { Link, useHistory } from "react-router-dom";
import { Form, notification, Row, Col, Button } from "antd";
import { registerUser } from "../../../../services/user";

const RegisterForm = ({ signUpSuccess = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  return (
    <React.Fragment>
      <PageMetaTags title="Register" />
      <section className="login-wrapper">
        <div className="container mx-auto">
          <Row>
            <Col md={12}>
              <img src={require("Assets/images/login-image.jpg")} alt="login" />
            </Col>
            <Col md={12}>
              <div className="login-holder">
                <div className="login-inner text-center">
                  <figure>
                    <img
                      className="m-auto"
                      src={require("Assets/images/logo-small.png")}
                      alt="logo"
                    />
                  </figure>
                  <h1 className="page-heading">Register</h1>
                  <Form
                    onFinish={(values) => {
                      const payload = values;
                      delete payload.password_confirmation;
                      setLoading(true);
                      registerUser({ body: payload })
                        .then((res) => {
                          setLoading(false);
                          notification.success({
                            message: "Register successful",
                          });
                          history.push("/login");
                        })
                        .catch((err) => {
                          setLoading(false);
                          if (err && err.status === 422) {
                            notification.error({
                              message: Object.keys(err.data)
                                .map((key) => err.data[key][0])
                                .join(" "),
                            });
                          } else {
                            notification.error({
                              message: "Failed to register your account.",
                            });
                          }
                        });
                    }}
                    autoComplete="off"
                  >
                    <div className="form-group-custom">
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your name",
                          },
                        ]}
                      >
                        <input
                          type="text"
                          placeholder="Name"
                          className="input-style"
                        />
                      </Form.Item>
                    </div>
                    <div className="form-group-custom">
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your email",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email",
                          },
                        ]}
                      >
                        <input
                          type="email"
                          placeholder="Email"
                          className="input-style"
                        />
                      </Form.Item>
                    </div>
                    <div className="form-group-custom">
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your password",
                          },
                        ]}
                      >
                        <input
                          type="password"
                          className="input-style"
                          placeholder="Password"
                        />
                      </Form.Item>
                    </div>
                    {/* <div className="form-group-custom">
                      <Form.Item
                        name="password_confirmation"
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  "The two passwords that you entered do not match!"
                                )
                              );
                            },
                          }),
                        ]}
                      >
                        <input
                          type="password"
                          className="input-style"
                          placeholder="Confirm Password"
                        />
                      </Form.Item>
                    </div> */}

                    <div className="form-footer">
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={loading}
                        className="button-style-fullwidth-button"
                      >
                        {loading ? "Loading..." : "Sign up"}
                      </Button>
                      <span className="text-divider">Or</span>
                      <Link
                        to="/login"
                        className="button-style button-style-gray-btm button-style-fullwidth-button"
                      >
                        Login
                      </Link>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};

// RegisterForm.propTypes = {
//   match: PropTypes.object.isRequired,
//   signUpSuccess: PropTypes.func.isRequired,
// };

// export default withContext(
// 	([, dispatch]) => ({
// 		// actions
// 		signUpSuccess: data => signUpSuccessAction(data, dispatch),
// 	}),
// 	RegisterForm,
// )

export default RegisterForm;
