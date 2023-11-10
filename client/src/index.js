import React from "react";
import  ReactDOM  from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles.css";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
]);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>  
      <RouterProvider router={router} />
    </React.StrictMode>
  );


