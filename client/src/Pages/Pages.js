import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import Signin from "./Auth/Signin/Signin";
import SignUp from "./Auth/Signup/Signup";
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import Dashboard from "./Dashboard/Dashboard";
import Favorites from "./Favorites/Favorites";
import NewProduct from "./Products/NewProduct";
import Profile from "./Profile/Profile";

function Pages(props) {
  return (
    <>
      <Routes>
        <Route
          eaxct
          path="/dashboard"
          element={<Dashboard mode={props.mode} handler={props.modeHandler} />}
        />
        <Route
          eaxct
          path="/product/add"
          element={<NewProduct mode={props.mode} handler={props.modeHandler} />}
        />
        <Route
          eaxct
          path="/product/edit/:id"
          element={<NewProduct mode={props.mode} handler={props.modeHandler} />}
        />
        <Route
          eaxct
          path="/checkout"
          element={<Checkout mode={props.mode} handler={props.modeHandler} />}
        />
        <Route
          eaxct
          path="/favorites"
          element={<Favorites mode={props.mode} handler={props.modeHandler} />}
        />
        <Route
          eaxct
          path="/profile"
          element={<Profile mode={props.mode} handler={props.modeHandler} />}
        />
        <Route
          eaxct
          path="/cart"
          element={<Cart mode={props.mode} handler={props.modeHandler} />}
        />
        <Route
          eaxct
          path="/signup"
          element={<SignUp mode={props.mode} handler={props.modeHandler} />}
        />
        <Route
          eaxct
          path="/login"
          element={<Signin mode={props.mode} handler={props.modeHandler} />}
        />
        <Route exact path="*" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    </>
  );
}

export default Pages;
