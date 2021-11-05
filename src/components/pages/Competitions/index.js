/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { PageMetaTags } from "Common";
import { Link, useHistory } from "react-router-dom";
import SearchNotFound from "../../../assets/images/empty-search-contact.png";
import PropTypes from "prop-types";
import { withContext } from "Context";
import {
  Pagination,
  Row,
  Table,
  Input,
  Spin,
  Button,
  notification,
  Breadcrumb,
  Select,
} from "antd";
import { getFeeds, getOptions } from "../../../services/blog";
import { getFeedsAction } from "Actions/feedActions";
import Card from "../../Card";
import { debounce } from "lodash";
const Competitions = ({ user, feeds, getFeedsFunc }) => {
  const { Search } = Input;
  const history = useHistory();
  const [keyword, setKeyword] = useState();
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { feedsList } = feeds;
  const { Option } = Select;
  const [options, setOptions] = useState([]);
  const [keywordState, setKeywordState] = useState("");
  const [selected, setSelected] = useState();
  useEffect(() => {
    setLoading(true);
    const body = {
      type: "competitions",
      start,
      limit,
      selected,
      keywordState,
    };
    getFeeds({ query: body })
      .then((res) => {
        getFeedsFunc(res.data);
        setLoading(false);
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
            message: "Failed to get feeds",
          });
        }
      });
  }, [user, start, limit, selected, keywordState]);

  useEffect(() => {
    getOptions({ query: { categoryType: "life" } }).then((res) => {
      setOptions(res.categories);
    });
  }, []);

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
      <div className="flex items-center justify-between space-x-6">
        <span className="page-heading">Competitions</span>
        <Input
          size="small"
          onChange={(e) => debounceSearch(e.target.value)}
          placeholder="Search by title"
          allowClear
        />
        <div className="flex justify-end space-x-4">
          <div>
            <Select
              size="large"
              showSearch
              style={{ width: 200 }}
              placeholder="Search by category"
              optionFilterProp="children"
              allowClear
              onChange={(value) => setSelected(value)}
            >
              {options &&
                options.map((item) => (
                  <Option value={item._id}>{item.name}</Option>
                ))}
            </Select>
          </div>
          <Button
            size="large"
            type="primary"
            onClick={(key) => history.push("/competition/add")}
          >
            Add competition
          </Button>
        </div>
      </div>
      {feedsList && feedsList.feedList && feedsList.feedList.length > 0 ? (
        <Spin tip="Loading..." spinning={loading} size="large">
          {feedsList &&
            feedsList.feedList.map((val) => (
              <Card type="competitions" item={val} />
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
              total={feedsList && feedsList.count}
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
