import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import Signin from "./Auth/Signin/Signin";
import SignUp from "./Auth/Signup/Signup";

function Pages(props) {
  return (
    <>
      <Routes>
        {/* <Route
          exact
          path="/"
          element={<Navigate replace to="/auth/sign-in" />}
        /> */}
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
      </Routes>
    </>
  );
}

export default Pages;
