import React, { useEffect, useState } from "react";
import { sendRequest } from "../../actions";
import { apipaths } from "../../actions/apiPaths";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const { error, data } = await sendRequest(apipaths.users);
    data && setUsers(data.data);
    error && alert(error.message);
  };

  return (
    <div>
      <div className="my-5 w-75 mx-auto">
        <h4 className="mb-3">Users</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, key) => {
              const { email, username } = user;
              return (
                <tr key={key}>
                  <td>{username}</td>
                  <td>{email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
