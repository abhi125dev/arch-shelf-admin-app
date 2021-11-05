/* eslint-disable no-unused-vars */
import {
  Button,
  Table,
  Input,
  Pagination,
  Row,
  Modal,
  Col,
  Form,
  notification,
  Popconfirm,
  message,
  Select,
  Breadcrumb,
  Tabs,
} from "antd";
import {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../../../services/category";
import { withContext } from "Context";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import SearchNotFound from "../../../assets/images/empty-search-contact.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getCategoriesAction } from "Actions/categoryActions";
import { PageMetaTags } from "../../common";
import { categoryTypes } from "../../../utils/index";

const Categories = ({ user, getCategoriesFunc, categories }) => {
  const categoriesTypeList = categoryTypes();
  const { TabPane } = Tabs;
  const { Search } = Input;
  const [form] = Form.useForm();
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [categoryModal, setCategoryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryRecord, setCategoryRecord] = useState({});
  const [type, setType] = useState("");
  const action = (value) => {
    setKeyword(value);
  };
  const { Option } = Select;
  const debounceSearch = debounce(action, 400);
  const confirm = (data) => {
    deleteCategory({ pathParams: { id: data } })
      .then((res) => {
        notification.success({
          message: "Category deleted successfully",
        });
        getAllCategories();
      })
      .catch((err) => {
        if (err && err.status === 400) {
          notification.error({
            message: "Failed to delete category",
          });
        } else {
          notification.error({
            message: `${err.data.error.message} please remove or change the blog category from feed.`,
          });
        }
      });
  };

  useEffect(() => {
    if (categoryModal) {
      if (categoryRecord) {
        form.setFieldsValue({
          categoryType: categoryRecord.categoryType,
          categoryName: categoryRecord.name,
        });
      }
    }
  }, [categoryRecord]);
  const columns = [
    {
      title: "Sr.no.",
      dataIndex: "srno",
      align: "center",
      key: "",
      width: 50,
      render: (_, __, index) => index + 1 + viewSize * (currentPage - 1),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (data) => <div>{data || "N/A"}</div>,
    },
    {
      title: "Created by",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (_, record) => (
        <div>{record.createdBy ? record.createdBy.name : "N/A"}</div>
      ),
    },
    {
      title: "Last updated by",
      dataIndex: "updatedBy",
      key: "updatedBy",
      render: (_, record) => (
        <div>{record.updatedBy ? record.updatedBy.name : "N/A"}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, record) => (
        <div className="flex space-x-4">
          <div
            className="space-x-4"
            onClick={() => {
              setType("Edit");
              setCategoryModal(true);
              setCategoryRecord(record);
            }}
          >
            <EditOutlined />
          </div>
          <div>
            <Popconfirm
              title="Are you sure delete this category?"
              onConfirm={() => confirm(record._id)}
            >
              <DeleteOutlined />
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  const getAllCategories = (value) => {
    const body = {
      categoryType: value ? value : "resources",
    };
    getCategories({ query: body })
      .then((res) => {
        getCategoriesFunc(res.categories);
      })
      .catch((err) => {
        setLoading(false);
        if (err && err.status === 400) {
          notification.error({
            message: "Failed to get categories",
          });
        } else {
          notification.error({
            message: `${err.data.error.message}`,
          });
        }
      });
  };

  useEffect(
    (value) => {
      getAllCategories(value);
    },
    [user]
  );

  return (
    <div className="content-panel">
      <PageMetaTags title="Categories" />
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Categories</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-between">
        <h1 className="page-heading">Categories</h1>
        <Button
          size="large"
          type="primary"
          onClick={() => setCategoryModal(true)}
        >
          Add category
        </Button>
      </div>

      <div className="profile-wrapper">
        {/* <div className="flex mb-4">
          <div className="w-full mt-4">
            <Search
              size="large"
              placeholder="Enter keyword here to search...."
              enterButton
              //   onChange={(value) => debounceSearch(value?.target?.value)}
            />
          </div>
        </div> */}
        <div className="w-full">
          <Tabs defaultActiveKey="1" onChange={(val) => getAllCategories(val)}>
            <TabPane tab="Resources" key="resources">
              <Table
                className="no-shadow zcp-fixed-w-table"
                rowClassName="cursor-pointer"
                pagination={false}
                columns={columns}
                dataSource={categories.categoryList || []}
                rowKey={(record) => record._id}
                loading=""
                locale={{
                  emptyText: (
                    <div className="flex items-center justify-center text-center">
                      <div>
                        <p className="text-lg">No categories yet!</p>
                        <img
                          className="ml-16 "
                          src={SearchNotFound}
                          alt="No categories found!"
                          style={{ height: "100px" }}
                        />
                      </div>
                    </div>
                  ),
                }}
              />
            </TabPane>
            <TabPane tab="Projects" key="projects">
              <Table
                className="no-shadow zcp-fixed-w-table"
                rowClassName="cursor-pointer"
                pagination={false}
                columns={columns}
                dataSource={categories.categoryList || []}
                rowKey={(record) => record._id}
                loading=""
                locale={{
                  emptyText: (
                    <div className="flex items-center justify-center text-center">
                      <div>
                        <p className="text-lg">No categories yet!</p>
                        <img
                          className="ml-16 "
                          src={SearchNotFound}
                          alt="No categories found!"
                          style={{ height: "100px" }}
                        />
                      </div>
                    </div>
                  ),
                }}
              />
            </TabPane>
            <TabPane tab="Courses" key="courses">
              <Table
                className="no-shadow zcp-fixed-w-table"
                rowClassName="cursor-pointer"
                pagination={false}
                columns={columns}
                dataSource={categories.categoryList || []}
                rowKey={(record) => record._id}
                loading=""
                locale={{
                  emptyText: (
                    <div className="flex items-center justify-center text-center">
                      <div>
                        <p className="text-lg">No categories yet!</p>
                        <img
                          className="ml-16 "
                          src={SearchNotFound}
                          alt="No categories found!"
                          style={{ height: "100px" }}
                        />
                      </div>
                    </div>
                  ),
                }}
              />
            </TabPane>
            <TabPane tab="Competitions" key="competitions">
              <Table
                className="no-shadow zcp-fixed-w-table"
                rowClassName="cursor-pointer"
                pagination={false}
                columns={columns}
                dataSource={categories.categoryList || []}
                rowKey={(record) => record._id}
                loading=""
                locale={{
                  emptyText: (
                    <div className="flex items-center justify-center text-center">
                      <div>
                        <p className="text-lg">No categories yet!</p>
                        <img
                          className="ml-16 "
                          src={SearchNotFound}
                          alt="No categories found!"
                          style={{ height: "100px" }}
                        />
                      </div>
                    </div>
                  ),
                }}
              />
            </TabPane>
            <TabPane tab="Over Breakfast" key="breakfasts">
              <Table
                className="no-shadow zcp-fixed-w-table"
                rowClassName="cursor-pointer"
                pagination={false}
                columns={columns}
                dataSource={categories.categoryList || []}
                rowKey={(record) => record._id}
                loading=""
                locale={{
                  emptyText: (
                    <div className="flex items-center justify-center text-center">
                      <div>
                        <p className="text-lg">No categories yet!</p>
                        <img
                          className="ml-16 "
                          src={SearchNotFound}
                          alt="No categories found!"
                          style={{ height: "100px" }}
                        />
                      </div>
                    </div>
                  ),
                }}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
      <Modal
        title={type === "Edit" ? "Edit category" : "Add category"}
        visible={categoryModal}
        onCancel={() => {
          setCategoryModal(false);
          setType("");
        }}
        footer={false}
      >
        <div>
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
              setLoading(true);
              const body = {
                name: values.categoryName,
                categoryType: values.categoryType,
              };
              if (type !== "Edit") {
                addCategory({ body })
                  .then((res) => {
                    setLoading(false);
                    notification.success({
                      message: "Category added successfully",
                    });
                    setCategoryModal(false);
                    form.resetFields();
                    getAllCategories();
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
                        message: "Failed to add category",
                      });
                    }
                  });
              } else {
                updateCategory({
                  body,
                  pathParams: {
                    id: categoryRecord._id,
                  },
                  user,
                })
                  .then((res) => {
                    setLoading(false);
                    notification.success({
                      message: "Category updated successfully",
                    });
                    setCategoryModal(false);
                    form.resetFields();
                    getAllCategories();
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
                        message: "Failed to add category",
                      });
                    }
                  });
              }
            }}
          >
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="categoryType"
                  label={
                    <p className="font-medium text-gray-800">Select type</p>
                  }
                >
                  <Select size="large" defaultValue="Resource">
                    {categoriesTypeList.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="categoryName"
                  label={<p className="font-medium text-gray-800">Category</p>}
                >
                  <Input placeholder="Enter category name" />
                </Form.Item>
              </Col>
            </Row>
            <div className="flex justify-end mt-4">
              <Button type="primary" htmlType="submit" disabled={loading}>
                {type === "Edit" ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

Categories.propTypes = {
  Categories: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user, categories }, dispatch]) => ({
    user,
    categories,
    getCategoriesFunc: (data) => getCategoriesAction(data, dispatch),
  }),
  Categories
);
