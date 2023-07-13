import React, { useState, Suspense, Fragment, lazy } from "react";
import Button from "@mui/material/Button";
import {
  Route,
  Routes,
  BrowserRouter,
  createRoutesFromElements,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Layouts = lazy(() => import("./components/Layouts.jsx"));
import { Provider } from "react-redux";
import { store } from "./store/store";
import AuthProvider, { useAuth } from "./firebase/Auth";
import Register from "./pages/Register";
// import './App.css'

// proctect pages against unathorized users
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Routes path="/" element={<Layouts />}>
//         <Route index element={<Home />} />
//         <Route path="home" element={<Home />} />
//         <Route path="cart" element={<Cart />} />
//         <Route
//           path="checkout"
//           element={
//             <ProtectedRoute>
//               <Checkout />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//       <Route path="login" element={<Login />} />
//       <Route path="register" element={<Register />} />
//     </>
//   )
// );

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layouts />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route
                path="checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}

export default App;
