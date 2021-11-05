import React, { useState, useEffect } from "react";
import {
    Table,
    Pagination,
    Row,
    notification,
    Breadcrumb,
    Spin
  } from "antd";
import SearchNotFound from "../../../assets/images/empty-search-contact.png";
import { Link } from "react-router-dom";
import { PageMetaTags } from "../../common";
import { getQueries } from "../../../services/query";
import PropTypes from "prop-types";
import { withContext } from "Context";

const Query = ({ user, }) => {
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [queryResponse, setQueryResponse] = useState()
  const [viewSize, setViewSize] = useState(10);

  useEffect(() => {
    setLoading(true);
    const body = {
      start,
      limit,
    };
    getQueries({ query: body })
      .then((res) => {
        setQueryResponse(res.data)
        setLoading(false);
      })
      .catch((err) => {
        if (err && err.status === 400) {
            notification.error({
              message: "Failed to get queries",
            });
          } else {
            notification.error({
              message: `${err.data.error.message}`,
            });
          }
      });
  }, [user, start, limit]);


  function handleChangePagination(current) {
    setStart(limit * (current - 1));
    setCurrentPage(current);
  }

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
      render: (data) => <div>{data ? data : "N/A"}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (data) => (
        <div>{data ? data : "N/A"}</div>
      ),
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
      render: (data) => <div>{data ? data : "N/A"}</div>,
    },
    {
        title: "Message",
        dataIndex: "message",
        key: "message",
        render: (data) => <div>{data ? data : "N/A"}</div>,
      },
  ];
 console.log(`queryResponse`, queryResponse)
  return (
    <div className="content-panel">
      <PageMetaTags title="Query" />
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Queries</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex items-center justify-between space-x-6">
        <span className="page-heading">Queries</span>
      </div>

       {queryResponse && queryResponse.questionsList && queryResponse.questionsList.length > 0 ? (
        <Spin tip="Loading..." spinning={loading} size="large">
            <Table
                className="no-shadow zcp-fixed-w-table"
                pagination={false}
                columns={columns}
                dataSource={queryResponse.questionsList || []}
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
          <Row className="p-4" type="flex" justify="end">
            <Pagination
              key={`page-${currentPage}`}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
              showSizeChanger
              pageSizeOptions={["10", "25", "50", "100"]}
              onShowSizeChange={(e, p) => {
                setLimit(p);
                setCurrentPage(1);
                setStart(0);
              }}
              defaultCurrent={1}
              current={currentPage}
              pageSize={limit}
              total={queryResponse && queryResponse.count}
              onChange={handleChangePagination}
            />
          </Row>
        </Spin>
      ) : (
        <div className="flex items-center justify-center flex-col">
          <p>No Queries found!</p>
          <img
            className="ml-16 "
            src={SearchNotFound}
            alt="No Queries found!"
            style={{ height: "100px" }}
          />
        </div>
      )} 
    </div>
  );
};

Query.propTypes = {
  Query: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user }, dispatch]) => ({
    user,
  }),
  Query
);
