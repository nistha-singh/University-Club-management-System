import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Users = () => {
  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (UserID) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:5000/api/remove/${UserID}`);

      toast.success("User deleted successfully");
      setTimeout(() => {
        loadData();
      }, 500);
    }
  };

  const handleCreateProcedure = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/"
      );
      console.log(response.data); // Message from the backend
    } catch (error) {
      console.error("Error creating stored procedure:", error);
    }
  };

  return (
    <>
      <div style={{ marginTop: "150px" }}>
        <Link to="/addContact">
          <button className="btn btn-contact">Add Contact</button>
        </Link>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>UserId</th>
              <th style={{ textAlign: "center" }}>UserName</th>
              <th style={{ textAlign: "center" }}>Password</th>
              <th style={{ textAlign: "center" }}>Role</th>
              <th style={{ textAlign: "center" }}>ClubName</th>
              <th style={{ textAlign: "center" }}>ClubDepartment</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.UserId}>
                  <td>{item.UserID}</td>
                  <td>{item.Username}</td>
                  <td>{item.Password}</td>
                  <td>{item.Role}</td>
                  <td>{item.ClubName}</td>
                  <td>{item.ClubDepartment}</td>
                  <td>
                    <Link to={`/update/${item.UserID}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteContact(item.UserID)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${item.UserID}`}>
                      <button className="btn btn-view"> View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button onClick={handleCreateProcedure}>Create Procedure</button>
    </>
  );
};

export default Users;
