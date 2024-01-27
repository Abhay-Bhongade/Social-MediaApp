import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "../rtk/app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import App from "./App";
let persistor = persistStore(store);





const MainApp = () => {



  return (
    
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={900}
          limit={1}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
        />
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<MainApp />, document.getElementById("root"));
