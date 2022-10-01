import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import studentReducer from "./student/student.reducer";

const middlewares = [logger];

const store = createStore(studentReducer, applyMiddleware(...middlewares));

export default store;
