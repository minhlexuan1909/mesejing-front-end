import "./App.css";
import "antd/dist/antd.min.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppRoute from "./routers";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <HashRouter>
        <AppRoute />
      </HashRouter>
    </div>
  );
}

export default App;
