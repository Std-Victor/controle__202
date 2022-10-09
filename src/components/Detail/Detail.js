import React, { useEffect, useState } from "react";

import style from "./detail.module.css";

export const Detail = ({ activiteSelectionne }) => {
  const [total, setTotal] = useState();
  const [listActivite, setListActivite] = useState([]);
  useEffect(
    () => (
      setListActivite(() => [...activiteSelectionne]),
      setTotal({
        ...activiteSelectionne.reduce(
          (obj, item) => ({ ...obj, [item.id]: item.prix }),
          {}
        ),
      })
    ),
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
                  defaultValue={1}
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
          Total :
          {!total
            ? listActivite.reduce((total, item) => total + item.prix, 0)
            : Object.values(total).reduce((total, prix) => total + prix, 0)}
        </p>
      </div>
    </div>
  );
};
