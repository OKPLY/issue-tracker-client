import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import SideBar from "./components/layout/SideBar";
import IssueCard from "./components/issue/IssueCard";
import { ReviewIssues } from "./pages/ReviewIssue";
import Profile from "./pages/Profile";

function App() {
  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      {localStorage.getItem("token") ? (
        <>
          <SideBar />
          <div>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/issues/review" element={<ReviewIssues />} />
              <Route path="/account" element={<Profile />} />

              <Route path="/issues/review" element={<ReviewIssues />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          {/* <Route path="*" element={<Navigate to="/signin" />} /> */}
        </Routes>
      )}
    </Stack>
  );
}

export default App;
