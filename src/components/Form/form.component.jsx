import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./form.styles.css";

import {
  toggleModal,
  editUser,
  addStudent,
} from "../../redux/student/student.actions";
import { useState } from "react";

export const Form = () => {
  const { openModal, oldUser, lastUserId } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [user, setUser] = useState({ address: "" });
  if (!openModal) return null;
  const handleChange = (e) => {
    if (oldUser)
      return setUser({ ...oldUser, [e.target.name]: e.target.value });
    return setUser((prev) => ({
      ...prev,
      id: lastUserId,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddress = (e) => {
    if (oldUser)
      return setUser({
        ...oldUser,
        address: { ...oldUser.address, [e.target.name]: e.target.value },
      });

    return setUser((prev) => ({
      ...prev,
      address: { ...prev.address, [e.target.name]: e.target.value },
    }));
  };

  return (
    <div className="overlay" onClick={() => dispatch(toggleModal())}>
      <div className="form__container" onClick={(e) => e.stopPropagation()}>
        <form>
          <div className="from__box">
            <label htmlFor="" className="form__txt">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="input__field"
              onChange={handleChange}
              defaultValue={oldUser && oldUser.name}
            />
          </div>
          <div className="from__box">
            <label htmlFor="" className="form__txt">
              Username
            </label>
            <input
              name="username"
              type="text"
              className="input__field"
              onChange={handleChange}
              defaultValue={oldUser && oldUser.username}
            />
          </div>
          <div className="from__box">
            <label htmlFor="" className="form__txt">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="input__field"
              onChange={handleChange}
              defaultValue={oldUser && oldUser.email}
            />
          </div>
          <div className="from__box">
            <span className="address">Address :</span>
            <div className="address__part">
              <label htmlFor="" className="address__title">
                Street
              </label>
              <input
                name="street"
                type="text"
                className="input__field"
                onChange={handleAddress}
                defaultValue={oldUser && oldUser.address.street}
              />
            </div>
            <div className="address__part">
              <label htmlFor="" className="address__title">
                Suite
              </label>
              <input
                name="suite"
                type="text"
                className="input__field"
                onChange={handleAddress}
                defaultValue={oldUser && oldUser.address.suite}
              />
            </div>
            <div className="address__part">
              <label htmlFor="" className="address__title">
                City
              </label>
              <input
                name="city"
                type="text"
                className="input__field"
                onChange={handleAddress}
                defaultValue={oldUser && oldUser.address.city}
              />
            </div>
          </div>
          <div className="from__box">
            <label htmlFor="" className="form__txt">
              Phone
            </label>
            <input
              name="phone"
              type="phone"
              className="input__field"
              onChange={handleChange}
              defaultValue={oldUser && oldUser.phone}
            />
          </div>
          <div className="form__submit">
            {oldUser ? (
              <div className="form__submit">
                <input
                  type="submit"
                  value="Edit"
                  onClick={(e) => {
                    e.preventDefault();
                    return dispatch(editUser(user));
                  }}
                />
                <input
                  type="button"
                  value="Annuler"
                  onClick={() => dispatch(toggleModal())}
                />
              </div>
            ) : (
              <input
                type="submit"
                value="Add"
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    Object.keys(user).length >= 6 &&
                    Object.keys(user.address).length >= 3
                  )
                    return (dispatch(addStudent(user)), setUser({ address: "" }));
                }}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
