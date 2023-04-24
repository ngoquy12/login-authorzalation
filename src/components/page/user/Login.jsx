import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const error = [];
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    email: email,
    password: password,
  });
  // Kiểm tra các trường rỗng
  const checkEmpty = (field) => {
    if (field === undefined || field === null || field === "") {
      return true;
    } else {
      return false;
    }
  };

  // Validate data
  const validate = () => {
    if (checkEmpty(email)) {
      // Điều kiện để hiển thi lỗi
      setErrorEmail(true);
      error.push("Email không được phép để trống.");
    } else {
      setErrorEmail(false);
    }
    if (checkEmpty(password)) {
      setErrorPassword(true);
      error.push("Mật khẩu không được phép để trống.");
    } else {
      setErrorPassword(false);
    }
    if (error.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  // Hàm xử lý đăng nhập
  const handleSubmit = (e) => {
    // Ngăn chặn sự kiện load lại trang
    e.preventDefault();
    // Kiểm tra hàm validate
    let isValid = validate();
    if (isValid) {
      axios
        .post("http://localhost:3001/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("users", JSON.stringify(res.data));
            // Chuyển hướng sang trang quản
            // Nếu quyền là admin thì chuyển hươngs về trang admin
            if (res.data.user.permission === 0) {
              navigate("/manager-user");
            } else {
              navigate("/");
            }
            setTimeout(() => {
              alert("Đăng nhập thành công");
            }, 200);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            alert("Đăng nhập thất bại");
          }
        });
    }
  };
  return (
    <div className="form-container">
      <div className="form-background"></div>
      <form className="form" onSubmit={handleSubmit}>
        <h4 className="form-heading">ĐĂNG NHẬP</h4>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            placeholder="Nhập địa chỉ email"
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorEmail ? (
            <div id="emailHelp" className="form-text">
              Email không được để trống.
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            placeholder="Nhập mật khẩu"
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          {errorPassword ? (
            <div id="emailHelp" className="form-text">
              Mật khẩu không được để trống.
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="button-submit">
          <button type="submit" className="btn btn-primary btn-primary-1">
            Submit
          </button>
        </div>
        <div className="mt-3 text-center">
          <div id="emailHelp" className="">
            Bạn đã có mật khẩu?
            <NavLink to="/register">Đăng kí</NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}
