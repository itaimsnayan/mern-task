import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileComponent from "../files";
import Navbar from "../Navbar";

function Dashboard() {
  const { id } = useParams();
  return (
    <div>
      <Navbar />
      {id === "files" && <FileComponent />}
    </div>
  );
}

export default Dashboard;
