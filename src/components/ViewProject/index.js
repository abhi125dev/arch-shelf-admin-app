import { Breadcrumb, notification, Popconfirm, Button } from "antd";
import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import CardDetails from "../Card/CardDetails";
import { PageMetaTags } from "../common";
import PropTypes from "prop-types";
import { addDashboardFeed } from "../../services/blog";
import { withContext } from "Context";
import { deleteProject } from "../../services/blog";
import { getFeedAction } from "Actions/feedActions";
import { getProject } from "../../services/blog";
import { getLinks } from "../../utils/index";

const ViewProject = ({ user, getFeedFunc, feeds }) => {
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    getProject({
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
  const onChange = () => {
    const body = {
      feed: id,
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

  const deleteFeedFunc = () => {
    deleteProject({ pathParams: { id } })
      .then((res) => {
        if (res.message === "success") {
          notification.success({
            message: "Blog deleted successfully",
          });
          history.push("/projects");
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
              {feeds.feedDetail && feeds.feedDetail.type
                ? feeds.feedDetail.type.charAt(0).toUpperCase() +
                  feeds.feedDetail.type.slice(1)
                : "N/A"}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {feeds.feedDetail ? `${feeds.feedDetail.title}` : "N/A"}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex justify-between md:pr-18 lg:pr-72">
          <h1
            className="page-heading truncate"
            style={{ maxWidth: "700px", lineHeight: "40px" }}
          >
            {feeds.feedDetail ? `${feeds.feedDetail.title}` : "N/A"}
          </h1>
          <div className="space-x-3">
            <Button
              onClick={() => onChange()}
              disabled={
                feeds.feedDetail &&
                feeds.feedDetail.dashboardFeed &&
                feeds.feedDetail.dashboardFeed[0] &&
                feeds.feedDetail.dashboardFeed[0].feed
              }
            >
              {feeds.feedDetail &&
              feeds.feedDetail.dashboardFeed &&
              feeds.feedDetail.dashboardFeed[0] &&
              feeds.feedDetail.dashboardFeed[0].feed
                ? `Added on home`
                : `Add on home`}
            </Button>
            <Button
              type="primary"
              className="mr-2"
              onClick={() => history.push(`/projects/${id}/edit`)}
              style={{
                backgroundColor: "#f5bf42",
                borderColor: "#f5bf42",
                color: "black",
              }}
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
        <div className="profile-wrapper border p-8 bg-white md:mr-18 lg:mr-72">
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

ViewProject.propTypes = {
  ViewProject: PropTypes.func.isRequired,
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
  ViewProject
);
