import { studentActionType } from "./student.action.type";

export const fetchData = (data) => ({
  type: studentActionType.FETCH_DATA,
  payload: data,
});
export const getOldUserData = (oldUser) => ({
  type: studentActionType.OLD_USER,
  payload: oldUser,
});
export const getRemovedId = (id) => ({
  type: studentActionType.REMOVE_USER_BY_ID,
  payload: id,
});

export const toggleModal = () => ({
  type: studentActionType.OPEN_MODAL,
});

export const editUser = (newData) => ({
  type: studentActionType.EDIT_USER,
  payload: newData,
});

export const addStudent = (std) => ({
  type: studentActionType.ADD_STUDENT,
  payload: std,
});

export const search = (newList) => ({
  type: studentActionType.SEARCH,
  payload: newList,
});
