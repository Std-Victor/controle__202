import React from "react";
import "./view.styles.css";

export const View = ({ filteredStd, editById, removeById }) => {
  let keys = [];
  if (filteredStd.length > 0) keys = filteredStd[0];
  const { id, name, username, email, address, phone } = keys;
  keys = { id, name, username, email, address, phone };
  const handleAddress = (ads) => {
    const { street, suite, city } = ads;
    return (ads = { street, suite, city });
  };
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(keys).map((k) => (
            <th key={k}>{k}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredStd.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              {Object.entries(handleAddress(user.address)).map(([k, v]) => (
                <span className="address--field" key={k}>
                  {/* <span className="address--title">{k}</span> */}
                  {/* <span className="address--content">{v}</span> */}
                  {v}
                </span>
              ))}
            </td>
            <td>{user.phone}</td>
            <td>
              <button className="btn__edit" onClick={() => editById(user)}>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                className="btn__remove"
                onClick={() => removeById(user.id)}
              >
                <i className="fa-solid fa-eraser"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
