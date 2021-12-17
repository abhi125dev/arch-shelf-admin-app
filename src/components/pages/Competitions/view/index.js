import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  UserOutlined,
  FieldTimeOutlined,
  CalendarOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { notification, Button, Breadcrumb, Popconfirm } from "antd";
import PropTypes from "prop-types";
import { withContext } from "Context";

import { PageMetaTags } from "Common";
import { getCommentsAction } from "Actions/commentActions";
import {
  getCompetition,
  deleteCompetition,
} from "../../../../services/competition";

const index = ({ user }) => {
  const history = useHistory();
  const { id } = useParams();
  const [fetchFeed, setFetchFeed] = useState();

  useEffect(() => {
    getCompetition({
      pathParams: { id },
    })
      .then((res) => {
        setFetchFeed(res.data);
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

  const deleteCompFunc = () => {
    deleteCompetition({ pathParams: { id } })
      .then((res) => {
        if (res.message === "success") {
          notification.success({
            message: "Competition deleted successfully",
          });
          history.push("/competitions");
        }
      })
      .catch((err) => {
        if (err && err.status === 400) {
          notification.error({
            message: "Failed to delete competition",
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
        <PageMetaTags title="View Competition" />
        <Breadcrumb style={{ marginBottom: 20 }}>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/competitions">Competitions</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {fetchFeed ? fetchFeed.title : "N/A"}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex justify-between">
          <h1 className="page-heading">
            {fetchFeed ? fetchFeed.title : "N/A"}
          </h1>
          <div>
            <Button
              type="primary"
              className="mr-2"
              onClick={() => history.push(`/competitions/${id}/edit`)}
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
              onConfirm={() => deleteCompFunc()}
            >
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </div>
        </div>
        <div className="profile-wrapper border p-8 bg-white">
          <div className="mb-2">
            <img
              className="w-full rounded-xl"
              src={
                fetchFeed && fetchFeed.media[0] && fetchFeed.media[0].url
                  ? fetchFeed.media[0].url
                  : "https://images.unsplash.com/photo-1561835491-ed2567d96913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
              }
              alt="Colors"
            />
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center ">
              <FieldTimeOutlined className="mr-2" />
              <span>
                {fetchFeed ? moment(fetchFeed.created_at).format("LL") : "N/A"}
              </span>
            </div>
            <div
              className="font-bold text-gray-100 rounded-full py-2 px-4"
              style={{ backgroundColor: "#f5bf42" }}
            >
              {fetchFeed ? fetchFeed.status : "N/A"}
            </div>
          </div>
          <div>
            <h4 className="break-all">{fetchFeed ? fetchFeed.title : "N/A"}</h4>
            <p>
              <div className="flex items-center ">
                <UserOutlined className="mr-2" />
                Posted by:{" "}
                {fetchFeed ? fetchFeed.user && fetchFeed.user.name : "N/A"}
              </div>
            </p>
            <p className="break-all">
              {fetchFeed ? (
                <span
                  dangerouslySetInnerHTML={{ __html: fetchFeed.body }}
                ></span>
              ) : (
                "N/A"
              )}
            </p>
            <div class="grid grid-cols-4 gap-4 justify-center">
              <div className="flex flex-col items-center bg-gray-100">
                <div className="mb-2">
                  <CalendarOutlined className="mr-2" /> Start Day
                </div>
                {fetchFeed ? moment(fetchFeed.startDay).format("LL") : "N/A"} (
                {fetchFeed
                  ? moment(fetchFeed.startDay).format("h:mm:ss")
                  : "N/A"}
                )
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <CalendarOutlined className="mr-2" /> Submission Date
                </div>
                {fetchFeed
                  ? moment(fetchFeed.submissionDate).format("LL")
                  : "N/A"}{" "}
                (
                {fetchFeed
                  ? moment(fetchFeed.submissionDate).format("h:mm:ss")
                  : "N/A"}
                )
              </div>
              <div className="flex flex-col items-center bg-gray-100">
                <div className="mb-2">
                  <UserOutlined className="mr-2" /> Organizer
                </div>
                {fetchFeed ? fetchFeed.organizer : "N/A"}
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <MoneyCollectOutlined className="mr-2" /> Price
                </div>
                {fetchFeed ? fetchFeed.price : "N/A"}
              </div>
            </div>
            <div className="p-4">
              <Link to="/competitions">Back</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

index.propTypes = {
  index: PropTypes.func.isRequired,
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
  index
);
