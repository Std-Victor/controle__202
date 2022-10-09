import React, { useEffect, useState } from "react";

import style from "./detail.module.css";

export const Detail = ({ activiteSelectionne }) => {
  const [total, setTotal] = useState(0);
  const [listActivite, setListActivite] = useState([]);
  useEffect(
    () => setListActivite(() => [...activiteSelectionne]),
    [activiteSelectionne]
  );
  const handelChange = (e) =>
    setTotal({
      ...total,
      [e.target.name]:
        e.target.value *
        listActivite.reduce(
          (total, act) => total + (act.id === +[e.target.name] ? act.prix : 0),
          0
        ),
    });
  const handelDelete = (id) => (
    setListActivite([...listActivite.filter((act) => act.id !== id)]),
    setTotal({
      ...Object.keys(total)
        .filter((item) => +item !== id)
        .reduce((obj, item) => ({ ...obj, [item]: total[item] }), {}),
    })
  );
  console.clear();
  console.log(total);
  return (
    <div className={style.container}>
      <h2>Votre Choix</h2>
      <table>
        <thead>
          <tr>
            <th>image</th>
            <th>nom</th>
            <th>prix</th>
            <th>nombre de personnes</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {listActivite.map((act) => (
            <tr key={act.id}>
              <td>
                <img src={act.img} alt={act.name} />
              </td>
              <td>{act.name}</td>
              <td>{act.prix}</td>
              <td>
                <input
                  type="number"
                  onChange={handelChange}
                  name={act.id}
                  min={0}
                  id=""
                />
              </td>
              <td>
                <button onClick={() => handelDelete(act.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={style.total}>
        <p>
          Total :{" "}
          {Object.values(total).reduce((total, prix) => total + prix, 0)}
        </p>
      </div>
    </div>
  );
};
