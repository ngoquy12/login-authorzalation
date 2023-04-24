import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import "./admin.css";

export default function EditUser() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    dateOfBirth: "",
    email: "",
    address: "",
  });
  const { userName, dateOfBirth, email, address } = user;
  const handleChangeInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loadData = async () => {
    await axios
      .get(`http://localhost:3001/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((error) => console.log(error));
  };

  // Update user
  const editData = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:3001/users/${id}`, user)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("users", JSON.stringify(res.data));
          // Chuyển hướng sang trang quản
          navigate("/manager-user");
          //   loadData();
          setTimeout(() => {
            alert("Cập nhật thành công");
          }, 200);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="form-container">
      <div className="form-background"></div>
      <form className="form" onSubmit={editData}>
        <div className="form-head">
          <h3 style={{ textAlign: "center" }}>SỬA THÔNG TIN</h3>
          <button className="btn-no">
            <Link to="/manager-user">X</Link>
          </button>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Tên
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên người dùng"
            name="userName"
            value={userName}
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Ngày sinh
          </label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Địa chỉ
          </label>
          <textarea
            className="form-control"
            id="address"
            rows={3}
            value={address}
            onChange={(e) => handleChangeInput(e)}
            name="address"
          />
          <div className="text-center">
            <button type="submit" className="btn btn-primary mt-3">
              Lưu thông tin
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
