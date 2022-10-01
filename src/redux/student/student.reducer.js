import { studentActionType } from "./student.action.type";

const INISIAL_STATE = {
  openModal: false,
  dataFetched : false,
};

const studentReducer = (state = INISIAL_STATE, action) => {
  switch (action.type) {
    case studentActionType.FETCH_DATA:
      return {
        ...state,
        students: action.payload,
        lastUserId: action.payload.length + 1,
        dataFetched: true,
      };
    case studentActionType.OLD_USER:
      return { ...state, oldUser: action.payload, openModal: !state.openModal };
    case studentActionType.REMOVE_USER_BY_ID:
      return {
        ...state,
        students: state.students.filter((std) => std.id !== action.payload),
      };
    case studentActionType.EDIT_USER:
      return {
        ...state,
        students: state.students.map((std) =>
          std.id === state.oldUser.id ? action.payload : std
        ),
        openModal: !state.openModal,
        oldUser: null,
      };
    case studentActionType.OPEN_MODAL:
      return { ...state, openModal: !state.openModal, oldUser: null };
    case studentActionType.SEARCH:
      return {
        ...state,
        students: action.payload,
      };
    case studentActionType.ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
        lastUserId: state.lastUserId + 1,
        openModal: !state.openModal,
        oldUser: null,
      };
    default:
      return state;
  }
};
export default studentReducer;
