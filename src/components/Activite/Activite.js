import React, { useEffect, useState } from "react";

import style from "./activite.module.css";

export const Activite = ({ listeActivite, getActivite, activiteRemoved }) => {
  const [activiteDesponible, setActiviteDesponibles] = useState([]);
  const [activiteSelectionne, setActiviteSelectionne] = useState([]);
  useEffect(
    () => (
      setActiviteDesponibles(
        activiteRemoved.length
          ? [
              ...listeActivite.filter((act) =>
                [...activiteRemoved.map((act) => act.id)].includes(act.id)
              ),
            ]
          : listeActivite
      ),
      setActiviteSelectionne([
        ...activiteSelectionne.filter(
          (act) => ![...activiteRemoved.map((act) => act.id)].includes(act.id)
        ),
      ])
    ),
    [activiteRemoved]
  );
  const handelClick = (act) =>
    activiteDesponible.includes(act)
      ? setActiviteDesponibles([
          ...new Map(
            [
              ...activiteDesponible.map((item) => ({
                ...item,
                selectionné: false,
              })),
              { ...act, selectionné: !act.selectionné },
            ].map((item) => [item.id, item])
          ).values(),
        ])
      : setActiviteSelectionne([
          ...new Map(
            [
              ...activiteSelectionne.map((item) => ({
                ...item,
                selectionné: true,
              })),
              { ...act, selectionné: !act.selectionné },
            ].map((item) => [item.id, item])
          ).values(),
        ]);
  const handelAdd = () => (
    setActiviteDesponibles([
      ...activiteDesponible.filter((act) => !act.selectionné),
    ]),
    setActiviteSelectionne([
      ...activiteSelectionne,
      ...activiteDesponible.filter((act) => act.selectionné),
    ])
  );

  const handelRemove = () => (
    setActiviteDesponibles([
      ...activiteDesponible,
      ...activiteSelectionne.filter((act) => !act.selectionné),
    ]),
    setActiviteSelectionne([
      ...activiteSelectionne.filter((act) => act.selectionné),
    ])
  );

  const handelAddAll = () => (
    setActiviteSelectionne([
      ...listeActivite.map((act) => ({
        ...act,
        selectionné: true,
      })),
    ]),
    setActiviteDesponibles([])
  );

  const handelRemoveAll = () => (
    setActiviteDesponibles([
      ...listeActivite.map((act) => ({
        ...act,
        selectionné: false,
      })),
    ]),
    setActiviteSelectionne([])
  );

  return (
    <div className={style.container}>
      <h2>Sélectionnez vos activités</h2>

      <div className={style.option}>
        <div className={style.option__field}>
          <h3>activités disponibles :</h3>
          <select name="" id="" size={4}>
            {activiteDesponible.map((act) => (
              <option
                key={act.id}
                selected={act.selectionné}
                onClick={() => handelClick(act)}
              >
                {act.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.button}>
          <button onClick={handelAdd}>+</button>
          <button onClick={handelAddAll}>++</button>
          <button onClick={handelRemove}>-</button>
          <button onClick={handelRemoveAll}>--</button>
        </div>
        <div className={style.option__field}>
          <h3>activités selectionnées :</h3>
          <select name="" id="" size={4}>
            {activiteSelectionne.map((act) => (
              <option
                key={act.id}
                selected={!act.selectionné}
                onClick={() => handelClick(act)}
              >
                {act.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={style.total__button}>
        <button onClick={() => getActivite(activiteSelectionne)}>
          afficer detail & totale
        </button>
      </div>
    </div>
  );
};
