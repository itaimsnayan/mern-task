import React, { useEffect, useState } from "react";
import { sendRequest } from "../../actions";
import { apipaths } from "../../actions/apiPaths";
import Badge from "react-bootstrap/Badge";
import AddFile from "./addFile";

function FileComponent() {
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getFileList();
    getUserList();
  }, []);

  const getFileList = async () => {
    const { error, data } = await sendRequest(apipaths.files);
    data && setFiles(data.data);
    error && alert(error.message);
  };

  const getUserList = async () => {
    const { error, data } = await sendRequest(apipaths.users);
    data && setUsers(data.data);
    error && alert(error.message);
  };
  return (
    <div className="container">
      <div className="my-4">
        <AddFile users={users} getFileList={getFileList} />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sno</th>
            <th>Filename</th>
            <th>Access</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {files?.map((file, key) => {
            const { filename, path, access, userId } = file;
            return (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{filename}</td>
                <td>
                  {typeof access === "object" && access?.map((acc) => (
                    <Badge bg="info" className="me-3">
                      {acc}
                    </Badge>
                  ))}
                </td>
                <td>
                  <button
                    className="btn btn-info btn-sm my-1"
                    onClick={() => {
                      const email = localStorage.getItem("email");
                      const user_id = localStorage.getItem("userId");
                      if (userId._id === user_id || access.includes(email)) window.open(path, "_blank");
                      else alert("Access Denied.");
                    }}
                  >
                    Download
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FileComponent;
