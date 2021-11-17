import React, { useState } from "react";
import PropTypes from "prop-types";
import { withContext } from "Context";
import { signInSuccessAction } from "Actions/authActions";
import { PageMetaTags } from "Common";
import { Link, useHistory } from "react-router-dom";
import { Col, Form, Input, notification, Row, Button } from "antd";
import { loginUser } from "../../../../services/user";
import "./index.less";

const LoginForm = ({ signInSuccess }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  return (
    <React.Fragment>
      <PageMetaTags title="Login" />
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
                    {/* <img
                      className="m-auto"
                      src={require("Assets/images/logo-small.png")}
                      alt="logo"
                    /> */}
                    <div class="text-block-8">
                      <span class="text-span">ARCH</span> SHELF
                    </div>
                  </figure>
                  <h1 className="page-heading">Login</h1>
                  <Form
                    onFinish={(values) => {
                      setLoading(true);

                      loginUser({ body: values })
                        .then((res) => {
                          notification.success({ message: "Login successful" });
                          setLoading(false);
                          localStorage.setItem("accessToken", res.accessToken);
                          signInSuccess(res.user);
                          history.push("/dashboard");
                        })
                        .catch((err) => {
                          setLoading(false);
                          if (err && err.status === 401) {
                            notification.error({ message: err.data.message });
                          } else {
                            notification.error({ message: "Failed to login" });
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
                        <Input type="text" placeholder="Username" />
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
                        <Input type="password" placeholder="Password" />
                      </Form.Item>
                    </div>

                    <div style={{ width: "100%" }} className="form-footer ">
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={loading}
                        className="button-style-fullwidth-button"
                      >
                        {loading ? "Loading..." : "Login"}
                      </Button>
                    </div>
                  </Form>
                  <Link to="/forgot-password" className="forget-link">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};

LoginForm.propTypes = {
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
  LoginForm
);
