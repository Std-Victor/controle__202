import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./view.styles.css";

import {
  getOldUserData,
  getRemovedId,
} from "../../redux/student/student.actions";

export const View = () => {
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();
  if (!students || students.length === 0) return null;
  const { id, name, username, email, address, phone } = students[0];
  const keys = { id, name, username, email, address, phone };
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
        {students.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              {Object.entries(handleAddress(user.address)).map(([k, v]) => (
                <span className="address--field" key={k}>
                  {v}
                </span>
              ))}
            </td>
            <td>{user.phone}</td>
            <td>
              <button
                className="btn__edit"
                onClick={() => dispatch(getOldUserData(user))}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                className="btn__remove"
                onClick={() => dispatch(getRemovedId(user.id))}
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
