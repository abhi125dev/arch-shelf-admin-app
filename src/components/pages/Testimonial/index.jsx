/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { PageMetaTags } from "Common";
import { debounce } from "lodash";
import { DeleteOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import SearchNotFound from "../../../assets/images/empty-search-contact.png";
import {
  Pagination,
  Row,
  Table,
  Input,
  Button,
  Breadcrumb,
  notification,
  Popconfirm,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  deleteTestimonial,
  getTestimonials,
} from "../../../services/testimonial";

const Testimonial = ({ user }) => {
  const { Search } = Input;
  const history = useHistory();
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [data, setData] = useState([]);

  const action = (value) => {
    setKeyword(value);
  };
  const debounceSearch = debounce(action, 400);

  const getAllTestimonials = () => {
    getTestimonials()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        if (err && err.status === 422) {
          notification.error({
            message: Object.keys(err.data)
              .map((key) => err.data[key][0])
              .join(" "),
          });
        } else {
          notification.error({
            message: "Failed to get testimonials",
          });
        }
      });
  };

  useEffect(() => {
    getAllTestimonials();
  }, [user]);

  const confirm = (data) => {
    deleteTestimonial({ pathParams: { id: data } })
      .then((res) => {
        notification.success({
          message: "Testimonial deleted successfully",
        });
        getAllTestimonials();
      })
      .catch((err) => {
        if (err && err.status === 422) {
          notification.error({
            message: Object.keys(err.data)
              .map((key) => err.data[key][0])
              .join(" "),
          });
        } else {
          notification.error({
            message: "Failed to delete testimonial",
          });
        }
      });
  };

  const edit = (data) => {
    // return <AddTestimonial data={data} type={"edit"} />;

    history.push("/testimonials/edit");
  };

  return (
    <div className="content-panel">
      <PageMetaTags title="Testimonials" />
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Testimonials</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-between">
        <h1 className="page-heading">Testimonials</h1>
        <div>
          <Button
            size="large"
            type="primary"
            onClick={(key) => history.push("/testimonials/add")}
          >
            Add testimonial
          </Button>
        </div>
      </div>

      <div className="profile-wrapper">
        <div className="w-full">
          <div
            className="grid justify-items-center profile-wrapper"
            style={{ padding: 20 }}
          >
            <div className="grid justify-items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-4 gap-4">
              {data && data.length > 0 ? (
                data.map((data) => (
                  <div
                    className="flex flex-col items-center justify-between bg-white p-4 shadow rounded-lg"
                    style={{ minWidth: "100%" }}
                  >
                    <div className="flex flex-start flex-col">
                      {data && data.media && data.media.url ? (
                        <div className="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40">
                          <img
                            src={data && data.media && data.media.url}
                            alt=""
                            className="h-full w-full"
                          />
                        </div>
                      ) : (
                        <UserOutlined
                          style={{ fontSize: "140px", color: "#08c" }}
                        />
                      )}
                      <br />
                      <div className="flex justify-center">
                        <h2 className="mt-4 font-bold text-xl">
                          {data ? data.name : "N/A"}
                        </h2>
                      </div>
                    </div>

                    <p className="break-all text-center mt-3">
                      {data ? data.reviews : "N/A"}
                    </p>
                    <div className="w-full flex justify-end space-x-3">
                      <Button
                        onClick={() =>
                          history.push(`/testimonials/edit/${data._id}`)
                        }
                        size="small"
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title="Are you sure delete this testimonial?"
                        onConfirm={() => confirm(data._id)}
                      >
                        <Button danger size="small">
                          Delete
                        </Button>
                      </Popconfirm>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center flex-col">
                  <p>No Testimonials found!</p>
                  <img
                    className="ml-16 "
                    src={SearchNotFound}
                    alt="No Testimonials found!"
                    style={{ height: "100px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
