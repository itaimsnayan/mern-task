import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import $ from "jquery";
import { apipaths } from "../../actions/apiPaths";
import { sendRequest } from "../../actions";

function AddFile(props) {
  const { users, getFileList } = props;
  const [show, setShow] = useState(false);

  const [filename, setFilename] = useState("");
  const [access, setAccess] = useState([]);
  const [file, setFile] = useState([]);
  const [message, setMessage] = useState("");

  //   const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const accessHandler = () => {
    let selected_users = [];
    users.map((user, key) => {
      if ($(`#user-${key}`).prop("checked")) selected_users.push(user.email);
    });
    setAccess(selected_users);
  };

  const submiHandler = async () => {
    const formdata = new FormData();
    setMessage("Uploading file...");
    if (!filename || !file || access.length === 0) {
      return setMessage("Filename, file and access is required.");
    }
    formdata.append("filename", filename);
    for (var key in access) {
      formdata.append("access", access[key]);
    }
    formdata.append("userId", localStorage.userId);
    formdata.append("timestamp", new Date().getTime());
    formdata.append("myFile", file);
    // console.log(file);
    const { error, data } = await sendRequest(apipaths.addFile, formdata);
    // console.log(error, data);
    if (data) {
      setShow(false);
      getFileList();
      setMessage(data.data.message);
    }else{
      alert(error.message)
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add File
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-danger">
            {message && <p className="text-left">{message}</p>}
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Filename</Form.Label>
            <Form.Control
              onChange={(e) => setFilename(e.target.value)}
              type="text"
              placeholder="Enter Filename"
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload File</Form.Label>
            <Form.Control
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
            />
          </Form.Group>

          <div key={`inline-checkbox`} className="mb-3">
            <Form.Label>Select User Access</Form.Label>
            <div className="row">
              {users?.map((user, key) => {
                const { email } = user;
                return (
                  <div class="col-12 col-md-6 col-lg-6 my-1" key={key}>
                    <Form.Check
                      label={email}
                      onChange={accessHandler}
                      id={`user-${key}`}
                      type={"checkbox"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" type="button" onClick={submiHandler}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddFile;
