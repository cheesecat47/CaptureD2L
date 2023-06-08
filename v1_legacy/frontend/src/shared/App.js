import React, { Component } from "react";
import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home, About } from "../pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyFooter from "../components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/About",
    element: <About />,
  },
]);

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <RouterProvider router={router} />
        <MyFooter />
      </div>
    );
  }
}

export default App;
