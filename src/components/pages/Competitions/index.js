/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { PageMetaTags } from "Common";
import { Link, useHistory } from "react-router-dom";
import SearchNotFound from "../../../assets/images/empty-search-contact.png";
import PropTypes from "prop-types";
import { withContext } from "Context";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import { getInitials } from "../../../utils";
import styles from "./index.less";
import {
  UserOutlined,
  CalendarOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import {
  Pagination,
  Row,
  Input,
  Spin,
  Button,
  notification,
  Breadcrumb,
  Select,
} from "antd";
import { getCompetitions } from "../../../services/competition";
import { getFeedsAction } from "Actions/feedActions";
import { debounce } from "lodash";
const Competitions = ({ user, feeds, getFeedsFunc }) => {
  const { Search } = Input;
  const history = useHistory();
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  const [keywordState, setKeywordState] = useState("");
  const [selected, setSelected] = useState();
  const [fetchCompetitions, setFetchCompetitions] = useState();

  useEffect(() => {
    setLoading(true);
    const body = {
      start,
      limit,
      selected,
      keywordState,
    };
    getCompetitions({ query: body })
      .then((res) => {
        setFetchCompetitions(res.data.competitionsList);
        setLoading(false);
      })
      .catch((err) => {
        if (err && err.status === 400) {
          notification.error({
            message: "Failed to get competitions",
          });
        } else {
          notification.error({
            message: `${err.data.error.message}`,
          });
        }
      });
  }, [user, start, limit, selected, keywordState]);

  function handleChangePagination(current) {
    setStart(limit * (current - 1));
    setCurrentPage(current);
  }
  const action = (val) => setKeywordState(val);
  const debounceSearch = debounce(action, 1000);

  return (
    <div className="content-panel">
      <PageMetaTags title="Competitions" />
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Competitions</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex flex-col md:flex-row items-center justify-between space-x-6">
        <span className="page-heading">Competitions</span>
        <br />
        <div className="md:w-2/3">
          <Input
            size="small"
            onChange={(e) => debounceSearch(e.target.value)}
            placeholder="Search by title"
            allowClear
          />
        </div>
        <br />
        <div className="flex flex-col md:flex-row md:justify-end md:space-x-4">
          {/* <div>
            <Select
              size="large"
              showSearch
              style={{ width: 200 }}
              placeholder="Search by status"
              optionFilterProp="children"
              allowClear
              onChange={(value) => setSelected(value)}
            >
              <Option value="open">Open</Option>
              <Option value="closed">Closed</Option>
              <Option value="current">Current</Option>
            </Select>
          </div> */}
          <Button
            size="large"
            type="primary"
            onClick={(key) => history.push("/competition/add")}
            style={{
              backgroundColor: "#f5bf42",
              borderColor: "#f5bf42",
              color: "black",
            }}
          >
            Add competition
          </Button>
        </div>
      </div>
      {fetchCompetitions && fetchCompetitions.length > 0 ? (
        <Spin tip="Loading..." spinning={loading} size="large">
          {fetchCompetitions &&
            fetchCompetitions.map((val) => (
              <div className="profile-wrapper py-5">
                <div
                  style={{ minHeight: "280px", maxHeight: "700px" }}
                  className="px-10 py-6 mx-auto bg-white rounded-lg shadow-md lg:flex"
                >
                  <div className="flex items-center justify-between mr-8 lg:w-5/12 md:w-full sm:w-full mb-2	">
                    <img
                      className="w-full rounded-xl"
                      src={
                        val && val.media && val.media[0] && val.media[0].url
                          ? val.media[0].url
                          : "https://images.unsplash.com/photo-1561835491-ed2567d96913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                      }
                      alt="Colors"
                      style={{ width: "100%", height: "240px" }}
                    />
                  </div>
                  <div className="lg:w-9/12 md:w-full sm:w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-light text-gray-600">
                        {val ? moment(val.created_at).format("LL") : "N/A"}
                      </span>
                      <div
                        className="font-bold text-gray-100 rounded-full py-2 px-4"
                        style={{ backgroundColor: "#f5bf42", color: "black" }}
                      >
                        {val ? val.status : "N/A"}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div
                        onClick={() =>
                          history.push(`/competitions/view/${val._id}`)
                        }
                        className="text-2xl font-bold text-gray-700 hover:underline cursor-pointer truncate"
                        style={{ maxWidth: "600px" }}
                      >
                        {val ? val.title : "N/A"}
                      </div>
                      <div className="flex flex-start">
                        <p
                          className={`${styles.truncate_overflow} mt-2 text-gray-600`}
                          style={{ height: "100px", overflow: "hidden" }}
                        >
                          {val ? (
                            <span
                              className="box"
                              dangerouslySetInnerHTML={{ __html: val.body }}
                            ></span>
                          ) : (
                            "N/A"
                          )}
                        </p>
                      </div>
                      <div class="justify-center mt-4">
                        <div className="flex items-center bg-gray-100">
                          <CalendarOutlined className="mr-2" /> Start Day:{" "}
                          {val ? moment(val.startDay).format("LL") : "N/A"} (
                          {val ? moment(val.startDay).format("h:mm:ss") : "N/A"}
                          )
                        </div>
                        <div className="flex items-center">
                          <CalendarOutlined className="mr-2" /> Submission Date:{" "}
                          {val
                            ? moment(val.submissionDate).format("LL")
                            : "N/A"}{" "}
                          (
                          {val
                            ? moment(val.submissionDate).format("h:mm:ss")
                            : "N/A"}
                          )
                        </div>
                        <div className="flex items-center bg-gray-100">
                          <UserOutlined className="mr-2" /> Organizer:{" "}
                          {val ? val.organizer : "N/A"}
                        </div>
                        <div className="flex items-center">
                          <MoneyCollectOutlined className="mr-2" /> Price:{" "}
                          {val ? val.price + " Rs." : "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div
                        className="text-blue-500 hover:underline cursor-pointer	"
                        onClick={() =>
                          history.push(`/competitions/view/${val._id}`)
                        }
                      >
                        Read more
                      </div>
                      <div>
                        <div className="flex items-center">
                          <div className="profile-pic">
                            <Avatar
                              style={{ background: "#f5bf42", color: "black" }}
                              src={
                                val &&
                                val.user &&
                                val.user.profile_pic_path &&
                                val.user.profile_pic_path
                              }
                            >
                              {getInitials(
                                val ? val.user && val.user.name : "N/A"
                              )}
                            </Avatar>
                          </div>
                          <div className="font-bold text-gray-700 hover:underline">
                            {val ? val.user && val.user.name : "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <Row className="p-4" type="flex" justify="end">
            <Pagination
              key={`page-${currentPage}`}
              showSizeChanger
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
              pageSizeOptions={["10", "25", "50", "100"]}
              onShowSizeChange={(e, p) => {
                setLimit(p);
                setCurrentPage(1);
                setStart(0);
              }}
              defaultCurrent={1}
              current={currentPage}
              pageSize={limit}
              total={fetchCompetitions && fetchCompetitions.length}
              onChange={handleChangePagination}
            />
          </Row>
        </Spin>
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

Competitions.propTypes = {
  GHCLife: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user, feeds }, dispatch]) => ({
    user,
    feeds,
    getFeedsFunc: (data) => getFeedsAction(data, dispatch),
  }),
  Competitions
);
