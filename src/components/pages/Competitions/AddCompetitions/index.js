import React, { useEffect, useState } from "react";
import {
  Form,
  Skeleton,
  Row,
  Col,
  Input,
  Select,
  Upload,
  Button,
  message,
  notification,
  Popconfirm,
  DatePicker,
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { addCompetition } from "../../../../services/competition";
import PropTypes from "prop-types";
import { withContext } from "Context";
import { useHistory, useParams } from "react-router-dom";
import {
  getCompetition,
  updateCompetition,
} from "../../../../services/competition";
import { Breadcrumb } from "antd";
import { PageMetaTags } from "Common";
import { Link } from "react-router-dom";
import Editor from "./../../../Editor/index";
import moment from "moment";

const AddCompetitions = ({ user, feeds }) => {
  const { Option } = Select;
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [editorBody, setEditorBody] = useState("");
  const [previewImage, setPreviewImage] = useState();
  const [contentList, setContentList] = useState();
  const [fileList, setFileList] = useState();
  const [hideUpload, setHideUpload] = useState(false);
  const [fetchCompetition, setFetchCompetition] = useState();
  const postId = useParams().id;

  useEffect(() => {
    if (postId) {
      getCompetition({
        pathParams: { id: postId },
      })
        .then((res) => {
          setFetchCompetition(res.data);
          setFileList(res.data.media[0].url);
          setPreviewImage(res.data.media[0].url);
          setHideUpload(true);
        })
        .catch((err) => {
          if (err && err.status === 400) {
            notification.error({
              message: "Failed to get competition",
            });
          } else {
            notification.error({
              message: `${err.data.error.message}`,
            });
          }
        });
    }
  }, [user, postId]);

  // to open popup and review the image
  const handlePreview = (fileList) => {
    setPreviewImage(URL.createObjectURL(fileList));
  };

  // const deleteImage = () => {
  //   deleteFeedImage({ pathParams: { id: postId } });
  // };

  useEffect(() => {
    if (contentList) {
      handlePreview(contentList);
      setHideUpload(true);
    }
  }, [contentList]);

  // file convert to base 64
  const toBase64 = (encodedFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(encodedFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  function confirm(rec) {
    message.success(`Image deleted`);
    setFileList("");
    setHideUpload(false);
  }

  useEffect(() => {
    if (fetchCompetition && fetchCompetition._id === postId) {
      const values = fetchCompetition;
      setEditorBody(values.body);
      form.setFieldsValue({
        status: values ? values.status : "",
        title: values ? values.title : "",
        price: values ? values.price : "",
        organizer: values ? values.organizer : "",
        startDay: values ? moment(values.startDay) : "",
        submissionDate: values ? moment(values.submissionDate) : "",
      });
    }
  }, [postId, user, fetchCompetition, form]);

  function disabledDate(current) {
    return current && current < moment().endOf("day");
  }
  return (
    <>
      <div className="content-panel">
        <div className="profile-wrapper">
          <PageMetaTags
            title={postId ? `Edit competition` : `Add competition`}
          />
          <Breadcrumb style={{ marginBottom: 20 }}>
            <Breadcrumb.Item>
              <Link to="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/competitions">Competition</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {postId ? `Edit competition` : `Add competition`}
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-heading">
            {postId ? `Edit competition` : `Add competition`}
          </h1>
          <Skeleton loading={getLoading}>
            <Form
              form={form}
              layout="vertical"
              hideRequiredMark
              onFinish={(values) => {
                setLoading(true);
                const body = {
                  title: values.title,
                  status: values.status,
                  organizer: values.organizer,
                  price: values.price,
                  startDay: values.startDay.toISOString(),
                  submissionDate: values.submissionDate.toISOString(),
                  body: editorBody,
                };
                const bodyFormData = new FormData();
                bodyFormData.append("title", body.title);
                bodyFormData.append("status", body.status);
                bodyFormData.append("organizer", body.organizer);
                bodyFormData.append("body", editorBody);
                bodyFormData.append("price", body.price);
                bodyFormData.append("startDay", body.startDay);
                bodyFormData.append("submissionDate", body.submissionDate);
                bodyFormData.append("media", contentList);
                if (postId) {
                  updateCompetition({
                    body: bodyFormData,
                    pathParams: { id: postId },
                  })
                    .then((res) => {
                      setLoading(false);
                      notification.success({
                        message: `Competition updated successfully`,
                      });
                      history.push("/competitions");
                    })
                    .catch((err) => {
                      setLoading(false);
                      if (err && err.status === 400) {
                        notification.error({
                          message: "Failed to update competition",
                        });
                      } else {
                        notification.error({
                          message: `${err.data.error.message}`,
                        });
                      }
                    });
                } else {
                  addCompetition({ body: bodyFormData })
                    .then((res) => {
                      if (res.data._id) {
                        setLoading(false);
                        notification.success({
                          message: `Competition added successfully`,
                        });
                        history.push("/competitions");
                      }
                    })
                    .catch((err) => {
                      setLoading(false);
                      if (err && err.status === 400) {
                        notification.error({
                          message: "Failed to add competition",
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
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    name="title"
                    label={<p className="font-medium text-gray-800">Title</p>}
                    rules={[
                      {
                        required: true,
                        message: `Title is required`,
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter title" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    name="status"
                    label={<p className="font-medium text-gray-800">Status</p>}
                    rules={[
                      {
                        required: true,
                        message: `Status is required`,
                      },
                    ]}
                  >
                    <Select size="large" placeholder="Select status">
                      <Option value="Open">Open</Option>
                      <Option value="Closed">Closed</Option>
                      <Option value="Current">Current</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    name="startDay"
                    label={
                      <p className="font-medium text-gray-800">Start day</p>
                    }
                    rules={[
                      {
                        required: true,
                        message: `Start date is required`,
                      },
                    ]}
                  >
                    <DatePicker
                      disabledDate={disabledDate}
                      size="large"
                      style={{ width: "100%" }}
                      showTime={{ format: "HH:mm:ss" }}
                      allowClear
                      format="DD/MM/YYYY HH:mm:ss"
                      placeholder="Enter start date"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    name="submissionDate"
                    label={
                      <p className="font-medium text-gray-800">
                        Submission date
                      </p>
                    }
                    rules={[
                      {
                        required: true,
                        message: `Submission date is required`,
                      },
                    ]}
                  >
                    <DatePicker
                      disabledDate={disabledDate}
                      size="large"
                      style={{ width: "100%" }}
                      showTime={{ format: "HH:mm:ss" }}
                      allowClear
                      format="DD/MM/YYYY HH:mm:ss"
                      placeholder="Enter submission date"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    name="organizer"
                    label={
                      <p className="font-medium text-gray-800">Organizer</p>
                    }
                    rules={[
                      {
                        required: true,
                        message: `Organizer name is required`,
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter organizer name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    name="price"
                    label={<p className="font-medium text-gray-800">Price</p>}
                    rules={[
                      {
                        required: true,
                        message: `Price is required`,
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="number"
                      placeholder="Enter price"
                    />
                  </Form.Item>
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div className="font-medium text-gray-800 mb-2">
                    Attachment
                  </div>
                  <div>
                    {fileList ? (
                      <div className="wrapper">
                        {previewImage && (
                          <img
                            alt="previewImage"
                            src={previewImage}
                            className="mb-2"
                          />
                        )}
                        <div className="delete">
                          <div className="w-8 h-8 rounded-full flex justify-center space-x-4 mb-2">
                            <Popconfirm
                              placement="right"
                              title="Are you sure, you want to delete"
                              onConfirm={() => {
                                confirm(fileList);
                                // deleteImage();
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                // onClick={() => {
                                //   confirm(fileList);
                                //   deleteImage();
                                // }}
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
                            {postId && (
                              <Upload
                                accept=".jpg, .jpeg, .png"
                                multiple
                                // convert file size, generate id, convert file to base64, await & promise
                                beforeUpload={async (uploadContent) => {
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
                                      setContentList(
                                        uploadContent,
                                        contentList
                                      );
                                    })
                                    .catch(() => {});
                                  return false;
                                }}
                                fileList={[]}
                              >
                                {/* file upload button  */}
                                <Button
                                  icon={<EditOutlined />}
                                  // onSelect={() => deleteImage()}
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
                      type="drag"
                      style={{ border: 0 }}
                      // convert file size, generate postId, convert file to base64, await & promise
                      beforeUpload={async (uploadContent) => {
                        await toBase64(uploadContent)
                          .then((response) => {
                            const obj = {
                              document: response,
                              postId: Math.floor(Math.random() * (999 - 0) + 0),
                              name: uploadContent.name,
                              // size: fileSizeConvertor(uploadContent.size),
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
                      />
                    </Upload>
                    <div className="text-gray-800">Add Attachment</div>
                  </div>
                </Col>
              </Row>
              <div className="mt-8">
                <p className="font-medium text-gray-800">Description</p>
                <Editor
                  postId={postId}
                  setEditorBody={setEditorBody}
                  feedDetail={
                    feeds && feeds.feedDetail && feeds.feedDetail.body
                  }
                  editorBody={editorBody}
                />
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  disabled={loading}
                >
                  {postId
                    ? `${loading ? "Updating..." : "Update"}`
                    : `${loading ? "Adding..." : "Add"}`}
                </Button>
              </div>
            </Form>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

AddCompetitions.propTypes = {
  AddGHCAcademy: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user }]) => ({
    user,
  }),
  AddCompetitions
);
