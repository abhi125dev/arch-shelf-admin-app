import React, { useEffect, useState } from "react";
import { PageMetaTags } from "Common";
import { useHistory, Link, useParams } from "react-router-dom";
import { withContext } from "Context";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Popconfirm,
  notification,
  Breadcrumb,
  message,
  Upload,
} from "antd";
import {
  addTestimonial,
  getTestimonial,
  updateTestimonial,
  deleteTestimonialImage,
} from "../../../../services/testimonial";

const AddTestimonial = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;
  const history = useHistory();
  const [previewImage, setPreviewImage] = useState();
  const [contentList, setContentList] = useState();
  const [fileList, setFileList] = useState();
  const [hideUpload, setHideUpload] = useState(false);

  const { id } = useParams();
  // to open popup and review the image
  const handlePreview = (fileList) => {
    setPreviewImage(URL.createObjectURL(fileList));
  };

  useEffect(() => {
    if (contentList) {
      handlePreview(contentList);
      setHideUpload(true);
    }
  }, [contentList]);

  useEffect(() => {
    if (id) {
      getTestimonial({ pathParams: { id: id } }).then((res) => {
        form.setFieldsValue({ name: res[0].name, testimonial: res[0].reviews });
        setFileList(res[0].media.url);
        setPreviewImage(res[0].media.url);
        setHideUpload(true);
      });
    }
  }, [id]);
  // file convert to base 64
  const toBase64 = (encodedFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(encodedFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const deleteImage = () => {
    deleteTestimonialImage({ pathParams: { id: id } });
  };

  function confirm(rec) {
    message.success(`Image deleted`);
    setFileList("");
    setHideUpload(false);
  }
  return (
    <div className="content-panel">
      <PageMetaTags title="Testimonials" />
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/testimonials">Testimonials</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{id ? "Edit" : "Add"} Testimonial</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-between">
        <h1 className="page-heading">Testimonials</h1>
      </div>
      <div className="bg-white">
        <div className="mx-8 py-4">
          <Form
            form={form}
            layout="vertical"
            hideRequiredMark
            onFinish={(values) => {
              setLoading(true);
              const body = {
                name: values.name,
                testimonial: values.testimonial,
              };
              const bodyFormData = new FormData();
              bodyFormData.append("name", body.name);
              bodyFormData.append("testimonial", body.testimonial);
              bodyFormData.append("media", contentList);
              if (id) {
                updateTestimonial({
                  body: bodyFormData,
                  pathParams: {
                    id: id,
                  },
                })
                  .then((res) => {
                    setLoading(false);
                    notification.success({
                      message: "Testimonial updated successfully",
                    });
                    history.push("/testimonials");
                  })
                  .catch((err) => {
                    setLoading(false);
                    if (err && err.status === 400) {
                      notification.error({
                        message: "Failed to update testimonial",
                      });
                    } else {
                      notification.error({
                        message: `${err.data.error.message}`,
                      });
                    }
                  });
              } else {
                addTestimonial({ body: bodyFormData })
                  .then((res) => {
                    console.log(`res`, res);
                    setLoading(false);
                    notification.success({
                      message: "Testimonial added successfully",
                    });
                    history.push("/testimonials");
                  })
                  .catch((err) => {
                    setLoading(false);
                    if (err && err.status === 400) {
                      notification.error({
                        message: "Failed to add testimonial",
                      });
                    } else {
                      notification.error({
                        message: `${err.data.error.message}`,
                      });
                    }
                  });
              }
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="name"
                  label={<p className="font-medium text-gray-800">Name</p>}
                  rules={[
                    {
                      required: true,
                      message: "Name is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="testimonial"
                  label={
                    <p className="font-medium text-gray-800">Testimonial</p>
                  }
                >
                  <TextArea size="large" placeholder="Enter your review" />
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="font-medium text-gray-800 mb-2">Image</div>
                <div>
                  {fileList ? (
                    <div className="wrapper">
                      {previewImage && (
                        <img
                          alt="previewImage"
                          src={previewImage}
                          className="mb- object-cover"
                        />
                      )}
                      <div className="delete">
                        <div
                          className="w-8 h-8 rounded-full flex justify-center space-x-4 mb-2"
                          // style={{
                          //   backgroundColor: "#16975f",
                          //   color: "white",
                          //   cursor: "pointer",
                          // }}
                        >
                          <Popconfirm
                            placement="right"
                            title="Are you sure, you want to delete"
                            onConfirm={() => {
                              confirm(fileList);
                              deleteImage();
                            }}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              // onClick={() => confirm(fileList)}
                              icon={<DeleteOutlined />}
                              shape="circle"
                              style={{
                                backgroundColor: "#16975f",
                                color: "white",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "stretch",
                              }}
                            ></Button>
                          </Popconfirm>
                          {id && (
                            <Upload
                              accept=".jpg, .jpeg, .png"
                              // convert file size, generate id, convert file to base64, await & promise
                              beforeUpload={async (uploadContent) => {
                                console.log(`uploadContent`, uploadContent);
                                await toBase64(uploadContent)
                                  .then((response) => {
                                    const obj = {
                                      document: response,
                                      id: Math.floor(
                                        Math.random() * (999 - 0) + 0
                                      ),
                                      name: uploadContent.name,
                                    };
                                    setFileList(obj, fileList);
                                    setContentList(uploadContent, contentList);
                                  })
                                  .catch(() => {});
                                return false;
                              }}
                              fileList={[]}
                            >
                              {/* file upload button  */}
                              <Button
                                icon={<EditOutlined />}
                                shape="circle"
                                style={{
                                  backgroundColor: "#16975f",
                                  color: "white",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "stretch",
                                }}
                              ></Button>
                            </Upload>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    hideUpload
                      ? `hidden`
                      : `p-8 rounded-md border-dashed border-2 flex justify-around items-center flex-col md:border-gray-100 border-opacity-75 mb-8`
                  }
                >
                  <Upload
                    accept=".jpg, .jpeg, .png"
                    // convert file size, generate id, convert file to base64, await & promise
                    beforeUpload={async (uploadContent) => {
                      console.log(`uploadContent`, uploadContent);
                      await toBase64(uploadContent)
                        .then((response) => {
                          const obj = {
                            document: response,
                            id: Math.floor(Math.random() * (999 - 0) + 0),
                            name: uploadContent.name,
                          };
                          setFileList(obj, fileList);
                          setContentList(uploadContent, contentList);
                        })
                        .catch(() => {});
                      return false;
                    }}
                    fileList={[]}
                  >
                    {/* file upload button  */}
                    <Button
                      icon={<UploadOutlined />}
                      shape="circle"
                      style={{
                        backgroundColor: "#16975f",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                      }}
                    ></Button>
                  </Upload>
                  <div className="text-gray-800">Add {id && "new"} image</div>
                </div>
              </Col>
            </Row>
            <div className="flex justify-end mt-4">
              <Button type="primary" htmlType="submit" disabled={loading}>
                {id ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

AddTestimonial.propTypes = {
  getCategories: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user }]) => ({
    user,
  }),
  AddTestimonial
);
