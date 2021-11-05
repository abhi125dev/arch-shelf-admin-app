import React, { useState } from "react";
import PropTypes from "prop-types";
import { withContext } from "Context";
import { signInSuccessAction } from "Actions/authActions";
import { PageMetaTags } from "Common";
import { Link, useHistory } from "react-router-dom";
import { Col, Form, notification, Row } from "antd";
import { forgotPassword } from "../../../../services/user";

const ForgotPassword = ({ signInSuccess }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [form] = Form.useForm();

  return (
    <React.Fragment>
      <PageMetaTags title="Forgot Password" />
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
                  <h1 className="page-heading">Forgot Password</h1>

                  <Form
                    form={form}
                    onFinish={(values) => {
                      setLoading(true);
                      forgotPassword({ body: values })
                        .then((res) => {
                          setLoading(false);
                          // form.resetFields();
                          // history.replace("/update-password");
                          history.push(
                            `/update-password?token=${res.token}&email=${values.email}`
                          );
                          notification.success({
                            message:
                              "The password update link successfully sent!",
                          });
                        })
                        .catch((err) => {
                          setLoading(false);
                          if (err && err.data && err.data.message) {
                            notification.error({
                              message: err.data.message,
                            });
                          } else {
                            notification.error({
                              message: "Failed to send reset password link",
                            });
                          }
                        })
                        .finally(() => setLoading(false));
                    }}
                    autoComplete="off"
                  >
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
                    <div className="form-footer">
                      <input
                        type="submit"
                        disabled={loading}
                        className="button-style button-style-green-btm button-style-fullwidth-button"
                        value={loading ? "Loading..." : "Submit"}
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
            </Col>
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};

ForgotPassword.propTypes = {
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
  ForgotPassword
);
