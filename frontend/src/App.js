import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import ImageFeed from "./components/ImageFeed";
import LandingPage from "./components/LandingPage";
import SelectedImage from "./components/SelectedImage";
import LoginFormPage from "./components/LoginFormPage";
import AddImage from "./components/AddImage";
import GetCollections from "./components/Collections/GetCollections";
import SelectedCollection from "./components/SelectedCollection";
import CollectionForm from "./components/Collections/CollectionForm";
import Layout from "./components/Layout/layout";
import Footer from "./components/Layout/Footer/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return isLoaded && (
    <>
      <Layout isLoaded={isLoaded}>
        <Switch>
          <Route path="/images" exact>
            <ImageFeed />
          </Route>
          <Route path="/images/:imageId">
            <SelectedImage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/collections" exact>
            <GetCollections />
          </Route>
          <Route path="/collections/:id">
            <SelectedCollection />
          </Route>
          <Route path="/newCollection">
            <CollectionForm />
          </Route>
          <Route path="/upload">
            <AddImage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/">
            <LandingPage isLoaded={isLoaded} />
          </Route>
        </Switch>
      </Layout>
      <Footer />
    </>
  )
}

export default App;
