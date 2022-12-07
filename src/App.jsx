import { useState } from "react";
import Button from "@mui/material/Button";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Layouts from "./components/Layouts.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AuthProvider, { useAuth } from "./firebase/Auth";
import Register from "./pages/Register";
// import './App.css'

// proctect pages against unathorized users
function ProtectedRoute({children}){
  const {user} = useAuth();
  if(!user){
    return <Navigate to={"/login"} />
  }
  return children
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<Layouts />}>
        <Route index path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  );
}

export default App;
