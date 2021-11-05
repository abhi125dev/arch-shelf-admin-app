import { Breadcrumb, notification, Popconfirm, Button } from "antd";
import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import CardDetails from "../Card/CardDetails";
import { PageMetaTags } from "../common";
import PropTypes from "prop-types";
import { withContext } from "Context";
import { deleteFeed } from "../../services/blog";
import { getFeedAction } from "Actions/feedActions";
import { getFeed } from "../../services/blog";
import { getLinks } from "../../utils/index";

const ViewBlog = ({ user, getFeedFunc, feeds }) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getFeed({
      pathParams: { id },
    })
      .then((res) => {
        getFeedFunc(res.data);
      })
      .catch((err) => {
        if (err && err.status === 400) {
          notification.error({
            message: "Failed to get feed",
          });
        } else {
          notification.error({
            message: `${err.data.error.message}`,
          });
        }
      });
  }, [user]);

  const deleteFeedFunc = () => {
    deleteFeed({ pathParams: { id } })
      .then((res) => {
        if (res.message === "success") {
          notification.success({
            message: "Blog deleted successfully",
          });
          history.push(getLinks(feeds.feedDetail.type));
        }
      })
      .catch((err) => {
        if (err && err.status === 400) {
          notification.error({
            message: "Failed to delete blog",
          });
        } else {
          notification.error({
            message: `${err.data.error.message}`,
          });
        }
      });
  };

  return (
    <>
      <div className="content-panel">
        <PageMetaTags
          title={feeds.feedDetail ? `${feeds.feedDetail.title}` : "N/A"}
        />
        <Breadcrumb style={{ marginBottom: 20 }}>
          <Breadcrumb.Item>
            <Link to="/dashboard">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              to={getLinks(feeds.feedDetail ? feeds.feedDetail.type : "N/A")}
            >
              {feeds.feedDetail ? feeds.feedDetail.type : "N/A"}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {feeds.feedDetail ? `${feeds.feedDetail.title}` : "N/A"}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex justify-between">
          <h1 className="page-heading">
            {feeds.feedDetail ? `${feeds.feedDetail.title}` : "N/A"}
          </h1>
          <div>
            <Button
              type="primary"
              className="mr-2"
              onClick={() =>
                history.push(`/${feeds.feedDetail.type}/${id}/edit`)
              }
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure delete this blog?"
              onConfirm={() => deleteFeedFunc()}
            >
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </div>
        </div>
        <div className="profile-wrapper border p-8 bg-white">
          <CardDetails
            item={feeds.feedDetail}
            backLinks={
              feeds.feedDetail ? getLinks(feeds.feedDetail.type) : "N/A"
            }
          />
        </div>
      </div>
    </>
  );
};

ViewBlog.propTypes = {
  ViewBlog: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user, feeds }, dispatch]) => ({
    user,
    feeds,
    getFeedFunc: (data) => getFeedAction(data, dispatch),
  }),
  ViewBlog
);
