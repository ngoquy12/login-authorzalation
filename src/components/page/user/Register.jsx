import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    email: email,
    password: password,
  });

  // Validate email
  const validEmail = (email) => {
    const regex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  // Check empty
  const checkEmpty = (filed) => {
    if (filed !== undefined || filed === null || filed === "") {
      return true;
    } else {
      return false;
    }
  };

  const elementEmail = () => {
    if (checkEmpty(email)) {
      return (
        <div id="emailHelp" className="form-text">
          Email không được để trống
        </div>
      );
    }
    if (!validEmail(email)) {
      return (
        <div id="emailHelp" className="form-text">
          Email không được để trống
        </div>
      );
    }
  };

  // Validate dữ liệu đầu vào
  const validateData = () => {};

  // Xử lý sự kiện submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-container">
      <div className="form-background"></div>
      <form className="form" onSubmit={handleSubmit}>
        <h4 className="form-heading">ĐĂNG KÝ TÀI KHOẢN</h4>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
          {elementEmail}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            placeholder="Nhaapj ddaaaa"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <div className="mb-3">
          <div id="emailHelp" className="form-text">
            Mật khẩu không được để trống
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Xác nhận mật khẩu
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <div className="mb-3">
          <div id="emailHelp" className="form-text">
            Mật khẩu chưa khớp
          </div>
        </div>
        <div className="button-submit">
          <button type="submit" className="btn btn-primary btn-primary-1">
            Submit
          </button>
        </div>
        <div className="mt-3 text-center">
          <div id="emailHelp" className="">
            Bạn đã có mật khẩu?
            <NavLink to="/login">Đăng nhập</NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}
