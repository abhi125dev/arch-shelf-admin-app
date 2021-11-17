import React, { useEffect } from "react";
import { withContext } from "Context";
import { getDashboardFeedAction } from "Actions/feedActions";
import {
  getDashboardFeed,
  deleteDashboardFeed,
} from "../../../../services/blog";
import PropTypes from "prop-types";
import SearchNotFound from "../../../../assets/images/empty-search-contact.png";
import { notification, Button } from "antd";
import moment from "moment";
import { useHistory } from "react-router";
import styles from "./index.less";

const MainDashboard = ({ user, getDashboardFeedFunc, feeds, type }) => {
  const history = useHistory();

  const getFeedsForDashboard = () => {
    getDashboardFeed()
      .then((res) => {
        getDashboardFeedFunc(res.data);
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
  };

  useEffect(() => {
    getFeedsForDashboard();
  }, [user]);

  const onDelete = (data) => {
    deleteDashboardFeed({ pathParams: { id: data } })
      .then((res) => {
        getFeedsForDashboard();
      })
      .catch((err) => {
        if (err && err.status === 400) {
          notification.error({
            message: "Failed to delete feed",
          });
        } else {
          notification.error({
            message: `${err.data.error.message}`,
          });
        }
      });
  };

  return (
    <div className="content-panel">
      <h1 className="page-heading">Welcome back {user.name}</h1>
      {feeds && feeds.feedDetail && feeds.feedDetail.length > 0 ? (
        <div>
          {feeds &&
            Array.isArray(feeds.feedDetail) &&
            feeds.feedDetail.map((item) => (
              <div className="profile-wrapper" style={{ padding: 20 }}>
                <div className="px-10 py-6 mx-auto bg-white rounded-lg shadow-md lg:flex">
                  <div className="flex items-center justify-between mr-8 lg:w-5/12 md:w-full sm:w-full mb-2	">
                    <img
                      className="w-full rounded-xl"
                      src={
                        item.feed && item.feed.media && item.feed.media[0].url
                          ? item.feed.media[0].url
                          : "https://images.unsplash.com/photo-1561835491-ed2567d96913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                      }
                      alt="Colors"
                    />
                  </div>
                  <div className="lg:w-9/12 md:w-full sm:w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-light text-gray-600">
                        {item
                          ? item.feed &&
                            moment(item.feed.created_at).format("LL")
                          : "N/A"}
                      </span>
                      <div
                        className="font-bold text-gray-100 rounded-full py-2 px-4"
                        style={{ backgroundColor: "#16975f" }}
                      >
                        {item
                          ? item.feed &&
                            item.feed.category &&
                            item.feed.category.name
                          : "N/A"}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div
                        onClick={() =>
                          history.push(`/${item.feed.type}/${item.feed._id}`)
                        }
                        className="text-2xl font-bold text-gray-700 hover:underline cursor-pointer truncate"
                        style={{ maxWidth: "600px" }}
                      >
                        {item ? item.feed && item.feed.title : "N/A"}
                      </div>
                    </div>
                    <p
                      className={`${styles.truncate_overflow} mt-2 text-gray-600`}
                      style={{ height: "100px", overflow: "hidden" }}
                    >
                      {item && item.feed ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: item.feed.body }}
                        ></span>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <div
                      className="text-blue-500 hover:underline cursor-pointer	mb-4"
                      onClick={() =>
                        history.push(`/${item.feed.type}/${item.feed._id}`)
                      }
                    >
                      Read more
                    </div>
                    <div>
                      <Button
                        danger
                        onClick={() =>
                          onDelete(item ? item.feed && item.feed._id : "")
                        }
                      >
                        Remove from dashboard
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col">
          <p>No blogs found!</p>
          <img
            className="ml-16 "
            src={SearchNotFound}
            alt="No blogs found!"
            style={{ height: "100px" }}
          />
        </div>
      )}
    </div>
  );
};

MainDashboard.propTypes = {
  MainDashboard: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user, feeds }, dispatch]) => ({
    user,
    feeds,
    getDashboardFeedFunc: (data) => getDashboardFeedAction(data, dispatch),
  }),
  MainDashboard
);

// export default withContext(([{ user }]) => ({ user }), MainDashboard);
