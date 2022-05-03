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
import { useSelector } from "react-redux";
import PageNotFound from "./404/PageNotFound";
import ForgotPassword from "./ForgetPassword/ForgetPassword";

function Pages(props) {
  const token = useSelector((state) => state.loging.token);
  return (
    <>
      <Routes>
        {token && (
          <>
            <Route
              eaxct
              path="/dashboard"
              element={<Dashboard handler={props.modeHandler} />}
            />
            <Route
              eaxct
              path="/product/add"
              element={<NewProduct handler={props.modeHandler} />}
            />
            <Route
              eaxct
              path="/product/edit/:id"
              element={<NewProduct handler={props.modeHandler} />}
            />
            <Route
              eaxct
              path="/checkout/:ID"
              element={<Checkout handler={props.modeHandler} />}
            />
            <Route
              eaxct
              path="/favorites"
              element={<Favorites handler={props.modeHandler} />}
            />
            <Route
              eaxct
              path="/profile"
              element={<Profile handler={props.modeHandler} />}
            />
            <Route
              eaxct
              path="/cart"
              element={<Cart handler={props.modeHandler} />}
            />
            <Route
              eaxct
              path="/signup"
              element={<SignUp handler={props.modeHandler} />}
            />
            <Route
              eaxct
              path="/login"
              element={<Signin handler={props.modeHandler} />}
            />
            <Route
              eaxct
              path="/404"
              element={<PageNotFound handler={props.modeHandler} />}
            />
            <Route
              exact
              path="/"
              element={<Navigate replace to="/dashboard" />}
            />
            <Route exact path="*" element={<Navigate replace to="/404" />} />
          </>
        )}
        {!token && (
          <>
            <Route
              eaxct
              path="/forget-password"
              element={<ForgotPassword handler={props.modeHandler} />}
            />
            <Route
              eaxct
              path="/signup"
              element={<SignUp handler={props.modeHandler} />}
            />
            <Route
              eaxct
              path="/login"
              element={<Signin handler={props.modeHandler} />}
            />
            <Route exact path="*" element={<Navigate replace to="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default Pages;
