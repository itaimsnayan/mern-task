import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileComponent from "../files";
import Navbar from "../Navbar";
import UserList from "../user";

function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.token){
      navigate("/")
    }
  })
  return (
    <div>
      <Navbar />
      {id === "files" && <FileComponent />}
      {id === "users" && <UserList />}
    </div>
  );
}

export default Dashboard;
