import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import CreateReview from "../pages/CreateReview";
import DetailReview from "../pages/DetailReview";
import EditReview from "../pages/EditReview";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/new" element={<CreateReview />} />
        <Route exact path="/detail/:id" element={<DetailReview />} />
        <Route exact path="/edit/:id" element={<EditReview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
