import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const getUserLocal = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  // xử lý đăng xuất
  const handleLogout = () => {
    let isConfirm = window.confirm("Bạn chắc chắn muốn đăng xuất không?");
    if (isConfirm) {
      localStorage.removeItem("users");
      navigate("/");
    }
  };
  return (
    <>
      {/* Navbar start */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              width="150px"
              src="
                  https://rikkei.edu.vn/wp-content/uploads/2022/04/Logo-Rikkei.png"
              alt=""
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Trang chủ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/manager-user">
                  Quản lý người dùng
                </NavLink>
              </li>
            </ul>
            {getUserLocal != null ? (
              <div className="d-flex">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown"></li>
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                      {/* Hello {getUserLocal.user.userName} */}
                    </NavLink>
                  </li>
                  <li className="nav-item" onClick={handleLogout}>
                    <NavLink to="/" className="nav-link">
                      Đăng xuất
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown"></li>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Đăng ký
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Đăng nhập
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Navbar end */}
    </>
  );
}
