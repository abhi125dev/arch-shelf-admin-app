import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { UserOutlined, FieldTimeOutlined } from "@ant-design/icons";
import moment from "moment";
import { notification, Button, Tooltip, Row, Pagination } from "antd";
import PropTypes from "prop-types";
import { withContext } from "Context";
import { DeleteOutlined } from "@ant-design/icons";
import SearchNotFound from "../../../assets/images/empty-search-contact.png";
import {
  addDashboardFeed,
  getComments,
  deleteComment,
} from "../../../services/blog";
import { getCommentsAction } from "Actions/commentActions";

const CardDetails = ({ item, backLinks, user, getCommentsFunc, comments }) => {
  const history = useHistory();
  const { id } = useParams();
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = () => {
    const body = {
      feed: item._id,
    };
    addDashboardFeed({ body })
      .then((res) => {
        if (res.data._id) {
          notification.success({
            message: `Feed added on dashboard successfully`,
          });
          history.push("/");
        }
      })
      .catch((err) => {
        if (err && err.status === 400) {
          notification.error({
            message: "Failed to add feed in dashboard",
          });
        } else {
          notification.error({
            message: `${err.data.error.message}`,
          });
        }
      });
  };

  const getAllComments = () => {
    getComments({
      pathParams: { id },
      query: { start, limit },
    })
      .then((res) => {
        getCommentsFunc(res.data);
      })
      .catch((err) => {
        if (err && err.status === 400) {
          notification.error({
            message: "Failed to get comments",
          });
        } else {
          notification.error({
            message: `${err.data.error.message}`,
          });
        }
      });
  };
  useEffect(() => {
    getAllComments();
  }, [user, start, limit]);

  const commentDelete = (id) => {
    deleteComment({
      pathParams: { id },
    })
      .then((res) => {
        getAllComments();
      })
      .catch((err) => {
        if (err && err.status === 400) {
          notification.error({
            message: "Failed to delete comment",
          });
        } else {
          notification.error({
            message: `${err.data.error.message}`,
          });
        }
      });
  };

  function handleChangePagination(current) {
    setStart(limit * (current - 1));
    setCurrentPage(current);
  }

  return (
    <>
      <div className="mb-2">
        <img
          className="w-full rounded-xl"
          src={
            item && item.media && item.media.url
              ? item.media.url
              : "https://images.unsplash.com/photo-1561835491-ed2567d96913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
          }
          alt="Colors"
        />
      </div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center ">
          <FieldTimeOutlined className="mr-2" />
          <span> {item ? moment(item.created_at).format("LL") : "N/A"}</span>
        </div>
        <div
          className="font-bold text-gray-100 rounded-full py-2 px-4"
          style={{ backgroundColor: "#16975f" }}
        >
          {item ? item.category && item.category.name : "N/A"}
        </div>
      </div>
      <div>
        <h4 className="break-all">{item ? item.title : "N/A"}</h4>
        <p>
          <div className="flex items-center ">
            <UserOutlined className="mr-2" />
            {item ? item.user && item.user.name : "N/A"}
          </div>
        </p>
        <h5 className="border-b pb-2 break-all">
          {item ? (
            <span
              dangerouslySetInnerHTML={{ __html: item.shortDescription }}
            ></span>
          ) : (
            "N/A"
          )}
        </h5>
        <p className="break-all">
          {item ? (
            <span dangerouslySetInnerHTML={{ __html: item.body }}></span>
          ) : (
            "N/A"
          )}
        </p>
        <div className="pb-4">
          <Link to={backLinks}>Back</Link>
        </div>
        {item.type === "blog" ? (
          <div>
            <h5 className="border-b pb-2">Comments</h5>
            {comments &&
            comments.feedComments &&
            comments.feedComments.length > 0 ? (
              <div>
                {comments.feedComments.map((data) => (
                  <div className="rounded-lg p-4 flex items-center justify-between	shadow-md mb-2">
                    <p className=" md:text-left break-all m-0">
                      <span
                        className="font-semibold mr-2"
                        style={{ color: "#16975f" }}
                      >
                        {data ? data.user : "N/A"}
                      </span>
                      {data ? data.comment : "N/A"}
                    </p>
                    <Tooltip title="Delete comment">
                      <DeleteOutlined
                        className="ml-2"
                        onClick={() => commentDelete(data ? data._id : 0)}
                      />
                    </Tooltip>
                  </div>
                ))}
                <Row className="p-4" type="flex" justify="end">
                  <Pagination
                    key={`page-${currentPage}`}
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`
                    }
                    showSizeChanger
                    pageSizeOptions={["5", "10", "25", "50", "100"]}
                    onShowSizeChange={(e, p) => {
                      setLimit(p);
                      setCurrentPage(1);
                      setStart(0);
                    }}
                    defaultCurrent={1}
                    current={currentPage}
                    pageSize={limit}
                    total={comments && comments.count}
                    onChange={handleChangePagination}
                  />
                </Row>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col">
                <p>No Comments found!</p>
                <img
                  className="ml-16 "
                  src={SearchNotFound}
                  alt="No blogs found!"
                  style={{ height: "100px" }}
                />
              </div>
            )}
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-between mt-4">
          <Button onClick={() => onChange()}>
            {item &&
            item.dashboardFeed &&
            item.dashboardFeed[0] &&
            item.dashboardFeed[0].feed
              ? `Added on home`
              : `Add on home`}
          </Button>
        </div>
      </div>
    </>
  );
};

CardDetails.propTypes = {
  CardDetails: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user, comments }, dispatch]) => ({
    user,
    comments,
    getCommentsFunc: (data) => getCommentsAction(data, dispatch),
  }),
  CardDetails
);
