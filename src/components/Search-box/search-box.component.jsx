import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./search-box.styles.css";

import { search } from "../../redux/student/student.actions";

export const SearchBox = () => {
  const students = useSelector((state) => state.students);
  useEffect(() => setList(() => [...students]), []);
  const [list, setList] = useState();
  const dispatch = useDispatch();
  const handleChange = (e) =>
    dispatch(
      search(
        [
          ...new Map(
            [...list, ...students].map((item) => [item.id, item])
          ).values()
        ].filter((std) =>
          std.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      )
    );

  return (
    <input
      type="serch"
      className="search"
      placeholder="Search For Students"
      onChange={handleChange}
    />
  );
};
