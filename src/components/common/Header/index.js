import { withContext } from "Context";
import { signOutSuccessAction } from "Actions/authActions";
import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../services/user";
import Avatar from "antd/lib/avatar/avatar";
import { getInitials } from "../../../utils";
import { setSelectedSchoolAction } from "../../../store/actions/profileActions";

const Header = ({ showSideBar, setShowSideBar, signOutSuccess, user }) => {
  return (
    <header className="header-wrapper">
      <div className="flex items-center">
        <Link to="/dashboard" className="logo">
          <div className="ml-2 text-lg" style={{ color: "#16975f" }}>
            <span className="text-yellow-400">ARCH</span>{" "}
            <span className="text-black">SHELF</span>
          </div>
        </Link>
      </div>

      <div className="right-side-header">
        <div className="header-profile">
          <div className="profile-menu dropdown-toggle" data-toggle="dropdown">
            <div className="profile-pic">
              <Avatar
                style={{ background: "#16975f" }}
                src={user && user.profile_pic_path && user.profile_pic_path}
              >
                {getInitials(user && user.name)}
              </Avatar>
            </div>
            <Link to="/profile">{user && user.name}</Link>
          </div>
          <Link
            to="/login"
            onClick={() => {
              signOutSuccess();
              logoutUser();
              localStorage.clear();
            }}
            className="text-btm"
          >
            Logout
          </Link>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (showSideBar) {
              setShowSideBar(false);
            } else {
              setShowSideBar(true);
            }
          }}
          className="ham-menu"
        >
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

export default withContext(
  ([
    {
      app: { openMenu },
      user,
    },
    dispatch,
  ]) => ({
    // state
    openMenu,
    user,
    // actions
    setSelectedSchoolDispatch: (data) =>
      setSelectedSchoolAction(data, dispatch),
    signOutSuccess: () => signOutSuccessAction(dispatch),
    // openLeftNav: (data) => openLeftNav(data, dispatch),
  }),
  Header
);
