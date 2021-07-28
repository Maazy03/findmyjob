import { actionTypes } from "../common";

import { combineReducers } from "redux";
// reducers
import { themeOptionsReducer } from "./ThemeOptions";
import { authReducer } from "./authReducer";
import { orderReducer } from "./orderReducer";
import { productReducer } from "./productReducer";
import { portraitReducer } from "./portraitReducer";
import { listSellReducer } from "./listSellReducer";
import { notificationReducer } from "./notificationReducer";
import { dashboardReducer } from "./dashboardReducer";
import { schoolReducer } from "./schoolReducer";

const appReducer = combineReducers({
  ThemeOptions: themeOptionsReducer,
  auth: authReducer,
  product: productReducer,
  order: orderReducer,
  portrait: portraitReducer,
  listSell: listSellReducer,
  notification: notificationReducer,
  dashboard: dashboardReducer,
  school: schoolReducer,
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
