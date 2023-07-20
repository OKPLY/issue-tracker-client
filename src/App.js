import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import SideBar from "./components/layout/SideBar";
import IssueCard from "./components/issue/IssueCard";
import ReviewIssues from "./pages/ReviewIssues";
import Profile from "./pages/Profile";
import NewIssue from "./pages/NewIssue";
import { useAuth, useAuthUpdate } from "./contexts/AuthContext";
import IssueStatusTracker from "./components/IssueTrack";
import IssueDetails from "./pages/IssueDetails";
import { ToastContainer } from "react-toastify";

import "react-medium-image-zoom/dist/styles.css";
import ResolveIssues from "./pages/ResolveIssues";
import ListIssues from "./pages/ListIssues";

function App() {
  const auth = useAuth();
  const authUpdate = useAuthUpdate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      authUpdate(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100vw" }}>
      {auth ? (
        <>
          <SideBar />
          <div style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/signin" element={<Navigate to="/" />} />
              <Route path="/signUp" element={<Navigate to="/" />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/account" element={<Profile />} />

              <Route path="/issues/:id" element={<IssueDetails />} />
              <Route path="/issues/new" element={<NewIssue />} />
              <Route path="/issues/review" element={<ReviewIssues />} />
              <Route path="/issues/resolve" element={<ResolveIssues />} />
              <Route path="/issues/list" element={<ListIssues />} />
              <Route path="/issues/board" element={<IssueStatusTracker />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
