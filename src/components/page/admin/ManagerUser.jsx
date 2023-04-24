import React, { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ManagerUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [info, setInfo] = useState({});
  const [sort, setSort] = useState("");

  /**
   * Tải lại dữ liệu
   */
  const loadData = async () => {
    return await axios
      .get("http://localhost:3001/users")
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error));
  };

  /**
   * Hàm tìm kiếm thông tin user theo tên và email
   * @returns
   */
  const handleSearch = async () => {
    return await axios
      .get(
        `http://localhost:3001/users?email_like=${search}&userName_like=${search}`
      )
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   * Xóa thông tin một user
   * @param {*} id id truyền vào
   */
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:3001/users/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    loadData();
    setTimeout(() => {
      alert("Xóa thành công.");
    }, 200);
  };

  // show info
  const showInfor = (user) => {
    setInfo(user);
  };
  return (
    <>
      <div className="toolbar-admin">
        <select
          style={{ width: 300 }}
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
          onChange={(e) => setSort(e.target.value)}
        >
          <option selected=""></option>
          <option value={""}>-- Sắp xếp theo --</option>
          <option value={"id"}>Mã</option>
          <option value={"userName"}>Tên</option>
          <option value={"dateOfBirth"}>Ngày sinh</option>
        </select>
        <button className="btn btn-primary">Sắp xếp</button>
        <div className="input-group" style={{ width: 400 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm theo tên hoặc email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleSearch}
          >
            Button
          </button>
        </div>
        <button className="btn btn-primary">
          <Link to="/manager-user/add-user" style={{ color: "#fff" }}>
            Thêm người dùng
          </Link>
        </button>
      </div>

      <div className="table-user">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Mã người dùng</th>
              <th scope="col">Tên người dùng</th>
              <th scope="col">Ngày sinh</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col" colSpan={3} style={{ textAlign: "center" }}>
                Lựa chọn
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.userName}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.address}</td>
                <td>
                  <button className="btn btn-success">
                    <i
                      class="fa-solid fa-eye"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => showInfor(user)}
                    ></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-warning">
                    <Link to={`/manager-user/edit-user/${user.id}`}>Sửa</Link>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Thanh phân trang */}
      <div className="pagation">
        <span>
          Tổng số bản ghi <b>{users.length}</b>
        </span>
        <nav aria-label="Page navigation">
          <ul className="pagination ">
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Thông tin cá nhân
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="mb-3 row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Tên
                  </label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      id="inputPassword"
                      readOnly
                      value={info.userName}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Ngày sinh
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="date"
                      className="form-control"
                      readOnly
                      value={info.dateOfBirth}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      readOnly
                      value={info.email}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Địa chỉ
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={info.address}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
