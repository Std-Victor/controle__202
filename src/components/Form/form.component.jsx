import React, { useRef } from "react";
import "./form.styles.css";

export const Form = ({ open, onclose, getData, editStd }) => {
  const name = useRef();
  const username = useRef();
  const email = useRef();
  const street = useRef();
  const suite = useRef();
  const city = useRef();
  const phone = useRef();

  const data = { address: {} };

  const validInput = (...args) => {
    for (const arg of args) {
      for (const [k, v] of Object.entries(arg)) {
        if (v.current.value.length > 0) {
          ["street", "suite", "city"].includes(k)
            ? (data.address[k] = v.current.value)
            : (data[k] = v.current.value);
        }
      }
    }
  };
  if (!open) return null;
  const sendData = (e) => {
    e.preventDefault();
    validInput(
      { name },
      { username },
      { email },
      { street },
      { suite },
      { city },
      { phone }
    );
    if (Object.keys(data).length < 5) return null;
    return getData(data);
  };
  return (
    <div className="overlay" onClick={onclose}>
      <div className="form__container" onClick={(e) => e.stopPropagation()}>
        <form>
          <div className="from__box">
            <label htmlFor="" className="form__txt">
              Name
            </label>
            <input
              type="text"
              className="input__field"
              // onBlur={(e) => (data.name = e.target.value)}
              ref={name}
              defaultValue={editStd.name}
            />
          </div>
          <div className="from__box">
            <label htmlFor="" className="form__txt">
              Username
            </label>
            <input
              type="text"
              className="input__field"
              // onBlur={(e) => (data.username = e.target.value)}
              ref={username}
              defaultValue={editStd.username}
            />
          </div>
          <div className="from__box">
            <label htmlFor="" className="form__txt">
              Email
            </label>
            <input
              type="email"
              className="input__field"
              // onBlur={(e) => (data.email = e.target.value)}
              ref={email}
              defaultValue={editStd.email}
            />
          </div>
          <div className="from__box">
            <span className="address">Address :</span>
            <div className="address__part">
              <label htmlFor="" className="address__title">
                Street
              </label>
              <input
                type="text"
                className="input__field"
                // onBlur={(e) => (data.address.street = e.target.value)}
                ref={street}
                defaultValue={editStd && editStd.address.street}
              />
            </div>
            <div className="address__part">
              <label htmlFor="" className="address__title">
                Suite
              </label>
              <input
                type="text"
                className="input__field"
                // onBlur={(e) => (data.address.suite = e.target.value)}
                ref={suite}
                defaultValue={editStd && editStd.address.suite}
              />
            </div>
            <div className="address__part">
              <label htmlFor="" className="address__title">
                City
              </label>
              <input
                type="text"
                className="input__field"
                // onBlur={(e) => (data.address.city = e.target.value)}
                ref={city}
                defaultValue={editStd && editStd.address.city}
              />
            </div>
          </div>
          <div className="from__box">
            <label htmlFor="" className="form__txt">
              Phone
            </label>
            <input
              type="phone"
              className="input__field"
              // onBlur={(e) => (data.phone = e.target.value)}
              ref={phone}
              defaultValue={editStd.phone}
            />
          </div>
          <div className="form__submit">
            <input
              type="submit"
              value={editStd ? "Edit" : "Add"}
              onClick={sendData}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
