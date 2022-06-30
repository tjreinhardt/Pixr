import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ImageFeed from "./components/ImageFeed";
import LandingPage from "./components/LandingPage";
import SelectedImage from "./components/SelectedImage";
import LoginFormPage from "./components/LoginFormPage";
import AddImage from "./components/AddImage";
import { getUserCollections } from "./store/collections"
import GetCollections from "./components/Collections/GetCollections";
import CollectionForm from './components/Collections/CollectionForm';
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

  const user = useSelector((state) => state.session.user)
  useEffect(() => {
    dispatch(getUserCollections(user.id))
  }, [dispatch, user])



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/images" exact>
            <ImageFeed />
          </Route>
          <Route path={"/images/:imageId"} exact>
            <SelectedImage />
          </Route>
          <Route path="/collections" exact>
            <GetCollections />
          </Route>
          <Route path="/newCollection" exact>
            <CollectionForm />
          </Route>
          <Route path="/signup" exact>
            <SignupFormPage />
          </Route>
          <Route path="/upload" exact>
            <AddImage />
          </Route>
          <Route path="/login" exact>
            <LoginFormPage />
          </Route>
          <Route path="/" exact>
            <LandingPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
