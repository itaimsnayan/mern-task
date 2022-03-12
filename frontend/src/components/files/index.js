import React, { useEffect, useState } from "react"; 
import { sendRequest } from "../../actions";
import { apipaths } from "../../actions/apiPaths";

function FileComponent() {
  const [files, setFiles] = useState([]); 

  useEffect(() => {
    getFileList();
  }, []);

  const getFileList = async () => {
    const { error, data } = await sendRequest(apipaths.files);
    data && setFiles(data.data);
    error && alert(error.message);
  }; 

  return (
    <div className="container">
      <div className="my-4">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add File
        </button> 
        
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
            const { filename, path, access } = file;
            return (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{filename}</td>
                <td>{access}</td>
                <td>
                  <button className="btn btn-sm  btn-warning me-3">
                    Edit Access
                  </button>
                  <button
                    className="btn btn-info btn-sm my-1"
                    onClick={() => window.open(path, "_blank")}
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
