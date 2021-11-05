import React, { useState } from "react";
import PropTypes from "prop-types";
import { withContext } from "Context";
import { PageMetaTags } from "Common";
import { signInSuccessAction } from "Actions/authActions";
import { Link, useHistory } from "react-router-dom";
import { Form, notification } from "antd";
import { loginUser, updatePassword } from "../../../../services/user";
import { getPageQuery } from "../../../../utils/apiUtils";

const PasswordUpdate = ({ signInSuccess }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const query = getPageQuery();
  if (!query.token && !query.email) {
    history.push("/login");
  }

  return (
    <React.Fragment>
      <PageMetaTags title="Forgot Password" />
      <section className="login-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={require("Assets/images/login-image.jpg")} alt="login" />
            </div>
            <div className="col-md-6">
              <div className="login-holder">
                <div className="login-inner text-center">
                  <figure>
                    <img
                      className="m-auto"
                      src={require("Assets/images/logo-small.png")}
                      alt="logo"
                    />
                  </figure>
                  <h1 className="page-heading">Reset Password</h1>
                  <h4 className="">{query.email}</h4>
                  <Form
                    onFinish={(values) => {
                      setLoading(true);
                      updatePassword({
                        body: {
                          ...values,
                          passwordToken: query.token,
                          email: query.email,
                        },
                      })
                        .then(() => {
                          loginUser({
                            body: {
                              email: query.email,
                              password: values.password,
                            },
                          })
                            .then((res) => {
                              notification.success({
                                message: "Login successful",
                              });
                              setLoading(false);
                              localStorage.setItem(
                                "accessToken",
                                res.access_token
                              );
                              signInSuccess(res.user);
                              history.push("/");
                            })
                            .catch((err) => {
                              setLoading(false);
                              if (err && err.status === 401) {
                                notification.error({
                                  message: err.data.message,
                                });
                              } else {
                                notification.error({
                                  message: "Failed to login",
                                });
                              }
                            })
                            .finally(() => setLoading(false));
                        })
                        .catch((err) => {
                          setLoading(false);
                          if (
                            (err && err.status === 422) ||
                            (err.data && err.data.message)
                          ) {
                            notification.error({ message: err.data.message });
                          } else {
                            notification.error({
                              message: "Failed to reset password",
                            });
                          }
                        })
                        .finally(() => setLoading(false));
                    }}
                    autoComplete="off"
                  >
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
                    <div className="form-group-custom">
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
                    </div>
                    <div className="form-footer">
                      <input
                        type="submit"
                        disabled={loading}
                        className="button-style button-style-green-btm button-style-fullwidth-button"
                        value={loading ? "Loading..." : "Reset Password"}
                      />
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
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

PasswordUpdate.propTypes = {
  signInSuccess: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([, dispatch]) => ({
    // actions
    signInSuccess: (data) => signInSuccessAction(data, dispatch),
  }),
  PasswordUpdate
);
