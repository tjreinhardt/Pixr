import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ImageFeed from "./components/ImageFeed";
import LandingPage from "./components/LandingPage";
import SelectedImage from "./components/SelectedImage";
import LoginFormPage from "./components/LoginFormPage";
import AddImage from "./components/AddImage";
// import AddImage from "./components/AddImage";
// import LoginFormPage from "./components/LoginFormPage";
// import DemoLogin from "./components/LoginFormPage/DemoLogin";
// import load from "./store/images"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  // const user = useSelector(state=>state.session.user)

  // useEffect(() => {
  //   if (user) dispatch(load())
  // }, [dispatch, user])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/images" exact>
            <ImageFeed />
          </Route>
          <Route path={"/images/:imageId"}>
            <SelectedImage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/upload">
            <AddImage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
