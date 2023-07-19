import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import SideBar from "./components/layout/SideBar";
import IssueCard from "./components/issue/IssueCard";
import { ReviewIssues } from "./pages/ReviewIssue";
import Profile from "./pages/Profile";
import NewIssue from "./pages/NewIssue";
import { useAuth, useAuthUpdate } from "./contexts/AuthContext";
import IssueStatusTracker from "./components/IssueTrack";

function App() {
  const auth = useAuth();
  const authUpdate = useAuthUpdate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      authUpdate(JSON.parse(localStorage.getItem("user")));
      console.log(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      {auth ? (
        <>
          <SideBar />
          <div>
            <Routes>
              <Route path="/signin" element={<Navigate to="/" />} />
              <Route path="/signUp" element={<Navigate to="/" />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/issues/review" element={<ReviewIssues />} />
              <Route path="/account" element={<Profile />} />

              <Route path="/issues/new" element={<NewIssue />} />
              <Route path="/issues/review" element={<ReviewIssues />} />
              <Route path="/issues/resolve" element={<IssueStatusTracker />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      )}
    </Stack>
  );
}

export default App;
