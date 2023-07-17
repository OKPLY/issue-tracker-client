import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import { Stack } from "@mui/material";
import SideBar from "./components/layout/SideBar";

function App() {
  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      {localStorage.getItem("token") ? (
        <>
          <SideBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
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
