import React from "react";
import { useHistory } from "react-router-dom";
import { getInitials } from "../../utils";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import styles from "./index.less";

const Card = ({ item, type }) => {
  const history = useHistory();

  return (
    <>
      <div className="profile-wrapper py-5">
        <div
          style={{ minHeight: "280px", maxHeight: "700px" }}
          className="px-10 py-6 mx-auto bg-white rounded-lg shadow-md lg:flex"
        >
          <div className="flex items-center justify-between mr-8 lg:w-5/12 md:w-full sm:w-full mb-2	">
            <img
              className="w-full rounded-xl"
              src={
                item && item.media.length && item.media[0].url
                  ? item.media[0].url
                  : "https://images.unsplash.com/photo-1561835491-ed2567d96913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
              }
              alt="Colors"
              style={{ width: "100%", height: "240px" }}
            />
          </div>
          <div className="lg:w-9/12 md:w-full sm:w-full">
            <div className="flex items-center justify-between">
              <span className="font-light text-gray-600">
                {item ? moment(item.created_at).format("LL") : "N/A"}
              </span>
              <div
                className="font-bold text-gray-100 rounded-full py-2 px-4"
                style={{ backgroundColor: "#16975f" }}
              >
                {item ? item.category && item.category.name : "N/A"}
              </div>
            </div>
            <div className="mt-2">
              <div
                onClick={() => history.push(`/${type}/${item._id}`)}
                className="text-2xl font-bold text-gray-700 hover:underline cursor-pointer truncate"
                style={{ maxWidth: "600px" }}
              >
                {item ? item.title : "N/A"}
              </div>
              <div className="flex flex-start">
                <p
                  className={`${styles.truncate_overflow} mt-2 text-gray-600`}
                  style={{ height: "100px", overflow: "hidden" }}
                >
                  {item ? (
                    <span
                      className="box"
                      dangerouslySetInnerHTML={{ __html: item.body }}
                    ></span>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div
                className="text-blue-500 hover:underline cursor-pointer	"
                onClick={() => history.push(`/${type}/${item._id}`)}
              >
                Read more
              </div>
              <div>
                <div className="flex items-center">
                  <div className="profile-pic">
                    <Avatar
                      style={{ background: "#16975f" }}
                      src={
                        item &&
                        item.user &&
                        item.user.profile_pic_path &&
                        item.user.profile_pic_path
                      }
                    >
                      {getInitials(item ? item.user && item.user.name : "N/A")}
                    </Avatar>
                  </div>
                  <div className="font-bold text-gray-700 hover:underline">
                    {item ? item.user && item.user.name : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
