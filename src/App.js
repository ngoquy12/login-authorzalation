import logo from "./logo.svg";
import "./App.css";
import Header from "./components/page/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/page/Footer";
import Login from "./components/page/user/Login";
import Register from "./components/page/user/Register";
import ManagerUser from "./components/page/admin/ManagerUser";
import Slider from "./components/page/user/Slider";
import EditUser from "./components/page/admin/EditUser";
import AddUser from "./components/page/admin/AddUser";

function App() {
  return (
    <>
      <Header />
      <Slider />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/manager-user" element={<ManagerUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/manager-user/edit-user/:id" element={<EditUser />} />
        <Route path="/manager-user/add-user" element={<AddUser />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
