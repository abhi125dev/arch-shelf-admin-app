/* eslint-disable no-unused-vars */
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
  Tooltip,
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { addFeed } from "../../services/blog";
import PropTypes from "prop-types";
import { withContext } from "Context";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { getCategoriesAction } from "Actions/categoryActions";
import { getCategories } from "../../services/category";
import { getLinks } from "../../utils/index";
import { getFeed, updateFeed, deleteFeedImage } from "../../services/blog";
import { getFeedAction } from "Actions/feedActions";
import { Breadcrumb, Modal } from "antd";
import { PageMetaTags } from "Common";
import { Link } from "react-router-dom";
import "./index.scss";
import Editor from "./../Editor/index";

const FeedForm = ({
  user,
  getCategoryFunc,
  categories,
  pageType,
  pageName,
  allPageUrl,
  getFeedFunc,
  feeds,
}) => {
  const { Option } = Select;
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [editorBody, setEditorBody] = useState("");
  const [previewImage, setPreviewImage] = useState();
  const [contentList, setContentList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState();

  const feedId = useParams().id;

  useEffect(() => {
    const body = {
      categoryType: pageType,
    };
    getCategories({ query: body })
      .then((res) => {
        getCategoryFunc(res.categories);
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
            message: "Failed to get categories",
          });
        }
      });
  }, [user]);

  useEffect(() => {
    if (feedId) {
      getFeed({
        pathParams: { id: feedId },
      })
        .then((res) => {
          getFeedFunc(res.data);
          setFileList(res.data.media);
          setPreviewImage(res.data.media);
        })
        .catch((err) => {
          if (err && err.status === 422) {
            notification.error({
              message: Object.keys(err.data)
                .map((key) => err.data[key][0])
                .join(" "),
            });
          } else {
            // notification.error({
            //   message: "Failed to get feed",
            // });
          }
        });
    }
  }, [user, feedId]);

  const handlePreview = (item) => {
    setPreviewVisible(true);
    if (feedId) {
      setPreviewImage(item);
    } else setPreviewImage(URL.createObjectURL(item));
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const deleteImage = (url) => {
    deleteFeedImage({ pathParams: { id: feedId }, body: { url } }).then(
      (res) => {
        setFileList(res.data.media);
      }
    );
  };

  // file convert to base 64
  const toBase64 = (encodedFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(encodedFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  function confirm(rec) {
    setFileList(fileList.filter((files, index) => index !== rec));
    setContentList(contentList.filter((files, index) => index !== rec));
    message.success(`Image deleted`);
  }

  useEffect(() => {
    if (feeds && feeds.feedDetail && feedId === feeds.feedDetail._id) {
      const values = feeds.feedDetail;
      setEditorBody(values.body);
      form.setFieldsValue({
        blogCategory: values ? values._id && values.category._id : "",
        blogName: values ? values.title : "",
        url: values ? values.url : "",
        shortDescription: values ? values.shortDescription : "",
      });
    }
  }, [feedId, user, feeds, form]);

  return (
    <div className="profile-wrapper">
      <PageMetaTags title={feedId ? `Edit ${pageName}` : `Add ${pageName}`} />
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={allPageUrl}>{pageName}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {feedId ? `Edit ${pageName}` : `Add ${pageName}`}
        </Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="page-heading">
        {feedId ? `Edit ${pageName}` : `Add ${pageName}`}
      </h1>
      <Skeleton loading={getLoading}>
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={(values) => {
            setLoading(true);
            const body = {
              title: values.blogName,
              category: values.blogCategory,
              shortDescription: values.shortDescription,
              body: editorBody,
              // url: values.url,
              type: pageType,
            };
            const bodyFormData = new FormData();
            bodyFormData.append("title", body.title);
            bodyFormData.append("category", body.category);
            bodyFormData.append("shortDescription", body.shortDescription);
            bodyFormData.append("body", editorBody);
            // bodyFormData.append("url", body.url);
            bodyFormData.append("type", pageType);
            // bodyFormData.append("media", contentList);
            contentList.map((item) => bodyFormData.append(item.name, item));
            if (feedId) {
              updateFeed({ body: bodyFormData, pathParams: { id: feedId } })
                .then((res) => {
                  setLoading(false);
                  notification.success({
                    message: `blog updated successfully`,
                  });
                  history.push(getLinks(pageType));
                })
                .catch((err) => {
                  setLoading(false);
                  if (err && err.status === 400) {
                    notification.error({
                      message: "Failed to update blog",
                    });
                  } else {
                    notification.error({
                      message: `${err.data.error.message}`,
                    });
                  }
                });
            } else {
              addFeed({ body: bodyFormData })
                .then((res) => {
                  if (res.data._id) {
                    setLoading(false);
                    notification.success({
                      message: `blog added successfully`,
                    });
                    history.push(getLinks(pageType));
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  if (err && err.status === 400) {
                    notification.error({
                      message: "Failed to add feed",
                    });
                  } else {
                    if (!body.category) {
                      notification.error({
                        message: "Please add the category first.",
                      });
                    }
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
                name="blogName"
                label={<p className="font-medium text-gray-800">Name</p>}
                rules={[
                  {
                    required: true,
                    message: `Name is required`,
                  },
                ]}
              >
                <Input size="large" placeholder={`Enter name`} />
              </Form.Item>
            </Col>
            {Array.isArray(categories.categoryList) &&
              categories.categoryList.length > 0 && (
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    name="blogCategory"
                    label={
                      <p className="font-medium text-gray-800">Category</p>
                    }
                    rules={[
                      {
                        required: true,
                        message: `Category is required`,
                      },
                    ]}
                  >
                    <Select size="large" placeholder={`Select category`}>
                      {categories.categoryList.map((item) => (
                        <Option key={item._id} value={item._id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              )}
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="shortDescription"
                label={
                  <p className="font-medium text-gray-800">Short description</p>
                }
              >
                <Input size="large" placeholder="Enter short description" />
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="url"
                label={<p className="font-medium text-gray-800">Link</p>}
                rules={[{ type: "url", message: `Please enter valid url` }]}
              >
                <Input size="large" placeholder="Enter url" />
              </Form.Item>
            </Col> */}
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className="font-medium text-gray-800 mb-2">Attachment</div>
              <div>
                {fileList ? (
                  <div className="wrapper" style={{ width: "20%" }}>
                    <div className="delete">
                      <div className="w-8 h-8 rounded-full flex justify-center space-x-4 mb-2">
                        {feedId && (
                          <Upload
                            accept=".jpg, .jpeg, .png"
                            type="drag"
                            multiple
                            style={{ border: 0 }}
                            // convert file size, generate feedId, convert file to base64, await & promise
                            beforeUpload={async (uploadContent) => {
                              await toBase64(uploadContent)
                                .then((response) => {
                                  const obj = {
                                    document: response,
                                    name: uploadContent.name,
                                  };
                                  // setFileList(obj, fileList);
                                  // setContentList(uploadContent, contentList);
                                  setFileList((prevState) => [
                                    ...prevState,
                                    obj,
                                  ]);
                                  setContentList((prevState) => [
                                    ...prevState,
                                    uploadContent,
                                  ]);
                                })
                                .catch(() => {});
                              return false;
                            }}
                            fileList={[]}
                          >
                            {/* file upload button  */}
                            {/* <Button
                              icon={<EditOutlined />}
                              onSelect={() => deleteImage()}
                              shape="circle"
                              style={{
                                backgroundColor: "#16975f",
                                color: "white",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "stretch",
                              }}
                            ></Button> */}
                          </Upload>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
              >
                <iframe
                  title="model"
                  src={previewImage}
                  style={{ width: "100%", height: 500 }}
                  // type="application/pdf"
                />
              </Modal>
              <div className="">
                {fileList.length > 0
                  ? fileList.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between p-2 border-b"
                      >
                        <div className="flex">
                          <div>
                            <Tooltip placement="topLeft" title={item.name}>
                              <div className="font-normal text-sm font-medium text-gray-500 lg:w-full w-40 truncate">
                                {item.name}
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                        <div className="flex">
                          {feedId ? (
                            <div className="flex">
                              <div
                                className="w-8 h-8 rounded-full flex justify-center flex-col"
                                onClick={() => handlePreview(item.url)}
                                style={{
                                  backgroundColor: "#1890ff",
                                  color: "white",
                                  cursor: "pointer",
                                  marginRight: 10,
                                }}
                              >
                                <EyeOutlined />
                              </div>
                              <Popconfirm
                                placement="right"
                                title="Are you sure, you want to delete"
                                onConfirm={() => {
                                  deleteImage(item.url);
                                }}
                              >
                                <Button
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
                            </div>
                          ) : (
                            <div className="flex">
                              <div
                                className="w-8 h-8 rounded-full flex justify-center flex-col"
                                onClick={() =>
                                  handlePreview(contentList[index])
                                }
                                style={{
                                  backgroundColor: "#1890ff",
                                  color: "white",
                                  cursor: "pointer",
                                  marginRight: 10,
                                }}
                              >
                                <EyeOutlined />
                              </div>
                              <Popconfirm
                                placement="right"
                                title="Are you sure, you want to delete"
                                onConfirm={() => {
                                  confirm(index);
                                }}
                              >
                                <Button
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
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
              <div
                className={`p-8 rounded-md border-dashed border-2 flex justify-around items-center flex-col md:border-gray-100 border-opacity-75 mb-8`}
              >
                <Upload
                  accept=".jpg, .jpeg, .png"
                  type="drag"
                  multiple
                  style={{ border: 0 }}
                  // convert file size, generate feedId, convert file to base64, await & promise
                  beforeUpload={async (uploadContent) => {
                    await toBase64(uploadContent)
                      .then((response) => {
                        const obj = {
                          document: response,
                          name: uploadContent.name,
                        };
                        // setFileList(obj, fileList);
                        // setContentList(uploadContent, contentList);
                        setFileList((prevState) => [...prevState, obj]);
                        setContentList((prevState) => [
                          ...prevState,
                          uploadContent,
                        ]);
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
              feedId={feedId}
              setEditorBody={setEditorBody}
              feedDetail={feeds && feeds.feedDetail && feeds.feedDetail.body}
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
              {feedId
                ? `${loading ? "Updating..." : "Update"}`
                : `${loading ? "Adding..." : "Add"}`}
            </Button>
          </div>
        </Form>
      </Skeleton>
    </div>
  );
};

FeedForm.propTypes = {
  FeedForm: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user, categories, feeds }, dispatch]) => ({
    user,
    categories,
    feeds,
    getCategoryFunc: (data) => getCategoriesAction(data, dispatch),
    getFeedFunc: (data) => getFeedAction(data, dispatch),
  }),
  FeedForm
);
